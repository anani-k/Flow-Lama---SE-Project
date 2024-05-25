let tasks = [
  // {
  //   progress: "done",
  //   category: "Technical Task",
  //   title: "ich liebe dich",
  //   description: "JOOST",
  //   date: "21.10.2002",
  //   openSubtasks: ["testa", "testb"],
  //   closedSubtasks: ["test3", "test4aaa"],
  //   contacts: ["AS", "S", "M"],
  //   priority: "low",
  //   assigedToId: ["0"],
  // },
  // {
  //   progress: "awaitFeedback",
  //   category: "Technical Task",
  //   title: "aaaaaaaaaaa",
  //   description: "do some cleancode",
  //   date: "01.10.2002",
  //   contacts: ["AS", "S", "M"],
  //   openSubtasks: ["test1", "test2"],
  //   closedSubtasks: ["test3", "test4"],
  //   priority: "low",
  //   assigedToId: ["1", "0", "2", "3", "4", "5"],
  // },
];

let contacts = [
  {
    id: "0",
    firstName: "Joost",
    lastName: "Heidrich",
    initials: "JH",
    color: "#FF5733",
  },
  {
    id: "1",
    firstName: "Michelle",
    lastName: "Reimers",
    initials: "MR",
    color: "#FFC0CA", // Orange
  },
  {
    id: "2",
    firstName: "Lena",
    lastName: "Schmidt",
    initials: "LS",
    color: "#33FF57", // Grün
  },
  {
    id: "3",
    firstName: "Maximilian",
    lastName: "Bauer",
    initials: "MB",
    color: "#3357FF", // Blau
  },
  {
    id: "4",
    firstName: "Hannah",
    lastName: "Weber",
    initials: "HW",
    color: "#FF33A8", // Pink
  },
  {
    id: "5",
    firstName: "Lucas",
    lastName: "Fischer",
    initials: "LF",
    color: "#FFFF33", // Gelb
  },
  {
    id: "6",
    firstName: "Mia",
    lastName: "Müller",
    initials: "MM",
    color: "#33FFF6", // Cyan
  },
  {
    id: "7",
    firstName: "Finn",
    lastName: "Wagner",
    initials: "FW",
    color: "#9B33FF", // Lila
  },
  {
    id: "8",
    firstName: "Sophie",
    lastName: "Schneider",
    initials: "SS",
    color: "#FF8C33", // Dunkelorange
  },
  {
    id: "9",
    firstName: "Paul",
    lastName: "Neumann",
    initials: "PN",
    color: "#33FF8C", // Hellgrün
  },
  {
    id: "10",
    firstName: "Emma",
    lastName: "Hoffmann",
    initials: "EH",
    color: "#FF3333", // Rot
  },
  {
    id: "11",
    firstName: "Jonas",
    lastName: "Koch",
    initials: "JK",
    color: "#33A8FF", // Hellblau
  },
];

let selectedSubtasks = [];
let selectedContacs = [];

let currentDraggedElement = false;

let todo = false;
let inProgress = false;
let awaitFeedback = false;
let done = false;
let openContacs = true;

let activeButton = "mediumButton";
let selectedPriority = "medium";

function init() {
  this.generateCard();
  // this.openPopup();
}

function findIndexById(id) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      return i.toString();
    }
  }
}

