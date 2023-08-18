
// module imports
import  Project from './projects';
import { loadAllProjects, loadProject, removeTask, saveTask, saveProject} from './fileStorage';
import { v4 as uuidv4 } from 'uuid'; 


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
    <a class="project-text" href="#">${project.name}</a>
    `
    projectList.appendChild(projectElement);
}

// make sure that both the project and its tasks are displayed in the DOM
export function displayProject(projectname, projectid) {
    const projectTitle = document.getElementById('project-title');
    projectTitle.textContent = projectname;

    // save project id as an input hidden in the create-task forms
    const taskproject = document.getElementById('taskproject');
    taskproject.value = projectid;

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


/* EVENT LISTENERS ------ > */ 


// add event listener to create project button
document.getElementById('create-project').addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON' && e.target.type === 'submit') {
        e.preventDefault(); //prevents form resubmission
        const projectname = document.getElementById('projectname').value.trim();

        //check if projectname is empty
        if(projectname != '') {
            const projectid = uuidv4(); 
            const project = new Project(projectid, projectname); // create project object
            addProjectElement(project); // add project to the DOM
            saveProject(projectid, project) // save project to local storage
        }
    }
});

// eventlistener for project anchor elements
document.getElementById('projects').addEventListener('click', (e) => {
    if(e.target.tagName === 'A') {
        e.preventDefault();
        const project = e.target.parentElement;
        const projectname = project.getAttribute('name');
        const projectid = project.getAttribute('id');
        displayProject(projectname, projectid);

        // clear task elements before loading
        const taskList = document.getElementById('tasks');
        taskList.innerHTML = '';

        loadTaskElements(projectid); //load saved tasks from local storage
    }
});

// creating a task and saving it to local storage
document.getElementById('create-task').addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON' && e.target.type === 'submit') {
        e.preventDefault();
        const tasktitle = document.getElementById('tasktitle').value.trim();
        const taskdescription = document.getElementById('taskdescription').value.trim();
        const taskpriority = document.getElementById('taskpriority').value.trim();
        const taskdate = document.getElementById('taskdate').value.trim();
        const taskproject = document.getElementById('taskproject').value.trim();
        
        // check if taskname is empty
        if(tasktitle != '') {
            const taskid = uuidv4();
            const task = {
                id: taskid,
                title: tasktitle,
                description: taskdescription,
                priority: taskpriority,
                dueDate: taskdate
            }

            saveTask(taskproject, task); //save task on project json
            addTaskElement(task); // add task to DOM
        }
    }
});

//eventListener to remove task from DOM and local storage
document.getElementById('tasks').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-task')) {
        e.preventDefault(); //prevents form resubmission
        const task = e.target.closest('.task'); // get closest task element
        const taskid = task.getAttribute('id');
        const taskproject = document.getElementById('taskproject').value.trim();
        removeTask(taskproject, taskid); // remove task from local storage
        task.remove(); // remove task from DOM
    }
});

// task modal event listener
const modal = document.getElementById('task-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPriority = document.getElementById('modal-priority');
const modalDueDate = document.getElementById('modal-duedate');
const closeButton = modal.querySelector('.close');

document.getElementById('tasks').addEventListener('click', (e) => {
    if (e.target.classList.contains('modalbutton')) {
        e.preventDefault(); //prevents form resubmission
        const taskelement = e.target.closest('.task'); // get closest task element
    
        modalTitle.textContent = taskelement.dataset.tasktitle;
        modalDescription.textContent = `Description: ${taskelement.dataset.taskdescription}`;
        modalPriority.textContent = `Priority: ${taskelement.dataset.taskpriority}`;
        modalDueDate.textContent = `Due Date: ${taskelement.dataset.taskduedate}`;

        modal.style.display = 'block'; // show modal
    }
});

// close task modal event listener
closeButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevents form resubmission
    modal.style.display = 'none';
});


