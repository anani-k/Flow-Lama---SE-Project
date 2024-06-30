// Array enthält infos über die daten die später im Board vom Benutzer eingetragen werden.
//  Gerade sind im Array Test daten(Zum Stylen etc.), sollen später entfernt werden. Erst dann sind von anfangan keine Karten vorhanden.
let tasks = [];

// Array mit Beispiel Kontakten
let contacts = [];

//Zwischenspeicher der ausgewählten Subtasks und kontakte
let selectedSubtasks = [];
let selectedContacs = [];
let savedClosedSubtasks = [];
let savedProgress = "";
//Speichert das Element welches gerade gedrückt und bewegt wird
let currentDraggedElement;

//Startzustand = False. Wird ein Element auf einer spalte erstellt, wird der Wert auf True gesetzt.
let todo = false;
let inProgress = false;
let awaitFeedback = false;
let done = false;

//Speichert ob Assigned to dropdown geöffnet wurde
let openContacs = true;

//Variable um von Anfang an "Medium" im Add Task Popup ausgewählt zu haben
let activeButton = "mediumButton";
let selectedPriority = "medium";

//init wird immer ausgeführt wenn die HTML datei geladen ist und ruft die Funktion zur erstellung der Tasks auf
function init() {
  this.setArray();
  this.generateCard();
}

function setArray() {
  tasks = globalTasks;
  contacts = globalContacts;
  contacts = sortContactsByFirstName(contacts);
}

//die Kontakt ID gibt man in die Funktion und erhält die stelle im Array contacts zurück
function findIndexById(id) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      return i;
    }
  }
}

