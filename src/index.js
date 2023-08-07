import './styles.css';

// module imports
import  Project from './modules/projects';
import { saveProject } from './modules/fileStorage';
import { loadProjectElements } from './modules/ui';



loadProjectElements();

// add event listener to create project button
document.getElementById('create-project').addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON' && e.target.type === 'submit') {
        e.preventDefault(); //prevents form resubmission
        const projectname = document.getElementById('projectname').value.trim();

        //check if projectname is empty
        if(projectname != '') {
            const project = new Project(projectname); // create project object

            console.log('Project Data:', project);
            saveProject(project.name, project); // save project to local storage
        }
    }
});

