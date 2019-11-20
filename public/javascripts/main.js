$(document).ready(function () {
    $("#roll-button").click(function () {
            $.ajax("/game/r", {
                method: "GET",
                dataType: "json",
                success: update
            });
        }
    );
    $("#quit-button").click(function () {
        $.ajax("/game/q", {
            method: "GET"
        });
        $("#main-body").empty();
        $("#main-body").append(
            $('<p>¯\\_(ツ)_/¯</p>').css({'font-size': '20em', 'font-weight': 'bold', 'text-align': 'center'})
        ).css({'background-color': 'pink'});
    });
    $("#end-turn-button").click(function () {
        $.ajax("/game/e", {
            method: "GET",
            dataType: "json",
            success: update
        })
    });
    showStaticButtons();

    updateInfoText();
    $.ajax("/game-json", {
        method: "GET",
        dataType: "json",
        success: updatePlayerInfo
    });
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
    updateInfoText();
}

function updateInfoText() {
    $.ajax("/game-msg", {
        method: "GET",
        dataType: "text",
        success: function (response) {
            console.log("MSG: " + response);
            let letters = $("#letters");
            letters.empty();
            let lines = response.split('\n');
            for (let i = 0; i < lines.length; i++) {
                console.log(lines[i]);
                const pId = "text-p" + i;
                let p = $('<p/>', {'id': pId});
                p.html(lines[i].replace(/\S/g, "<span class='letter'>$&</span>"));
                letters.append(p);
                animateText(document.querySelectorAll('#' + pId + ' .letter'));
            }
        }
    })
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


function updatePlayerInfo(json) {
    console.log(currentPlayerName(json));
    console.log(String(getCurrentMoney(json)));
    $("#main-header-current-player").text(currentPlayerName(json));
    $("#main-header-current-money").text("Money: " + getCurrentMoney(json))
}

function animateHouse() {
    var tl = anime.timeline({loop: false, duration: 300})
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