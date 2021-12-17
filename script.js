var Board = (function(){

    const squareList = document.querySelectorAll(".square");

    const Player = (name, symbol, hasTurn) => {
        return { name, "symbol": symbol, hasTurn}
    };

    const _players = [];

    const _boardState = ['X','O','O','X','X','X','O','O','X'];

    let winCheck = 0;

    const boardMethods = {

        updateBoard : function(){
            for(value in _boardState){
                const target = document.getElementById(`${value}`)
                target.innerHTML = _boardState[value];
            }
        },

        newGame : function(){
            for(value in _boardState){
                _boardState[value] = "";
            };
            
            this.updateBoard();
            if(winCheck > 0) {
                if(confirm("Would you like to keep the same player names?")){
                    _players[0].hasTurn = true;
                    _players[1].hasTurn = false;
                    return;
                }
            };

            winCheck = 0;
            _players.splice(0, _players.length);
            const playerOne = Player(prompt("Welcome player one! What is your name?"), "X", true);
            _players.push(playerOne);
            const playerTwo = Player(prompt("Welcome player two! What is your name?"), "O", false);
            _players.push(playerTwo);
        },

        winCheck : function(){
           const winEvent = function(){
               if (winCheck > 0) return;
               if (_players[0].hasTurn){
                    alert(`${_players[0].name} has won!`);
               } else {
                    alert(`${_players[1].name} has won!`);
               };

               if (confirm("Would you like to start a new game?")){
                    winCheck++;
                    Board.newGame();
               } else {winCheck++}
           }
           
            //row win check
            for(let i = 0; i < 8; i+=3){
                if(_boardState[i] === _boardState[i+1] && _boardState[i] === _boardState[i+2] && _boardState[i] != '') {
                    winEvent();
                };
            };

            //column win check
            for(let i = 0; i < 3; i++){
                if(_boardState[i] === _boardState[i+3] && _boardState[i] === _boardState[i+6] && _boardState[i] != '') {
                    winEvent();
                };
            };

            //diag win checks
            if(_boardState[0] === _boardState[4] && _boardState[0] === _boardState[8] && _boardState[0] != ''){
                winEvent();
            };

            if(_boardState[2] === _boardState[4] && _boardState[2] === _boardState[6] && _boardState[2] != ''){
                winEvent();
            };
        },

        addSymbol : function(){
            for(player in _players){
                if(_players[player].hasTurn){
                    _boardState[this.id] = _players[player].symbol;
                    Board.updateBoard();
 
                };
            };

            Board.winCheck();

            //changes who's turn it is after click
            for(player in _players){
                console.log(_players[0]);
                console.log(_players);
                if(_players[player].hasTurn){
                    console.log(_players[player]);
                    _players[player].hasTurn = false
                } else {
                    _players[player].hasTurn = true;
                }
            };
        },

    };
     
    //adds click events to each div on the board
    squareList.forEach((ele) => {
        ele.addEventListener("click", boardMethods.addSymbol)
    })

    boardMethods.newGame();

    //public objects
    return boardMethods;
})();
