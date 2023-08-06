
// module imports
import  Project from './projects';

// add event listener to create project button
document.getElementById('create-project').addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON' && e.target.type === 'submit') {
        e.preventDefault(); //prevents form resubmission
        const projectname = document.getElementById('projectname').value.trim();

        //check if projectname is empty
        if(projectname != '') {
            createProject(new Project(projectname));    
        }
    }
});

// add the project to the DOM, save as a local file using fileStorage.js save project
 function createProject(project) {
    const projectList = document.getElementById('projects');
    const projectElement = document.createElement('span');
    projectElement.classList.add('project');

    projectElement.innerHTML = `
    <span class="project"><img class="projectimage" src="./img/project.svg" alt=""> 
    <a href="#">${project.name}</a></span>
    `
    projectList.appendChild(projectElement);

    // TODO: save project to local storage

}


