
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



// TO DO: create a function that when a project is clicked, display the project name in the on the screen and the add task button.
function displayProject(project) {
    
}

