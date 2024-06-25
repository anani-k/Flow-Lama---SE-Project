function sendDataToServer() {
    const dataToSend = {};

    globalTasks.forEach((task, index) => {
        dataToSend[`task_${index}_progress`] = task.progress;
        dataToSend[`task_${index}_category`] = task.category;
        dataToSend[`task_${index}_title`] = task.title;
        dataToSend[`task_${index}_description`] = task.description;
        dataToSend[`task_${index}_date`] = task.date;
        dataToSend[`task_${index}_openSubtasks`] = task.openSubtasks;
        dataToSend[`task_${index}_closedSubtasks`] = task.closedSubtasks;
        dataToSend[`task_${index}_priority`] = task.priority;
        dataToSend[`task_${index}_assigedToId`] = task.assigedToId;
    });

    globalContacts.forEach((contact, index) => {
        dataToSend[`contact_${index}_id`] = contact.id;
        dataToSend[`contact_${index}_firstName`] = contact.firstName;
        dataToSend[`contact_${index}_lastName`] = contact.lastName;
        dataToSend[`contact_${index}_initials`] = contact.initials;
        dataToSend[`contact_${index}_color`] = contact.color;
        dataToSend[`contact_${index}_email`] = contact.email;
        dataToSend[`contact_${index}_phone`] = contact.phone;
    });

    dataToSend.GlobalLastId = GlobalLastId;
    console.log(dataToSend);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/newDataFromClient', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(dataToSend));

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Data sent successfully!');
        } else {
            console.error('Error sending data:', xhr.statusText);
        }
    };
}