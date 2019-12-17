import {
	html,
	PolymerElement
}
from '@polymer/polymer/polymer-element.js';

class MainPage extends PolymerElement {
	static get template() {
		return html `
		 <div class="container">
            <div class="row">
     <style>
        #end-turn-button {
			display:none;
		}
		
		.buttons {
    background-color: white;
}
.border-primary {
    border-color: #007bff!important;
}
.btn-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}
.btn-danger {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
}

      </style>
      <span class="buttons border border-primary col-lg-3 col-md-10 ">
	  <div class="btn-group buttonGroup">
                            <button class="btn btn-primary" id="roll-button">[[btnname]]</button>
                            <button class="btn btn-danger" id="quit-button">Quit Game</button>
                        </div>
                        <div id="buy-buttons" class="btn-group row buttonGroup">
                            <br>
                        </div>
                        <div>
                            <br>
                            <button id="end-turn-button">End Turn</button>
                        </div>
                </span>
				</div>
				</div>
    `;
	}
	
	static get properties() {
        return {
            btnname: {
                type: String,
            },
        };
    }
}
customElements.define('main-page', MainPage);
