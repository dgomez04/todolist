
export default class Task {

    // a class should have a title, description, dueDate and priority
    constructor(title, description, priority, dueDate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
    }

    editName(name) {
        this.title = name;
    }

    editDescription(description) {
        this.description = description;
    }

    editPriority(priority) {
        this.priority = priority;
    }

    editDueDate(dueDate) {
        this.dueDate = dueDate;
    }
}