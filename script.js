// Card interactions
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const actionCards = document.querySelectorAll('.action-card');
    const progressBar = document.querySelector('.progress-bar');
    const playBtn = document.querySelector('.control-btn.play');
    let isPlaying = false;
    let progressInterval;

    // Menu button interaction
    menuBtn.addEventListener('click', () => {
        menuBtn.style.transform = 'rotate(90deg)';
        menuBtn.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            menuBtn.style.transform = 'rotate(0deg)';
        }, 300);
    });

    // Action cards interactions
    actionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.action-icon');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.action-icon');
            icon.style.transform = 'scale(1)';
        });

        // Click effect
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95) translateY(-5px)';
            setTimeout(() => {
                card.style.transform = 'translateY(-5px)';
            }, 200);
        });
    });

    // Progress bar animation
    function updateProgress() {
        let width = 0;
        progressInterval = setInterval(() => {
            width = (width + 1) % 101;
            progressBar.style.width = width + '%';
        }, 100);
    }

    // Play button interaction
    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playBtn.textContent = isPlaying ? 'Pause' : 'Play';
        
        if (isPlaying) {
            updateProgress();
            playBtn.style.backgroundColor = 'var(--secondary-color)';
        } else {
            clearInterval(progressInterval);
            playBtn.style.backgroundColor = 'var(--primary-color)';
        }
    });

    // Control buttons hover effect
    const controlBtns = document.querySelectorAll('.control-btn');
    controlBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (!btn.classList.contains('play')) {
                btn.style.backgroundColor = 'var(--background-color)';
            }
        });

        btn.addEventListener('mouseleave', () => {
            if (!btn.classList.contains('play')) {
                btn.style.backgroundColor = 'var(--card-bg)';
            }
        });
    });

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('div');
        
        ripple.className = 'ripple';
        button.appendChild(ripple);

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = event.clientX - rect.left - size/2 + 'px';
        ripple.style.top = event.clientY - rect.top - size/2 + 'px';

        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }

    // Add ripple style
    const style = document.createElement('style');
    style.textContent = `
        .control-btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add ripple event listeners
    controlBtns.forEach(button => {
        button.addEventListener('click', createRipple);
    });
}); 