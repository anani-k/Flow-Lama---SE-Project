let tasks = [{
    progress: 'done',
    category: 'Technical Task',
    title: 'ich liebe dich',
    description: 'JOOST',
    contacts: ['AS', 'S', 'M'],
    priority: 'low'
}, {
    progress: 'awaitFeedback',
    category: 'Technical Task',
    title: 'aaaaaaaaaaaaaaaaaaaaaaaaa',
    description: 'do some cleancode',
    contacts: ['AS', 'S', 'M'],
    priority: 'low'
}];

let subtasks = [];

let currentDraggedElement = false;

let todo = false;
let inProgress = false;
let awaitFeedback = false;
let done = false;

let activeButton = 'mediumButton';

function init() {
    this.generateCard();
}

function generateCard() {

    document.getElementById('todo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitFeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {

        logStatus(i);


        document.getElementById(tasks[i].progress).innerHTML += ` 
       <div draggable="true" class="cardContainer" ondragstart="startDraggin(${i})">
<div class="technicalTask">${tasks[i].category}</div>
<div>
    <div class="projectName">${tasks[i].title}</div>
    <div class="commentSection">${tasks[i].description} </div>
</div>
<div class="cardFooter">
    <div class="assignedUser">
        <div class="bc1">AS</div>
        <div class="bc2">S</div>
        <div class="bc3">M</div>
    </div>
    <div>Prio</div>
</div>

</div>`;
    }
    generatePlaceholder();
}

function generatePlaceholder() {
    if (todo == false) {
        generatePlaceholderHTML('todo')
    } if (inProgress == false) {
        generatePlaceholderHTML('inProgress')
    } if (awaitFeedback == false) {
        generatePlaceholderHTML('awaitFeedback')
    } if (done == false) {
        generatePlaceholderHTML('done')
    }


    resetStatus();
}

function generatePlaceholderHTML(status) {
    document.getElementById(status).innerHTML += `
    <div class="placeholder">No tasks in progress</div>
`;
}

function logStatus(i) {
    let content = tasks[i].progress;

    if (content == 'todo') {
        todo = true;
    } else if (content == 'inProgress') {
        inProgress = true;
    } else if (content == 'awaitFeedback') {
        awaitFeedback = true;
    } else if (content == 'done') {
        done = true;
    }

}

function resetStatus() {
    todo = false;
    inProgress = false;
    awaitFeedback = false;
    done = false;
}

function moveTo(id) {
    tasks[currentDraggedElement].progress = id;
    generateCard();
    hideAllHoverContainers();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function startDraggin(index) {
    currentDraggedElement = index;
    generateDropzone(index);
}

function generateDropzone(containerId) {
    let hoverMap = {
        "todo": ["InProgress"],
        "inProgress": ["ToDo", "AwaitFeedback"],
        "awaitFeedback": ["InProgress", "Done"],
        "done": ["AwaitFeedback"]
    };

    let id = tasks[containerId].progress;
    for (let i = 0; i < hoverMap[id].length; i++) {
        const element = hoverMap[id][i];
        document.getElementById(element).classList.remove('d-none');
    }
}

function hideAllHoverContainers() {
    const hoverContainers = ["ToDo", "InProgress", "AwaitFeedback", "Done"];
    for (let i = 0; i < hoverContainers.length; i++) {
        document.getElementById(hoverContainers[i]).classList.add('d-none');
    };
}


function closePopup() {
    document.getElementById('popupContainer').classList.add('d-none');
}

function openPopup() {
    document.getElementById('popupContainer').classList.remove('d-none');
}

function buttonSelect(id) {
    document.getElementById(activeButton).classList.remove(activeButton + "Active")
    activeButton = id;
    document.getElementById(id).classList.add(id + "Active");
}
//Assigned to
function toggleDropdownAssignedTo() {
    document.getElementById("assignedToDropdown").classList.toggle("show");
    document.getElementById("assignedToClosed").classList.toggle("d-none");
    document.getElementById("assignedToOpen").classList.toggle("d-none");
}

function selectOptionAssignedTo(option) {
    document.getElementById("assignedTo").value = option;
    document.getElementById("assignedToDropdown").classList.remove("show");
    document.getElementById("assignedToClosed").classList.remove("d-none");
    document.getElementById("assignedToOpen").classList.add("d-none");
}



//Category
// Umschalten der Anzeige des Dropdown-Menüs
function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById("categoryClosed").classList.toggle("d-none");
    document.getElementById("categoryOpen").classList.toggle("d-none");

}

// Funktion zum Setzen der ausgewählten Option
function selectOption(option) {
    document.getElementById("taskCategory").value = option;
    document.getElementById("myDropdown").classList.remove("show");
}

function subtaskFokus() {
    document.getElementById('subtaskPlusBtn').classList.add('d-none');
    document.getElementById('subtaskOptions').classList.remove('d-none');
}

function subtaskUnfokus() {
    let input = document.getElementById('addSubtaksInput').value;
    if (input.length < 1) {
        document.getElementById('subtaskPlusBtn').classList.remove('d-none');
        document.getElementById('subtaskOptions').classList.add('d-none');
    }
}

function clearSubtaksInput() {
    document.getElementById('addSubtaksInput').value = '';
    subtaskUnfokus();
}

function addSubtaksInput() {
    let content = document.getElementById('addSubtaksInput').value;
    document.getElementById('addSubtaksInput').value = '';
    subtasks.push(content);
    addSubTask();
}

function addSubTask() {
    document.getElementById('subTasks').innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const element = subtasks[i];

        document.getElementById('subTasks').innerHTML += `
    <div class="subTaskWrapper">
    <div class="subTaskDiv">
      <li>
        ${element}
      </li>
      <div class="trashbin" onclick="removeSubstask(${i})">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
      <path fill="#90CAF9" d="M41.5,13h-9c0-2.5-9-2.5-9,0h-9c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5h1v26.5c0,2.2,1.8,4,4,4h17	c2.2,0,4-1.8,4-4V16h1c0.8,0,1.5-0.7,1.5-1.5S42.3,13,41.5,13z"></path><path fill="none" stroke="#18193f" stroke-miterlimit="10" stroke-width="3" d="M19.5,11.5V10c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5v1.5"></path><line x1="8.5" x2="39.5" y1="11.5" y2="11.5" fill="none" stroke="#18193f" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"></line><line x1="36.5" x2="36.5" y1="23.5" y2="11.5" fill="none" stroke="#18193f" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"></line><path fill="none" stroke="#18193f" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M11.5,18.7v19.8c0,2.2,1.8,4,4,4h17c2.2,0,4-1.8,4-4V31"></path><line x1="20.5" x2="20.5" y1="19.5" y2="34.5" fill="none" stroke="#18193f" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"></line><line x1="27.5" x2="27.5" y1="19.5" y2="34.5" fill="none" stroke="#18193f" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"></line>
      </svg>
      </div>
    </div>
  </div>
  `;
    }
}

function removeSubstask(i) {
    subtasks.splice(i, 1);
    addSubTask();
}