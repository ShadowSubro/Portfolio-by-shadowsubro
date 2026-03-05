// Variables
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let selectedTheme = sessionStorage.getItem('user-theme');
const themes = ['theme1', 'theme2', 'theme3', 'theme4', 'theme5'];

// Theme select everytime someone reload or revisits the website
if (!selectedTheme) {
  selectedTheme = themes[Math.floor(Math.random() * themes.length)];
  sessionStorage.setItem('user-theme', selectedTheme);
}

document.documentElement.classList.add(selectedTheme);

// Menu toggle
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active');
}

// Function to load projects dynamically
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        const projectsBox = document.querySelector('.projects-box');

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';

            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="btn">Review Project</div>
            `;

            projectsBox.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Load projects when the page loads
document.addEventListener('DOMContentLoaded', loadProjects);

// Form validation
const contactForm = document.querySelector('.contact form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.querySelector('input[placeholder="Full Name"]').value.trim();
    const email = document.querySelector('input[placeholder="Email"]').value.trim();
    const phone = document.querySelector('input[placeholder="Phone Number"]').value.trim();
    const subject = document.querySelector('input[placeholder="Subject"]').value.trim();
    const message = document.querySelector('textarea').value.trim();
    
    if (!fullName || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Here you can add code to send the form data to a server
    alert('Form submitted successfully! (Note: This is a demo. In a real application, you would send this data to a server.)');
    
    // Reset form
    contactForm.reset();
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Typing effect
const typingText = "Web Developer";
const typingElement = document.getElementById('typing');
let index = 0;

function typeWriter() {
    if (index < typingText.length) {
        typingElement.textContent += typingText.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    typeWriter();
});
