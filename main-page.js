import {
    html,
    PolymerElement
}
    from '@polymer/polymer/polymer-element.js';

class MainPage extends PolymerElement {
    static get template() {
        return html`
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
                <span class="col-lg-1"></span>        
        
        
      
                
				<style>
        #end-turn-button {
			display:none;
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

.row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}
@media (max-width: 992px) {
    .info-text {
        margin-top: 2em;
        margin-bottom: 2em;
    }

    .buttons {
        padding: 5em 10em 2em 2em;
    }

    .buy-button {
        margin-top: 5px;
    }
}


@media (min-width: 992px) {

    .buttons {
        padding: 2em;
    }

    .buy-button {
        margin-top: 5px;
    }

    .one-buy-button {
        padding-right: 2em;
        margin-bottom: 1em;
    }

    .buy-house-span {
        margin-right: 1em;
    }

    .house {
        margin-right: 0.2em;
    }

    .info-text {

    }
}

.info-text {
    padding-top: 1em;
    background-color: white;
}

#info-text-div {
    position: relative;
    display: inline-block;
    overflow: hidden;
}

#info-text-div .letter {
    display: inline-block;
    line-height: 1em
}

.buttons {
    background-color: white;
}

#main-body {
    background-color: lightgray;
}

.main-header {
    background-color: white;
    margin-top: 2em;
    margin-bottom: 2em;
    padding-top: 0.5em;
    min-height: 8em;
}

#main-header-current-player {
    font-size: 1.2em;
    font-weight: bold;
    text-decoration: underline;
}
.info-text {
    margin-top: 2em;
    margin-bottom: 2em;
}
.info-text {
    padding-top: 1em;
    background-color: white;
}



      </style>
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