//Überprüft die reingegebene Priorität und returned das passende SVG
function returnPrioritySymbol(priority) {
  if (priority == "low") {
    return `
    <svg
    width="21"
    height="16"
    viewBox="0 0 21 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.8555 9.69779C10.6209 9.69819 10.3923 9.62335 10.2035 9.48427L1.30038 2.91453C1.18454 2.82898 1.0867 2.72146 1.01245 2.59812C0.938193 2.47478 0.888977 2.33803 0.867609 2.19569C0.824455 1.90821 0.897354 1.61537 1.07027 1.3816C1.24319 1.14782 1.50196 0.992265 1.78965 0.949143C2.07734 0.906021 2.3704 0.978866 2.60434 1.15165L10.8555 7.23414L19.1066 1.15165C19.2224 1.0661 19.354 1.00418 19.4938 0.969432C19.6336 0.934685 19.7788 0.927791 19.9213 0.949143C20.0637 0.970495 20.2006 1.01967 20.324 1.09388C20.4474 1.16808 20.555 1.26584 20.6407 1.3816C20.7263 1.49735 20.7883 1.62882 20.823 1.7685C20.8578 1.90818 20.8647 2.05334 20.8433 2.19569C20.822 2.33803 20.7727 2.47478 20.6985 2.59812C20.6242 2.72146 20.5264 2.82898 20.4106 2.91453L11.5075 9.48427C11.3186 9.62335 11.0901 9.69819 10.8555 9.69779Z"
      fill="#7AE229"
    />
    <path
      d="M10.8555 15.4463C10.6209 15.4467 10.3923 15.3719 10.2035 15.2328L1.30038 8.66307C1.06644 8.49028 0.910763 8.2317 0.867609 7.94422C0.824455 7.65674 0.897354 7.3639 1.07027 7.13013C1.24319 6.89636 1.50196 6.7408 1.78965 6.69768C2.07734 6.65456 2.3704 6.7274 2.60434 6.90019L10.8555 12.9827L19.1066 6.90019C19.3405 6.7274 19.6336 6.65456 19.9213 6.69768C20.209 6.7408 20.4678 6.89636 20.6407 7.13013C20.8136 7.3639 20.8865 7.65674 20.8433 7.94422C20.8002 8.2317 20.6445 8.49028 20.4106 8.66307L11.5075 15.2328C11.3186 15.3719 11.0901 15.4467 10.8555 15.4463Z"
      fill="#7AE229"
    />
  </svg>
    `;
  } else if (priority == "medium") {
    return `
    <svg width="21" height="8" viewBox="0 0 21 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_156_1038)">
    <path d="M19.7596 7.91717H1.95136C1.66071 7.91717 1.38197 7.80087 1.17645 7.59386C0.970928 7.38685 0.855469 7.10608 0.855469 6.81332C0.855469 6.52056 0.970928 6.23979 1.17645 6.03278C1.38197 5.82577 1.66071 5.70947 1.95136 5.70947H19.7596C20.0502 5.70947 20.329 5.82577 20.5345 6.03278C20.74 6.23979 20.8555 6.52056 20.8555 6.81332C20.8555 7.10608 20.74 7.38685 20.5345 7.59386C20.329 7.80087 20.0502 7.91717 19.7596 7.91717Z" fill="orange"/>
    <path d="M19.7596 2.67388H1.95136C1.66071 2.67388 1.38197 2.55759 1.17645 2.35057C0.970928 2.14356 0.855469 1.86279 0.855469 1.57004C0.855469 1.27728 0.970928 0.996508 1.17645 0.789496C1.38197 0.582485 1.66071 0.466187 1.95136 0.466187L19.7596 0.466187C20.0502 0.466187 20.329 0.582485 20.5345 0.789496C20.74 0.996508 20.8555 1.27728 20.8555 1.57004C20.8555 1.86279 20.74 2.14356 20.5345 2.35057C20.329 2.55759 20.0502 2.67388 19.7596 2.67388Z" fill="orange"/>
    </g>
    <defs>
    <clipPath id="clip0_156_1038">
    <rect width="20" height="7.45098" fill="white" transform="translate(0.855469 0.466187)"/>
    </clipPath>
    </defs>
    </svg>
    `;
  } else if (priority == "urgent") {
    return `
    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_156_1053)">
    <path d="M19.2597 15.4466C19.0251 15.447 18.7965 15.3722 18.6077 15.2331L10.3556 9.14989L2.10356 15.2331C1.98771 15.3186 1.85613 15.3806 1.71633 15.4153C1.57652 15.4501 1.43124 15.457 1.28877 15.4356C1.14631 15.4142 1.00944 15.3651 0.885997 15.2908C0.762552 15.2166 0.654943 15.1189 0.569314 15.0031C0.483684 14.8873 0.421712 14.7558 0.386936 14.6161C0.352159 14.4764 0.345259 14.3313 0.366629 14.1889C0.409788 13.9014 0.565479 13.6428 0.799451 13.47L9.70356 6.89951C9.89226 6.75992 10.1208 6.68457 10.3556 6.68457C10.5904 6.68457 10.819 6.75992 11.0077 6.89951L19.9118 13.47C20.0977 13.6069 20.2356 13.799 20.3057 14.0189C20.3759 14.2388 20.3747 14.4752 20.3024 14.6944C20.2301 14.9135 20.0904 15.1043 19.9031 15.2394C19.7159 15.3745 19.4907 15.447 19.2597 15.4466Z" fill="#FF3D00"/>
    <path d="M19.2597 9.69746C19.0251 9.69786 18.7965 9.62301 18.6077 9.48391L10.3556 3.40075L2.10356 9.48391C1.86959 9.65672 1.57651 9.72958 1.28878 9.68645C1.00105 9.64332 0.742254 9.48775 0.569318 9.25395C0.396382 9.02015 0.323475 8.72728 0.366634 8.43976C0.409793 8.15225 0.565483 7.89364 0.799455 7.72084L9.70356 1.15036C9.89226 1.01077 10.1208 0.935425 10.3556 0.935425C10.5904 0.935425 10.819 1.01077 11.0077 1.15036L19.9118 7.72084C20.0977 7.85775 20.2356 8.04987 20.3057 8.26975C20.3759 8.48962 20.3747 8.72603 20.3024 8.94521C20.2301 9.1644 20.0904 9.35515 19.9031 9.49024C19.7159 9.62533 19.4907 9.69785 19.2597 9.69746Z" fill="#FF3D00"/>
    </g>
    <defs>
    <clipPath id="clip0_156_1053">
    <rect width="20" height="14.5098" fill="white" transform="translate(0.355469 0.936768)"/>
    </clipPath>
    </defs>
    </svg>
    `;
  }
}

