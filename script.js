// Birthday Website JavaScript

// Photo gallery functionality
class PhotoGallery {
    constructor() {
        this.currentPhotoIndex = 0;
        this.photos = [
            // Local photos from photos folder
            'photos/IMG_20250824_010711336_HDR_AE.jpg',
            'photos/IMG_20250824_010840890_AE.jpg',
            'photos/WhatsApp Image 2025-10-02 at 23.17.20_5897cd52.jpg',
            'photos/WhatsApp Image 2025-10-02 at 23.17.20_b1b8b9f5.jpg',
            'photos/WhatsApp Image 2025-10-02 at 23.17.25_f7eeec5a.jpg',
            'photos/WhatsApp Image 2025-10-02 at 23.21.51_95fc33e6.jpg'
        ];
        this.init();
    }

    init() {
        this.setupPhotoClickHandlers();
        this.setupModalHandlers();
        this.loadPhotos();
    }

    setupPhotoClickHandlers() {
        const photoItems = document.querySelectorAll('.photo-item');
        photoItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openModal(index);
            });
        });
    }

    setupModalHandlers() {
        const modal = document.getElementById('photoModal');
        const closeBtn = document.querySelector('.close');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        prevBtn.addEventListener('click', () => {
            this.showPreviousPhoto();
        });

        nextBtn.addEventListener('click', () => {
            this.showNextPhoto();
        });

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (event) => {
            if (modal.style.display === 'block') {
                if (event.key === 'Escape') {
                    this.closeModal();
                } else if (event.key === 'ArrowLeft') {
                    this.showPreviousPhoto();
                } else if (event.key === 'ArrowRight') {
                    this.showNextPhoto();
                }
            }
        });
    }

    loadPhotos() {
        const photoItems = document.querySelectorAll('.photo-item');
        photoItems.forEach((item, index) => {
            if (this.photos[index]) {
                const img = new Image();
                img.onload = () => {
                    item.innerHTML = `<img src="${this.photos[index]}" alt="Birthday Photo ${index + 1}" style="width: 100%; height: 100%; object-fit: cover;">`;
                };
                img.src = this.photos[index];
            }
        });
    }

    openModal(index) {
        this.currentPhotoIndex = index;
        const modal = document.getElementById('photoModal');
        const modalImage = document.getElementById('modalImage');
        
        modalImage.src = this.photos[index];
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }

    closeModal() {
        const modal = document.getElementById('photoModal');
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    showPreviousPhoto() {
        this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.photos.length) % this.photos.length;
        document.getElementById('modalImage').src = this.photos[this.currentPhotoIndex];
    }

    showNextPhoto() {
        this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
        document.getElementById('modalImage').src = this.photos[this.currentPhotoIndex];
    }
}

// Candle blowing functionality
function blowCandle() {
    const flame = document.querySelector('.flame');
    const candle = document.querySelector('.candle');
    const cake = document.querySelector('.cake');
    
    // Add blown out effect with animation
    flame.style.animation = 'none';
    flame.style.transform = 'translateX(-50%) scale(0)';
    flame.style.opacity = '0';
    candle.style.background = 'linear-gradient(to bottom, #ccc, #999)';
    candle.style.animation = 'none';
    
    // Add cake celebration animation
    cake.style.animation = 'cakeCelebration 1s ease-out';
    
    // Add celebration effect
    createCelebrationEffect();
    
    // Show message
    showBirthdayMessage();
    
    // Reset after 4 seconds
    setTimeout(() => {
        flame.style.animation = 'flame-flicker 0.8s ease-in-out infinite alternate';
        flame.style.transform = 'translateX(-50%) scale(1)';
        flame.style.opacity = '1';
        candle.style.background = 'linear-gradient(to bottom, #fff, #f0f0f0)';
        candle.style.animation = 'candleSway 4s ease-in-out infinite';
        cake.style.animation = 'cakeBounce 3s ease-in-out infinite';
    }, 4000);
}

// Create celebration effect when candle is blown
function createCelebrationEffect() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 50);
    }
}