function returnPrioritySimbol(priority) {
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

function returnContactIcon(i) {
  let content = document.getElementById("assignedUser" + i);
  if (tasks[i].assigedToId.length < 4) {
    for (let x = 0; x < tasks[i].assigedToId.length; x++) {
      const element =
        tasks[i].assigedToId[findIndexById(tasks[i].assigedToId[x])];
      content.innerHTML += /*html*/ `
      <div style="background-color: ${contacts[element].color};">${contacts[element].initials}</div>
`;
    }
  } else if (tasks[i].assigedToId.length > 3) {
    for (let x = 0; x < 2; x++) {
      const element =
        tasks[i].assigedToId[findIndexById(tasks[i].assigedToId[x])];
      content.innerHTML += /*html*/ `
      <div style="background-color: ${contacts[element].color};">${contacts[element].initials}</div>
`;
    }

    content.innerHTML += /*html*/ `
<div style="background-color: rgb(98,114,84);">+${
      tasks[i].assigedToId.length - 2
    }</div>
`;
  }
}

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
<div>
    <div class="projectName">${tasks[i].title}</div>
    <div class="commentSection">${tasks[i].description} </div>
</div>
<div class="cardFooter">
    <div class="assignedUser" id="assignedUser${i}">
    </div>
    <div>${tasks[i].priority}${returnPrioritySimbol(tasks[i].priority)}</div>
</div>

</div>`;
    returnContactIcon(i);
  }
  generatePlaceholder();
}

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

function generatePlaceholderHTML(status) {
  document.getElementById(status).innerHTML += `
    <div id="${
      status + "Placeholder"
    }" class="placeholder">No tasks in progress</div>
