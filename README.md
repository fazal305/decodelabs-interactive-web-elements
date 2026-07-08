# JS Interactive Lab

A vanilla JavaScript interactive elements lab built for the DecodeLabs Frontend Development Internship.

## Live Links

- GitHub Repository: https://github.com/fazal305/decodelabs-interactive-web-elements
- Live Demo: https://fazal305.github.io/decodelabs-interactive-web-elements/

## Overview

JS Interactive Lab is a small frontend project that demonstrates core JavaScript interactivity using DOM manipulation, events, dynamic UI states, localStorage, and the Clipboard API.

The project was created for **DecodeLabs Project 3 — Interactive Web Elements** and polished under the Fazal Labs portfolio ecosystem.

## Features

- Dark/light mode toggle
- Theme persistence with localStorage
- Dynamic counter
- Positive and negative counter states
- JavaScript FAQ accordion
- Only one FAQ item open at a time
- Live character counter
- Warning state near character limit
- Colour palette generator
- Random hex colour generation
- Click-to-copy colour swatches
- Show/hide content cards
- Responsive layout
- Accessible ARIA states for accordions and toggles

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- localStorage
- Clipboard API
- GitHub Pages
  Folder Structure
  Project-03-Interactive-Web-Elements/
  index.html
  styles.css
  script.js
  README.md
  LICENSE
  .gitignore
  Getting Started

Clone the repository:

git clone https://github.com/fazal305/decodelabs-interactive-web-elements.git

Open the folder:

cd decodelabs-interactive-web-elements

Open index.html in your browser.

No installation or build tools are required.

DecodeLabs Engineering Standards Applied
const and let only
No var
No inline event handlers
addEventListener() for interactions
textContent for safe DOM updates
js-_ JavaScript hook classes
is-_ state classes
Input → Process → Output logic style
Separated HTML, CSS, and JavaScript files
Architecture Notes

The project is split into three main files:

index.html contains the page structure and interactive components.
styles.css controls the responsive layout, theme variables, cards, buttons, and visual states.
script.js controls theme switching, counter logic, FAQ accordion, character counter, palette generation, copy-to-clipboard, and show/hide cards.
Accessibility

Accessibility support includes:

Semantic sections
Clear heading structure
Button type="button" attributes
aria-live for counter, character count, and copy feedback
aria-expanded for FAQ accordion and show/hide cards
aria-controls relationships
Visible keyboard focus states
Screen-reader friendly colour copy buttons
Performance

Performance notes:

No frameworks
No external libraries
No image assets
Lightweight static files
Uses CSS variables for theme switching
GitHub Pages compatible
Testing Checklist

Before final submission:

Test theme toggle
Refresh page and confirm saved theme
Test increment, decrement, and reset
Test FAQ accordion
Test character counter
Test character limit warning
Test palette generation
Test copy-to-clipboard
Test show/hide cards
Test mobile responsiveness
Run JavaScript syntax check:
node --check script.js
Lessons Learned
Using JavaScript to manage UI state
Handling events with addEventListener
Updating the DOM safely
Using localStorage for persistence
Using the Clipboard API
Creating accessible interactive components
Preparing a small internship project for portfolio use
Future Improvements
Add animation settings
Add custom palette saving
Add copy history
Add keyboard shortcuts
Add more interactive widgets
Add a mini quiz section
Add a JavaScript concepts notes section
