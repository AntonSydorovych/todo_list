import {actionTypes} from "./myActionTypes";
import {storageAPI} from './api';


let initialState = {
    tasks: [],
    textOfTheTask: '',
    textOfTheFocusedTask: '',
    idOfTheTask: 0,
    sayHi: true,
    login: '12345',
    fieldForLogin: '',
    rememberMe: false,
    isAuth: false,

    updateLocalStorage() {
 //       console.log('THIS in initial state : ', this);
       setTimeout(()=>storageAPI.removeTasks(), 1000);
       setTimeout(()=>storageAPI.removeId(), 1200);
       setTimeout(()=>storageAPI.setTasks(this.tasks), 1300);
       setTimeout(()=>storageAPI.setTaskId(this.idOfTheTask), 1400);
    }
};


export let toDoReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.DOWNLOAD_TASKS_FROM_LOCAL_STORAGE:
            let downloadedTasks = storageAPI.getTasks() || [];

            let downloadedId = storageAPI.getId();

            return {
                    ...state,
                    tasks: [...downloadedTasks],
                    idOfTheTask: downloadedId
            }
        case actionTypes.ADD:
            return {
                ...state,
                tasks: [...state.tasks, {
                    id: state.idOfTheTask,
                    message: state.textOfTheTask,
                    completed: false
                }],
                textOfTheTask: '',
                idOfTheTask: + state.idOfTheTask + 1
            }

        case actionTypes.UPDATE_TEXT_OF_THE_TASK:
            return {
                ...state,
                textOfTheTask: action.taskMessage
            }
        case actionTypes.UPDATE_TEXT_OF_THE_FOCUSED_TASK:
            return {
                ...state,
                textOfTheFocusedTask: action.focusedTaskMessage
            }

        case actionTypes.DELETE:
            return {
                ...state,
                tasks: [...state.tasks].filter(task => task.id !== action.taskId)
            }

        case actionTypes.GET_TASK_DONE:
            return {
                ...state,
                tasks: [...state.tasks].map(task => {
                    if (task.id === action.taskId) {
                        return {
                            ...task,
                            completed: true
                        }
                    } else return task

                })
            }

        case actionTypes.SET_FOCUS_ON:
            return {
                ...state,
                tasks: [...state.tasks].map(task => {
                    if (task.id === action.taskId) {
                        return {
                            ...task,
                            isFocused: true
                        }
                    } else return task

                })
            }

        case actionTypes.SET_TEXT_OF_THE_FOCUSED_TASK:
            return {
                ...state,
                textOfTheFocusedTask: action.text
            }

        case actionTypes.SET_FOCUS_OFF:
            return {
                ...state,
                tasks: [...state.tasks].map(task => {
                    if (task.id === action.taskId) {
                        return {
                            ...task,
                            message: state.textOfTheFocusedTask,
                            isFocused: false
                        }
                    } else return task

                }),

                textOfTheFocusedTask: ''
            }

        case actionTypes.CHECK_LOGIN:
            if (state.fieldForLogin === state.login) {
                localStorage.setItem('rememberMe', state.rememberMe);
                return {
                    ...state,
                    isAuth: true
                }
            }

        case actionTypes.UPDATE_TEXT_OF_LOGIN_FIELD:
            return {
                ...state,
                fieldForLogin: action.text
            }

        case actionTypes.LOGOUT:
            localStorage.setItem('rememberMe', 'false');
                return {
                    ...state,
                    isAuth: false,
                    fieldForLogin: '',
                    rememberMe: false
                }

        case actionTypes.SET_REMEMBER_ME:
            return {
                ...state,
                rememberMe: action.rememberMe
            }

        case actionTypes.CLEAR_ALL:
            storageAPI.clear();

            return {
                ...state
            }

        default:
            return state;
    }
};

export const clearAll = () => {

    return (dispatch) => {
        setTimeout(() => (dispatch({type: actionTypes.CLEAR_ALL})), 100);
        setTimeout(() => (dispatch({type: actionTypes.DOWNLOAD_TASKS_FROM_LOCAL_STORAGE})), 300);

    }
}


export const setRememberMe = (rememberMe) => {
    return {
        type: actionTypes.SET_REMEMBER_ME,
        rememberMe
    }
}

export const logOut = () => {
    return {
        type: actionTypes.LOGOUT
    }
}


export const updateTextForLoginField = (text) => {
    return {
        type: actionTypes.UPDATE_TEXT_OF_LOGIN_FIELD,
        text
    }
}

export const checkLogin = () => {
    return {
        type: actionTypes.CHECK_LOGIN
    }
}

export const downloadTasks = () => {
    return {
        type: actionTypes.DOWNLOAD_TASKS_FROM_LOCAL_STORAGE
    }
}

export const updateTextOfTheTask = (taskMessage) => {
    return {
        type: actionTypes.UPDATE_TEXT_OF_THE_TASK,
        taskMessage
    }
}


export const updateTextOfTheFocusedTask = (focusedTaskMessage) => {
    return {
        type: actionTypes.UPDATE_TEXT_OF_THE_FOCUSED_TASK,
        focusedTaskMessage
    }
}


export const addTask = () => {
    return {
        type: actionTypes.ADD
    }
}


export const getTaskDone = (taskId) => {
    return {
        type: actionTypes.GET_TASK_DONE,
        taskId
    }
}


export const deleteTask = (taskId) => {
    return {
        type: actionTypes.DELETE,
        taskId
    }
}


export const getTaskFocusOn = (taskId) => {
    return {
        type: actionTypes.SET_FOCUS_ON,
        taskId
    }
}


export const getTaskFocusOff = (taskId) => {
    return {
        type: actionTypes.SET_FOCUS_OFF,
        taskId
    }
}

export const setTextOfTheFocusedTask = (text) => {
    return {
        type: actionTypes.SET_TEXT_OF_THE_FOCUSED_TASK,
        text
    }
}

