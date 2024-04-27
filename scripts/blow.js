// Define a function to create or resume the AudioContext
function initializeAudioContext() {
    // Check if AudioContext is supported
    if (window.AudioContext || window.webkitAudioContext) {
        var audioContext = new (window.AudioContext || window.webkitAudioContext)();
        return audioContext;
    } else {
        console.error('AudioContext is not supported in this browser.');
        return null;
    }
}

// Function to start the blow detection
function startBlowDetection() {
    // Initialize the AudioContext
    var audioContext = initializeAudioContext();
    if (audioContext) {
        // Request access to the user's microphone
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                var source = audioContext.createMediaStreamSource(stream);
                var analyser = audioContext.createAnalyser();
                source.connect(analyser);
                // Continue with blow detection code...
            })
            .catch(function (error) {
                console.error('Error accessing microphone:', error);
            });
    }
}

// Event listener for user gesture (e.g., button click)
document.getElementById('startButton').addEventListener('click', startBlowDetection);
