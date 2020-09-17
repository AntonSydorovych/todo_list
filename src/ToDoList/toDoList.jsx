import React from 'react';
import {SimpleTask} from './SimpleTask';
import style from './toDoList.module.css'
import {
    clearAll,
    setRememberMe,
    logOut,
    checkLogin,
    updateTextForLoginField,
    downloadTasks,
    addTask,
    updateTextOfTheTask,
    updateTextOfTheFocusedTask,
    deleteTask,
    getTaskDone,
    getTaskFocusOn,
    setTextOfTheFocusedTask,
    getTaskFocusOff
} from '../redux/toDo-reducer';
import {connect} from "react-redux";
import {LoginForm} from './LoginForm';


class ToDoList extends React.Component {

    componentDidMount() {
        let tasksInLS = localStorage.getItem('tasks');
        if (tasksInLS) {
            this.props.downloadTasks();
        }

    }

    render() {

        let clearAllTasks = () => {
  //          console.log('THIS in toDoList : ', this)
 //           alert('task list is clear');
        this.props.clearAll();
        }

        let setRememberMe = (checked) => {
            this.props.setRememberMe(checked);
        }

        let checkLogin = () => {
            this.props.checkLogin();
        }

        let logOut = () => {
            this.props.logOut();
        }

        let updateTextForLoginField = (text) => {
            this.props.updateTextForLoginField(text);
        }

        let updateLocalState = (e) => {
            let newTextOfTheTask = e.target.value;
            this.props.updateTextOfTheTask(newTextOfTheTask)
        }


        let addToListTask = () => {
            this.props.addTask();
            setTimeout(() => this.props.updateLocalStorage(), 0);
        }


        let getTaskDone = (taskId) => {
            this.props.getTaskDone(taskId);
            setTimeout(() => this.props.updateLocalStorage(), 0);
        }


        let deleteThisTask = (taskId) => {
            this.props.deleteTask(taskId);
            setTimeout(() => this.props.updateLocalStorage(), 0);
        }

        let updateTextOfTheFocusedTask = (text) => {
            this.props.updateTextOfTheFocusedTask(text);
        }

        let getTaskFocusOn = (taskId) => {
            this.props.getTaskFocusOn(taskId);
        }

        let setTextOfTheFocusedTask = (text) => {
            this.props.setTextOfTheFocusedTask(text);
            setTimeout(() => this.props.updateLocalStorage(), 0);
        }

        let getTaskFocusOff = (taskId) => {
            this.props.getTaskFocusOff(taskId);
            setTimeout(() => this.props.updateLocalStorage(), 0);
        }

        let activeTasks = this.props.tasks.filter(task => !task.completed);

        let completedTasks = this.props.tasks.filter(task => task.completed);

        let allTasks = [...activeTasks, ...completedTasks];

        let myList = allTasks.map(task => {

            if(task.message == false){
                return <div>There are no available tasks</div>
            }

            return <div key={task.id}>
                <span><SimpleTask message={task.message}
                                  textOfTheFocusedTask={this.props.textOfTheFocusedTask}
                                  getTaskDone={getTaskDone}
                                  deleteThisTask={deleteThisTask}
                                  taskId={task.id}
                                  isTaskDone={task.completed}
                                  isFocused={task.isFocused}
                                  updateTextOfTheFocusedTask={updateTextOfTheFocusedTask}
                                  getTaskFocusOn={getTaskFocusOn}
                                  getTaskFocusOff={getTaskFocusOff}
                                  setTextOfTheFocusedTask={setTextOfTheFocusedTask}/></span>
            </div>
        })

        if (localStorage.getItem('rememberMe') === 'false' && !this.props.isAuth) {
            return <LoginForm checkLogin={checkLogin}
                              updateTextForLoginField={updateTextForLoginField}
                              fieldForLogin={this.props.fieldForLogin}
                              setRememberMe={setRememberMe}
                              isAuth={this.props.isAuth}/>
        }



        return <div>
            <span> <input onChange={updateLocalState} value={this.props.textOfTheTask} type="text"/></span>
            <span> <button onClick={addToListTask}>Add Task </button></span>
            <span> <button onClick={logOut}>Logout </button></span>
            <span> <button onClick={clearAllTasks}>Clear All Tasks </button></span>
            <div className={style.taskTable}> {myList} </div>
        </div>

    }
}


const mapStateToProps = (state) => {
    return {
        tasks: state.toDoList.tasks,
        textOfTheTask: state.toDoList.textOfTheTask,
        textOfTheFocusedTask: state.toDoList.textOfTheFocusedTask,
        isAuth: state.toDoList.isAuth,
        updateLocalStorage: state.toDoList.updateLocalStorage,
        login: state.toDoList.login,
        rememberMe: state.toDoList.rememberMe,
        fieldForLogin: state.toDoList.fieldForLogin,
        idOfTheTask: state.toDoList.idOfTheTask
    }
}

export default connect(mapStateToProps,
    {
        clearAll,
        setRememberMe,
        logOut,
        checkLogin,
        updateTextForLoginField,
        downloadTasks,
        addTask,
        updateTextOfTheTask,
        updateTextOfTheFocusedTask,
        deleteTask,
        getTaskDone,
        getTaskFocusOn,
        setTextOfTheFocusedTask,
        getTaskFocusOff
    })(ToDoList);
