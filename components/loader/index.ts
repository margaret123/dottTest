import template from './template';

class loaderElement extends HTMLElement {
    static readonly appTemplate = (document.createElement('template').innerHTML = template);
    static readonly is = 'loader-element';
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = loaderElement.appTemplate;
    }
    connectedCallback() {

    }
  }
customElements.define(loaderElement.is, loaderElement);