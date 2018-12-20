import React, { Component } from 'react';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTaskName: '',
      createdAt: '',
      isCompleted: '',
    };

    this.tasksRef = this.props.firebase.database().ref('tasks');
  }

  componentDidMount() {
    this.tasksRef.on('child_added', snapshot => {
      const task = snapshot.val();
      task.key = snapshot.key;

      this.setState({ tasks: this.state.tasks.concat(task).filter(task =>
        (task.createdAt > (Date.now() - 604800000)) && (task.isCompleted === false)) })
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
    });
  }

  switchComplete(task) {
    task.isCompleted = !task.isCompleted;
    this.tasksRef.child(task.key).update({
      isCompleted: task.isCompleted,
    });

    this.setState({ tasks: this.state.tasks.filter(task =>
      task.isCompleted === false) });
  }

  render() {
    return (
      <section className="tasks">
        <ul className="list-group">
        { this.state.tasks.map((task, index) =>
            <li className="list-group-item" key={ index }><input type="checkbox" onChange={() => this.switchComplete(task)} checked={task.isCompleted}/> { task.name }</li>
          )
        }
        </ul>
        <br/>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" name="newtask" placeholder="New Task" value={this.state.newTask} onChange={(e) => this.handleChange(e)} />
          <button type="submit" onClick={() => this.createTask()}>Create Task</button>
        </form>
      </section>
    );
  }
}

export default TaskList;
