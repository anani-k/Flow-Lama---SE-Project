let tasks = [{
    progress: 'done',
    category: 'Technical Task',
    title: 'ich liebe dich',
    description: 'JOOST',
    date: '21.10.2002',
    openSubtasks: ['test1', 'test2'],
    closedSubtasks: ['test3', 'test4'],
    contacts: ['AS', 'S', 'M'],
    priority: 'low',
    assigedToId: ['0']
}, {
    progress: 'awaitFeedback',
    category: 'Technical Task',
    title: 'aaaaaaaaaaa',
    description: 'do some cleancode',
    date: '01.10.2002',
    contacts: ['AS', 'S', 'M'],
    openSubtasks: ['test1', 'test2'],
    closedSubtasks: ['test3', 'test4'],
    priority: 'low',
    assigedToId: ['1', '0']
}];

let contacts = [{
    id: 0,
    firstName: 'Michelle',
    lastName: 'Reimers',
    initials: 'MR'
},
{
    id: 1,
    firstName: 'Joost',
    lastName: 'Heidrich',
    initials: 'JH'
}]

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
       <div  onclick="popupCardContentopenButton(${i})" draggable="true" class="cardContainer" ondragstart="startDraggin(${i})">
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
    <div id="${status + 'Placeholder'}" class="placeholder">No tasks in progress</div>
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
        "todo": ["inProgressDropZone"],
        "inProgress": ["toDoDropZone", "awaitFeedbackDropZone"],
        "awaitFeedback": ["inProgressDropZone", "doneDropZone"],
        "done": ["awaitFeedbackDropZone"]
    };
    removePlaceholder(containerId);

    let id = tasks[containerId].progress;
    for (let i = 0; i < hoverMap[id].length; i++) {
        const element = hoverMap[id][i];
        document.getElementById(element).classList.remove('d-none');
    }
}

function removePlaceholder(containerId) {
    let hoverMap = {
        "todo": ["inProgressPlaceholder"],
        "inProgress": ["todoPlaceholder", "awaitFeedbackPlaceholder"],
        "awaitFeedback": ["inProgressPlaceholder", "donePlaceholder"],
        "done": ["awaitFeedbackPlaceholder"]
    };

    let id = tasks[containerId].progress;

    for (let i = 0; i < hoverMap[id].length; i++) {
        const element = hoverMap[id][i];

        let elementid = document.getElementById(element);
        if (elementid) {
            elementid.classList.add('d-none');
        }
    }
}

function hideAllHoverContainers() {
    const hoverContainers = ["toDoDropZone", "inProgressDropZone", "awaitFeedbackDropZone", "doneDropZone"];
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

function checkboxExchange(i) {
    document.getElementById('CkeckboxChecked' + i).classList.toggle("d-none");
    document.getElementById('checkboxUnchecked' + i).classList.toggle("d-none");

}

//Assigned to
function toggleDropdownAssignedTo() {
    document.getElementById("assignedToDropdown").classList.toggle("show");
    document.getElementById("assignedToClosed").classList.toggle("d-none");
    document.getElementById("assignedToOpen").classList.toggle("d-none");
    renderContacts()
}


function renderContacts() {
    document.getElementById('assignedToDropdown').innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        const element = contacts[i];


        document.getElementById('assignedToDropdown').innerHTML += `
    <a href="#" onclick="checkboxExchange(${i})">
    <div class="contactInformation">
      <div class="ContactName">
        <div class="contactIcon">${initials(element.firstName, element.lastName)}</div>
        <div class="contactFullName">${element.firstName} ${element.lastName}</div>
      </div>
      <div class="contactInfoCheckbox"><input type="checkbox" class="hidden-checkbox">
        <svg xmlns="http://www.w3.org/2000/svg" id="checkboxUnchecked${i}" x="0px" y="0px" width="30"
          height="30" viewBox="0 0 48 48">
          <path fill="#a5d6a7"
            d="M42,45H15c-1.7,0-3-1.3-3-3V15c0-1.7,1.3-3,3-3h27c1.7,0,3,1.3,3,3v27C45,43.7,43.7,45,42,45z">
          </path>
          <polyline fill="none" stroke="#transparent" stroke-linecap="round" stroke-linejoin="round"
            stroke-miterlimit="10" stroke-width="3" points="17.5,23.5 22.5,28.5 33,18"></polyline>
          <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round"
            stroke-miterlimit="10" stroke-width="3"
            d="M40.5,30.9v6.6c0,1.7-1.3,3-3,3h-27c-1.7,0-3-1.3-3-3V24"></path>
          <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round"
            stroke-miterlimit="10" stroke-width="3"
            d="M7.5,17.1v-6.6c0-1.7,1.3-3,3-3h27c1.7,0,3,1.3,3,3v12.8"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" id="CkeckboxChecked${i}" class="d-none" x="0px" y="0px"
          width="30" height="30" viewBox="0 0 48 48">
          <path fill="#a5d6a7"
            d="M42,45H15c-1.7,0-3-1.3-3-3V15c0-1.7,1.3-3,3-3h27c1.7,0,3,1.3,3,3v27C45,43.7,43.7,45,42,45z">
          </path>
          <polyline fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round"
            stroke-miterlimit="10" stroke-width="3" points="17.5,23.5 22.5,28.5 33,18"></polyline>
          <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round"
            stroke-miterlimit="10" stroke-width="3"
            d="M40.5,30.9v6.6c0,1.7-1.3,3-3,3h-27c-1.7,0-3-1.3-3-3V24"></path>
          <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round"
            stroke-miterlimit="10" stroke-width="3"
            d="M7.5,17.1v-6.6c0-1.7,1.3-3,3-3h27c1.7,0,3,1.3,3,3v12.8"></path>
        </svg>
      </div>
    </div>
    `;
    }


}


