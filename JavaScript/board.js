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

let currentDraggedElement;

function init() {
    generateCard();
}

function generateCard() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitFeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {

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