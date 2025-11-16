// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Select the elements
    const navToggle = document.querySelector('.nav-toggle'); // The hamburger button
    const mainNav = document.querySelector('.main-nav');   // The navigation container

    // 2. Check if elements exist before adding the listener
    if (navToggle && mainNav) {
        // Event listener for the toggle button
        navToggle.addEventListener('click', () => {
            // Toggles the 'active' class on the navigation
            // CSS handles the actual display/hide based on this class
            mainNav.classList.toggle('active');
        });

        // 3. Optional: Add a listener to close the menu after a link is clicked
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                // Remove the 'active' class to hide the menu
                mainNav.classList.remove('active');
            });
        });
    }

    // 4. (Optional) JS for the Planner Widget to slide up/down when 'Plan' is clicked
    const plannerCta = document.querySelector('.btn-plan-cta');
    const plannerWidget = document.getElementById('planner-form');

    if (plannerCta && plannerWidget) {
        plannerCta.addEventListener('click', (e) => {
            e.preventDefault(); // Stop the default jump
            plannerWidget.classList.toggle('visible');
            // Note: You must add CSS for the .planner-widget and .planner-widget.visible state
        });
    }
});
