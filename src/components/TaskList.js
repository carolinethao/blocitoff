import React, { Component } from 'react';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTaskName: '',
      createdAt: '',
      isCompleted: '',
      priority: '',
    };

    this.tasksRef = this.props.firebase.database().ref('tasks');
  }



  componentDidMount() {
    this.tasksRef.on('child_added', snapshot => {
      const task = snapshot.val();
      task.key = snapshot.key;

      this.setState({ tasks: this.state.tasks.concat(task).filter(task =>
        (task.createdAt > (Date.now() - 604800000)) && (task.isCompleted === false)).sort((a,b) => a.priority - b.priority) })
    });
  }

  handleChange(e) {
    this.setState({ newTaskName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.newTaskName) { return };

    e.target.reset();
  }

  createTask() {
    this.tasksRef.push({
      name: this.state.newTaskName,
      createdAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      isCompleted: false,
      priority: 1,
    });
  }

  switchComplete(task) {
    task.isCompleted = !task.isCompleted;
    this.tasksRef.child(task.key).update({
      isCompleted: task.isCompleted,
    });

    this.setState({ tasks: this.state.tasks.filter(task =>
      task.isCompleted === false).sort((a,b) => a.priority - b.priority) });
  }

  showPriority(task) {
    if (task.priority === 0) {
      return "high"
    } else if (task.priority === 1) {
      return "medium"
    } else if (task.priority === 2) {
      return "low"
    }
  }

  increasePriority(task) {
    if (task.priority === 1) {
      task.priority = 0
    } else if (task.priority === 2) {
      task.priority = 1
    };

    this.tasksRef.child(task.key).update({
      priority: task.priority,
    });

    this.setState({ tasks: this.state.tasks.sort((a,b) => a.priority - b.priority) });
  }

  decreasePriority(task) {
    if (task.priority === 0) {
      task.priority = 1
    } else if (task.priority === 1) {
      task.priority = 2
    };

    this.tasksRef.child(task.key).update({
      priority: task.priority,
    });

    this.setState({ tasks: this.state.tasks.sort((a,b) => a.priority - b.priority) });
  }

  render() {
    return (
      <section className="tasks">
        <ul className="list-group">
        { this.state.tasks.map((task, index) =>
            <li className="list-group-item" key={ index }>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="checkbox"><input type="checkbox" onChange={() => this.switchComplete(task)} checked={task.isCompleted}/>
                      { task.name }
                    </td>
                    <td className="align-right">
                      { this.showPriority(task) }
                      <button type="submit" onClick={() => this.increasePriority(task)}><i class="fas fa-arrow-up"></i></button>
                      <button type="submit" onClick={() => this.decreasePriority(task)}><i class="fas fa-arrow-down"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
          )
        }
        </ul>
        <br/>
        <nav className="navbar fixed-bottom navbar-light bg-light">
          <div className="container">
            <form className="form-inline my-2 my-lg-0" onSubmit={(e) => this.handleSubmit(e)}>
              <input type="text" className="form-control mr-sm-2" placeholder="New Task" value={this.state.newTask} onChange={(e) => this.handleChange(e)} />
              <button type="submit" className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.createTask()}>Create Task</button>
            </form>
          </div>
        </nav>
      </section>
    );
  }
}

export default TaskList;
