import React from 'react';
import style from './SimpleTask.module.css';

export const SimpleTask = (props) => {

    let getTaskDone = () => {
        props.getTaskDone(props.taskId);
    }

    let deleteThisTask = () => {
        props.deleteThisTask(props.taskId);
    }

    let editThisTask = () => {
        props.setTextOfTheFocusedTask(props.message);
        props.getTaskFocusOn(props.taskId);
    }

    let saveEditedTask = () => {
        props.getTaskFocusOff(props.taskId);
    }

    let updateTextOfTheFocusedTask = (e) => {
        let text = e.target.value;
        props.updateTextOfTheFocusedTask(text);
    }

    return <div className={style.simpleTask}>
        {props.isFocused ?
            <input className={`${style.taskMessage} + ${props.isTaskDone ? style.taskIsDone : ''}`}
                  onChange={updateTextOfTheFocusedTask} onBlur={saveEditedTask}
                   autoFocus={true} value={props.textOfTheFocusedTask}/> :
            <div
                className={`${style.taskMessage} + ${props.isTaskDone ? style.taskIsDone : ''}`}>
                {props.message}  </div>}


        {/*<Button onClick={editThisTask} variant="outlined" color="secondary">
            Edit Task
        </Button>

        <Button onClick={getTaskDone} variant="outlined" color="secondary">
            Done
        </Button>

        <Button onClick={deleteThisTask} variant="outlined" color="secondary">
            Delete Task
        </Button>*/}

        <button onClick={editThisTask} >Edit Task</button>

        <button onClick={getTaskDone} >Done</button>

        <button onClick={deleteThisTask} >Delete Task</button>
        <hr/>
    </div>

}