
// this module handles all interaction with local storage
import  Project from './projects';

// saves a project to local storage
export function saveProject(key, project) {
    localStorage.setItem(key, JSON.stringify(project));
}

// load project from local storage based on key
export function loadProject(projectid) {
    const jsonData = localStorage.getItem(projectid);
    if (jsonData) {
        return JSONtoProject(jsonData);
    }
    return null; // handle case where project doesn't exist
}

// loads all projects from local storage
export function loadAllProjects() {
    return Object.keys(localStorage).map(key => loadProject(key));
}


// removes a project from local storage
export function removeProject(key) {
    localStorage.removeItem(key);
}

// saves a task to project json
export function saveTask(projectid, task) {
    const project = loadProject(projectid);
    if(project) { // check if project exists
        project.addTask(task);
        saveProject(projectid, project);
    }
}

// removes a task from project json
export function removeTask(projectid, taskid) {
    const project = loadProject(projectid);
    if(project) { // check if project exists
        project.removeTask(taskid);
        saveProject(projectid, project);
    }
}


// create a project object based from JSON data.
export function JSONtoProject(jsonData) { 
    try {
        const data = JSON.parse(jsonData);
        const project = new Project(data.id, data.name);
        project.tasks = data.tasks;
        return project;
    } catch (error) { 
        console.error('Error parsing JSON data:', error);
        return null;
    }
}
