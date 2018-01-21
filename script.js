/*Negamax algorithm */ 

var chessAI =function(depth, chess) {

    var newGameMoves = chess.ugly_moves();
    var bestMove = -Infinity;
    var bestMoveFound;
  for(var i = 0; i < newGameMoves.length; i++) {
        var newGameMove = newGameMoves[i]
        chess.ugly_move(newGameMove);
        var temp = NegaMax(depth - 1, chess, 1,-10000,10000);
        chess.undo();
        if(temp >= bestMove) {
            bestMove = temp;
            bestMoveFound = newGameMove;
        }
    }
    return bestMoveFound;
};


 var NegaMax=function(depth,chess,color,alpha,beta) {
	   positionsEvaluated++;
	 var SIGN=[1,-1];   //SIGN[0]=1 is white (Player),SIGN[1]=-1 is black(computer); SIGN IS CONSTANT DO NOT CHANGE
	 if (depth === 0) {
        return SIGN[color]*evaluateBoard(chess.board());
    }
     var maxScore = -Infinity;
	 var bestMove;
	  var newGameMoves = chess.ugly_moves();
	  
	  for (var i = 0; i < newGameMoves.length; i++) {
           newgamemove=chess.ugly_move(newGameMoves[i]);
            bestMove = -NegaMax(depth - 1, chess, 1-color,-beta,-alpha);
			chess.undo();
			if(bestMove>maxScore)
			{maxScore=bestMove;}
			if(bestMove>alpha)
			{alpha=bestMove;}
			if(alpha>=beta)
			{return alpha;}
			
        }
	  return maxScore;
	  
}

var evaluateBoard = function (board) {
    var finalEvaluation = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            finalEvaluation = finalEvaluation + getPieceValue(board[i][j], i ,j);
        }
    }
    return finalEvaluation;
};

var reverseArray = function(array) {
    return array.slice().reverse();
};


	var pawnEvalWhite =
        [	
	       [0,  0,  0,  0,  0,  0,  0,  0],
          [50, 50, 50, 50, 50, 50, 50, 50],
          [10, 10, 20, 30, 30, 20, 10, 10],
          [ 5,  5, 10, 25, 25, 10,  5,  5],
          [0,  0,  0, 20, 20,  0,  0,  0],
          [5, -5,-10,  0,  0,-10, -5,  5],
          [5, 10, 10,-20,-20, 10, 10,  5],
          [0,  0,  0,  0,  0,  0,  0,  0]
		 ];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =
    [
        [-50,-40,-30,-30,-30,-30,-40,-50],
        [-40,-20,  0,  0,  0,  0,-20,-40],
         [-30,  0, 10, 15, 15, 10,  0,-30],
         [-30,  5, 15, 20, 20, 15,  5,-30],
        [-30,  0, 15, 20, 20, 15,  0,-30],
        [-30,  5, 10, 15, 15, 10,  5,-30],
         [-40,-20,  0,  5,  5,  0,-20,-40],
         [-50,-40,-30,-30,-30,-30,-40,-50]
    ];

