import React, { Component } from 'react';

class TaskHistory extends Component {
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
        (task.createdAt < (Date.now() - 604800000)) || (task.isCompleted === true)) })
    });
  }

  switchComplete(task) {
    task.isCompleted = !task.isCompleted;
    this.tasksRef.child(task.key).update({
      isCompleted: task.isCompleted,
    });

    this.setState({ tasks: this.state.tasks.filter(task =>
      (task.createdAt < (Date.now() - 604800000)) || (task.isCompleted === true)) })
  }

  render() {
    return (
      <section className="tasks">
        <h5>Completed</h5>
        <ul className="list-group">
        { this.state.tasks.filter(task => (task.isCompleted === true)).map((task, index) =>
            <li className="list-group-item" key={ index }>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="checkbox"><input type="checkbox" onChange={() => this.switchComplete(task)} checked={task.isCompleted}/>
                      { task.name }
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
          )
        }
        </ul>
        <br/>
        <h5>Expired</h5>
        <ul className="list-group">
        { this.state.tasks.filter(task => (task.createdAt < (Date.now() - 604800000)) && (task.isCompleted === false)).map((task, index) =>
            <li className="list-group-item" key={ index }><input type="checkbox" onChange={() => this.switchComplete(task)} checked={task.isCompleted}/> { task.name }</li>
          )
        }
        </ul>
        <br/>
      </section>
    );
  }
}

export default TaskHistory;
