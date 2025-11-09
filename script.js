document.addEventListener('DOMContentLoaded', () => {

    // --- [1] Element Selectors ---
    const typingText = document.getElementById('typing-text');
    const heroMessage = document.getElementById('hero-message');
    
    const forgiveBtn = document.getElementById('forgive-btn');
    const hugBtn = document.getElementById('hug-btn');
    const readLetterBtn = document.getElementById('read-letter-btn');
    
    const letterModal = document.getElementById('letter-modal');
    const modalForgiveBtn = document.getElementById('modal-forgive-btn');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const typedLetter = document.getElementById('typed-letter');
    
    const memoryModal = document.getElementById('memory-modal');
    const memoryModalText = document.getElementById('memory-modal-text');
    const memoryModalCloseBtn = document.getElementById('memory-modal-close-btn');
    
    const promiseElements = [
        document.getElementById('promise-1'),
        document.getElementById('promise-2'),
        document.getElementById('promise-3')
    ];
    
    const memoryCarousel = document.querySelector('.memory-carousel');
    const heartsContainer = document.getElementById('hearts-container');
    const confettiContainer = document.getElementById('confetti-container');
    const liveDateEl = document.getElementById('live-date');

    // --- [2] Data & Content ---
    const typingSentences = [
        "You are my calm.",
        "You are the home I never want to leave.",
        "I'm sorry I shouted when I should've held you.",
        "You are my peace.",
        "Your smile is my reason.",
        "I promise to be your safe space."
    ];
    
    const fullLetterText = "My love, I know I shouted when you came to me upset. I was stressed and tired, but that's no excuse. I let my own pain spill onto you, and that’s not what love is. You were looking for a safe harbor, and I was a storm. I am so deeply sorry. You are my peace. You're where my heart feels at home. I’ll spend every day earning your trust back, learning to listen, to hold you when you need it, and to never make you feel alone or unsafe again. I love you more than words can say.";

    const allPromises = [
        "I'll listen first, always.",
        "I'll make you your favorite tea when you're sad.",
        "I'll hold you tighter when words fail.",
        "I'll be your partner, not just your person.",
        "I'll always check my stress at the door.",
        "I'll be the first to apologize.",
        "I'll celebrate your wins and soothe your losses.",
        "I'll make you laugh, especially when it's hard.",
        "I promise to be the calm you deserve."
    ];

    const memories = [
        {
            img: 'https://placehold.co/400x500/f4c2c2/100a1c?text=Our+First+Coffee&font=playfairdisplay',
            caption: 'Our First Coffee',
            description: 'That day, I was so nervous. But you smiled, and the whole world just... stopped. I knew right then.'
        },
        {
            img: 'https://placehold.co/400x500/a890d3/100a1c?text=Rainy+Day+Drive&font=playfairdisplay',
            caption: 'That Rainy Day Drive',
            description: 'We got lost, the music was terrible, but you were singing along. I realized I never want to be lost with anyone else.'
        },
        {
            img: 'https://placehold.co/400x500/d9b99b/100a1c?text=Your+Sleepy+Smile&font=playfairdisplay',
            caption: 'Your Sleepy Smile',
            description: 'That morning I woke up before you... just watching you. That sleepy, perfect smile. That’s my home. That’s my peace.'
        },
        {
            img: 'https://placehold.co/400x500/ff6b81/100a1c?text=Cooking+Disaster&font=playfairdisplay',
            caption: 'The Cooking Disaster',
            description: 'Flour everywhere, smoke alarm blaring... and you laughed until you cried. I realized I never want to lose that laugh.'
        },
        {
            img: 'https://placehold.co/400x500/b0c4de/100a1c?text=The+Park+Bench&font=playfairdisplay',
            caption: 'The Park Bench',
            description: 'We sat for hours and said nothing. And it was the best conversation I’ve ever had. I just felt... understood.'
        }
    ];

    // --- [3] Core Functions ---

    // Hero Typing Effect
    let sentenceIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeHeroSentence() {
        // Guard against null element
        if (!typingText) return; 

        const currentSentence = typingSentences[sentenceIndex];
        let speed = isDeleting ? 75 : 150;

        if (isDeleting) {
            typingText.textContent = currentSentence.substring(0, charIndex--);
        } else {
            typingText.textContent = currentSentence.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentSentence.length) {
            speed = 2000; // Pause at end of sentence
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            sentenceIndex = (sentenceIndex + 1) % typingSentences.length;
        }

        setTimeout(typeHeroSentence, speed);
    }

    // Modal Letter Typing Effect
    function typeLetter() {
        // Guard against null element
        if (!typedLetter) return;

        let i = 0;
        typedLetter.textContent = ""; // Clear previous
        
        function typeChar() {
            if (i < fullLetterText.length) {
                typedLetter.textContent += fullLetterText.charAt(i);
                i++;
                setTimeout(typeChar, 35); // Human-like delay
            }
        }
        typeChar();
    }

    // Show Random Promises
    function showRandomPromises() {
        let usedIndices = new Set();
        promiseElements.forEach(el => {
            // Guard against null elements in the array
            if (!el) return;

            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * allPromises.length);
            } while (usedIndices.has(randomIndex));
            usedIndices.add(randomIndex);
            el.textContent = allPromises[randomIndex];
        });
    }

    // Populate Memory Carousel
    function populateMemories() {
        // Guard against null element
        if (!memoryCarousel) return;

        memoryCarousel.innerHTML = ''; // Clear
        memories.forEach((memory, index) => {
            const card = document.createElement('div');
           card.className = 'memory-card glass-card';
            card.dataset.index = index;
            card.innerHTML = `
                <img src="${memory.img}" alt="${memory.caption}">
                <div class="memory-card-caption">${memory.caption}</div>
            `;
            card.addEventListener('click', () => {
                if (memoryModalText) {
                    memoryModalText.textContent = memory.description;
                }
                if (memoryModal) {
                    memoryModal.classList.add('visible');
                }
            });
            memoryCarousel.appendChild(card);
        });
    }

    // --- [4] Animations ---
    
    // Create a single confetti piece
    function createConfettiPiece() {
        // Guard against null container
        if (!confettiContainer) return;

        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        
        const colors = ['#f4c2c2', '#d9b99b', '#a890d3', '#fff']; // Fixed: Replaced CSS variables with string values
        
        piece.style.left = `${Math.random() * 100}vw`;
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = `${Math.random() * 2 + 3}s`; // 3-5 seconds
        piece.style.opacity = Math.random();
        
        confettiContainer.appendChild(piece);
        
        setTimeout(() => {
            piece.remove();
        }, 5000); // Remove after animation
    }
    
    // Burst of confetti
    function triggerConfetti() {
        for (let i = 0; i < 50; i++) {
            setTimeout(createConfettiPiece, i * 20); // Stagger
        }
    }

    // Create a single floating heart
    function createHeart() {
        // Guard against null container
        if (!heartsContainer) return;

        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '♥';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 5 + 8}s`; // 8-13 seconds
        heart.style.fontSize = `${Math.random() * 0.5 + 0.5}rem`; // 0.5-1rem
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 13000); // Remove after animation
    }

    // --- [5] Event Listeners ---

    // Hero Buttons
    if (forgiveBtn) {
        forgiveBtn.addEventListener('click', () => {
            triggerConfetti();
            showRandomPromises();
        });
    }

    if (hugBtn) {
        hugBtn.addEventListener('click', () => {
            if (heroMessage) {
                heroMessage.textContent = "I'm holding you tight in my mind right now. You are safe with me. Always.";
                heroMessage.style.color = 'var(--color-blush)';
            }
        });
    }

    if (readLetterBtn) {
        readLetterBtn.addEventListener('click', () => {
            if (letterModal) {
                letterModal.classList.add('visible');
            }
            typeLetter(); // Start typing letter
        });
    }

    // Letter Modal Buttons
    function closeLetterModal() {
        if (letterModal) {
            letterModal.classList.remove('visible');
        }
    }
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeLetterModal);
    }
    if (modalForgiveBtn) {
        modalForgiveBtn.addEventListener('click', () => {
            closeLetterModal();
            triggerConfetti();
            if (heroMessage) {
                heroMessage.textContent = "Thank you. My promise starts now.";
                heroMessage.style.color = 'var(--color-rose-gold)';
            }
        });
    }

    // Memory Modal Button
    if (memoryModalCloseBtn) {
        memoryModalCloseBtn.addEventListener('click', () => {
            if (memoryModal) {
                memoryModal.classList.remove('visible');
            }
        });
    }
    
    // Close modals on outside click
    [letterModal, memoryModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('visible');
                }
            });
        }
    });

    // --- [6] Initialization ---
    
    // Set live date
    if (liveDateEl) {
        liveDateEl.textContent = new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Start hero typing
    typeHeroSentence();

    // Start floating hearts
    setInterval(createHeart, 1500);
    
    // Load memories
    populateMemories();

});