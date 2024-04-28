// Function to initialize the AudioContext
function initializeAudioContext() {
    if (window.AudioContext || window.webkitAudioContext) {
        return new (window.AudioContext || window.webkitAudioContext)();
    } else {
        console.error('AudioContext is not supported in this browser.');
        return null;
    }
}

// Function to start the blow detection
function startBlowDetection(threshold) {
    const audioContext = initializeAudioContext();
    if (audioContext) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                const source = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();
                source.connect(analyser);

                // Analyze audio data
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                function detectBlow() {
                    analyser.getByteFrequencyData(dataArray);

                    // Calculate average volume
                    const averageVolume = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;

                    console.log('Average Volume:', averageVolume); // Debugging: Log average volume

                    if (averageVolume > threshold) {
                        console.log('Blow detected! Candle blown out.');
                        const flame = document.getElementById('flame');
                        flame.style.animation = 'blowout 5s forwards'; // Apply blowout animation
                    }

                    // Repeat detection
                    requestAnimationFrame(detectBlow);
                }

                // Start detecting blow
                detectBlow();
            })
            .catch((error) => {
                console.error('Error accessing microphone:', error);
            });
    }
}

// Event listener for user gesture (e.g., button click)
document.getElementById('startButton').addEventListener('click', function() {
    console.log('Button pressed.'); // Debugging: Log button press
    // Specify the threshold for blow detection
    const threshold = 20;
    console.log('Starting blow detection with threshold:', threshold); // Debugging: Log threshold
    // Start blow detection with the specified threshold
    startBlowDetection(threshold);
});
