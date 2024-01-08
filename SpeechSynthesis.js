export class SpeechSynthesis {
    #synth;
    #inputTextarea;
    #voiceSelect;
    #voices;
    #pitch;
    #pitchValue;
    #rate;
    #rateValue;
    #speak;
    #pause;
    #cancel;
    #resume;

    constructor() {
        this.#synth = window.speechSynthesis;

        if (!this.#synth) {
            throw new Error('Speech Synthesis is not available in your browser.');
        }

        this.#speak = document.querySelector('#speak');
        this.#pause = document.querySelector('#pause');
        this.#cancel = document.querySelector('#cancel');
        this.#resume = document.querySelector('#resume');
        this.#inputTextarea = document.querySelector('#input-textarea');
        this.#voiceSelect = document.querySelector('#voice-select');
        this.#pitch = document.querySelector("#pitch");
        this.#pitchValue = document.querySelector("#pitch-value");
        this.#rate = document.querySelector("#rate");
        this.#rateValue = document.querySelector("#rate-value");

        this.#voices = [];

        this.#getVoiceList();

        console.log(speechSynthesis)
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this.#getVoiceList;
        }

        this.#pitchValue.textContent = this.#pitch.value;
        this.#pitch.addEventListener('input', (event) => {
            this.#pitchValue.textContent = event.target.value;
        });

        this.#rateValue.textContent = this.#rate.value;
        this.#rate.addEventListener('input', (event) => {
            this.#rateValue.textContent = event.target.value;
        });

        this.#speak.addEventListener('click', this.#onSpeak);
        this.#pause.addEventListener('click', this.#onPause);
        this.#cancel.addEventListener('click', this.#onCancel);
        this.#resume.addEventListener('click', this.#onResume);
    }

    #getVoiceList = () => {
        this.#voices = this.#synth.getVoices();

        this.#voices.forEach((voicesItem) => {
            const option = document.createElement('option');
            option.textContent = `${voicesItem.name} (${voicesItem.lang})`;

            if (voicesItem.default) {
                option.textContent += ' — DEFAULT';
            }

            option.setAttribute('data-lang', voicesItem.lang);
            option.setAttribute('data-name', voicesItem.name);

            this.#voiceSelect.appendChild(option);
        })
    }

    #onSpeak = (event) => {
        event.preventDefault();

        const utterThis = new SpeechSynthesisUtterance(this.#inputTextarea.value);
        const selectedOption = this.#voiceSelect.selectedOptions[0].getAttribute('data-name');

        this.#voices.forEach((voicesItem) => {
            if (voicesItem.name === selectedOption) {
                utterThis.voice = voicesItem;
            }
        })

        utterThis.pitch = this.#pitch.value;
        utterThis.rate = this.#rate.value;

        this.#synth.speak(utterThis);

        this.#inputTextarea.blur();
    };

    #onPause = () => {
        this.#synth.pause();
    }

    #onCancel = () => {
        this.#synth.cancel();
    }

    #onResume = () => {
        this.#synth.resume();
    }
}
