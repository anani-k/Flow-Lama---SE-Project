//Author Ann-Katrin

// Array mit Beispiel Kontakten
let sortedContacts = sortContactsByFirstName(globalContacts);

let firstLetter = [];

let colorSaved = "";

//init wird immer ausgeführt wenn die HTML datei geladen ist und ruft die Funktion zur erstellung der Tasks auf
function init() {
  this.renderContacts();
}

//sortiert Kontakte nach Buchstaben
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

//Generiert die kontaktliste
function renderContacts() {
  document.getElementById("contactsListContainer").innerHTML = "";
  for (let i = 0; i < sortedContacts.length; i++) {
    const element = sortedContacts[i];
    let OnefirstLetter = element.firstName.charAt(0).toUpperCase();

    if (istBuchstabeInArray(OnefirstLetter)) {
      document.getElementById(
        OnefirstLetter + "container"
      ).innerHTML += /*html*/ `
        <div id="contact0" class="user" onclick="openContact(${i})">
  <div class="user-icon" style="background-color: ${element.color};">${element.initials}</div>
    <div class="username">
      <span>${element.firstName} ${element.lastName}</span>
      <a>${element.email}</a>
    </div>
  </div>
`;
    } else {
      firstLetter.push(OnefirstLetter);
      let id = OnefirstLetter + "container";
      document.getElementById("contactsListContainer").innerHTML += /*html*/ `
      <p>${OnefirstLetter}</p>
      <hr>
      <div id="${id}">
        <div id="contact0" class="user" onclick="openContact(${i})">
        <div class="user-icon" style="background-color: ${element.color};">${element.initials}</div>
    <div class="username">
      <span>${element.firstName} ${element.lastName}</span>
      <a>${element.email}</a>
    </div>
  </div>
  </div>
`;
    }
  }
  firstLetter = [];
}

//Macht einen Buchstabe als Überkategorie und schaut ob es vorhanden ist
function istBuchstabeInArray(buchstabe) {
  return firstLetter.includes(buchstabe);
}

//HTML mit Variablen
function openContact(i) {
  let element = sortedContacts[i];
  let content = document.getElementById("openContacs");
  content.innerHTML = /*html*/ `
    <div class="contactNameInfo">
    <div class="userIconContacts" style="background-color: ${element.color};">${element.initials}</div>
    <div class="contactFullname">
        <h2>${element.firstName} ${element.lastName}</h2>
        <a class="cursorPointer" onclick="deleteContacs(${i})">
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
Delete
</a>
<a class="cursorPointer" onclick="edidContact(${i})">
<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="24px" height="24px"><path fill="#a5d6a7" d="M11,43.8l2.4-8.4c0.1-0.5,0.4-0.9,0.8-1.3l22-21.9c2.3-2.3,6-2.1,8.1,0.4c1.8,2.2,1.5,5.5-0.5,7.5L21.9,41.8	c-0.4,0.4-0.8,0.6-1.3,0.8L12.2,45C11.5,45.2,10.8,44.5,11,43.8z"/><path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M18.4,21.8L32.1,8.1c2.3-2.3,6-2.1,8.1,0.4c1.8,2.2,1.5,5.5-0.5,7.5l-2.8,2.8"/><path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M32.5,23.3L17.9,37.8c-0.4,0.4-0.8,0.6-1.3,0.8L6.5,41.5l2.9-10.1c0.1-0.5,0.4-0.9,0.8-1.3l3.7-3.7"/><line x1="29.1" x2="36.9" y1="11.1" y2="18.9" fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/></svg>
Edit
</a>
    </div>
</div>
    <div>    
        <h2>Contact Information</h2>

        <div class="contactsInfoAboutMe">
        <div>
          <h4>Email</h4>
          <a>${element.email}</a></div>
        <div>
        <h4>Phone</h4>
        <p class="phonenumber">${element.phone}</p></div>
        </div>
    </div>
  `;
}

//Löscht Kontakte ;)
function deleteContacs(i) {
  let array = this.findIndexById(sortedContacts[i].id);
  globalContacts.splice(array, 1);
  sortedContacts = sortContactsByFirstName(globalContacts);
  this.renderContacts();
  document.getElementById("openContacs").innerHTML = "";
}

//Öffnet das Edit Fenster
function edidContact(i) {
  let element = sortedContacts[i];
  document.getElementById("id01").classList.remove("d-none");
  document.getElementById("popup-fields").innerHTML = /*html*/ `
                <form class="popup-input noselect" onsubmit="SaveEditContact(event, ${i})">
                <input pattern="[a-zA-Z ]+" type="name" placeholder="First Name"required="" class="task-title-input" name="firstName" value="${element.firstName}">
                <input pattern="[a-zA-Z ]+" type="name" placeholder="Last Name"required="" class="task-title-input" name="lastName"  value="${element.lastName}">
                <input type="email" placeholder="Email" id="popUpEmail" required="" class="task-title-input" name="email"  value="${element.email}">
                <input type="phone" placeholder="Phone" id="popUpPhone" required="" class="task-title-input" name="phone"  value="${element.phone}">
                <div id="popup-buttons" class="popup-buttons"><br>
                  <button onclick="closeForm()" class="buttonCancel" type="button">Cancel <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                  </svg></button>
                  <button class="buttonInput" id="popUpSubmit" type="submit">Save changes</button>
                </div>
              </form>
  `;
}