var bishopEvalWhite = [
          [-20,-10,-10,-10,-10,-10,-10,-20],
          [-10,  0,  0,  0,  0,  0,  0,-10],
          [-10,  0,  5, 10, 10,  5,  0,-10],
          [-10,  5,  5, 10, 10,  5,  5,-10],
          [-10,  0, 10, 10, 10, 10,  0,-10],
          [-10, 10, 10, 10, 10, 10, 10,-10],
          [-10,  5,  0,  0,  0,  0,  5,-10],
          [-20,-10,-10,-10,-10,-10,-10,-20]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
     [0,  0,  0,  0,  0,  0,  0,  0],
     [5, 10, 10, 10, 10, 10, 10,  5],
     [-5,  0,  0,  0,  0,  0,  0, -5],
     [-5,  0,  0,  0,  0,  0,  0, -5],
      [-5,  0,  0,  0,  0,  0,  0, -5],
      [-5,  0,  0,  0,  0,  0,  0, -5],
       [-5,  0,  0,  0,  0,  0,  0, -5],
        [0,  0,  0,  5,  5,  0,  0,  0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen = [
         [-20,-10,-10, -5, -5,-10,-10,-20],
          [-10,  0,  0,  0,  0,  0,  0,-10],
          [-10,  0,  5,  5,  5,  5,  0,-10],
           [-5,  0,  5,  5,  5,  5,  0, -5],
           [0,  0,  5,  5,  5,  5,  0, -5],
           [-10,  5,  5,  5,  5,  5,  0,-10],
           [-10,  0,  5,  0,  0,  0,  0,-10],
           [-20,-10,-10, -5, -5,-10,-10,-20]
];

var kingEvalWhite = [

    [-30,-40,-40,-50,-50,-40,-40,-30],
     [-30,-40,-40,-50,-50,-40,-40,-30],
      [-30,-40,-40,-50,-50,-40,-40,-30],
      [-30,-40,-40,-50,-50,-40,-40,-30],
       [-20,-30,-30,-40,-40,-30,-30,-20],
      [-10,-20,-20,-20,-20,-20,-20,-10],
       [20, 20,  0,  0,  0,  0, 20, 20],
         [20, 30, 10,  0,  0, 10, 30, 20]
];

var kingEvalBlack = reverseArray(kingEvalWhite);




var getPieceValue = function (piece, x, y) {
    if (piece === null) {
        return 0;
    }
    var getAbsoluteValue = function (piece, isWhite, x ,y) {
        if (piece.type === 'p') {
            return ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
        } else if (piece.type === 'r') {
            return  ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
        } else if (piece.type === 'n') {
            return knightEval[y][x];
        } else if (piece.type === 'b') {
            return  ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
        } else if (piece.type === 'q') {
            return evalQueen[y][x];
        } else if (piece.type === 'k') {
            return ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
        }
        throw "Unknown piece type: " + piece.type;
    };

    var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
    return piece.color === 'w' ? absoluteValue : -absoluteValue;
};


/* board visualization and chesss state handling */

var onDragStart = function (source, piece, position, orientation) {
    if (chess.in_checkmate() === true || chess.in_draw() === true ||
        piece.search(/^b/) !== -1) {
        return false;
    }
};

var onDrop = function (source, target) {

    var move = chess.move({
        from: source,
        to: target,
        promotion: 'q'
    });
   
   removeHighlightedSquare();
    if (move === null) {
        return 'snapback';
    }

    //renderMoveHistory(chess.history());
    window.setTimeout(makeBestMoveOpponent, 100);
};

var makeBestMoveOpponent = function () {
    var bestMove = getBestMoveOpponent(chess);
    chess.ugly_move(bestMove);
    board.position(chess.fen());
    renderMoveHistory(chess.history());//move history 
    if (chess.game_over()) {
		alert('Game over!!!!!');
		}
};


var positionsEvaluated;
var getBestMoveOpponent = function (chess) {
    if (chess.game_over()) {
		alert('Game over');
		}

    positionsEvaluated = 0;
    var depth = parseInt($('#search-depth').find(':selected').text());

    var timeBefore = new Date().getTime();
    var bestMove = chessAI(depth, chess, true);
	//var newGameMoves = chess.ugly_moves();
    //var bestMove=newGameMoves[Math.floor(Math.random() * newGameMoves.length)];
	var timeAfter = new Date().getTime();
    var moveTime = (timeAfter - timeBefore);
	//console.log("movetime="+moveTime);
    $('#position-count').text(positionsEvaluated);
    $('#time').text(moveTime/1000 + 's');
    return bestMove;
};

var renderMoveHistory = function (moves) {
    var historyElement = $('#move-history');
    historyElement.empty();
    for (var i = 0; i < moves.length; i = i + 2) {
        historyElement.append('<span>' + moves[i] + ' ' + ( moves[i + 1] ? moves[i + 1] : ' ') + '</span><br>');
		}
    historyElement.scrollTop(historyElement[0].scrollHeight);//current hight of div(#move-history);set that as scroll nav height
	

};



var onSnapEnd = function () {
    board.position(chess.fen());
};

var onMouseoverSquare = function(square, piece) {
    var moves = chess.moves({
        square: square,
        verbose: true
    });
  if (moves.length === 0) return;
      
	  HighlightedSquare(square);

    for (var i = 0; i < moves.length; i++) {
        HighlightedSquare(moves[i].to);
    }
};

var onMouseoutSquare = function(square, piece) {
    removeHighlightedSquare();
};

var removeHighlightedSquare = function() {
    
	$('#board .square-55d63').css('box-shadow','');
};

var HighlightedSquare = function(square) {
    var squareToBeHighlighted = $('#board .square-' + square);
     
     var box='inset 0px 0px 0px 5px #213EE3';
	 if (squareToBeHighlighted.hasClass('black-3c85d') === true) {
       box='inset 0px 0px 0px 5px red';}
    squareToBeHighlighted.css('box-shadow', box);
};


var board;
var chess = new Chess();
var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);

