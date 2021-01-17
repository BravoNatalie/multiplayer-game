// presentation layer
export default function renderScreen(document, game, requestAnimationFrame, currentPlayerId) {
    const screen = document.getElementById('screen')
    const context = screen.getContext('2d')
    const scoreTable = document.getElementById('score-table')
    //const score = document.

    // clean screen
    context.fillStyle = 'white'
    context.clearRect(0, 0, 10, 10)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = '#330D05'
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = '#8CAE43'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if(currentPlayer) {
        context.fillStyle = '#BB2105'
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
                nick: player.nick,
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
            cell_playerId.innerHTML = player.nick
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
            cell_playerId.innerHTML = player.nick
            cell_playerScore.innerHTML = player.score

            row.appendChild(cell_playerId)
            row.appendChild(cell_playerScore)

            scoreTable.appendChild(row)
        }
        
    }

    function drawLeaf(){
        const canvas = document.querySelector('canvas')
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		const ctx = canvas.getContext('2d')
		const xoff = 0
		const yoff = 0

		ctx.beginPath();
  		ctx.moveTo(314 + xoff, 195 + yoff);
  		ctx.bezierCurveTo(307 + xoff, 217 + yoff, 246 + xoff, 284 + yoff, 298 + xoff, 378 + yoff);
  		ctx.stroke();
		ctx.fillStyle = "#8CAE43";
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(314 + xoff, 195 + yoff);
		ctx.bezierCurveTo(400 + xoff, 320 + yoff, 300 + xoff, 350 + yoff, 298 + xoff, 378 + yoff);
		ctx.stroke();
		ctx.fillStyle = "#8CAE43";
	    ctx.fill();

		ctx.beginPath();
  		ctx.moveTo(315 + xoff, 220 + yoff);
  		ctx.bezierCurveTo(320 + xoff, 340 + yoff, 280 + xoff, 350 + yoff, 298 + xoff, 378 + yoff);
  		ctx.stroke();
		ctx.fillStyle = "#8CAE43";
		ctx.fill();
    }
}