`;
}

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

function resetStatus() {
  todo = false;
  inProgress = false;
  awaitFeedback = false;
  done = false;
}

function moveTo(id) {
  tasks[currentDraggedElement].progress = id;
  this.generateCard();
  hideAllHoverContainers();
}

function allowDrop(ev) {
  ev.preventDefault();
}

function startDraggin(index) {
  currentDraggedElement = index;
  this.generateDropzone(index);
}

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

function openPopup() {
  document.getElementById("popupContainer").classList.remove("d-none");
  document.getElementById("popupContainer").innerHTML = /*html*/ `
  <form class="popupCard" onsubmit="logFormInputs(event)" autocomplete="off">

  <div class="popupWarpper">
    <div class="popupHeadline">
      <h1 class="contentTitle">Add Task</h1>
      <button class="noselect" id="closeAddTaskButton" onclick="closePopup()" type="button">
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
        </svg>
      </button>
    </div>

    <div class="popupContent">
      <div class="leftSide">
        <div class="leftsideTitle">
          <p>Title</p>
          <input class="task-title-input" type="text" placeholder="Enter a title" required name="title">
        </div>
        <div class="descriptionArea">
          <p>Description</p>
          <textarea class="descriptionTextArea" type="text" placeholder="Enter a description" name="description" required></textarea>
        </div>
        <div>
          <p>Assigned to</p>
          <div class="dropdown">
            <input type="text" id="assignedTo" class="task-title-input cursorPointer"
              placeholder="Select contacts to assign" onclick="toggleDropdownAssignedTo()" readonly>
            <div class="dropdown-icon" onclick="toggleDropdownAssignedTo()">
              <svg id="assignedToClosed" width="35" height="35" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_75597_14108" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                  width="24" height="24">
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_75597_14108)">
                  <path
                    d="M11.3 14.3L8.69998 11.7C8.38331 11.3833 8.31248 11.0208 8.48748 10.6125C8.66248 10.2042 8.97498 10 9.42498 10H14.575C15.025 10 15.3375 10.2042 15.5125 10.6125C15.6875 11.0208 15.6166 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4916 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8666 14.6 11.7416 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3Z"
                    fill="#627254" />
                </g>
              </svg>
              <svg class="d-none" id="assignedToOpen" width="35" height="35" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_75597_14111" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                  width="24" height="24">
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_75597_14111)">
                  <path
                    d="M12.7 10.3L15.3 12.9C15.6167 13.2166 15.6875 13.5791 15.5125 13.9875C15.3375 14.3958 15.025 14.6 14.575 14.6H9.42502C8.97502 14.6 8.66253 14.3958 8.48752 13.9875C8.31252 13.5791 8.38336 13.2166 8.70003 12.9L11.3 10.3C11.4 10.2 11.5084 10.125 11.625 10.075C11.7417 10.025 11.8667 9.99998 12 9.99998C12.1334 9.99998 12.2584 10.025 12.375 10.075C12.4917 10.125 12.6 10.2 12.7 10.3Z"
                    fill="#627254" />
                </g>
              </svg>
            </div>
            <div id="assignedToDropdown" class="dropdown-content">

              </a>
            </div>
          </div>
        </div>

      </div>

      <div class="seperatorVertical"></div>

      <div class="rightSide">
        <div class="dateArea">
          <p>Due date</p>
          <input class="task-title-input cursorPointer" type="date" placeholder="dd/mm/yyyy""  name="date" required>

        </div>
        <div>
          <p>Priority</p>
          <div class=" prioButtons">
          <button type="button" class="prioButton" id="urgentButton" onclick="buttonSelect('urgentButton')">
            <span>Urgent</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                d="M3.47876 7.9c-.5.3-1.1.1-1.4-.4s-.1-1 .4-1.3l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.2.4-.8.6-1.3.3l-4.5-2.7-4.5 2.7z"
                fill="#ff5630" />
              <path
                d="M3.47876 12.2c-.5.3-1.1.2-1.4-.3s-.1-1.1.4-1.4l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3l-4.4-2.7-4.5 2.7z"
                fill="#ff7452" />
            </svg>
          </button>

          <button type="button" class="prioButton mediumButtonActive" id="mediumButton"
            onclick="buttonSelect('mediumButton')">
            <span>Medium</span>
            <svg version="1.1" id="Warstwa_1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16"
              style="enable-background:new 0 0 16 16;" xml:space="preserve">
              <style type="text/css">
                .st12 {
                  fill: #FFAB00;
                }
              </style>
              <title>icon/16px/medium-priority</title>
              <desc>Created with Sketch.</desc>
              <g id="icon_x2F_16px_x2F_medium-priority-">
                <g>
                  <path class="st12" d="M3,4h10c0.6,0,1,0.4,1,1s-0.4,1-1,1H3C2.4,6,2,5.6,2,5S2.4,4,3,4z M3,10h10c0.6,0,1,0.4,1,1s-0.4,1-1,1H3
  c-0.6,0-1-0.4-1-1S2.4,10,3,10z" />
                </g>
              </g>
            </svg>
          </button>

          <button type="button" class="prioButton" id="lowButton" onclick="buttonSelect('lowButton')">
            <span>Low</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                d="M12.504883 8.14541c.5-.3 1.1-.1 1.4.4s.1 1-.4 1.3l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.2-.4.8-.6 1.3-.3l4.5 2.7 4.5-2.7z"
                fill="#0065ff" />
              <path
                d="M12.504883 3.84541c.5-.3 1.1-.2 1.4.3s.1 1.1-.4 1.4l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.3-.5.9-.6 1.4-.3l4.4 2.7 4.5-2.7z"
                fill="#2684ff" />
            </svg>
          </button>
        </div>
      </div>
      <div class="category">
        <p>Category</p>
        <div class="dropdown">
          <input type="text" id="taskCategory" class="task-title-input cursorPointer"
            placeholder="Select Task Category" onclick="toggleDropdown()"required name="category">


          <div class="dropdown-icon" onclick="toggleDropdown()">

            <svg id="categoryClosed" width="35" height="35" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_75597_14108" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                height="24">
                <rect width="24" height="24" fill="#627254" />
              </mask>
              <g mask="url(#mask0_75597_14108)">
                <path
                  d="M11.3 14.3L8.69998 11.7C8.38331 11.3833 8.31248 11.0208 8.48748 10.6125C8.66248 10.2042 8.97498 10 9.42498 10H14.575C15.025 10 15.3375 10.2042 15.5125 10.6125C15.6875 11.0208 15.6166 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4916 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8666 14.6 11.7416 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3Z"
                  fill="#627254" />
              </g>
            </svg>

            <svg class="d-none" id="categoryOpen" width="35" height="35" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_75597_14111" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                height="24">
                <rect width="24" height="24" fill="#627254" />
              </mask>
              <g mask="url(#mask0_75597_14111)">
                <path
                  d="M12.7 10.3L15.3 12.9C15.6167 13.2166 15.6875 13.5791 15.5125 13.9875C15.3375 14.3958 15.025 14.6 14.575 14.6H9.42502C8.97502 14.6 8.66253 14.3958 8.48752 13.9875C8.31252 13.5791 8.38336 13.2166 8.70003 12.9L11.3 10.3C11.4 10.2 11.5084 10.125 11.625 10.075C11.7417 10.025 11.8667 9.99998 12 9.99998C12.1334 9.99998 12.2584 10.025 12.375 10.075C12.4917 10.125 12.6 10.2 12.7 10.3Z"
                  fill="#627254" />
              </g>
            </svg>
          </div>

          <div id="myDropdown" class="dropdown-content">
            <a href="#" onclick="selectOption('Technical Task')">Technical Task</a>
            <a href="#" onclick="selectOption('User Story')">User Story</a>
          </div>
        </div>

      </div>
      <div>
        <p>Subtasks</p>
        <div class="input-container">
          <input class="task-title-input" type="text" placeholder="Add new subtask" id="addSubtaksInput"
            onfocus="subtaskFokus()" onblur="subtaskUnfokus()" type="button">
          <div class="icon-container">
            <button class="subtaskPlusBtn" id="subtaskPlusBtn" onclick="subtaskFokus()" type="button">

              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                <circle cx="28" cy="28" r="18.5" fill="#a5d6a7"></circle>
                <path fill="none" stroke="#3b4234" stroke-linecap="round" stroke-linejoin="round"
                  stroke-miterlimit="10" stroke-width="3"
                  d="M35.4,38.8c-3.2,2.4-7.1,3.9-11.4,3.9C13.7,42.7,5.3,34.3,5.3,24c0-2.6,0.6-5.2,1.5-7.4">
                </path>
                <path fill="none" stroke="#3b4234" stroke-linecap="round" stroke-linejoin="round"
                  stroke-miterlimit="10" stroke-width="3"
                  d="M12.1,9.6C15.3,7,19.5,5.3,24,5.3c10.3,0,18.7,8.4,18.7,18.7c0,2.3-0.4,4.5-1.2,6.6">
                </path>
                <line x1="24" x2="24" y1="14" y2="34" fill="none" stroke="#3b4234" stroke-linecap="round"
                  stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></line>
                <line x1="34" x2="14" y1="24" y2="24" fill="none" stroke="#3b4234" stroke-linecap="round"
                  stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></line>
              </svg>
            </button>
            <div class="subtaskOptions d-none" id="subtaskOptions">
              <button class="subtaskCloseBtn" onclick="clearSubtaksInput()" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                  <circle cx="28" cy="28" r="18.5" fill="#ffab91"></circle>
                  <path fill="none" stroke="#3b4234" stroke-linecap="round" stroke-linejoin="round"
                    stroke-miterlimit="10" stroke-width="3"
                    d="M35.4,38.8c-3.2,2.4-7.1,3.9-11.4,3.9C13.7,42.7,5.3,34.3,5.3,24c0-2.6,0.6-5.2,1.5-7.4">
                  </path>
                  <path fill="none" stroke="#3b4234" stroke-linecap="round" stroke-linejoin="round"
                    stroke-miterlimit="10" stroke-width="3"
                    d="M12.1,9.6C15.3,7,19.5,5.3,24,5.3c10.3,0,18.7,8.4,18.7,18.7c0,2.3-0.4,4.5-1.2,6.6"></path>
                  <line x1="31.1" x2="16.9" y1="16.9" y2="31.1" fill="none" stroke="#3b4234" stroke-linecap="round"
                    stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></line>
                  <line x1="31.1" x2="16.9" y1="31.1" y2="16.9" fill="none" stroke="#3b4234" stroke-linecap="round"
                    stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></line>
                </svg>
              </button>
              <button class="subtaskAddBtn" onclick="addSubtaks()" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                  <circle cx="28" cy="28" r="18.1" fill="#a5d6a7"></circle>
                  <path fill="none" stroke="#3b4234" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                    d="M34.3,39.4c-2.9,2-6.5,3.1-10.3,3.1C13.8,42.5,5.5,34.2,5.5,24c0-4.4,1.6-8.5,4.1-11.7">
                  </path>
                  <path fill="none" stroke="#3b4234" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                    d="M20.1,5.9c1.3-0.3,2.6-0.4,3.9-0.4c10.2,0,18.5,8.3,18.5,18.5c0,2.9-0.7,5.6-1.8,8"></path>
                  <polyline fill="none" stroke="#3b4234" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="3" points="16.5,24.5 21.5,29.5 31.5,19.5"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="subTasks" id="subTasks">

      </div>
    </div>

  </div>
