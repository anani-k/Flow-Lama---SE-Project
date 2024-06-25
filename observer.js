
// Set up MutationObserver for contacts
import {updateDatabase, updateTasksDatabase} from "./db";

const contactsObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
            // Extract contacts from DOM and update database
            const updatedContacts = Array.from(document.querySelectorAll('.contact')).map(contactElement => ({
                id: contactElement.getAttribute('data-id'),
                firstName: contactElement.querySelector('p:nth-child(1) span').textContent,
                lastName: contactElement.querySelector('p:nth-child(2) span').textContent,
                initials: contactElement.querySelector('p:nth-child(3) span').textContent,
                color: contactElement.querySelector('p:nth-child(4) span').textContent,
                email: contactElement.querySelector('p:nth-child(5) span').textContent,
                phone: contactElement.querySelector('p:nth-child(6) span').textContent,
            }));
            updateDatabase(updatedContacts);
        }
    });
});

// Set up MutationObserver for tasks
const tasksObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
            // Extract tasks from DOM and update database
            const updatedTasks = Array.from(document.querySelectorAll('.task')).map(taskElement => ({
                id: taskElement.getAttribute('data-id'),
                task_title: taskElement.querySelector('p:nth-child(1) span').textContent,
                description: taskElement.querySelector('p:nth-child(2) span').textContent,
                due_date: taskElement.querySelector('p:nth-child(3) span').textContent,
                status: taskElement.querySelector('p:nth-child(4) span').textContent,
                assignee_id: 1, // platzhalter
                project_id: 1  // platzhalter
            }));
            updateTasksDatabase(updatedTasks);
        }
    });
});


// Observe changes in the contacts container
const contactsContainer = document.getElementById('contacts');
contactsObserver.observe(contactsContainer, { childList: true, subtree: true });

// Observe changes in the tasks container
const tasksContainer = document.getElementById('tasks');
tasksObserver.observe(tasksContainer, { childList: true, subtree: true });

globalContacts.push(
    {
        id: "12",
        firstName: "New",
        lastName: "User",
        initials: "NU",
        color: "#000000",
        email: "new.user@example.com",
        phone: "+49 151 1234572"
    }
);

globalTasks.push({
        id: "1",
        task_title: "Update Documentation",
        description: "Update the API documentation",
        due_date: "24.06.2024",
        status: "inProgress",
        assignee_id: 3,
        project_id: 2
    }
);