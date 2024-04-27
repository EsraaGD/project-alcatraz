
    const cakeDiv = document.getElementById('cake');

    for (let i = 0; i < 26; i++) {
        const candleDiv = document.createElement('div');
        candleDiv.className = 'candle';
        candleDiv.style.left = `${(i * 4) + 2}%`;

        const flameDiv = document.createElement('div');
        flameDiv.className = 'flame';
        flameDiv.style.left = `${(i * 4) + 2}%`;

        candleDiv.appendChild(flameDiv);
        cakeDiv.appendChild(candleDiv);
    }
