// presentation layer
export default function renderScreen(document, game, requestAnimationFrame, currentPlayerId) {
    const screen = document.getElementById('screen')
    const context = screen.getContext('2d')
    const scoreTable = document.getElementById('score-table')

    // clean screen
    context.fillStyle = 'white'
    context.clearRect(0, 0, 10, 10)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'black'
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if(currentPlayer) {
        context.fillStyle = '#F0DB4F'
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    }

    updateScoreTable()

    requestAnimationFrame(() => {
        renderScreen(document, game, requestAnimationFrame, currentPlayerId)
    })


    function updateScoreTable() {
        let playersArray = []
        const maxTopPlayers = 10

        scoreTable.innerHTML = scoreTable.rows[0].innerHTML

        for(const playerId in game.state.players) {
            const player = game.state.players[playerId]
            playersArray.push({
                playerId,
                score: player.score
            })
        }

        playersArray = playersArray.sort((first, second) => {
            if(first.score < second.score){
                return 1
            }
            if(first.score > second.score) {
                return -1
            }
            return 0
        })

        const topPlayers = playersArray.slice(0, maxTopPlayers)
        let currentPlayerInTop = false

        topPlayers.forEach( player => {
            const row = document.createElement('tr')
            const cell_playerId = document.createElement('td')
            const cell_playerScore = document.createElement('td')

            let class_attribute = ''
            if(player.playerId === currentPlayerId){
                currentPlayerInTop = true
                class_attribute = 'current-player'
            }

            row.setAttribute('class', class_attribute)
            cell_playerId.innerHTML = player.playerId
            cell_playerScore.innerHTML = player.score

            row.appendChild(cell_playerId)
            row.appendChild(cell_playerScore)

            scoreTable.appendChild(row)
        })

        if(!currentPlayerInTop){

            const player = game.state.players[currentPlayerId]

            if(!player){
                return
            }

            const row = document.createElement('tr')
            const cell_playerId = document.createElement('td')
            const cell_playerScore = document.createElement('td')

            row.setAttribute('class', 'current-player')
            cell_playerId.innerHTML = player.playerId
            cell_playerScore.innerHTML = player.score

            row.appendChild(cell_playerId)
            row.appendChild(cell_playerScore)

            scoreTable.appendChild(row)
        }
        
    }
}
