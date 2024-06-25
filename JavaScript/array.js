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


module.exports={
  globalTasks,
  globalContacts
}


