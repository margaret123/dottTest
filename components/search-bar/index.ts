import template from './template';

namespace CORE{
    export interface IWindow extends Window{
        webkitSpeechRecognition: any;
    }
}

namespace CORE{
    export class SearchBar extends HTMLElement {
        static readonly elementTemplate = (document.createElement('template').innerHTML = template);
        static readonly is = 'search-bar';
        voiceButton: HTMLElement;
        searchInput: HTMLInputElement;
        constructor() {
            super();
            const shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = SearchBar.elementTemplate;
            this.voiceButton = shadowRoot.querySelector('.voice-button') as HTMLElement;
            this.searchInput = shadowRoot.querySelector('.search-input') as HTMLInputElement;
        }
        
        onInputValueChanged() {
            if (this.searchInput.value) {
                let searchQuery = this.searchInput.value.split(' ').join('+');
                let searchEvent = new CustomEvent('startBooksFetching', {detail: searchQuery});
                document.dispatchEvent(searchEvent);
            }
        }
        startVoiceRecord() {
            const {webkitSpeechRecognition}: IWindow = <IWindow>window;
            var recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.lang = navigator.language;
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.start();
    
            recognition.onresult = (e: any) => {
                let results = e.results[0][0].transcript;
                this.searchInput.value = results; 
                recognition.stop();
                this.onInputValueChanged();
            };
        }
        firstTask() {
            let addN = (number0: number) => {
                return (number1: number, number2 = number0) => {
                  console.log(number1 + number2);
                }
            };
            const addEight = addN(8);
            addEight(7);
            addEight(100);
        }
        connectedCallback() {
          this.voiceButton.addEventListener('click', () => { this.startVoiceRecord()});
          this.searchInput.addEventListener('change', () => {this.onInputValueChanged()});
          this.firstTask();
        }
        disconnectedCallback() {
          this.voiceButton.removeEventListener('click', () => { this.startVoiceRecord()});
          this.searchInput.removeEventListener('change', () => {this.onInputValueChanged()});
        }
      }
    customElements.define(SearchBar.is, SearchBar);
}

