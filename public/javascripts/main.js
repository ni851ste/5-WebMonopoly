const ROLL = "r";
const QUIT = "q";
const END_TURN = "e";
const GET_JSON = "json";

let websocket;
$(document).ready(function () {
    $("#roll-button").click(function () {
            websocket.send(ROLL);
        }
    );
    $("#quit-button").click(function () {
        websocket.send(QUIT);
        $("#main-body").empty();
        $("#main-body").append(
            $('<p>¯\\_(ツ)_/¯</p>').css({'font-size': '20em', 'font-weight': 'bold', 'text-align': 'center'})
        ).css({'background-color': 'pink'});
    });
    $("#end-turn-button").click(function () {
        websocket.send(END_TURN);
    });
    showStaticButtons();
    connectWebSocket();
});

function generateBuyButtons(json) {
    removeBuyButtons();
    let buyButtons = $("#buy-buttons");
    let currentPlayer = getCurrentPlayer(json);
    currentPlayer.bought_fields.sort(compareStreet).forEach(f => {
        buyButtons.append(
            $('<div/>', {'class': 'one-buy-button'}).append(
                $('<p/>', {'class': 'house-par', 'id': f.name + '-p'})
                    .append($('<span/>', {'class': 'buy-house-span', 'text': f.name}))
            ).append(
                $('<button/>', {
                    'id': f.name + '-button',
                    'class': 'buy-button btn-primary',
                    'text': "Buy house on " + f.name,
                    click: () => {
                        $.ajax("/game/" + f.name, {
                            method: "GET",
                            dataType: "json",
                            success: update
                        })
                    }
                })
            )
        );
        for (let i = 0; i < f.houses; i++) {
            $("#" + f.name + '-p').append(
                $('<img/>', {
                    'src': '/assets/images/biggerHouse.png',
                    'id': f.name + '-house-' + i,
                    'class': 'house'
                })
            )
        }
    });
}

function compareStreet(a, b) {
    if (a.name > b.name) {
        return 1;
    }
    if (a.name < b.name) {
        return -1;
    }
    return 0;
}

function getCurrentPlayer(json) {
    return json.board.players.find(p => p.name === json.board.current_player);
}

function currentPlayerName(json) {
    return json.board.current_player;
}

function getCurrentMoney(json) {
    return getCurrentPlayer(json).money;
}

function removeBuyButtons() {
    let buyButtons = $("#buy-buttons");
    buyButtons.empty();
}

function hideStaticButtons() {
    $("#roll-button").css({"display": "none"});
    $("#quit-button").css({"display": "none"});
    $("#end-turn-button").css({"display": "block"});
}

function showStaticButtons() {
    $("#roll-button").css({"display": "block"});
    $("#quit-button").css({"display": "block"});
    $("#end-turn-button").css({"display": "none"});
}

function animateHouse(houseID) {
    var tl = anime.timeline({loop: false, duration: 300});
    tl.add({
        targets: '.house-par .house',
        rotate: {
            value: 360
        },
        scale: {
            value: 1.5,
            easing: 'easeInOutQuart'
        },
        translateZ: 0
    }).add({
        targets: '.house-par .house',
        rotate: {
            value: 360,
            direction: 'reverse'
        },
        scale: {
            value: 1,
            easing: 'easeInOutQuart'
        }
    });
}

function update(json) {
    console.log(json);
    switch (String(json.board.state)) {
        case "START_OF_TURN":
            removeBuyButtons();
            showStaticButtons();
            break;
        case "CAN_BUILD":
            hideStaticButtons();
            generateBuyButtons(json);
            break;
        default:
            alert("Unknown game status: " + String(json.board.state))
    }
    updatePlayerInfo(json);
    updateInfoText(String(json.msg));
}

function updateInfoText(msg) {
    console.log("MSG: " + msg);
    let letters = $("#letters");
    letters.empty();
    let lines = msg.split('\n');
    for (let i = 0; i < lines.length; i++) {
        console.log(lines[i]);
        const pId = "text-p" + i;
        let p = $('<p/>', {'id': pId});
        p.html(lines[i].replace(/\S/g, "<span class='letter'>$&</span>"));
        letters.append(p);
        animateText(document.querySelectorAll('#' + pId + ' .letter'));
    }
}

function updatePlayerInfo(json) {
    console.log(currentPlayerName(json));
    console.log(String(getCurrentMoney(json)));
    $("#main-header-current-player").text(currentPlayerName(json));
    $("#main-header-current-money").text("Money: " + getCurrentMoney(json))
}

function animateText(targets) {
    let tl = anime.timeline({loop: false});
    tl.add({
        targets: targets,
        translateY: ["2.5em", 0],
        translateZ: 0,
        duration: 500,
        delay: function (el, i) {
            return i * 25;
        }
    });
}

function animateHouse() {
    let tl = anime.timeline({loop: false, duration: 300})
    tl.add({
        targets: '.house-par .house',
        rotate: {
            value: 360
        },
        scale: {
            value: 1.5,
            easing: 'easeInOutQuart'
        },
        translateZ: 0
    }).add({
        targets: '.house-par .house',
        rotate: {
            value: 360,
            direction: 'reverse'
        },
        scale: {
            value: 1,
            easing: 'easeInOutQuart'
        }
    });
}

function connectWebSocket() {
    websocket = new WebSocket("ws://localhost:9000/websocket");
    websocket.setTimeout;

    websocket.onopen = function (event) {
        //updateInfoText();
        websocket.send(GET_JSON);
        console.log("Connected to Websocket");
    };

    websocket.onclose = function (event) {
        let reason;
        if (event.code === 1000)
            reason = "Normal closure, meaning that the purpose for which the connection was established has been fulfilled.";
        else if (event.code === 1001)
            reason = "An endpoint is \"going away\", such as a server going down or a browser having navigated away from a page.";
        else if (event.code === 1002)
            reason = "An endpoint is terminating the connection due to a protocol error";
        else if (event.code === 1003)
            reason = "An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).";
        else if (event.code === 1004)
            reason = "Reserved. The specific meaning might be defined in the future.";
        else if (event.code === 1005)
            reason = "No status code was actually present.";
        else if (event.code === 1006)
            reason = "The connection was closed abnormally, e.g., without sending or receiving a Close control frame";
        else if (event.code === 1007)
            reason = "An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).";
        else if (event.code === 1008)
            reason = "An endpoint is terminating the connection because it has received a message that \"violates its policy\". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.";
        else if (event.code === 1009)
            reason = "An endpoint is terminating the connection because it has received a message that is too big for it to process.";
        else if (event.code === 1010) // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
            reason = "An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: " + event.reason;
        else if (event.code === 1011)
            reason = "A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.";
        else if (event.code === 1015)
            reason = "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";
        else
            reason = "Unknown reason";
        alert("Websocket closed: " + reason);
    };

    websocket.onerror = function (error) {
        console.log('Error in Websocket Occurred: ' + error);
    };

    websocket.onmessage = function (e) {
        console.log(JSON.parse(e.data));
        if (typeof e.data === "string") {
            update(JSON.parse(e.data));
            console.log("MESSAGE: " + e.data);
        }
    };
}