</div>

<div class="footerPopupCard">
  <span>This field is required</span>
  <div class="footerButtons">
    <button id="clearButton" type="button" class="addTaskButton clearButton" onclick="clearForm(), openPopup()">Clear
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
        <circle cx="28" cy="28" r="18.5" fill="#ffab91"></circle>
        <path fill="none" stroke="#3b4234" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
          stroke-width="3" d="M35.4,38.8c-3.2,2.4-7.1,3.9-11.4,3.9C13.7,42.7,5.3,34.3,5.3,24c0-2.6,0.6-5.2,1.5-7.4">
        </path>
        <path fill="none" stroke="#3b4234" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
          stroke-width="3" d="M12.1,9.6C15.3,7,19.5,5.3,24,5.3c10.3,0,18.7,8.4,18.7,18.7c0,2.3-0.4,4.5-1.2,6.6">
        </path>
        <line x1="31.1" x2="16.9" y1="16.9" y2="31.1" fill="none" stroke="#3b4234" stroke-linecap="round"
          stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></line>
        <line x1="31.1" x2="16.9" y1="31.1" y2="16.9" fill="none" stroke="#3b4234" stroke-linecap="round"
          stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></line>
      </svg>
    </button>
    <button id="createTaskButton" type="submit" class="addTaskButton createTaskButton">Create Task
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
        <circle cx="28" cy="28" r="18.1" fill="#a5d6a7"></circle>
        <path fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
          d="M34.3,39.4c-2.9,2-6.5,3.1-10.3,3.1C13.8,42.5,5.5,34.2,5.5,24c0-4.4,1.6-8.5,4.1-11.7"></path>
        <path fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
          d="M20.1,5.9c1.3-0.3,2.6-0.4,3.9-0.4c10.2,0,18.5,8.3,18.5,18.5c0,2.9-0.7,5.6-1.8,8"></path>
        <polyline fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
          points="16.5,24.5 21.5,29.5 31.5,19.5"></polyline>
      </svg>
    </button>
  </div>
