import {LitElement, html} from '@polymer/polymer';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@polymer/iron-demo-helpers/demo-snippet.js';

class MainPage extends LitElement {
    static get template() {
        return html`
      <div class="container">
            <div class="row">
                <span class="col-lg-1"></span>
                <span class="main-header border border-primary col-lg-10 col-md-10">
                    <p id="main-header-current-player">Player1</p>
                    <p id="main-header-current-money">Money: 1500</p>
                </span>
            </div>
            <div class="row">
                <span class="col-lg-1"></span>
                <span class="info-text border border-primary col-lg-6 col-md-10 ">
                    <div id="info-text-div">
                       <span id="letters"><p id="text-p0"><span class="letter" style="transform: translateY(0em) translateZ(0px);">S</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">t</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">a</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">r</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">t</span> <span class="letter" style="transform: translateY(0em) translateZ(0px);">y</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">o</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">u</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">r</span> <span class="letter" style="transform: translateY(0em) translateZ(0px);">t</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">u</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">r</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">n</span> <span class="letter" style="transform: translateY(0em) translateZ(0px);">b</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">y</span> <span class="letter" style="transform: translateY(0em) translateZ(0px);">r</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">o</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">l</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">l</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">i</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">n</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">g</span> <span class="letter" style="transform: translateY(0em) translateZ(0px);">t</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">h</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">e</span> <span class="letter" style="transform: translateY(0em) translateZ(0px);">d</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">i</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">c</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">e</span><span class="letter" style="transform: translateY(0em) translateZ(0px);">.</span></p></span>
                    </div>
                </span>
                <span class="col-lg-1"></span>
                <span class="buttons border border-primary col-lg-3 col-md-10 ">
                        <div class="btn-group buttonGroup">
                            <button class="btn btn-primary" id="roll-button" style="display: block;">Roll</button>
                            <button class="btn btn-danger" id="quit-button" style="display: block;">Quit Game</button>
                        </div>
                        <div id="buy-buttons" class="btn-group row buttonGroup"></div>
                        <div>
                            <br>
                            <button id="end-turn-button" style="display: none;">End Turn</button>
                        </div>
                </span>
                <span class="col-lg-1"></span>
            </div>
        </div>
    `;
    }
}
customElements.define('main-page', MainPage);