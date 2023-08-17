
// module imports
import { loadAllProjects} from './fileStorage';

// runs and looks up on local storage and loads all projects
export function loadProjectElements() {
    const projects = loadAllProjects();
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        addProjectElement(project);
    }
}

// add the project to the DOM, save as a local file using fileStorage.js save project
 export function addProjectElement(project) {
    const projectList = document.getElementById('projects');
    const projectElement = document.createElement('span');

    projectElement.setAttribute('id', project.id);
    projectElement.setAttribute('name', project.name);
    projectElement.classList.add('project');

    projectElement.innerHTML = `
    <img class="projectimage" src="./img/project.svg" alt=""> 
    <a href="#">${project.name}</a>
    `
    projectList.appendChild(projectElement);
}

// make sure that both the project and its tasks are displayed in the DOM
export function displayProject(projectname, projectid) {
    const projectTitle = document.getElementById('project-title');
    projectTitle.textContent = projectname;
    console.log("Displaying: " + projectname)

    // save project id as an input hidden in the create-task forms
    const taskproject = document.getElementById('taskproject');
    taskproject.value = projectid;
    console.log("Task project: " + projectid);

}

// function to add a task based on the create-task form
export function addTaskElement() {
    // get the form values
    // create a task object
    // add the task to the project
    // save the project
    // add the task to the DOM

    const tasktitle = document.getElementById('tasktitle').value;
    const taskdescription = document.getElementById('taskdescription').value;
    const taskpriority = document.getElementById('taskpriority').value;
    const taskdate = document.getElementById('taskdate').value;

    const task = new Task(tasktitle, taskdescription, taskpriority, taskdate);
}

