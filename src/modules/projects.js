
// project class
export default class Project {
    //constructor for Project class
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }
    
    //add tasks to project
    addTask(task) {
        this.tasks.push(task);
    }

    // get tasks from project
    getTasks() {
        return this.tasks;
    }
    
    //remove tasks from project
    removeTask(task) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
    }
}

