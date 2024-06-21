// array.js
// Array, von dem alle anderen Dateien sich ihre Infos holen

const { createTask, deleteTask, getTaskIdByTitle, addGlobalContact, deleteGlobalContactById,
  deleteGlobalContactFromDbById, getTaskById, getGlobalContactFromDbById, updateGlobalContactById, updateTaskStatusInDb
} = require("../db");

let globalTasks = [];
let globalContacts = [];

var globalTaskLastId=1;
var globalContactsLastId=1;

// Funktion zum Benachrichtigen der Datenbank über Änderungen
const notifyDatabase = (changeType, entityType, data) => {
  //console.log(`Change detected: ${changeType} for ${entityType}`, data);

  if (entityType === 'task') {
    if (changeType === 'add') {
      createTask(data.title, data.description, data.date, data.progress, data.assignee_id, data.project_id);
    } else if (changeType === 'update') {
       updateTaskStatusInDb(data.id, data.progress);
    } else if (changeType === 'delete') {

      deleteTask(data.task_id);

    }
  } else if (entityType === 'contact') {
    if (changeType === 'add') {
      addGlobalContact(data.firstName, data.lastName, data.initials, data.color, data.email, data.phone);
    } else if (changeType === 'update') {
       updateGlobalContactById(data.id,data.firstName,data.lastName,data.initials,data.email,data.phone);
    } else if (changeType === 'delete') {
      console.log(11222333,data);
      deleteGlobalContactFromDbById(data.global_contact_id);
      //console.log(globalContacts);
    }
  }
};

/*const arrayHandler = (entityType) => ({
  set(target, property, value, receiver) {
    const changeType = property in target ? 'update' : 'add';
    if (target[property] !== value) {
      target[property] = value;
console.log(123435123)
    }
    return true;
  },
  deleteProperty(target, property) {
    if (property in target) {
      const value = target[property];
      //console.log(111222,entityType,value);
      //notifyDatabase('delete', entityType, value); // notify before deletion
      delete target[property];
    }
    return true;
  }
});


// Erstellen der Proxies
//globalTasks = new Proxy(globalTasks, arrayHandler('task'));
//globalContacts = new Proxy(globalContacts, arrayHandler('contact'));
*/
//Allg Funktionen




// Funktionen für Kontakte
const addContact = (firstName, lastName, initials, color, email, phone) => {
  // Erstelle das Kontaktobjekt
  const contact = {
    id: globalContactsLastId,
    firstName,
    lastName,
    initials,
    color,
    email,
    phone,
  };
  notifyDatabase('add', 'contact', contact);
  globalContacts.push(contact);
  globalContactsLastId++;
};

const exampleAddContacts = () => {
  addContact("Joost", "Heidrich", "JH", "#FF5733", "joost.heidrich@example.com", "+49 151 1234560");
  addContact("Michelle", "Reimers", "MR", "#FFC0CA", "michelle.reimers@example.com", "+49 151 1234561");
  addContact("Lena", "Schmidt", "LS", "#33FF57", "lena.schmidt@example.com", "+49 151 1234562");
  addContact("Maximilian", "Bauer", "MB", "#3357FF", "maximilian.bauer@example.com", "+49 151 1234563");
  addContact("Lucas", "Fischer", "LF", "#FFFF33", "lucas.fischer@example.com", "+49 151 1234564");
  addContact("Hannah", "Weber", "HW", "#FF33A8", "hannah.weber@example.com", "+49 151 1234565");
  addContact("Mia", "Müller", "MM", "#33FFF6", "mia.mueller@example.com", "+49 151 1234566");
  addContact("Finn", "Wagner", "FW", "#9B33FF", "finn.wagner@example.com", "+49 151 1234567");
  //console.log(globalContacts);
};

const updateContactById = (id, field, value) => {

  const contactIndex = globalContacts.findIndex(contact => contact.id === id);

  if (contactIndex !== -1) {

    const contact = globalContacts[contactIndex];

    if (contact.hasOwnProperty(field)) {
      contact[field] = value;

      notifyDatabase('update', 'contact', contact);

      globalContacts[contactIndex] = contact;

      return `Contact with id ${id} successfully updated.`;
    } else {

      return `Field "${field}" does not exist on contact.`;
    }
  } else {
    return `Contact with id ${id} not found.`;
  }
};

const exampleUpdateContactById=()=>{
  updateContactById(1,"firstName","Lion");
  updateContactById(1234,"firstName","klaus");
  updateContactById(1,"thisFieldDoesNotExist");
}

/*const updateContactIds = () => {
  globalContacts.forEach((contact, index) => {
    contact.id = index + 1;
  });
};*/

function isContactIdInArray(id) {
  const foundContact = globalContacts.find(contact => contact.id === id);
  return foundContact !== undefined;
}

function getContactIndexById(id) {
  return globalContacts.findIndex(contact => contact.id === id);
}



