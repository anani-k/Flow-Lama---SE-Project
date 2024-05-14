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
    <div class="placeholder">no task found</div>
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
}

function allowDrop(ev) {
    ev.preventDefault();
}

function startDraggin(index) {
    currentDraggedElement = index;
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