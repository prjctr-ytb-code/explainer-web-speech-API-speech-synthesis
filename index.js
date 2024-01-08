import {SpeechSynthesis} from './SpeechSynthesis.js';

(() => {
    const readyState = document.readyState;

    if (readyState === 'interactive' || readyState === "complete") {
        new SpeechSynthesis();
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            new SpeechSynthesis();
        });
    }
})();
