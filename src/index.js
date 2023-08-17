import './styles.css';

// module imports
import  Project from './modules/projects';
import { saveProject, loadProject, saveTask } from './modules/fileStorage';
import { addProjectElement, displayProject, loadProjectElements } from './modules/ui';
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
    }
});

// wip : creating a task and saving it to local storage
document.getElementById('create-task').addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON' && e.target.type === 'submit') {
        e.preventDefault();
        const tasktitle = document.getElementById('tasktitle').value.trim();
        const taskdescription = document.getElementById('taskdescription').value.trim();
        const taskpriority = document.getElementById('taskpriority').value.trim();
        const taskdate = document.getElementById('taskdate').value.trim();
        const taskproject = document.getElementById('taskproject').value.trim();

        // to do: check that taskproject.value is not empty in order to save task, else it will give errors

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
        }
    }
});