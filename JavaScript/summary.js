let tasks = [];

// Array mit Beispiel Kontakten
let contacts = [];

let todo = 0;
let inProgress = 0;
let awaitFeedback = 0;
let done = 0;
let urgent = 0;

//init wird immer ausgeführt wenn die HTML datei geladen ist und ruft die Funktion zur erstellung der Tasks auf
function init() {
  this.setArray();
  this.renderSumary();
}

//Holt sich die Arrays aus array.js und setzt andere namen
function setArray() {
  tasks = globalTasks;
  contacts = globalContacts;
}

//HTML Teil mit eingesetzen Variablen
function renderSumary() {
  this.calculateArray();
  document.getElementById("summary-board").innerHTML = /*html*/ `
                  <div class="summary-todos">
                <a href="./board">
                  <div class="summary-todos-badge">
                    <svg
                      fill="currentColor"
                      width="70"
                      viewBox="0 0 56 56"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M 27.9999 51.9062 C 41.0546 51.9062 51.9063 41.0547 51.9063 28.0000 C 51.9063 14.9219 41.0312 4.0938 27.9765 4.0938 C 14.8983 4.0938 4.0937 14.9219 4.0937 28.0000 C 4.0937 41.0547 14.9218 51.9062 27.9999 51.9062 Z M 36.9765 21.5781 L 34.2812 18.8828 L 35.9452 17.2422 C 36.6952 16.5156 37.5390 16.4453 38.2187 17.125 L 38.7343 17.6406 C 39.4140 18.3203 39.3436 19.1406 38.6171 19.9140 Z M 20.6874 37.7969 L 17.5702 38.9687 C 17.0546 39.1562 16.5155 38.6875 16.7499 38.125 L 18.0390 35.1016 L 32.9218 20.2422 L 35.6171 22.9140 Z"
                      />
                    </svg>
                    <div>
                      <br />
                      <span id="toDoNum">${todo}</span><!--HIER COUNTER FÜR TODO AUFGABEN-->
                      <p>To-do</p>
                    </div>
                  </div>
                </a>
                <a href="/board">
                  <div class="summary-todos-badge">
                    <svg
                      width="70"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      class="bi bi-check-circle-fill"
                    >
                      <path
                        d="M12 21C16.9706 21 21 16.9706 21 12C21 10.1666 20.4518 8.46124 19.5103 7.03891L12.355 14.9893C11.6624 15.7589 10.4968 15.8726 9.66844 15.2513L6.4 12.8C5.95817 12.4686 5.86863 11.8418 6.2 11.4C6.53137 10.9582 7.15817 10.8686 7.6 11.2L10.8684 13.6513L18.214 5.48955C16.5986 3.94717 14.4099 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                      />
                    </svg>
                    <div>
                      <br />
                      <span id="doneNum">${done}</span
                      ><!--HIER COUNTER FÜR DONE AUFGABEN-->
                      <p>Done</p>
                    </div>
                  </div>
                </a>
              </div>
              <a href="/board">
                <div class="summary-urgent">
                  <div class="summary-urgent-badge">
                    <svg
                      width="61"
                      height="61"
                      viewBox="0 0 61 61"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="30.1445" cy="30.8083" r="30" fill="#FF3D00" />
                      <g clip-path="url(#clip0_62_691)">
                        <path
                          d="M45.0159 41.9714C44.6149 41.9721 44.2242 41.8425 43.9014 41.6018L29.7961 31.0719L15.6909 41.6018C15.4928 41.7499 15.2679 41.8571 15.029 41.9172C14.79 41.9774 14.5417 41.9893 14.2981 41.9524C14.0546 41.9154 13.8207 41.8302 13.6097 41.7018C13.3987 41.5733 13.2147 41.4041 13.0684 41.2037C12.922 41.0033 12.8161 40.7757 12.7566 40.5339C12.6972 40.2921 12.6854 40.0408 12.7219 39.7944C12.7957 39.2967 13.0618 38.849 13.4617 38.5499L28.6816 27.1765C29.0041 26.9349 29.3948 26.8044 29.7961 26.8044C30.1974 26.8044 30.5881 26.9349 30.9107 27.1765L46.1305 38.5499C46.4483 38.7869 46.684 39.1194 46.8039 39.5001C46.9238 39.8807 46.9218 40.2899 46.7982 40.6693C46.6746 41.0487 46.4357 41.3789 46.1157 41.6127C45.7956 41.8466 45.4107 41.9721 45.0159 41.9714Z"
                          fill="white"
                        />
                        <path
                          d="M45.0159 32.0195C44.6149 32.0202 44.2242 31.8906 43.9014 31.6499L29.7961 21.12L15.6909 31.6499C15.2909 31.949 14.79 32.0751 14.2981 32.0004C13.8063 31.9258 13.364 31.6565 13.0684 31.2518C12.7728 30.8471 12.6482 30.3401 12.7219 29.8425C12.7957 29.3448 13.0618 28.8971 13.4617 28.598L28.6816 17.2246C29.0041 16.983 29.3948 16.8525 29.7961 16.8525C30.1974 16.8525 30.5881 16.983 30.9107 17.2246L46.1305 28.598C46.4483 28.835 46.684 29.1675 46.8039 29.5482C46.9238 29.9288 46.9218 30.338 46.7982 30.7174C46.6746 31.0968 46.4357 31.427 46.1157 31.6608C45.7956 31.8947 45.4107 32.0202 45.0159 32.0195Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_62_691">
                          <rect
                            width="34.186"
                            height="25.1163"
                            fill="white"
                            transform="translate(12.7031 16.855)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <div>
                      <br />
                      <span id="urgentNum">${urgent}</span
                      ><!--HIER COUNTER FÜR URGENT AUFGABEN-->
                      <p>Urgent</p>
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2"
                    height="106"
                    viewBox="0 0 2 106"
                    fill="none"
                  >
                    <path
                      d="M1 1.98828V104.011"
                      stroke="#D1D1D1"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  <div>
                    <h6 id="deadlineDate">${returnDeadline()}</h6>
                    <!--HIER DATUM FÜR URGENT AUFGABEN-->
                    <p>Upcoming Deadline</p>
                  </div>
                </div>
              </a>
              <div class="summary-overview">
                <a href="/board">
                  <div class="summary-overview-badge">
                    <br />
                    <span id="tasksNum">0</span
                    ><!--HIER COUNTER FÜR GESAMT TASKS-->
                    <p>Tasks in<br />Board</p>
                  </div>
                </a>
                <a href="/board">
                  <div class="summary-overview-badge">
                    <br />
                    <span id="inProgressNum">${inProgress}</span
                    ><!--HIER COUNTER FÜR in PROGRESS AUFGABEN-->
                    <p>Tasks in<br />Progress</p>
                  </div>
                </a>
                <a href="/board">
                  <div class="summary-overview-badge">
                    <br />
                    <span id="awaitFeedbackNum">${awaitFeedback}</span
                    ><!--HIER COUNTER FÜR FEEDBACK AUFGABEN-->
                    <p>Awaiting <br />Feedback</p>
                  </div>
                </a>
              </div>
    `;
}

//Berechnet wie oft ein Status im Array vorhanden ist
function calculateArray() {
  todo = 0;
  inProgress = 0;
  awaitFeedback = 0;
  done = 0;

  for (let i = 0; i < tasks.length; i++) {
    const element = tasks[i].progress;
    const priority = tasks[i].priority;

    if (priority == "urgent") {
      urgent++;
    }

    if (element === "todo") {
      todo++;
    } else if (element === "inProgress") {
      inProgress++;
    } else if (element === "awaitFeedback") {
      awaitFeedback++;
    } else if (element === "done") {
      done++;
    }
  }
}

//Nimmt Datum, von der ersten urgent task
function returnDeadline() {
  let date;
  let dateFound = false;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].priority == "urgent" && !dateFound) {
      dateFound = true;
      date = tasks[i].date;
    } else {
      date = "no Urgent Tasks found";
    }
  }
  return /*html*/ `
        <p>${date}</p>
    `;
}