const deleteGlobalContactsById = (id) => {
if(isContactIdInArray(id)){
  notifyDatabase('delete', 'contact', getGlobalContactFromDbById(id)); // Notify after getting the correct contact
  globalContacts.splice(getContactIndexById(id), 1); // Entfernt ausschließlich den Kontakt mit der angegebenen ID

  console.log(`Contact with ID ${id} deleted.`);}
else{
  console.log('Id ${id} not Found');
  }

};


const exampleDeleteContactById3 = () => {
  deleteGlobalContactsById(3);

};




// Funktionen für Tasks
const addTask = (progress, category, title, description, date, openSubtasks, closedSubtasks, priority, assigedToId) => {
  // Erstelle das Task-Objekt
  const task = {
    id: globalTaskLastId,
    progress,
    category,
    title,
    description,
    date,
    openSubtasks,
    closedSubtasks,
    priority,
    assigedToId,
  };
  notifyDatabase('add', 'task', task);
  globalTasks.push(task);
  globalTaskLastId++;

};


const exampleAddTasks = () => {
  addTask(
      "todo",
      "Technical Task",
      "Button Design",
      "Design all Buttons in green",
      "11.06.2024",
      ["testa", "testb"],
      ["test3", "test4aaa"],
      "low",
      ["1", "2", "4"]
  );

  addTask(
      "inProgress",
      "Technical Task",
      "Clean Code",
      "First the analysis and design, then the implementation.",
      "01.10.2002",
      ["test1", "test2", "test1", "test2", "test1"],
      ["test3", "test4"],
      "urgent",
      ["1", "2", "3", "6", "5"]
  );

  addTask(
      "inProgress",
      "Technical Task",
      "sleep",
      "dont forget to sleep",
      "01.10.2002",
      ["test1", "test2", "test1", "test2", "test1"],
      ["test3", "test4"],
      "urgent",
      ["1", "2", "3", "6", "5"]
  );

  // console.log(globalTasks);
};

const updateTaskStatus = (id, value) => {
  if (isTaskIdInArray(id)) {
    const taskIndex = globalTasks.findIndex(contact => contact.id === id);

    const task = globalTasks[taskIndex];
    task.progress = value;

      notifyDatabase('update', 'task', task);
      globalTasks[taskIndex] = task;
      return `Task with id ${id} successfully updated.`;

  } else {
    return `Task with id ${id} not found.`;
  }
};

const exampleUpdateTaskStatus=()=>{
  updateTaskStatus(3,"doneeee");
}

/*
const updateTaskIds = () => {
  globalTasks.forEach((task, index) => {
    task.id = index + 1;
  });
};
*/

function isTaskIdInArray(id) {
  const foundTask = globalTasks.find(contact => contact.id === id);
  return foundTask !== undefined;
}

function getTaskIndexById(id) {
  return globalTasks.findIndex(task => task.id === id);
}

const deleteTaskById = (id)=>{
if (isTaskIdInArray(id)){

  // Finde den Index des Elements mit dem gegebenen Titel
  const task = getTaskById(id)
  console.log("deleteTaskById:", id,getTaskIndexById(id));
  // Überprüfe, ob das Element im Array gefunden wurde

    notifyDatabase('delete','task',task);
    globalTasks.splice(getTaskIndexById(id), 1);

    console.log(`Task: "${id}" aus array gelöscht`);

    //test console array auswerfen
    //console.log("array nach dem löschen: ",globalTasks);

  } else {
    console.log(`Task with title "${id}" not found.`);
  }
};

const exampleDeleteTaskById1=()=>{
  deleteTaskById(1);
};

const deleteTaskByTitle = (title) => {
  // Finde den Index des Elements mit dem gegebenen Titel
  const index = getTaskIdByTitle(title);
  console.log("deleteTaskByTitle:", title, index);
  // Überprüfe, ob das Element im Array gefunden wurde
  if (index !== -1) {

    notifyDatabase('delete','task',getTaskById(getTaskIdByTitle(title)));
    globalTasks.splice(index-1, 1);

    console.log(`Task: "${title}" aus array gelöscht`);

    //test console array auswerfen
    //console.log("array nach dem löschen: ",globalTasks);

  } else {
    console.log(`Task with title "${title}" not found.`);
  }
};

const exampleDeleteTaskByTitle = () => {
  deleteTaskByTitle("Button Design");
  // console.log(globalTasks);
};

module.exports = {
  globalTasks,
  globalContacts,
  exampleAddContacts,
  exampleDeleteContactById3,
  exampleAddTasks,
  exampleDeleteTaskByTitle,
  addContact,
  addTask,
  deleteTaskByTitle,
  deleteGlobalContactsById,
  deleteTaskById,
  exampleDeleteTaskById1,
  isContactIdInArray,
  updateContactById,
  exampleUpdateContactById,
  exampleUpdateTaskStatus
};
