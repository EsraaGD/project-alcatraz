var audioContext = new (window.AudioContext || window.AudioContext)();
// Request access to the user's microphone
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (stream) {
    var source = audioContext.createMediaStreamSource(stream);
    var analyser = audioContext.createAnalyser();
    source.connect(analyser);
    // Analyze audio data
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    function detectBlow() {
        analyser.getByteFrequencyData(dataArray);
        // Calculate average volume
        var averageVolume = dataArray.reduce(function (acc, val) { return acc + val; }, 0) / bufferLength;
        // Set a threshold for blow detection
        var threshold = 100;
        if (averageVolume > threshold) {
            // Blow detected, perform action to blow out the candle
            console.log('Blow detected! Candle blown out.');
        }
        // Repeat detection
        requestAnimationFrame(detectBlow);
    }
    // Start detecting blow
    detectBlow();
})["catch"](function (error) {
    console.error('Error accessing microphone:', error);
});
