const audioContext = new (window.AudioContext || window.AudioContext)();

// Request access to the user's microphone
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

            // Set a threshold for blow detection
            const threshold = 100;

            if (averageVolume > threshold) {
                // Blow detected, perform action to blow out the candle
                console.log('Blow detected! Candle blown out.');
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
