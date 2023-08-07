
// module imports
import  Project from './projects';

import { saveProject, loadAllProjects} from './fileStorage';

// add event listener to create project button
document.getElementById('create-project').addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON' && e.target.type === 'submit') {
        e.preventDefault(); //prevents form resubmission
        const projectname = document.getElementById('projectname').value.trim();

        //check if projectname is empty
        if(projectname != '') {
            const project = new Project(projectname); // create project object
            addProjectElement(project); // adds project to dom
            saveProject(project.name, project); // save project to local storage
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
    projectElement.classList.add('project');

    projectElement.innerHTML = `
    <span class="project"><img class="projectimage" src="./img/project.svg" alt=""> 
    <a href="#">${project.name}</a></span>
    `
    projectList.appendChild(projectElement);
}


