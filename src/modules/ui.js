
// module imports
import { loadAllProjects, loadProject, removeTask} from './fileStorage';

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

// load task elements from local storage based on the JSON key
export function loadTaskElements(projectid) {
    const project = loadProject(projectid);
    if(project) {
        const tasks = project.tasks;
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            addTaskElement(task);
        }
    }
}


// add task to DOM 
export function addTaskElement(task) {
    const taskList = document.getElementById('tasks');
    const taskElement = document.createElement('span');

    taskElement.setAttribute('id', task.id);
    taskElement.setAttribute('name', task.title);
    taskElement.setAttribute('data-tasktitle', task.title);
    taskElement.setAttribute('data-taskduedate', task.dueDate); 
    taskElement.setAttribute('data-taskdescription', task.description);
    taskElement.setAttribute('data-taskpriority', task.priority); 
    taskElement.classList.add('task');
    taskElement.innerHTML = `
    <h3><a href=# class="modalbutton">${task.title}</a></h3>
    <p>${task.dueDate}</p>
    <button class="remove-task">Remove</button>
    `
    taskList.appendChild(taskElement);
}

//eventListener to remove task from DOM and local storage
document.getElementById('tasks').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-task')) {
        const task = e.target.closest('.task'); // get closest task element
        const taskid = task.getAttribute('id');
        const taskproject = document.getElementById('taskproject').value.trim();
        removeTask(taskproject, taskid); // remove task from local storage
        task.remove(); // remove task from DOM
    }
});
