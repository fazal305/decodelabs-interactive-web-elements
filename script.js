const themeToggleBtn = document.querySelector(".js-theme-toggle");
const decrementBtn = document.querySelector(".js-decrement-btn");
const incrementBtn = document.querySelector(".js-increment-btn");
const resetBtn = document.querySelector(".js-reset-btn");
const counterDisplay = document.querySelector(".js-counter-display");
const faqItems = document.querySelectorAll(".faq-item");
const messageInput = document.querySelector(".js-message-input");
const charCount = document.querySelector(".js-char-count");
const warningMessage = document.querySelector(".js-warning-message");
const generateBtn = document.querySelector(".js-generate-btn");
const paletteContainer = document.querySelector(".js-palette-container");
const copyMessage = document.querySelector(".js-copy-message");
const cardToggleBtns = document.querySelectorAll(".js-card-toggle");

let count = 0;
let isDarkMode = false;

// INPUT: page load → PROCESS: read saved theme → OUTPUT: apply saved theme.
function initTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        isDarkMode = true;
        document.body.classList.add("is-dark-mode");
        themeToggleBtn.textContent = "☀️ Switch to Light";
    }
}

// INPUT: click → PROCESS: toggle theme state and save → OUTPUT: update body class and button text.
function toggleTheme() {
    isDarkMode = !isDarkMode;

    document.body.classList.toggle("is-dark-mode", isDarkMode);

    if (isDarkMode) {
        localStorage.setItem("theme", "dark");
        themeToggleBtn.textContent = "☀️ Switch to Light";
    } else {
        localStorage.setItem("theme", "light");
        themeToggleBtn.textContent = "🌙 Switch to Dark";
    }
}

// INPUT: click → PROCESS: increase count → OUTPUT: refresh display.
function incrementCounter() {
    count++;
    updateCounterDisplay();
}

// INPUT: click → PROCESS: decrease count → OUTPUT: refresh display.
function decrementCounter() {
    count--;
    updateCounterDisplay();
}

// INPUT: click → PROCESS: reset count → OUTPUT: refresh display.
function resetCounter() {
    count = 0;
    updateCounterDisplay();
}

// PROCESS: check count value → OUTPUT: update number and color classes.
function updateCounterDisplay() {
    counterDisplay.textContent = count;

    counterDisplay.classList.remove("is-positive", "is-negative");

    if (count > 0) {
        counterDisplay.classList.add("is-positive");
    }

    if (count < 0) {
        counterDisplay.classList.add("is-negative");
    }
}

// INPUT: page load → PROCESS: attach FAQ listeners → OUTPUT: accordion becomes interactive.
function initAccordion() {
    faqItems.forEach((item) => {
        const faqBtn = item.querySelector(".js-faq-btn");

        faqBtn.addEventListener("click", () => {
            toggleAccordion(item);
        });
    });
}

// INPUT: FAQ click → PROCESS: close others and toggle selected → OUTPUT: one item opens.
function toggleAccordion(clickedItem) {
    const isAlreadyOpen = clickedItem.classList.contains("is-open");

    faqItems.forEach((item) => {
        item.classList.remove("is-open");
    });

    if (!isAlreadyOpen) {
        clickedItem.classList.add("is-open");
    }
}

// INPUT: typing → PROCESS: count characters → OUTPUT: update count, color, and warning.
function updateCharCount() {
    const maxLength = 150;
    const currentLength = messageInput.value.length;

    charCount.textContent = `${currentLength} / ${maxLength} characters`;

    charCount.classList.remove("is-warning", "is-danger");
    warningMessage.textContent = "";

    if (currentLength >= 120 && currentLength < maxLength) {
        charCount.classList.add("is-warning");
    }

    if (currentLength === maxLength) {
        charCount.classList.add("is-danger");
        warningMessage.textContent = "Character limit reached.";
    }
}

// INPUT: click → PROCESS: generate five colors → OUTPUT: create swatches.
function generatePalette() {
    paletteContainer.textContent = "";
    copyMessage.textContent = "";

    for (let i = 0; i < 5; i++) {
        const hexCode = generateRandomHex();
        const swatch = document.createElement("button");

        swatch.classList.add("color-swatch");
        swatch.style.backgroundColor = hexCode;
        swatch.textContent = hexCode;

        swatch.addEventListener("click", () => {
            copyToClipboard(hexCode);
        });

        paletteContainer.appendChild(swatch);
    }
}

// PROCESS: create random hex value → OUTPUT: return color code.
function generateRandomHex() {
    const characters = "0123456789ABCDEF";
    let hexCode = "#";

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        hexCode += characters[randomIndex];
    }

    return hexCode;
}

// INPUT: swatch click → PROCESS: copy hex code → OUTPUT: show copied message.
function copyToClipboard(hexCode) {
    navigator.clipboard.writeText(hexCode);

    copyMessage.textContent = `${hexCode} copied!`;

    setTimeout(() => {
        copyMessage.textContent = "";
    }, 1500);
}

// INPUT: page load → PROCESS: attach card listeners → OUTPUT: cards become toggleable.
function initCardToggles() {
    cardToggleBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            toggleCard(btn);
        });
    });
}

// INPUT: click → PROCESS: find card content and toggle state → OUTPUT: show or hide content.
function toggleCard(btn) {
    const toggleCardWrapper = btn.closest(".toggle-card");
    const cardContent = toggleCardWrapper.querySelector(".card-content");
    const isHidden = cardContent.classList.toggle("is-hidden");

    if (isHidden) {
        btn.textContent = "Show Details";
    } else {
        btn.textContent = "Hide Details";
    }
}

initTheme();
initAccordion();
initCardToggles();

themeToggleBtn.addEventListener("click", toggleTheme);
incrementBtn.addEventListener("click", incrementCounter);
decrementBtn.addEventListener("click", decrementCounter);
resetBtn.addEventListener("click", resetCounter);
messageInput.addEventListener("input", updateCharCount);
generateBtn.addEventListener("click", generatePalette);