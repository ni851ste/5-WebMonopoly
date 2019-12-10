import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class MonopolyApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello World!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'monopoly-app'
      }
    };
  }
}

window.customElements.define('monopoly-app', MonopolyApp);
