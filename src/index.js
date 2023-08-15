import './styles.css';

// module imports
import  Project from './modules/projects';
import { saveProject } from './modules/fileStorage';
import { addProjectElement, loadProjectElements } from './modules/ui';
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
        console.log(project.id);
    }
});
