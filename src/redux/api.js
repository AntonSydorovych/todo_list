export const storageAPI = {

    removeTasks: () => {
        return localStorage.removeItem('tasks');
    },

    removeId: () => {
        return localStorage.removeItem('taskId');
    },

    setTasks: (tasks) => {
        return localStorage.setItem('tasks', JSON.stringify(tasks));
    },

    setTaskId: (taskId) => {
        return localStorage.setItem('nextTaskId', taskId);
    },

    getTasks: () => {
        return JSON.parse(localStorage.getItem('tasks'));
    },

    getId: () => {
        return localStorage.getItem('nextTaskId');
    },

    setRememberMe: (rememberMe) => {
        return localStorage.setItem('rememberMe', rememberMe);
    },

    getRememberMe: () => {
        return localStorage.getItem('rememberMe');
    },

    clear: () => {
        setTimeout(() => localStorage.removeItem('tasks'), 0 )
        setTimeout(() => localStorage.setItem('nextTaskId', '0'), 0 )

    }
}