//rendert die kontakt icons
function returnContactIcon(i) {
  let content = document.getElementById("assignedUser" + i);

  //es wird geschaut sind die ausgewählten Kontakte kleiner als 4 und trifft das zu, werden 0-3 kontakte gerendert
  if (tasks[i].assigedToId.length < 4) {
    for (let x = 0; x < tasks[i].assigedToId.length; x++) {
      let userID = tasks[i].assigedToId[x];
      content.innerHTML += /*html*/ `
    <!-- nimmt die ersten beiden buchstaben des Vor- und Nachnamen -->
      <div style="background-color: ${
        contacts[findIndexById(userID)].color
      };">${contacts[findIndexById(userID)].initials}</div>`;
    }

    //trifft das obere nicht zu, dann werden die ersten beiden kontakte gerendert und alles anderen als plus zahl addiert und die beiden ersten abgezogen
  } else if (tasks[i].assigedToId.length > 3) {
    for (let x = 0; x < 2; x++) {
      let userID = tasks[i].assigedToId[x];
      content.innerHTML += /*html*/ `
      <div style="background-color: ${
        contacts[findIndexById(userID)].color
      };">${contacts[findIndexById(userID)].initials}</div>`;
    }
    content.innerHTML += /*html*/ `
<div style="background-color: rgb(98,114,84);">+${
      tasks[i].assigedToId.length - 2
    }</div>
`;
  }
}

//Generiert die Tasks, holt sich die Elemente aus der HTML datei und nimmt die Werte aus dem Array: tasks
function generateCard() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("inProgress").innerHTML = "";
  document.getElementById("awaitFeedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    logStatus(i);

    document.getElementById(tasks[i].progress).innerHTML += /*html*/ ` 
       <div  onclick="popupCardContentopenButton(${i})" draggable="true" class="cardContainer cursorPointer" ondragstart="startDraggin(${i})" id="generatedCard${i}">
<div class="technicalTask">${tasks[i].category}</div>
<div class="cardContent">
    <div class="projectName">${tasks[i].title}</div>
    <div class="commentSection">${tasks[i].description} </div>
    <div class="progessBarSubtasks" id="progessBarSubtasks${i}">  </div>
</div>
<div class="cardFooter">
    <div class="assignedUser" id="assignedUser${i}">
    </div>
    <div>${returnPrioritySymbol(tasks[i].priority)}</div>
</div>
</div>`;
    returnContactIcon(i);
    generateProgessBarSubtasks(i);
  }
  generatePlaceholder();
}

//fügt die progressbar hinzu
function generateProgessBarSubtasks(i) {
  let content = document.getElementById("progessBarSubtasks" + i);
  let allSubtasks =
    tasks[i].openSubtasks.length + tasks[i].closedSubtasks.length;
  let closedSubtasks = tasks[i].closedSubtasks.length;
  content.innerHTML = /*html*/ `
<progress class="progressbar" value="${closedSubtasks}" max="${allSubtasks}"></progress>
<span>${closedSubtasks}/${allSubtasks}</span>
  `;
}

//Funktion entscheidet in welcher Spalte der Placeholder generiert werden soll
function generatePlaceholder() {
  if (todo == false) {
    generatePlaceholderHTML("todo");
  }
  if (inProgress == false) {
    generatePlaceholderHTML("inProgress");
  }
  if (awaitFeedback == false) {
    generatePlaceholderHTML("awaitFeedback");
  }
  if (done == false) {
    generatePlaceholderHTML("done");
  }

  resetStatus();
}

//Generiert den Placeholder in der jeweiligen Spalte
function generatePlaceholderHTML(status) {
  document.getElementById(status).innerHTML += `
    <div id="${
      status + "Placeholder"
    }" class="placeholder">No tasks in progress</div>
`;
}

//Funktion wird bei generateTask aufgerufen und überprüft in welcher spalte sich diese task befindet und setzt oben die variable auf true
function logStatus(i) {
  let content = tasks[i].progress;

  if (content == "todo") {
    todo = true;
  } else if (content == "inProgress") {
    inProgress = true;
  } else if (content == "awaitFeedback") {
    awaitFeedback = true;
  } else if (content == "done") {
    done = true;
  }
}

//Nachdem der Placeholder generiert wurde wird alles auf false gesetzt
function resetStatus() {
  todo = false;
  inProgress = false;
  awaitFeedback = false;
  done = false;
}

//verändert den progress status im array
function moveTo(id) {
  tasks[currentDraggedElement].progress = id;
  this.generateCard();
  hideAllHoverContainers();
}

//drag und drop
function allowDrop(ev) {
  ev.preventDefault();
}

//wenn wir eine task draggen dann wird der variable mitgeteilt, welche ID das angeklickte Element besitzt
function startDraggin(index) {
  currentDraggedElement = index;
  this.generateDropzone(index);
}