</div>
</form>`;
}

function buttonSelect(id) {
  document
    .getElementById(activeButton)
    .classList.remove(activeButton + "Active");
  activeButton = id;
  document.getElementById(id).classList.add(id + "Active");
  selectedPriority = id.slice(0, -6);
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
  document.getElementById("subtaskPlusBtn").classList.add("d-none");
  document.getElementById("subtaskOptions").classList.remove("d-none");
}

function subtaskUnfokus() {
  let input = document.getElementById("addSubtaksInput").value;
  if (input.length < 1) {
    document.getElementById("subtaskPlusBtn").classList.remove("d-none");
    document.getElementById("subtaskOptions").classList.add("d-none");
  }
}

function clearSubtaksInput() {
  document.getElementById("addSubtaksInput").value = "";
  subtaskUnfokus();
}

function addSubtaks() {
  let content = document.getElementById("addSubtaksInput").value;
  document.getElementById("addSubtaksInput").value = "";
  selectedSubtasks.push(content);
  addSubTask();
}

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

function removeSubstask(i) {
  selectedSubtasks.splice(i, 1);
  addSubTask();
}

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
    const index = selectedContacs.indexOf(i);
    if (index > -1) {
      selectedContacs.splice(index, 1);
    }
  }
}

//Assigned to
function toggleDropdownAssignedTo() {
  document.getElementById("assignedToDropdown").classList.toggle("show");
  document.getElementById("assignedToClosed").classList.toggle("d-none");
  document.getElementById("assignedToOpen").classList.toggle("d-none");
  if (openContacs) {
    renderContacts();
    openContacs = false;
  }
}

function renderContacts() {
  document.getElementById("assignedToDropdown").innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[findIndexById(i.toString())];

    document.getElementById("assignedToDropdown").innerHTML += /*html*/ `
    <a href="#" onclick="checkboxExchange(${i})">
    <div class="contactInformation">
      <div class="ContactName">
        <div class="contactIcon" style="background-color: ${element.color};">${element.initials}</div>
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

