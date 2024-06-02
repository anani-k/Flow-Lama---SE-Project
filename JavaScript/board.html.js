//Hier sind alle HTML Teile die Js beinhalten

function returnOpenPopup() {
  return /*html*/ `
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

function returnPopupCardContentopenButton(i) {
  return /*html*/ `
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
${returnPrioritySymbol(tasks[i].priority)}
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
<div class="popupCardSubtasksContainer" id="openCardSubtasks2">
  
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

<a onclick="editCard(${i})" class="cursorPointer">
<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="24px" height="24px"><path fill="#a5d6a7" d="M11,43.8l2.4-8.4c0.1-0.5,0.4-0.9,0.8-1.3l22-21.9c2.3-2.3,6-2.1,8.1,0.4c1.8,2.2,1.5,5.5-0.5,7.5L21.9,41.8	c-0.4,0.4-0.8,0.6-1.3,0.8L12.2,45C11.5,45.2,10.8,44.5,11,43.8z"/><path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M18.4,21.8L32.1,8.1c2.3-2.3,6-2.1,8.1,0.4c1.8,2.2,1.5,5.5-0.5,7.5l-2.8,2.8"/><path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M32.5,23.3L17.9,37.8c-0.4,0.4-0.8,0.6-1.3,0.8L6.5,41.5l2.9-10.1c0.1-0.5,0.4-0.9,0.8-1.3l3.7-3.7"/><line x1="29.1" x2="36.9" y1="11.1" y2="18.9" fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/></svg>
<p>Edit</p>
</a>

</div>
</div>`;
}

function returnEditOpenPopup(i) {
  let content = tasks[i];
  return /*html*/ `
  <form class="popupCard" onsubmit="editFormInputs(event, ${i})" autocomplete="off">

  <div class="popupWarpper">
    <div class="popupHeadline">
      <h1 class="contentTitle">Edit Task</h1>
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
          <input class="task-title-input" type="text" placeholder="Enter a title" required name="title" value="${
            content.title
          }">
        </div>
        <div class="descriptionArea">
          <p>Description</p>
          <textarea class="descriptionTextArea" type="text" placeholder="Enter a description" name="description" required>${
            content.description
          }</textarea>
        </div>
        <div>
          <p>Assigned to</p>
          <div class="dropdown">
            <input type="text" id="assignedTo" class="task-title-input cursorPointer"
              placeholder="Select contacts to assign" onclick="toggleDropdownAssignedToEdit(${i})" readonly>
            <div class="dropdown-icon" onclick="toggleDropdownAssignedToEdit(${i})">
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
          <input  class="task-title-input cursorPointer" type="date" placeholder="dd/mm/yyyy" name="date" required value="${convertDate(
            content.date
          )}">

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
            placeholder="Select Task Category" onclick="toggleDropdown()"required name="category" value="${
              content.category
            }"
            >


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
    <button id="createTaskButton" type="submit" class="addTaskButton createTaskButton">Save Changes
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
