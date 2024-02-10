// ==UserScript==
// @name         VMN Twitch Settings
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Vision Makers Network Twitch Settings Window
// @author       Pillowg1rl
// @match        https://www.twitch.tv/*
// @match        http://www.twitch.tv/*
// @grant        none
// @updateURL    https://github.com/Pillowg1rl/Twitch_Settings_Window/raw/main/Script.user.js
// @downloadURL  https://github.com/Pillowg1rl/Twitch_Settings_Window/raw/main/Script.user.js
// GPT           https://chat.openai.com/c/0e38a00c-efc9-4f8e-9d64-f2f606d34877
// ==/UserScript==

(function() {
    'use strict';

    // Define the class name of the elements you want to apply CSS to
    var classNameToApplyStreamStreakCSS = 'Layout-sc-1xcs6mc-0.bplHXs';
    var classNameToApplyChallengesPredictionsCSS = 'Layout-sc-1xcs6mc-0.jPmKIH,.Layout-sc-1xcs6mc-0.esGgHZ';
    var styleElementStreamStreak;
    var styleElementChallengesPredictions;
    var streamStreakEnabled = localStorage.getItem('streamStreakEnabled') === 'true';
    var challengesPredictionsEnabled = localStorage.getItem('challengesPredictionsEnabled') === 'true';
    var height = parseInt(localStorage.getItem('channelpointsHeight')) || 300;
    var settingsWindowOpened = false;

    // Function to toggle the Stream Streak CSS
    function toggleStreamStreakCSS() {
        streamStreakEnabled = !streamStreakEnabled;
        localStorage.setItem('streamStreakEnabled', streamStreakEnabled);
        if (streamStreakEnabled) {
            // Apply CSS if enabled
            applyStreamStreakCSS();
        } else {
            // Remove CSS if disabled
            removeStreamStreakCSS();
        }
        updateToggleSwitch();
    }

    // Function to apply the Stream Streak CSS
    function applyStreamStreakCSS() {
        // Define the CSS styles you want to apply
        var cssStyles = `
            /* Add your CSS styles here */
            .${classNameToApplyStreamStreakCSS} {
                display: none !important; /* For example: Hide the element */
            }
        `;

        // Create a <style> element
        styleElementStreamStreak = document.createElement('style');

        // Set the CSS text
        styleElementStreamStreak.textContent = cssStyles;

        // Append the <style> element to the <head>
        document.head.appendChild(styleElementStreamStreak);
    }

    // Function to remove the Stream Streak CSS
    function removeStreamStreakCSS() {
        if (styleElementStreamStreak) {
            styleElementStreamStreak.remove(); // Remove the style element if it exists
            styleElementStreamStreak = null; // Reset styleElement
        }
    }

    // Function to toggle the Challenges and Predictions CSS
    function toggleChallengesPredictionsCSS() {
        challengesPredictionsEnabled = !challengesPredictionsEnabled;
        localStorage.setItem('challengesPredictionsEnabled', challengesPredictionsEnabled);
        if (challengesPredictionsEnabled) {
            // Apply CSS if enabled
            applyChallengesPredictionsCSS();
        } else {
            // Remove CSS if disabled
            removeChallengesPredictionsCSS();
        }
        updateToggleSwitch();
    }

    // Function to apply the Challenges and Predictions CSS
    function applyChallengesPredictionsCSS() {
        // Define the CSS styles you want to apply
        var cssStyles = `
            /* Add your CSS styles here */
            .${classNameToApplyChallengesPredictionsCSS} {
                display: none !important; /* For example: Hide the element */
            }
        `;

        // Create a <style> element
        styleElementChallengesPredictions = document.createElement('style');

        // Set the CSS text
        styleElementChallengesPredictions.textContent = cssStyles;

        // Append the <style> element to the <head>
        document.head.appendChild(styleElementChallengesPredictions);
    }

    // Function to remove the Challenges and Predictions CSS
    function removeChallengesPredictionsCSS() {
        if (styleElementChallengesPredictions) {
            styleElementChallengesPredictions.remove(); // Remove the style element if it exists
            styleElementChallengesPredictions = null; // Reset styleElement
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

// Define settingsWindow globally
var settingsWindow;

// Function to toggle the settings window
function toggleSettingsWindow() {
    if (settingsWindowOpened) {
        document.body.removeChild(settingsWindow);
        settingsWindowOpened = false;
    } else {
        openSettingsWindow();
        settingsWindowOpened = true;
    }
}

    // Function to open the settings window
    function openSettingsWindow() {
        if (settingsWindowOpened) return; // If window is already open, return
        settingsWindow = document.createElement('div');
        settingsWindow.style.position = 'fixed';
        settingsWindow.style.bottom = '60px'; // Adjusted bottom position
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
            settingsWindowOpened = false;
        });
        settingsWindow.appendChild(closeButton);

        var streamStreakToggleSwitchContainer = document.createElement('div');
        streamStreakToggleSwitchContainer.className = 'row';

        var streamStreakToggleLabel = document.createElement('span');
        streamStreakToggleLabel.className = 'label';
        streamStreakToggleLabel.textContent = 'Stream Streak Removal';
        streamStreakToggleLabel.style.marginRight = '10px'; // Added margin between text and element

        var streamStreakToggleSwitch = document.createElement('label');
        streamStreakToggleSwitch.className = 'switch';
        var streamStreakToggleInput = document.createElement('input');
        streamStreakToggleInput.type = 'checkbox';
        streamStreakToggleInput.checked = streamStreakEnabled;
        streamStreakToggleInput.addEventListener('change', toggleStreamStreakCSS);
        var streamStreakToggleSpan = document.createElement('span');
        streamStreakToggleSpan.className = 'slider round';
        streamStreakToggleSwitch.appendChild(streamStreakToggleInput);
        streamStreakToggleSwitch.appendChild(streamStreakToggleSpan);

        streamStreakToggleSwitchContainer.appendChild(streamStreakToggleLabel);
        streamStreakToggleSwitchContainer.appendChild(streamStreakToggleSwitch);

        var challengesPredictionsToggleSwitchContainer = document.createElement('div');
        challengesPredictionsToggleSwitchContainer.className = 'row';

        var challengesPredictionsToggleLabel = document.createElement('span');
        challengesPredictionsToggleLabel.className = 'label';
        challengesPredictionsToggleLabel.textContent = 'Challenges and Predictions Removal';
        challengesPredictionsToggleLabel.style.marginRight = '10px'; // Added margin between text and element

        var challengesPredictionsToggleSwitch = document.createElement('label');
        challengesPredictionsToggleSwitch.className = 'switch';
        var challengesPredictionsToggleInput = document.createElement('input');
        challengesPredictionsToggleInput.type = 'checkbox';
        challengesPredictionsToggleInput.checked = challengesPredictionsEnabled;
        challengesPredictionsToggleInput.addEventListener('change', toggleChallengesPredictionsCSS);
        var challengesPredictionsToggleSpan = document.createElement('span');
        challengesPredictionsToggleSpan.className = 'slider round';
        challengesPredictionsToggleSwitch.appendChild(challengesPredictionsToggleInput);
        challengesPredictionsToggleSwitch.appendChild(challengesPredictionsToggleSpan);

        challengesPredictionsToggleSwitchContainer.appendChild(challengesPredictionsToggleLabel);
        challengesPredictionsToggleSwitchContainer.appendChild(challengesPredictionsToggleSwitch);

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

        settingsWindow.appendChild(streamStreakToggleSwitchContainer);
        settingsWindow.appendChild(challengesPredictionsToggleSwitchContainer);
        settingsWindow.appendChild(heightContainer);

        document.body.appendChild(settingsWindow);
        settingsWindowOpened = true;
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
        if (streamStreakEnabled) {
            applyStreamStreakCSS();
        }
        if (challengesPredictionsEnabled) {
            applyChallengesPredictionsCSS();
        }
        applyHeightCSS();
    });
})();