function popupCardContentcloseButton() {
  document.getElementById("TestCloseButton").classList.add("d-none");
}

function popupCardContentopenButton(i) {
  document.getElementById("TestCloseButton").classList.remove("d-none");
  document.getElementById("TestCloseButton").innerHTML = /*html*/ `
        <div class="popupCardContent">
    <div class="popupCardContentHeader">
      <div class="popupCardCategory">${tasks[i].category}</div>
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
${returnPrioritySimbol(tasks[i].priority)}
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
          
        </div>
      </div>
    </div>
    <div class="popupCardContentFooter">
      <a onclick="deleteCard(${i})" class="cursorPointer">
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
  generateOpenSubtasks(i);
  generateClosedSubtasks(i);
}

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

function generateClosedSubtasks(i) {
  for (let x = 0; x < tasks[i].closedSubtasks.length; x++) {
    let userID = tasks[i].closedSubtasks[x];
    document.getElementById("openCardSubtasks2").innerHTML += /*html*/ `
    <div  onclick="popUpSubtaskCheckboxUncheck(${x},${i})">
    <svg xmlns="http://www.w3.org/2000/svg" id="CkeckboxChecked0" class="" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
          <path fill="#a5d6a7" d="M42,45H15c-1.7,0-3-1.3-3-3V15c0-1.7,1.3-3,3-3h27c1.7,0,3,1.3,3,3v27C45,43.7,43.7,45,42,45z">
          </path>
          <polyline fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" points="17.5,23.5 22.5,28.5 33,18"></polyline>
          <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M40.5,30.9v6.6c0,1.7-1.3,3-3,3h-27c-1.7,0-3-1.3-3-3V24"></path>
          <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M7.5,17.1v-6.6c0-1.7,1.3-3,3-3h27c1.7,0,3,1.3,3,3v12.8"></path>
        </svg>
    ${userID}
  </div>
  `;
  }
}

function popUpSubtaskCheckbox(x, i) {
  let changedElement = tasks[i]["openSubtasks"].splice(x, 1);
  tasks[i]["closedSubtasks"].unshift(changedElement);

  popupCardContentopenButton(i);
}

function popUpSubtaskCheckboxUncheck(x, i) {
  let changedElement = tasks[i]["closedSubtasks"].splice(x, 1);
  tasks[i]["openSubtasks"].unshift(changedElement);

  popupCardContentopenButton(i);
}

function logFormInputs(event) {
  let newTask = {
    progress: "todo",
    category: "Technical Task",
    title: "aaaaaaaaaaa",
    description: "do some cleancode",
    date: "01.10.2002",
    contacts: ["AS", "S", "M"],
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
  tasks.push(newTask);

  this.generateCard();
  this.closePopup();
}

function clearForm() {
  selectedSubtasks = [];
  selectedContacs = [];
  activeButton = "mediumButton";
  selectedPriority = "medium";
  openContacs = true;
}

function closePopup() {
  document.getElementById("popupContainer").classList.add("d-none");
  this.clearForm();
}

function deleteCard(i) {
  tasks.splice(i, 1);
  this.generateCard();
  document.getElementById("TestCloseButton").classList.add("d-none");
}

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
