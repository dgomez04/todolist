

// project class
export default class Project {
    //constructor for Project class
    constructor(id, name) {
        this.id = id;
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