// Create individual confetti pieces
function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.zIndex = '1000';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    
    document.body.appendChild(confetti);
    
    // Animate confetti falling
    const animation = confetti.animate([
        { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: 3000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => {
        confetti.remove();
    };
}

// Show birthday message when candle is blown
function showBirthdayMessage() {
    const messages = [
        "🎉 Happy Birthday My Love! 🎉",
        "Make a wish, beautiful! ✨",
        "I love you so much! 💕",
        "You're my everything! 🌟",
        "Forever yours! 💖",
        "My amazing girlfriend! 🎂"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create floating message
    const messageDiv = document.createElement('div');
    messageDiv.textContent = randomMessage;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.fontSize = '2rem';
    messageDiv.style.fontWeight = 'bold';
    messageDiv.style.color = '#fff';
    messageDiv.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
    messageDiv.style.zIndex = '1001';
    messageDiv.style.pointerEvents = 'none';
    messageDiv.style.animation = 'messageFloat 3s ease-out forwards';
    
    // Add CSS animation
    if (!document.querySelector('#messageAnimation')) {
        const style = document.createElement('style');
        style.id = 'messageAnimation';
        style.textContent = `
            @keyframes messageFloat {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                20% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.2);
                }
                80% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8) translateY(-50px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Smooth scroll for navigation
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.photo-gallery, .messages, .interactive');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Add parallax effect to header
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        const rate = scrolled * -0.5;
        
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Add typing effect to title
function addTypingEffect() {
    const title = document.querySelector('.title');
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Love counter functionality
let loveCount = 0;

// Heart rain animation
function createHeartRain() {
    const heartColors = ['#ff6b6b', '#ff8e8e', '#ffa8a8', '#ffb3ba', '#ffc0cb'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFallingHeart(heartColors[Math.floor(Math.random() * heartColors.length)]);
        }, i * 100);
    }
    
    // Show love message
    showLoveMessage();
}

// Create individual falling hearts
function createFallingHeart(color) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.fontSize = '2rem';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = '-50px';
    heart.style.zIndex = '1000';
    heart.style.pointerEvents = 'none';
    heart.style.color = color;
    heart.style.filter = 'drop-shadow(0 0 10px rgba(255, 107, 107, 0.5))';
    
    document.body.appendChild(heart);
    
    // Animate heart falling
    const animation = heart.animate([
        { 
            transform: 'translateY(0px) rotate(0deg)', 
            opacity: 1 
        },
        { 
            transform: `translateY(${window.innerHeight + 100}px) rotate(360deg)`, 
            opacity: 0 
        }
    ], {
        duration: 3000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => {
        heart.remove();
    };
}

// Show love message
function showLoveMessage() {
    const messages = [
        "💕 Love you so much Anjali! 💕",
        "💖 I love you baby! 💖",
        "💗 You're the prettiest girl in the world! 💗"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create overlay background
    const overlay = document.createElement('div');
    overlay.className = 'love-message-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    overlay.style.zIndex = '9999';
    overlay.style.pointerEvents = 'none';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.backdropFilter = 'blur(5px)';
    
    // Create message container
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-div';
    messageDiv.textContent = randomMessage;
    messageDiv.style.position = 'relative';
    messageDiv.style.fontSize = '2.5rem';
    messageDiv.style.fontWeight = 'bold';
    messageDiv.style.color = '#fff';
    messageDiv.style.textShadow = '3px 3px 6px rgba(0,0,0,0.7)';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.padding = '30px 40px';
    messageDiv.style.background = 'rgba(255, 255, 255, 0.1)';
    messageDiv.style.borderRadius = '20px';
    messageDiv.style.backdropFilter = 'blur(10px)';
    messageDiv.style.border = '2px solid rgba(255, 255, 255, 0.2)';
    messageDiv.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
    messageDiv.style.animation = 'loveMessageFloat 3s ease-out forwards';
    messageDiv.style.maxWidth = '90%';
    messageDiv.style.wordWrap = 'break-word';
    
    overlay.appendChild(messageDiv);
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.remove();
    }, 3000);
}
// Create wish stars animation
function createWishStars() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createStar();
        }, i * 200);
    }
}

// Create individual stars
function createStar() {
    const star = document.createElement('div');
    star.innerHTML = '⭐';
    star.style.position = 'fixed';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';
    star.style.fontSize = '1.5rem';
    star.style.zIndex = '999';
    star.style.pointerEvents = 'none';
    star.style.animation = 'starTwinkle 2s ease-out forwards';
    
    document.body.appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, 2000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize photo gallery
    new PhotoGallery();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Add parallax effect
    addParallaxEffect();
    
    // Add typing effect
    addTypingEffect();
    
    // Add click sound effect (optional)
    document.addEventListener('click', () => {
        // You can add a subtle click sound here if desired
    });
    
    // Add enhanced hover effects to message cards
    const messageCards = document.querySelectorAll('.message-card');
    messageCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02) rotate(1deg)';
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            card.style.zIndex = '1';
        });
        
        // Add click effect
        card.addEventListener('click', () => {
            card.style.animation = 'messageClick 0.6s ease-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 600);
        });
    });
    
    // Add photo click counter
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        item.addEventListener('click', () => {
            loveCount++;
            document.getElementById('loveCount').textContent = loveCount;
            
            // Create heart burst effect
            createHeartBurst(item);
        });
    });
    
    // Add wish input enter key support
    const wishInput = document.getElementById('wishInput');
    wishInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            makeWish();
        }
    });
    
    // Add random sparkle effect
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            createSparkle();
        }
    }, 2000);
});

// Create heart burst effect for photos
function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '1.5rem';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.transform = 'translate(-50%, -50%)';
        
        const angle = (i * 45) * (Math.PI / 180);
        const distance = 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        document.body.appendChild(heart);
        
        const animation = heart.animate([
            { 
                transform: 'translate(-50%, -50%) scale(1)', 
                opacity: 1 
            },
            { 
                transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => {
            heart.remove();
        };
    }
}

// Create random sparkles
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    sparkle.style.fontSize = '1.5rem';
    sparkle.style.zIndex = '999';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkleFade 2s ease-out forwards';
    
    // Add sparkle animation
    if (!document.querySelector('#sparkleAnimation')) {
        const style = document.createElement('style');
        style.id = 'sparkleAnimation';
        style.textContent = `
            @keyframes sparkleFade {
                0% {
                    opacity: 0;
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: scale(1) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// Add touch support for mobile
function addTouchSupport() {
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Swipe detection for photo modal
        const modal = document.getElementById('photoModal');
        if (modal.style.display === 'block') {
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next photo
                    document.getElementById('nextBtn').click();
                } else {
                    // Swipe right - previous photo
                    document.getElementById('prevBtn').click();
                }
            }
        }
        
        startX = 0;
        startY = 0;
    });
}

// Initialize touch support
addTouchSupport();
