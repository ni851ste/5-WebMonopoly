$( document ).ready(function() {
    generateBuyButtons(JSON.parse('{"board":{"current_player":"Player1","players":[{"name":"Player1","money":1500,"current_field":"Go","bought_fields":[{"name":"Street6","houses":0},{"name":"Street2","houses":0},{"name":"Street1","houses":0},{"name":"Street5","houses":0},{"name":"Street4","houses":0},{"name":"Street3","houses":0}]},{"name":"Player2","money":1500,"current_field":"Go","bought_fields":[{"name":"Street7","houses":0},{"name":"Street8","houses":0},{"name":"Street9","houses":0}]}]}}'));
});

function generateBuyButtons(json) {
    let buyButtons = $("#buy-buttons");

    let currentPlayer = json.board.players.find(p => p.name === json.board.current_player);
    currentPlayer.bought_fields.forEach(f => {
        buyButtons.append(
            $('<div/>', {'class': 'one-buy-button'}).append(
                $('<p>' + f.name + '</p>', {'class': 'house-par'}).append(
                    $('<button/>', {
                        class: "buy-button btn-primary",
                        text: "Buy house on " + f.name,
                        click: () => {
                            $.ajax({
                                method: "GET",
                                url: "/game/" + f.name,
                                dataType: "json",
                                success: result => update(result)
                            })
                        }
                    })
                )
            ))
    });
}


function update(result) {
    console.log(result)
}