
// this module handles all interaction with local storage
import  Project from './projects';

// saves a project to local storage
export function saveProject(key, project) {
    const json = JSON.stringify(project);
    localStorage.setItem(key, json);
}

// load project from local storage based on key
export function loadProject(key) {
    const project = JSONtoProject(localStorage.getItem(key));
    return project;
}

// loads all projects from local storage
export function loadAllProjects() {
    let projects = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const project = JSONtoProject(localStorage.getItem(key));
        projects.push(project);
    }
    return projects;
}

// saves a task to project json
export function saveTask(projectid, task) {
    const project = JSONtoProject(localStorage.getItem(projectid));
    project.tasks.push(task);
    saveProject(projectid, project);
}

//load all tasks from a project
export function loadAllTasks(project) {
    let tasks = [];
    for (let i = 0; i < project.tasks.length; i++) {
        const task = project.tasks[i];
        tasks.push(task);
    }
    return tasks;
}


// removes a project from local storage
export function removeProject(key) {
    localStorage.removeItem(key);
}

/// function to create a project object based from JSON data.
export function JSONtoProject(jsonData) { 
    const data = JSON.parse(jsonData);
    let project = new Project(data.id, data.name);
    project.tasks = data.tasks;
    return project;
}