//Generiert links und rechts gestrichelte felder zum abladen der Task
function generateDropzone(containerId) {
  let hoverMap = {
    todo: ["inProgressDropZone"],
    inProgress: ["toDoDropZone", "awaitFeedbackDropZone"],
    awaitFeedback: ["inProgressDropZone", "doneDropZone"],
    done: ["awaitFeedbackDropZone"],
  };
  this.removePlaceholder(containerId);

  let id = tasks[containerId].progress;
  for (let i = 0; i < hoverMap[id].length; i++) {
    const element = hoverMap[id][i];
    document.getElementById(element).classList.remove("d-none");
  }
}

//entfernt links und rechts gestrichelte felder zum abladen der Task
function hideAllHoverContainers() {
  const hoverContainers = [
    "toDoDropZone",
    "inProgressDropZone",
    "awaitFeedbackDropZone",
    "doneDropZone",
  ];
  for (let i = 0; i < hoverContainers.length; i++) {
    document.getElementById(hoverContainers[i]).classList.add("d-none");
  }
}

//Entfernt den Placeholder wenn eine Task auf ein feld gesetzt wird
function removePlaceholder(containerId) {
  let hoverMap = {
    todo: ["inProgressPlaceholder"],
    inProgress: ["todoPlaceholder", "awaitFeedbackPlaceholder"],
    awaitFeedback: ["inProgressPlaceholder", "donePlaceholder"],
    done: ["awaitFeedbackPlaceholder"],
  };

  let id = tasks[containerId].progress;

  for (let i = 0; i < hoverMap[id].length; i++) {
    const element = hoverMap[id][i];

    let elementid = document.getElementById(element);
    if (elementid) {
      elementid.classList.add("d-none");
    }
  }
}

//Öffnet das Popup Fenster wenn man auf den Button drückt
function openPopup() {
  document.getElementById("popupContainer").classList.remove("d-none");
  document.getElementById(
    "popupContainer"
  ).innerHTML = `${this.returnOpenPopup()}`;
}

//Wenn man einen Prio Button andrückt wird die Funktion ausgeführt
function buttonSelect(id) {
  document
    .getElementById(activeButton)
    .classList.remove(activeButton + "Active");
  activeButton = id;
  document.getElementById(id).classList.add(id + "Active");
  selectedPriority = id.slice(0, -6);
}

//Category, Öffnet dropdown
function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
  document.getElementById("categoryClosed").classList.toggle("d-none");
  document.getElementById("categoryOpen").classList.toggle("d-none");
}

//Funktion zum Setzen der ausgewählten Option und schließt das dropdown anschließend
function selectOption(option) {
  document.getElementById("taskCategory").value = option;
  document.getElementById("myDropdown").classList.remove("show");
}

//Startet Fokus für das Input feld bei Subtasks
function subtaskFokus() {
  document.getElementById("subtaskPlusBtn").classList.add("d-none");
  document.getElementById("subtaskOptions").classList.remove("d-none");
}

//beendet den Fokus
function subtaskUnfokus() {
  let input = document.getElementById("addSubtaksInput").value;
  if (input.length < 1) {
    document.getElementById("subtaskPlusBtn").classList.remove("d-none");
    document.getElementById("subtaskOptions").classList.add("d-none");
  }
}

//Eingabe wird gelöscht beim ausführen
function clearSubtaksInput() {
  document.getElementById("addSubtaksInput").value = "";
  subtaskUnfokus();
}

// Fügt eine Subtask ins Array
function addSubtaks() {
  let content = document.getElementById("addSubtaksInput").value;
  document.getElementById("addSubtaksInput").value = "";
  selectedSubtasks.push(content);
  addSubTask();
}

