import './styles.css';

// module imports
import  Project from './modules/projects';
import { saveProject, saveTask } from './modules/fileStorage';
import { addProjectElement, addTaskElement, displayProject, loadProjectElements, loadTaskElements } from './modules/ui';
import { v4 as uuidv4 } from 'uuid'; 



loadProjectElements(); // load all projects from local storage

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

const modal = document.getElementById('task-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPriority = document.getElementById('modal-priority');
const modalDueDate = document.getElementById('modal-duedate');
const closeButton = modal.querySelector('.close');

document.getElementById('tasks').addEventListener('click', (e) => {
    if (e.target.classList.contains('modalbutton')) {
        const taskelement = e.target.closest('.task'); // get closest task element
    
        modalTitle.textContent = taskelement.dataset.tasktitle;
        modalDescription.textContent = `Description: ${taskelement.dataset.taskdescription}`;
        modalPriority.textContent = `Priority: ${taskelement.dataset.taskpriority}`;
        modalDueDate.textContent = `Due Date: ${taskelement.dataset.taskduedate}`;

        modal.style.display = 'block'; // show modal
    }
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});
