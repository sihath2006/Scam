document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const successView = document.getElementById('success-view');
    const mainCard = document.getElementById('main-card');

    // Create background hearts
    createHearts();

    // Event Listeners for the "No" button
    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('touchstart', moveButton); // For mobile/touch

    // Event Listener for the "Yes" button
    yesBtn.addEventListener('click', acceptProposal);

    // Event Listeners for the Letter Modal
    const letterBtn = document.getElementById('letter-btn');
    const letterModal = document.getElementById('letter-modal');
    const closeLetter = document.getElementById('close-letter');
    const letterOverlay = document.getElementById('letter-overlay');

    letterBtn.addEventListener('click', openLetter);
    closeLetter.addEventListener('click', closeLetter_func);
    letterOverlay.addEventListener('click', closeLetter_func);

    function openLetter() {
        letterModal.classList.remove('hidden');
    }

    function closeLetter_func() {
        letterModal.classList.add('hidden');
    }

    function moveButton(e) {
        if (e.type === 'touchstart') e.preventDefault(); // Prevent click on mobile tap

        const btnRect = noBtn.getBoundingClientRect();

        // Add generous padding to keep button well within viewport
        const padding = 50;
        const maxX = window.innerWidth - btnRect.width - padding;
        const maxY = window.innerHeight - btnRect.height - padding;

        // Generate random position, ensuring it stays within bounds
        const randomX = Math.max(padding, Math.min(Math.floor(Math.random() * maxX), maxX - padding));
        const randomY = Math.max(padding, Math.min(Math.floor(Math.random() * maxY), maxY - padding));

        // Apply new position using fixed positioning
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        noBtn.style.zIndex = '50';
        noBtn.style.visibility = 'visible'; // Ensure it's always visible
        noBtn.style.opacity = '1'; // Ensure it's always opaque

        // Add a little spin for fun
        const rotation = Math.random() * 20 - 10;
        noBtn.style.transform = `rotate(${rotation}deg)`;

        // Optional: Make Yes button grow slightly each time No is dodged to encourage clicking Yes
        growYesButton();
    }

    let yesScale = 1;
    function growYesButton() {
        yesScale += 0.1;
        // Cap the growth so it doesn't cover the screen too fast
        if (yesScale < 2.5) {
            yesBtn.style.transform = `scale(${yesScale})`;
        }
    }

    function acceptProposal() {
        // Hide the main card or just show the overlay
        // mainCard.style.display = 'none'; // Optional: hide main card

        // Show success view
        successView.classList.remove('hidden');

        // Launch confetti
        launchConfetti();

        // Launch continuously for a few seconds
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            launchConfetti();
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    function launchConfetti() {
        confetti({
            particleCount: 5,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
        });
    }

    function createHearts() {
        const bg = document.querySelector('.background-hearts');
        const heartCount = 15;

        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart-bg');
            heart.innerHTML = '❤️';

            // Random positioning and delay
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 10 + 10 + 's';
            heart.style.animationDelay = Math.random() * -10 + 's';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';

            bg.appendChild(heart);
        }
    }
});
