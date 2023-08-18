import './styles.css';

// module imports
import  Project from './modules/projects';
import { saveProject, saveTask } from './modules/fileStorage';
import { addProjectElement, addTaskElement, displayProject, loadProjectElements, loadTaskElements } from './modules/ui';
import { v4 as uuidv4 } from 'uuid'; 



loadProjectElements(); // load all projects from local storage
