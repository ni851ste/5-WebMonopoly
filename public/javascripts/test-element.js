import { LitElement } from './node_modules/lit-element/lit-element.js';
import { html } from './node_modules/lit-html/lit-html.js';

export class TestElement extends LitElement {
    static get properties() {
        return { name: { type: String } };
    }

    constructor() {
        super();
        this.name = 'World';
    }

    render() {
        return html`<p>Hello, ${this.name}!</p>`;
    }
}
