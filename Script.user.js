// ==UserScript==
// @name         Stream-Streak entfernen
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Entfernt die Viewer-Streak von den Channelpoints
// @author       Pillowg1rl
// @match        https://www.twitch.tv/*
// @match        http://www.twitch.tv/*
// @grant        none
// @updateURL    https://github.com/Pillowg1rl/Twitch_Settings_Window/raw/main/Script.user.js
// @downloadURL  https://github.com/Pillowg1rl/Twitch_Settings_Window/raw/main/Script.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Define the class name of the elements you want to apply CSS to
    var classNameToApplyCSS = 'Layout-sc-1xcs6mc-0.bplHXs';
    var styleElement;
    var enabled = localStorage.getItem('streamStreakEnabled') === 'true';
    var height = parseInt(localStorage.getItem('channelpointsHeight')) || 300;

    // Function to toggle the CSS
    function toggleCSS() {
        enabled = !enabled;
        localStorage.setItem('streamStreakEnabled', enabled);
        if (enabled) {
            // Apply CSS if enabled
            applyCSS();
        } else {
            // Remove CSS if disabled
            removeCSS();
        }
        updateToggleSwitch();
    }

    // Function to apply the CSS
    function applyCSS() {
        // Define the CSS styles you want to apply
        var cssStyles = `
            /* Add your CSS styles here */
            .${classNameToApplyCSS} {
                display: none !important; /* For example: Hide the element */
            }
        `;

        // Create a <style> element
        styleElement = document.createElement('style');

        // Set the CSS text
        styleElement.textContent = cssStyles;

        // Append the <style> element to the <head>
        document.head.appendChild(styleElement);
    }

    // Function to remove the CSS
    function removeCSS() {
        if (styleElement) {
            styleElement.remove(); // Remove the style element if it exists
            styleElement = null; // Reset styleElement
        }
    }

    // Function to create and append the toggle button
    function createToggleButton() {
        var button = document.createElement('button');
        button.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>`;
        button.style.position = 'fixed';
        button.style.bottom = '10px'; // Adjusted bottom position
        button.style.right = '100px'; // Adjusted right position
        button.style.zIndex = '9999'; // Ensure the button is above other elements
        button.style.backgroundColor = '#9147ff'; // Purple background color
        button.style.color = '#FFFFFF'; // White text color
        button.style.width = '30px'; // Set width to 30px
        button.style.height = '30px'; // Set height to 30px
        button.style.padding = '0'; // Removed padding
        button.style.border = 'none'; // Remove border
        button.style.borderRadius = '4px'; // Add border radius
        button.style.cursor = 'pointer'; // Change cursor to pointer
        button.addEventListener('click', function() {
            toggleSettingsWindow();
        });
        document.body.appendChild(button);
    }

    // Function to update the toggle switch appearance
    function updateToggleSwitch() {
        var toggleSwitch = document.getElementById('toggleSwitch');
        if (toggleSwitch) {
            if (enabled) {
                toggleSwitch.style.backgroundColor = '#4CAF50'; // Green color
            } else {
                toggleSwitch.style.backgroundColor = '#FF5733'; // Red color
            }
        }
    }

    // Function to open or close the settings window
    function toggleSettingsWindow() {
        var settingsWindow = document.getElementById('settingsWindow');
        if (settingsWindow) {
            document.body.removeChild(settingsWindow);
        } else {
            openSettingsWindow();
        }
    }

    // Function to open the settings window
    function openSettingsWindow() {
        var settingsWindow = document.createElement('div');
        settingsWindow.id = 'settingsWindow';
        settingsWindow.style.position = 'fixed';
        settingsWindow.style.bottom = '40px'; // Adjusted bottom position
        settingsWindow.style.right = '20px';
        settingsWindow.style.backgroundColor = '#2e2e2e'; // Dark background color
        settingsWindow.style.padding = '30px'; // Increased padding
        settingsWindow.style.border = '2px solid #000000'; // Black border
        settingsWindow.style.borderRadius = '8px'; // Border radius
        settingsWindow.style.zIndex = '10000'; // Ensure the window is above other elements

        var title = document.createElement('h2');
        title.textContent = 'Settings';
        title.style.color = '#FFFFFF'; // White text color
        title.style.marginBottom = '20px'; // Added margin below the title
        settingsWindow.appendChild(title);

        var closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '5px';
        closeButton.style.backgroundColor = 'transparent';
        closeButton.style.border = 'none';
        closeButton.style.color = '#FFFFFF'; // White text color
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', function() {
            document.body.removeChild(settingsWindow);
        });
        settingsWindow.appendChild(closeButton);

        var toggleSwitchContainer = document.createElement('div');
        toggleSwitchContainer.className = 'row';

        var toggleLabel = document.createElement('span');
        toggleLabel.className = 'label';
        toggleLabel.textContent = 'Streak Removal';
        toggleLabel.style.marginRight = '10px'; // Added margin between text and element

        var toggleSwitch = document.createElement('label');
        toggleSwitch.className = 'switch';
        var toggleInput = document.createElement('input');
        toggleInput.type = 'checkbox';
        toggleInput.checked = enabled;
        toggleInput.addEventListener('change', toggleCSS);
        var toggleSpan = document.createElement('span');
        toggleSpan.className = 'slider round';
        toggleSwitch.appendChild(toggleInput);
        toggleSwitch.appendChild(toggleSpan);

        toggleSwitchContainer.appendChild(toggleLabel);
        toggleSwitchContainer.appendChild(toggleSwitch);

        var heightContainer = document.createElement('div');
        heightContainer.className = 'row';

        var heightLabel = document.createElement('span');
        heightLabel.className = 'label';
        heightLabel.textContent = 'Height Channelpoints';
        heightLabel.style.marginRight = '10px'; // Added margin between text and element

        var heightInput = document.createElement('input');
        heightInput.type = 'number';
        heightInput.value = height;
        heightInput.min = '50';
        heightInput.max = '650'; // Updated max value
        heightInput.step = '50';
        heightInput.addEventListener('change', function(event) {
            height = parseInt(event.target.value);
            localStorage.setItem('channelpointsHeight', height);
            applyHeightCSS();
        });

        heightContainer.appendChild(heightLabel);
        heightContainer.appendChild(heightInput);

        settingsWindow.appendChild(toggleSwitchContainer);
        settingsWindow.appendChild(heightContainer);

        document.body.appendChild(settingsWindow);
    }

    // Function to apply the height CSS
    function applyHeightCSS() {
        var heightCSS = `
            .Layout-sc-1xcs6mc-0.dcyYPL.reward-center__content,
            .ScBalloonWrapper-sc-14jr088-0.fzhWKT.InjectLayout-sc-1i43xsx-0.jKAcCJ.tw-balloon {
                height: ${height}px !important;
            }
        `;

        // Create a <style> element
        var heightStyleElement = document.createElement('style');

        // Set the CSS text
        heightStyleElement.textContent = heightCSS;

        // Append the <style> element to the <head>
        document.head.appendChild(heightStyleElement);
    }

    window.addEventListener('load', function() {
        createToggleButton();
        if (enabled) {
            applyCSS();
        }
        applyHeightCSS();
    });
})();
