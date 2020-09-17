import React from 'react';
import {SimpleTask} from './SimpleTask';
import {addTask, updateTextOfTheTask, deleteTask, getTaskDone} from '../redux/toDo-reducer';
import {connect} from "react-redux";


class ToDoList extends React.Component {

    render() {

        let updateLocalState = (e) => {
            let newTextOfTheTask = e.target.value;
            this.props.updateTextOfTheTask(newTextOfTheTask)
        }


        let addToListTask = () => {
            this.props.addTask();
        }


        let getTaskDone = (taskId) => {
            this.props.getTaskDone(taskId);
        }


        let deleteThisTask = (taskId) => {
            this.props.deleteTask(taskId);
        }

        let activeTasks = this.props.tasks.filter(task => !task.completed);

        let completedTasks = this.props.tasks.filter(task => task.completed);

        let allTasks = [...activeTasks, ...completedTasks];

        let myList = allTasks.map(task => {
            return <div key={task.id}>
                <span><SimpleTask message={task.message}
                                  getTaskDone={getTaskDone}
                                  deleteThisTask={deleteThisTask}
                                  taskId={task.id}
                                  isTaskDone={task.completed}/></span>
            </div>
        })

        if (!this.props.tasks) {
            return
        } else {
            return <div>
                <span> <input onChange={updateLocalState} value={this.props.textOfTheTask} type="text"/></span>
                <span> <button onClick={addToListTask}>Add Task </button></span>
                <div> {myList} </div>
            </div>
        }

    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.toDoList.tasks,
        textOfTheTask: state.toDoList.textOfTheTask
    }
}

export default connect(mapStateToProps,
    {
        addTask,
        updateTextOfTheTask,
        deleteTask,
        getTaskDone
    })(ToDoList);