//Speichert die änderungen
function SaveEditContact(event, i) {
  event.preventDefault(); // Verhindert das Standardverhalten des Formulars
  let localContact = sortedContacts[i];

  let newContact = {
    id: "",
    firstName: "",
    lastName: "",
    initials: "",
    color: "",
    email: "",
    phone: "",
  };

  const form = event.target;
  // Holt alle Eingabefelder des Formulars
  const formData = new FormData(form);
  newContact.id = localContact.id;
  newContact.color = localContact.color;

  for (const [name, value] of formData.entries()) {
    newContact[name] = value;
  }

  newContact.initials = getInitials(newContact.firstName, newContact.lastName);
  GlobalLastId++;

  for (let x = 0; x < globalContacts.length; x++) {
    let id1 = globalContacts[x].id;
    let id2 = sortedContacts[i].id;
    if (id1 == id2) {
      globalContacts[x] = newContact;
    }
  }
  document.getElementById("id01").classList.add("d-none");
  sortedContacts = sortContactsByFirstName(globalContacts);
  this.renderContacts();
  this.openContact(i);
}

//die Kontakt ID gibt man in die Funktion und erhält die stelle im Array contacts zurück
function findIndexById(id) {
  for (let i = 0; i < globalContacts.length; i++) {
    if (globalContacts[i].id === id) {
      return i;
    }
  }
}

//hügt einen neuen kontakt hinzu
function addNewContact(event) {
  event.preventDefault(); // Verhindert das Standardverhalten des Formulars

  let newContact = {
    id: "",
    firstName: "",
    lastName: "",
    initials: "",
    color: "",
    email: "",
    phone: "",
  };

  const form = event.target;
  // Holt alle Eingabefelder des Formulars
  const formData = new FormData(form);

  for (const [name, value] of formData.entries()) {
    newContact[name] = value;
  }

  newContact.initials = getInitials(newContact.firstName, newContact.lastName);
  newContact.id = GlobalLastId + 1;
  GlobalLastId++;
  if (!newContact.color) {
    newContact.color = getRandomColor();
  }

  globalContacts.push(newContact);
  // Hier kannst du die Logik hinzufügen, um den neuen Kontakt zu speichern
  document.getElementById("id01").classList.add("d-none");
  sortedContacts = sortContactsByFirstName(globalContacts);
  this.renderContacts();
}

//Generriert eine Zufällige farbe für die icons
function getRandomColor() {
  // Generiere eine zufällige Ganzzahl zwischen 0 und 255 für Rot, Grün und Blau
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  // Konvertiere die Ganzzahlen in zweistellige Hexadezimalwerte
  let rHex = r.toString(16).padStart(2, "0");
  let gHex = g.toString(16).padStart(2, "0");
  let bHex = b.toString(16).padStart(2, "0");

  // Füge die Hex-Werte zusammen und gib sie zurück
  return `#${rHex}${gHex}${bHex}`;
}

//Gibt initialen
function getInitials(firstName, lastName) {
  // Überprüfen, ob die Eingaben gültige Strings sind
  if (typeof firstName !== "string" || typeof lastName !== "string") {
    throw new Error("Vorname und Nachname müssen Strings sein.");
  }

  // Entferne führende und folgende Leerzeichen und wandle die Namen in Großbuchstaben um
  firstName = firstName.trim().toUpperCase();
  lastName = lastName.trim().toUpperCase();

  // Hole die ersten Buchstaben der Namen
  const firstInitial = firstName.charAt(0);
  const lastInitial = lastName.charAt(0);

  // Gebe die Initialen zurück
  return firstInitial + lastInitial;
}

//Öffnet das Add new Contact formular
function openAddContant() {
  document.getElementById("id01").classList.remove("d-none");
  document.getElementById("popup-fields").innerHTML = /*html*/ `
                <form class="popup-input noselect" onsubmit="addNewContact(event)">
                <input pattern="[a-zA-Z ]+" type="name" placeholder="First Name"required="" class="task-title-input" name="firstName">
                <input pattern="[a-zA-Z ]+" type="name" placeholder="Last Name"required="" class="task-title-input" name="lastName">
                <input type="email" placeholder="Email" id="popUpEmail" required="" class="task-title-input" name="email">
                <input type="phone" placeholder="Phone" id="popUpPhone" required="" class="task-title-input" name="phone">
                <div id="popup-buttons" class="popup-buttons"><br>
                  <button onclick="closeForm()" class="buttonCancel" type="button">Cancel <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                  </svg></button>
                  <button class="buttonInput" id="popUpSubmit" type="submit">Create contact</button>
                </div>
              </form>
  `;
}

//Schließt das Add new Contact formular
function closeForm() {
  document.getElementById("id01").classList.add("d-none");
}
