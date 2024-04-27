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
    var audioContext = initializeAudioContext();
    if (audioContext) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                var source = audioContext.createMediaStreamSource(stream);
                var analyser = audioContext.createAnalyser();
                source.connect(analyser);
                var bufferLength = analyser.frequencyBinCount;
                var dataArray = new Uint8Array(bufferLength);
                function detectBlow() {
                    analyser.getByteFrequencyData(dataArray);
                    var averageVolume = dataArray.reduce(function (acc, val) { return acc + val; }, 0) / bufferLength;
                    if (averageVolume > threshold) {
                        console.log('Blow detected! Candle blown out.');
                        var flame = document.getElementById('flame');
                        flame.style.animation = 'blowout 1s forwards';
                    }
                    requestAnimationFrame(detectBlow);
                }
                detectBlow();
            })
            .catch(function (error) {
                console.error('Error accessing microphone:', error);
            });
    }
}

// Event listener for user gesture (e.g., button click)
document.getElementById('startButton').addEventListener('click', function() {
    // Specify the threshold for blow detection
    var threshold = 50;
    // Start blow detection with the specified threshold
    startBlowDetection(threshold);
});
