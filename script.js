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

const maxMessageLength = 150;

let count = 0;
let isDarkMode = false;

function initTheme() {
    const savedTheme = localStorage.getItem("interactiveLabTheme");

    isDarkMode = savedTheme === "dark";
    document.body.classList.toggle("is-dark-mode", isDarkMode);
    updateThemeButton();
}

function updateThemeButton() {
    themeToggleBtn.textContent = isDarkMode ? "☀️ Switch to Light" : "🌙 Switch to Dark";
    themeToggleBtn.setAttribute("aria-pressed", String(isDarkMode));
}

function toggleTheme() {
    isDarkMode = !isDarkMode;

    document.body.classList.toggle("is-dark-mode", isDarkMode);
    localStorage.setItem("interactiveLabTheme", isDarkMode ? "dark" : "light");

    updateThemeButton();
}

function incrementCounter() {
    count++;
    updateCounterDisplay();
}

function decrementCounter() {
    count--;
    updateCounterDisplay();
}

function resetCounter() {
    count = 0;
    updateCounterDisplay();
}

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

function initAccordion() {
    faqItems.forEach((item, index) => {
        const faqBtn = item.querySelector(".js-faq-btn");
        const faqAnswer = item.querySelector(".faq-answer");
        const answerId = `faq-answer-${index + 1}`;

        faqAnswer.id = answerId;
        faqBtn.setAttribute("aria-expanded", "false");
        faqBtn.setAttribute("aria-controls", answerId);

        faqBtn.addEventListener("click", () => {
            toggleAccordion(item);
        });
    });
}

function toggleAccordion(clickedItem) {
    const isAlreadyOpen = clickedItem.classList.contains("is-open");

    faqItems.forEach((item) => {
        const button = item.querySelector(".js-faq-btn");

        item.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
    });

    if (!isAlreadyOpen) {
        const clickedButton = clickedItem.querySelector(".js-faq-btn");

        clickedItem.classList.add("is-open");
        clickedButton.setAttribute("aria-expanded", "true");
    }
}

function updateCharCount() {
    const currentLength = messageInput.value.length;

    charCount.textContent = `${currentLength} / ${maxMessageLength} characters`;
    charCount.classList.remove("is-warning", "is-danger");
    warningMessage.textContent = "";

    if (currentLength >= 120 && currentLength < maxMessageLength) {
        charCount.classList.add("is-warning");
    }

    if (currentLength === maxMessageLength) {
        charCount.classList.add("is-danger");
        warningMessage.textContent = "Character limit reached.";
    }
}

function generatePalette() {
    paletteContainer.textContent = "";
    copyMessage.textContent = "";

    for (let i = 0; i < 5; i++) {
        const hexCode = generateRandomHex();
        const swatch = document.createElement("button");

        swatch.classList.add("color-swatch");
        swatch.style.backgroundColor = hexCode;
        swatch.textContent = hexCode;
        swatch.type = "button";
        swatch.setAttribute("aria-label", `Copy color ${hexCode}`);

        swatch.addEventListener("click", () => {
            copyToClipboard(hexCode);
        });

        paletteContainer.appendChild(swatch);
    }
}

function generateRandomHex() {
    const characters = "0123456789ABCDEF";
    let hexCode = "#";

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        hexCode += characters[randomIndex];
    }

    return hexCode;
}

async function copyToClipboard(hexCode) {
    try {
        await navigator.clipboard.writeText(hexCode);
        showCopyMessage(`${hexCode} copied!`);
    } catch {
        showCopyMessage("Copy failed. Please copy manually.");
    }
}

function showCopyMessage(message) {
    copyMessage.textContent = message;

    setTimeout(() => {
        copyMessage.textContent = "";
    }, 1500);
}

function initCardToggles() {
    cardToggleBtns.forEach((btn, index) => {
        const toggleCardWrapper = btn.closest(".toggle-card");
        const cardContent = toggleCardWrapper.querySelector(".card-content");
        const contentId = `toggle-card-content-${index + 1}`;

        cardContent.id = contentId;
        btn.setAttribute("aria-expanded", "false");
        btn.setAttribute("aria-controls", contentId);

        btn.addEventListener("click", () => {
            toggleCard(btn);
        });
    });
}

function toggleCard(btn) {
    const toggleCardWrapper = btn.closest(".toggle-card");
    const cardContent = toggleCardWrapper.querySelector(".card-content");
    const isHidden = cardContent.classList.toggle("is-hidden");

    btn.textContent = isHidden ? "Show Details" : "Hide Details";
    btn.setAttribute("aria-expanded", String(!isHidden));
}

initTheme();
initAccordion();
initCardToggles();
updateCharCount();
generatePalette();

themeToggleBtn.addEventListener("click", toggleTheme);
incrementBtn.addEventListener("click", incrementCounter);
decrementBtn.addEventListener("click", decrementCounter);
resetBtn.addEventListener("click", resetCounter);
messageInput.addEventListener("input", updateCharCount);
generateBtn.addEventListener("click", generatePalette);