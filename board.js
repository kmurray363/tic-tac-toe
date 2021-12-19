Board = (function(){

    const _boardState = ["","","","X","","","","","O"];
    const _players =[{},{}];
    let _firstTime = true;

    //cache DOM
    const $squares = document.querySelectorAll(".square");

    //start Game
    const init = () => {
        _clearBoard();
        _updateBoard();
        if(_players[0].name != undefined) {
            const keepSamePlayers = confirm("Would you like to keep the same players?");
            if(keepSamePlayers) {
                if(_players[1].hasTurn){
                    _players.forEach((player) => player.toggleTurn());
                }
                return;
            };
        };
        _createPlayers();
        if(_firstTime){
            _bindEvents();
        };
        _firstTime = false;
    };

    const _createPlayers = () => {
        _players.splice(0,2);
        const nameOne = prompt("Player One, what is your name? (Type computer to play a really stupid computer)") || "McLovin";
        const nameTwo = prompt("Player Two, what is your name? (Type computer to play a really stupid computer)") || "Cher";
        const playerOne = Player(nameOne, "X", true, true);
        const playerTwo = Player(nameTwo, "O", false, true);
        if(nameOne === 'computer') playerOne.isHuman = false;
        if(nameTwo === 'computer') playerTwo.isHuman = false;
        _players.splice(0,2, playerOne, playerTwo);
    };

    const alterSquare = (e) => {
        if(e.path[0].innerHTML != '') return;
        let currentPlayer = {};
        for (player in _players){
            if (_players[player].hasTurn === true) currentPlayer = _players[player]
        };
        if(currentPlayer.isHuman){    
            _boardState.splice(e.path[0].id, 1, currentPlayer.symbol)
        } else {
            _randomAI(currentPlayer);
        }
        _updateBoard();
        if(winCheck(currentPlayer)) return;
        _players.forEach((player) => {
            player.toggleTurn();
        });
    };

    const _updateBoard = () => {
        for(i in _boardState){ 
            $squares[i].innerHTML = _boardState[i];
        };
    };

    const _clearBoard = () => {
        for(i in _boardState) {
            _boardState[i] = "";
            _updateBoard();
        }
    }

    const _bindEvents = () => {
        for(let ele = 0; ele < $squares.length; ele++){
            $squares[ele].addEventListener("click", alterSquare)
        }
    }

    const winCheck = (currentPlayer) => { 
        //row win check
        for(let i = 0; i < 8; i+=3){
            if(_boardState[i] === _boardState[i+1] && _boardState[i] === _boardState[i+2] && _boardState[i] != '') {
                _winEvent(currentPlayer);
                return true;
            };
        };

        //column win check
        for(let i = 0; i < 3; i++){
            if(_boardState[i] === _boardState[i+3] && _boardState[i] === _boardState[i+6] && _boardState[i] != '') {
                _winEvent(currentPlayer);
                return true;
            };
        };

        //diag win checks
        if(_boardState[0] === _boardState[4] && _boardState[0] === _boardState[8] && _boardState[0] != ''){
            _winEvent(currentPlayer);
            return true;
        };

        if(_boardState[2] === _boardState[4] && _boardState[2] === _boardState[6] && _boardState[2] != ''){
            _winEvent(currentPlayer);
            return true;
        };

        //draw check
        let drawCount = 0
        for(i in _boardState){
            if(_boardState[i] === "") {
                return;
            } else {
                drawCount++;
            }
        };
        if (drawCount === 9){
            _drawEvent();
            return true;
        };

    };

    const _winEvent = (currentPlayer) => {
        setTimeout(() => {
            alert(`${currentPlayer.name} has won!`);
            if(!(confirm("Would you like to start a new game?"))) return;
            init();
        },10)

    };

    const _drawEvent = () => {
        setTimeout(() => {
            alert(`It's a draw.`);
            if(!(confirm("Would you like to start a new game?"))) return;
            init();
        },10)
    };


    //Move to AI Module
    const _randomAI = (currentPlayer) => {
        let pick = Math.floor(Math.random() * 9);
        while(_boardState[pick] != ''){
            pick = Math.floor(Math.random() * 9);
        }
        _boardState.splice(pick, 1, currentPlayer.symbol);
    };

    const _minimax = (currentPlayer) => {
        let pick = Math.floor(Math.random() * 9);
        while(_boardState[pick] != ''){
            pick = Math.floor(Math.random() * 9);
        }
        _boardState.splice(pick, 1, currentPlayer.symbol);
    }
    
    return {alterSquare, init, winCheck};
})();

const Player = (name, symbol, hasTurn, isHuman) => {
    return{
        name,
        symbol,
        hasTurn,
        isHuman,
        setName : (nm) => name = nm,
        toggleTurn : function(){
            if (this.hasTurn){
                this.hasTurn = false;
            } else {
                this.hasTurn = true;
            }
        }
    };
}

Board.init();






