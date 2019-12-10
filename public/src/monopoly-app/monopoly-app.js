import {html, PolymerElement} from '../../node_modules/@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class MonopolyApp extends PolymerElement {
    static get template() {
        return html`
        <div class="container">
            <div class="row">
                <span class="col-lg-1"></span>
                <span class="main-header border border-primary col-lg-10 col-md-10">
                    <p id="main-header-current-player"></p>
                    <p id="main-header-current-money"></p>
                </span>
            </div>
            <div class="row">
                <span class="col-lg-1"></span>
                <span class="info-text border border-primary col-lg-6 col-md-10 ">
                    <div id="info-text-div">
                       <span id="letters">
                        </span>
                    </div>
                </span>
                <span class="col-lg-1"></span>
                <span id="button-span" class="buttons border border-primary col-lg-3 col-md-10 ">
                        <div class="btn-group buttonGroup">
                            <button class="btn btn-primary" id="roll-button">Roll</button>
                            <button class="btn btn-danger" id="quit-button">Quit Game</button>
                        </div>
                    <buy-buttons></buy-buttons>
                        <div id="buy-buttons" class="btn-group row buttonGroup">
                            <br>
                        </div>
                        <div>
                            <br>
                            <button id="end-turn-button">End Turn</button>
                        </div>
                </span>
                <span class="col-lg-1"></span>
            </div>
        </div>
    `;
    }

    static get properties() {
        return {
            prop1: {
                type: JSON,
                value: 'monopoly-app'
            }
        };
    }
}

window.customElements.define('monopoly-app', MonopolyApp);
