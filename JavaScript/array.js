// array.js
//Array von dem alle anderen dateien sich ihre infos holen

//const {updateDatabase, updateTasksDatabase} = require("../db.js");

let globalTasks = [
  {
    progress: "todo",
    category: "Technical Task",
    title: "Button Design",
    description: "Design all Buttons in green",
    date: "11.06.2024",
    openSubtasks: ["testa", "testb"],
    closedSubtasks: ["test3", "test4aaa"],
    priority: "low",
    assigedToId: ["1", "2", "4"],
  },
  {
    progress: "inProgress",
    category: "Technical Task",
    title: "Clean Code",
    description: "First the analysis and design, then the implementation.",
    date: "01.10.2002",
    openSubtasks: ["test1", "test2", "test1", "test2", "test1"],
    closedSubtasks: ["test3", "test4"],
    priority: "urgent",
    assigedToId: ["1", "2", "3", "6", "5"],
  },
];

let globalContacts = [
  {
    id: "0",
    firstName: "Joost",
    lastName: "Heidrich",
    initials: "JH",
    color: "#FF5733",
    email: "joost.heidrich@example.com",
    phone: "+49 151 1234560",
  },
  {
    id: "1",
    firstName: "Michelle",
    lastName: "Reimers",
    initials: "MR",
    color: "#FFC0CA",
    email: "michelle.reimers@example.com",
    phone: "+49 151 1234561",
  },
  {
    id: "2",
    firstName: "Lena",
    lastName: "Schmidt",
    initials: "LS",
    color: "#33FF57",
    email: "lena.schmidt@example.com",
    phone: "+49 151 1234562",
  },
  {
    id: "3",
    firstName: "Maximilian",
    lastName: "Bauer",
    initials: "MB",
    color: "#3357FF",
    email: "maximilian.bauer@example.com",
    phone: "+49 151 1234563",
  },
  {
    id: "5",
    firstName: "Lucas",
    lastName: "Fischer",
    initials: "LF",
    color: "#FFFF33",
    email: "lucas.fischer@example.com",
    phone: "+49 151 1234564",
  },
  {
    id: "4",
    firstName: "Hannah",
    lastName: "Weber",
    initials: "HW",
    color: "#FF33A8",
    email: "hannah.weber@example.com",
    phone: "+49 151 1234565",
  },
  {
    id: "6",
    firstName: "Mia",
    lastName: "Müller",
    initials: "MM",
    color: "#33FFF6",
    email: "mia.mueller@example.com",
    phone: "+49 151 1234566",
  },
  {
    id: "7",
    firstName: "Finn",
    lastName: "Wagner",
    initials: "FW",
    color: "#9B33FF",
    email: "finn.wagner@example.com",
    phone: "+49 151 1234567",
  },
  {
    id: "8",
    firstName: "Sophie",
    lastName: "Schneider",
    initials: "SS",
    color: "#FF8C33",
    email: "sophie.schneider@example.com",
    phone: "+49 151 1234568",
  },
  {
    id: "9",
    firstName: "Paul",
    lastName: "Neumann",
    initials: "PN",
    color: "#33FF8C",
    email: "paul.neumann@example.com",
    phone: "+49 151 1234569",
  },
  {
    id: "10",
    firstName: "Emma",
    lastName: "Hoffmann",
    initials: "EH",
    color: "#FF3333",
    email: "emma.hoffmann@example.com",
    phone: "+49 151 1234570",
  },
  {
    id: "11",
    firstName: "Jonas",
    lastName: "Koch",
    initials: "JK",
    color: "#33A8FF",
    email: "jonas.koch@example.com",
    phone: "+49 151 1234571",
  },
];

let GlobalLastId = 11;



// Set up MutationObserver for contacts
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

module.exports={
  globalTasks,
  globalContacts
}