function initials(firstName, lastName) {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();

    return firstInitial + lastInitial;
}

function popupCardContentcloseButton() {
    document.getElementById('TestCloseButton').classList.add('d-none');
}

function popupCardContentopenButton(i) {
    document.getElementById('TestCloseButton').classList.remove('d-none');
    document.getElementById('TestCloseButton').innerHTML = `
        <div class="popupCardContent">
    <div class="popupCardContentHeader">
      <div class="popupCardCategory">User Story</div>
      <a onclick="popupCardContentcloseButton()">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <mask id="mask0_116223_1910" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
            height="24">
            <rect width="24" height="24" fill="#D9D9D9"></rect>
          </mask>
          <g mask="url(#mask0_116223_1910)">
            <path
              d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88333 5.51672 6.11667 5.42505 6.4 5.42505C6.68333 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z"
              fill="#2A3647"></path>
          </g>
        </svg></a>
    </div>

    <div class="popupCardContentContainer">
      <div class="PopupCardFirstContent">
        <h3 id="popupCardTitle">${tasks[i].title}</h3>
        <h4 id="popupCardDescription">${tasks[i].description}</h4>
        <div class="popupCardDateContainer">
          <p>Due date:</p><span id="popupCardDate">${tasks[i].date}</span>
        </div>
        <div class="popupCardPriority">
          <p>Priority:</p>
          <div class="popupCardshowPriority">
            <span id="priorityUrgent">${tasks[i].priority}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                d="M3.47876 7.9c-.5.3-1.1.1-1.4-.4s-.1-1 .4-1.3l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.2.4-.8.6-1.3.3l-4.5-2.7-4.5 2.7z"
                fill="#ff5630" />
              <path
                d="M3.47876 12.2c-.5.3-1.1.2-1.4-.3s-.1-1.1.4-1.4l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3l-4.4-2.7-4.5 2.7z"
                fill="#ff7452" />
            </svg>
          </div>
        </div>
      </div>

      <div class="popupCardAssignedTo">
        <p class="popupCardAssignedToTitle">Assigned To:</p>
        <div id="popupCardAssignetToContent" class="openCardAssigned">
            <div id="popupCardAssignedToList"></div>
        </div>
      </div>
      <div class="popupCardSubtasks">
        <p class="popupCardSubtasksTitle">Subtasks</p>
        <div id="openCardSubtasks2">
          <div class=>
            <svg xmlns="http://www.w3.org/2000/svg" id="checkboxUnchecked0" x="0px" y="0px" width="30" height="30"
              viewBox="0 0 48 48">
              <path fill="#a5d6a7"
                d="M42,45H15c-1.7,0-3-1.3-3-3V15c0-1.7,1.3-3,3-3h27c1.7,0,3,1.3,3,3v27C45,43.7,43.7,45,42,45z">
              </path>
              <polyline fill="none" stroke="#transparent" stroke-linecap="round" stroke-linejoin="round"
                stroke-miterlimit="10" stroke-width="3" points="17.5,23.5 22.5,28.5 33,18"></polyline>
              <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                stroke-width="3" d="M40.5,30.9v6.6c0,1.7-1.3,3-3,3h-27c-1.7,0-3-1.3-3-3V24"></path>
              <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                stroke-width="3" d="M7.5,17.1v-6.6c0-1.7,1.3-3,3-3h27c1.7,0,3,1.3,3,3v12.8"></path>
            </svg>
            <!-- <svg xmlns="http://www.w3.org/2000/svg" id="CkeckboxChecked0" class="" x="0px" y="0px" width="30"
              height="30" viewBox="0 0 48 48">
              <path fill="#a5d6a7"
                d="M42,45H15c-1.7,0-3-1.3-3-3V15c0-1.7,1.3-3,3-3h27c1.7,0,3,1.3,3,3v27C45,43.7,43.7,45,42,45z">
              </path>
              <polyline fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round"
                stroke-miterlimit="10" stroke-width="3" points="17.5,23.5 22.5,28.5 33,18"></polyline>
              <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                stroke-width="3" d="M40.5,30.9v6.6c0,1.7-1.3,3-3,3h-27c-1.7,0-3-1.3-3-3V24"></path>
              <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                stroke-width="3" d="M7.5,17.1v-6.6c0-1.7,1.3-3,3-3h27c1.7,0,3,1.3,3,3v12.8"></path>
            </svg> -->
            Create Button
          </div>
        </div>
      </div>
    </div>
    <div class="popupCardContentFooter">
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" class="footerTrashbin" x="0px" y="0px" width="24" height="24"
          viewBox="0 0 48 48">
          <path fill="#90CAF9"
            d="M41.5,13h-9c0-2.5-9-2.5-9,0h-9c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5h1v26.5c0,2.2,1.8,4,4,4h17	c2.2,0,4-1.8,4-4V16h1c0.8,0,1.5-0.7,1.5-1.5S42.3,13,41.5,13z">
          </path>
          <path fill="none" stroke="#18193f" stroke-miterlimit="10" stroke-width="3"
            d="M19.5,11.5V10c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5v1.5"></path>
          <line x1="8.5" x2="39.5" y1="11.5" y2="11.5" fill="none" stroke="#18193f" stroke-linecap="round"
            stroke-miterlimit="10" stroke-width="3"></line>
          <line x1="36.5" x2="36.5" y1="23.5" y2="11.5" fill="none" stroke="#18193f" stroke-linecap="round"
            stroke-miterlimit="10" stroke-width="3"></line>
          <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"
            d="M11.5,18.7v19.8c0,2.2,1.8,4,4,4h17c2.2,0,4-1.8,4-4V31"></path>
          <line x1="20.5" x2="20.5" y1="19.5" y2="34.5" fill="none" stroke="#18193f" stroke-linecap="round"
            stroke-miterlimit="10" stroke-width="3"></line>
          <line x1="27.5" x2="27.5" y1="19.5" y2="34.5" fill="none" stroke="#18193f" stroke-linecap="round"
            stroke-miterlimit="10" stroke-width="3"></line>
        </svg>
        <p>Delete</p>
      </a>
      </div>
  </div>`;
    generateOpenNames(i);
}


function generateOpenNames(i) {
    for (let x = 0; x < tasks[i].assigedToId.length; x++) {
        let userID = tasks[i].assigedToId[x];
        document.getElementById('popupCardAssignedToList').innerHTML += `<div class="popupCardAssignetToContentContainer">
        <div class="icon" style="background-color: #FF7A00;">${contacts[userID].initials}</div>
        <p>${contacts[userID].firstName} ${contacts[userID].lastName}</p>
    </div>`;
    }

}
