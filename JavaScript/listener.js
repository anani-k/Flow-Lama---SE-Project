const eventSource = new EventSource('http://localhost:3000/updates');

eventSource.onmessage = (event) => {
    if (event.data === 'update') {
        // Refresh the client-side data
        fetch('/updates')
            .then(response => response.json())
            .then(data => {
                console.log('Received updates:', data);
                // Update the client-side state with the new data
            })
            .catch(error => console.error('Error fetching updates:', error));
    }
};