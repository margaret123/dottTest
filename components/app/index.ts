import template from './template';
import  '../search-bar';
import  '../books-list';

class TestApp extends HTMLElement {
    static readonly appTemplate = (document.createElement('template').innerHTML = template);
    static readonly is = 'test-app';
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = TestApp.appTemplate;
    }
    connectedCallback() {

    }
  }
customElements.define(TestApp.is, TestApp);