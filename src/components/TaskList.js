import React, { Component } from 'react';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTaskName: ''
    };
    this.tasksRef = this.props.firebase.database().ref('tasks');
  }

  componentDidMount() {
    this.tasksRef.on('child_added', snapshot => {
      const task = snapshot.val();
      task.key = snapshot.key;
      this.setState({ tasks: this.state.tasks.concat( task ) })
    });
  }

  handleChange(e) {
    this.setState({ newTaskName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newTaskName) { return }
  }

  createTask() {
    this.tasksRef.push({
      name: this.state.newTaskName
    });
  }

  render() {
    return (
      <section className="tasks">
      <ul>
      {
        this.state.tasks.map((task, index) =>
          <li key={ index }>{ task.name }</li>
        )}
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <input type="text" name="newtask" placeholder="New Task" value={this.state.newTask} onChange={(e) => this.handleChange(e)} />
            <button type="submit" onClick={() => this.createTask()}>Create Task</button>
          </form>
      </ul>
      </section>
    );
  }
}

export default TaskList;
