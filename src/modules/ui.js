
// module imports
import  Project from './projects';

import { v4 as uuidv4 } from 'uuid'; 

import { saveProject, loadAllProjects} from './fileStorage';

// add event listener to create project button
document.getElementById('create-project').addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON' && e.target.type === 'submit') {
        e.preventDefault(); //prevents form resubmission
        const projectname = document.getElementById('projectname').value.trim();

        //check if projectname is empty
        if(projectname != '') {
            const projectid = uuidv4(); 
            const project = new Project(projectid, projectname); // create project object
            console.log('Project Data:', project);
            addProjectElement(project); // add project to the DOM
            saveProject(projectid, project) // save project to local storage
        }
    }
});



// runs and looks up on local storage and loads all projects
export function loadProjectElements() {
    const projects = loadAllProjects();
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        addProjectElement(project);
    }
}

// add the project to the DOM, save as a local file using fileStorage.js save project
 function addProjectElement(project) {
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


// create a function that when a project is clicked, display the project name in the on the screen and the add task button.
function displayProject(project) {
    
}