//Rendert die Subtasks aus dem Array
function addSubTask() {
  document.getElementById("subTasks").innerHTML = "";
  for (let i = 0; i < selectedSubtasks.length; i++) {
    const element = selectedSubtasks[i];

    document.getElementById("subTasks").innerHTML += /*html*/ `
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

//löscht eine erstellte subtask
function removeSubstask(i) {
  selectedSubtasks.splice(i, 1);
  addSubTask();
}

//tascht die SVGs zum jeweiligen richtigen Status aus
function checkboxExchange(i) {
  if (
    document.getElementById("CkeckboxChecked" + i).classList.contains("d-none")
  ) {
    document.getElementById("CkeckboxChecked" + i).classList.remove("d-none");
    document.getElementById("checkboxUnchecked" + i).classList.add("d-none");
    selectedContacs.push(i.toString());
  } else if (
    !document.getElementById("CkeckboxChecked" + i).classList.contains("d-none")
  ) {
    document.getElementById("CkeckboxChecked" + i).classList.add("d-none");
    document.getElementById("checkboxUnchecked" + i).classList.remove("d-none");
    for (let x = 0; x < selectedContacs.length; x++) {
      const element = selectedContacs[x];
      if (i == element) {
        selectedContacs.splice(x, 1);
      }
    }
  }
}

//Öffnet und schließt das Assigned to dropdown
function toggleDropdownAssignedTo() {
  document.getElementById("assignedToDropdown").classList.toggle("show");
  document.getElementById("assignedToClosed").classList.toggle("d-none");
  document.getElementById("assignedToOpen").classList.toggle("d-none");
  if (openContacs) {
    this.renderContacts();
    openContacs = false;
  }
}

//rendert Kontakte in das Dropdown menü und nimmt die Kürzel, sowie vor- und nachname aus dem Array contacts. Stellt auch die checkbox dar.
function renderContacts() {
  document.getElementById("assignedToDropdown").innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    const element2 = contacts[i];

    document.getElementById("assignedToDropdown").innerHTML += /*html*/ `
    <a href="#" onclick="checkboxExchange(${element2.id})" id="contacts${i}">
    <div class="contactInformation">
      <div class="ContactName">
        <div class="contactIcon" style="background-color: ${element2.color};">${element2.initials}</div>
        <div class="contactFullName">${element2.firstName} ${element2.lastName}</div>
      </div>
      <div class="contactInfoCheckbox"><input type="checkbox" class="hidden-checkbox">
        <svg xmlns="http://www.w3.org/2000/svg" id="checkboxUnchecked${element2.id}" x="0px" y="0px" width="30"
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
        <svg xmlns="http://www.w3.org/2000/svg" id="CkeckboxChecked${element2.id}" class="d-none" x="0px" y="0px"
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

//Versteckt popup card, schließt sie quasi
function popupCardContentcloseButton() {
  document.getElementById("TestCloseButton").classList.add("d-none");
  generateCard();
}

//Öffnet Popup Card, wenn man eine Task anklickt
function popupCardContentopenButton(i) {
  document.getElementById("TestCloseButton").classList.remove("d-none");
  document.getElementById(
    "TestCloseButton"
  ).innerHTML = `${returnPopupCardContentopenButton(i)}`;
  generateOpenNames(i);
  generateOpenSubtasks(i);
  generateClosedSubtasks(i);
}

//rendert die Kontakte in die Karte die beim erstellen ausgesucht wurden
function generateOpenNames(i) {
  for (let x = 0; x < tasks[i].assigedToId.length; x++) {
    let userID = tasks[i].assigedToId[x];
    document.getElementById("popupCardAssignedToList").innerHTML += /*html*/ `
    <div class="popupCardAssignetToContentContainer">
        <div class="icon" style="background-color: ${
          contacts[findIndexById(userID)].color
        };">${contacts[findIndexById(userID)].initials}</div>
        <p>${contacts[findIndexById(userID)].firstName} ${
      contacts[findIndexById(userID)].lastName
    }</p>
    </div>`;
  }
}

//generiert die offenen subtasks in der offenen karte
function generateOpenSubtasks(i) {
  for (let x = 0; x < tasks[i].openSubtasks.length; x++) {
    let userID = tasks[i].openSubtasks[x];
    document.getElementById("openCardSubtasks2").innerHTML += /*html*/ `
    <div  onclick="popUpSubtaskCheckbox(${x},${i})">
    <svg xmlns="http://www.w3.org/2000/svg"x="0px" y="0px" width="30" height="30"
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
    ${userID}
  </div>
  `;
  }
}

//generiert die geschlossenen subtasks in der offenen karte
function generateClosedSubtasks(i) {
  for (let x = 0; x < tasks[i].closedSubtasks.length; x++) {
    let userID = tasks[i].closedSubtasks[x];
    document.getElementById("openCardSubtasks2").innerHTML += /*html*/ `
    <div class="checkboxCheckedContainer" onclick="popUpSubtaskCheckboxUncheck(${x},${i})">
    <svg xmlns="http://www.w3.org/2000/svg" id="CkeckboxChecked0" class="" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
          <path fill="#a5d6a7" d="M42,45H15c-1.7,0-3-1.3-3-3V15c0-1.7,1.3-3,3-3h27c1.7,0,3,1.3,3,3v27C45,43.7,43.7,45,42,45z">
          </path>
          <polyline fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" points="17.5,23.5 22.5,28.5 33,18"></polyline>
          <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M40.5,30.9v6.6c0,1.7-1.3,3-3,3h-27c-1.7,0-3-1.3-3-3V24"></path>
          <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M7.5,17.1v-6.6c0-1.7,1.3-3,3-3h27c1.7,0,3,1.3,3,3v12.8"></path>
        </svg>
        <p>${userID}</p>
  </div>
  `;
  }
}

//verschiebt die subtasks in die abgeschlosseben subtasks
function popUpSubtaskCheckbox(x, i) {
  let changedElement = tasks[i]["openSubtasks"].splice(x, 1);
  tasks[i]["closedSubtasks"].unshift(changedElement);
  globalTasks = tasks;
  generateCard();
  popupCardContentopenButton(i);
}

//verschiebt die subtasks zurück in die offenen subtasks
function popUpSubtaskCheckboxUncheck(x, i) {
  let changedElement = tasks[i]["closedSubtasks"].splice(x, 1);
  tasks[i]["openSubtasks"].unshift(changedElement);
  globalTasks = tasks;
  generateCard();
  popupCardContentopenButton(i);
}

//Funktion um die eingegebenen Inhalte auszulesen und diese als neue task ins tasks array hinzuzufügen
function logFormInputs(event) {
  let newTask = {
    progress: "todo",
    category: "Technical Task",
    title: "aaaaaaaaaaa",
    description: "do some cleancode",
    date: "01.10.2002",
    openSubtasks: ["test1", "test2"],
    closedSubtasks: [],
    priority: "",
    assigedToId: [],
  };

  newTask.priority = selectedPriority;
  newTask.assigedToId = selectedContacs;
  newTask.openSubtasks = selectedSubtasks;
  event.preventDefault();

  // Holt das Formular-Element
  const form = event.target;

  // Holt alle Eingabefelder des Formulars
  const formData = new FormData(form);

  for (const [name, value] of formData.entries()) {
    newTask[name] = value;
  }
  newTask.date = revertDate(newTask.date);
  tasks.push(newTask);
  console.log(tasks);
  globalTasks = tasks;
  this.generateCard();
  this.closePopup();

}

//Funktion setzt, beim drücken des Clear Buttons die Inhalte zurück
function clearForm() {
  selectedSubtasks = [];
  selectedContacs = [];
  activeButton = "mediumButton";
  selectedPriority = "medium";
  openContacs = true;
}

//Funktion blendet die karte aus beim schließen
function closePopup() {
  document.getElementById("popupContainer").classList.add("d-none");
  this.clearForm();
}

//Löscht eine Task
function deleteCard(i) {
  tasks.splice(i, 1);
  this.generateCard();
  document.getElementById("TestCloseButton").classList.add("d-none");
}

//Suchfunktion um eine Task zu finden
function sortTasks() {
  let value = document.getElementById("sortTasksInput").value.toLowerCase();
  for (let i = 0; i < tasks.length; i++) {
    const element = tasks[i].title.toLowerCase();
    if (!element.includes(value)) {
      document.getElementById("generatedCard" + i).classList.add("d-none");
    } else {
      document.getElementById("generatedCard" + i).classList.remove("d-none");
    }
  }
}

//öffnet das Popup edit Fenster und enthält alle die Funktionen aus add Task ↓↓↓

function editCard(i) {
  selectedSubtasks = tasks[i].openSubtasks;
  selectedContacs = tasks[i].assigedToId;
  savedClosedSubtasks = tasks[i].closedSubtasks;
  savedProgress = tasks[i].progress;

  document.getElementById("popupContainer").classList.remove("d-none");
  document.getElementById(
    "popupContainer"
  ).innerHTML = `${this.returnEditOpenPopup(i)}`;
  this.popupCardContentcloseButton();
  this.addSubTask();
  buttonSelect(tasks[i].priority + "Button");
}

function editFormInputs(event, i) {
  let newTask = {
    progress: "todo",
    category: "Technical Task",
    title: "aaaaaaaaaaa",
    description: "do some cleancode",
    date: "01.10.2002",
    openSubtasks: ["test1", "test2"],
    closedSubtasks: [],
    priority: "",
    assigedToId: [],
  };

  if (savedClosedSubtasks) {
    newTask.closedSubtasks = savedClosedSubtasks;
    savedClosedSubtasks = "";
  }

  newTask.progress = savedProgress;
  newTask.priority = selectedPriority;
  newTask.assigedToId = selectedContacs;
  newTask.openSubtasks = selectedSubtasks;
  event.preventDefault();

  // Holt das Formular-Element
  const form = event.target;

  // Holt alle Eingabefelder des Formulars
  const formData = new FormData(form);

  for (const [name, value] of formData.entries()) {
    newTask[name] = value;
  }
  newTask.date = revertDate(newTask.date);
  tasks[i] = newTask;
  globalTasks = tasks;
  this.generateCard();
  this.closePopup();

}

function toggleDropdownAssignedToEdit() {
  document.getElementById("assignedToDropdown").classList.toggle("show");
  document.getElementById("assignedToClosed").classList.toggle("d-none");
  document.getElementById("assignedToOpen").classList.toggle("d-none");
  if (openContacs) {
    this.renderContactsEdit();
    openContacs = false;
  }
}

function renderContactsEdit() {
  document.getElementById("assignedToDropdown").innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    document.getElementById("assignedToDropdown").innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
      const element2 = contacts[i];

      document.getElementById("assignedToDropdown").innerHTML += /*html*/ `
    <a href="#" onclick="checkboxExchange(${element2.id})" id="contacts${i}">
    <div class="contactInformation">
      <div class="ContactName">
        <div class="contactIcon" style="background-color: ${element2.color};">${element2.initials}</div>
        <div class="contactFullName">${element2.firstName} ${element2.lastName}</div>
      </div>
      <div class="contactInfoCheckbox"><input type="checkbox" class="hidden-checkbox">
        <svg xmlns="http://www.w3.org/2000/svg" id="checkboxUnchecked${element2.id}" x="0px" y="0px" width="30"
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
        <svg xmlns="http://www.w3.org/2000/svg" id="CkeckboxChecked${element2.id}" class="d-none" x="0px" y="0px"
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
  this.checkboxExchangeEdit();
}

function checkboxExchangeEdit() {
  for (let i = 0; i < selectedContacs.length; i++) {
    for (let x = 0; x < contacts.length; x++) {
      const id = selectedContacs[i];

      if (contacts[x].id === id) {
        document
          .getElementById("CkeckboxChecked" + id)
          .classList.remove("d-none");
        document
          .getElementById("checkboxUnchecked" + id)
          .classList.add("d-none");
      }
    }
  }
}

//Funktionen um das richige Datum zu erfassen

function convertDate(inputDate) {
  let parts = inputDate.split(".");

  let day = parts[0];
  let month = parts[1];
  let year = parts[2];

  if (day.length < 2) day = "0" + day;
  if (month.length < 2) month = "0" + month;

  let formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function revertDate(inputDate) {
  try {
    // Prüfen, ob das Eingabedatum das richtige Format hat
    if (!/^\d{4}-\d{2}-\d{2}$/.test(inputDate)) {
      throw new Error("Eingabedatum hat nicht das erwartete Format yyyy-MM-dd");
    }

    let parts = inputDate.split("-");

    let year = parts[0];
    let month = parts[1];
    let day = parts[2];

    if (day.length < 2) day = "0" + day;
    if (month.length < 2) month = "0" + month;

    let formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  } catch (error) {
    console.error("Fehler bei der Datumsumwandlung:", error.message);
    return null;
  }
}

function closeCardPopups() {
  document.getElementById("assignedToDropdown").classList.remove("show");
  document.getElementById("assignedToClosed").classList.remove("d-none");
  document.getElementById("assignedToOpen").classList.add("d-none");

  document.getElementById("myDropdown").classList.remove("show");
}

function sortContacs() {
  let value = document.getElementById("assignedTo").value.replace(/\s+/g, "");
  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i].firstName + contacts[i].lastName + " ";
    if (!element.toLowerCase().includes(value.toLowerCase())) {
      console.log(value, element);
      document.getElementById("contacts" + i).classList.add("d-none");
    } else {
      document.getElementById("contacts" + i).classList.remove("d-none");
    }
  }
}

function sortContactsByFirstName(contacts) {
  let contactsCopy = [...contacts];

  return contactsCopy.sort((a, b) => {
    let nameA = a.firstName.toLowerCase();
    let nameB = b.firstName.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}
