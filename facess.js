// Access the webcam stream
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        const video = document.getElementById('video');
        video.srcObject = stream;
        video.play();
    })
    .catch(err => {
        console.error("Error accessing the webcam: " + err);
    });

// Capture an image from the video stream
function captureImage() {
    const canvas = document.getElementById('canvas');
    const video = document.getElementById('video');
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = document.getElementById('capturedImage');
    image.src = canvas.toDataURL('image/png');
    image.style.display = 'block';

    const submitButton = document.getElementById('submit');
    submitButton.style.display = 'inline';
}

// Submit the captured image to the backend
function submitImage() {
    const image = document.getElementById('capturedImage').src;
    
    fetch('http://your-backend-url/api/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: image })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Image submitted successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
