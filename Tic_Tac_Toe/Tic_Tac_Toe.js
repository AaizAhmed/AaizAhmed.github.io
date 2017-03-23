/*
	File Name: Tic_Tac_Toa: This file implements an AI to play a game tic tac toe
	           It uses min max algorithm to accomplist the task.

	Author: Aaiz N Ahmed
	Date: 03-23-2017
*/

var Tic_Tac_Toe_Board = function()
{
	var board = [ ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'] ];

	this.printBoard = function()
	{	var str = '';

		for (var row = 0; row < 3; row++) 
		{	for (var col = 0; col < 3; col++)
			{
				str += board[row][col];
			}
			str += "\n";
		}
		console.log(str);
	};

	this.makeMove = function (row, col, sign) 
	{
		if (board[row][col] === '-')
		{
			board[row][col] = sign;
			return true;
		} 	

		return false;
	};

	this.getBoard = function()
	{
		return board;
	};

	this.isDraw = function (test_board) 
	{
		for (var row = 0; row < 3; row++) 
		{	for (var col = 0; col < 3; col++)
			{
				if (test_board[row][col] === '-')
				{
					return false;
				}
			}
		}
		return true;
	};

	this.checkWin = function(test_board)
	{
		var board = test_board;

		for (var i = 0; i < 3; i++) 
		{
			// Checking horizontal win condition
			if ( board[i][0] === 'X' && board[i][1] === 'X' && board[i][2] === 'X')
			{	return true;	}

			else if ( board[i][0] === 'O' && board[i][1] === 'O' && board[i][2] === 'O')
			{	return true;	}

			// Checking vertical win condition
			else if ( board[0][i] === 'X' && board[1][i] === 'X' && board[2][i] === 'X')
			{	return true;	}

			else if ( board[0][i] === 'O' && board[1][i] === 'O' && board[2][i] === 'O')
			{	return true;	}
		}

		// Checking diagnol win conditions 
		if (board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === 'X')
		{	return true;	}

		if (board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === 'O')
		{	return true;	}

		if (board[2][0] === 'X' && board[1][1] === 'X' && board[0][2] === 'X')
		{	return true;	}

		if (board[2][0] === 'O' && board[1][1] === 'O' && board[0][2] === 'O')
		{	return true;	}

	    return false;
	};

};

var AI = function()
{
    var row_col = {   row: -1, 
                      col: -1   
                  };

    var ai_player;
    var opponent;

    this.set_ai_Sign = function(sign) 
    {   ai_player = sign;   };
	
	this.set_opponent_Sign = function(oppo_sign) 
	{   opponent = oppo_sign;   };

    function isDraw(test_board) 
	{
		for (var row = 0; row < 3; row++) 
		{	for (var col = 0; col < 3; col++)
			{
				if (test_board[row][col] === '-')
				{
					return false;
				}
			}
		}
		return true;
	};

	function isWin(board, sign)
	{
		for (var index = 0; index < 3; index++)
		{
			// Horizantol win
			if ( board[index][0] === board[index][1] &&  
				 board[index][1] === board[index][2] )
			{
				if (board[index][0] === sign)
				{   return true;   }
			}

			// Vertical win
			if ( board[0][index] === board[1][index] &&
				 board[1][index] === board[2][index] )
			{
				if (board[0][index] === sign)
				{   return true;   }
			}
		}

		// Diagnol win 1
		if (board[0][0] === board[1][1] && board[1][1] === board[2][2] )
		{	
			if ( board[1][1] === sign)
			{ return true;	}
		}

		// // Diagnol win 2
		if (board[2][0] === board[1][1] && board[1][1] === board[0][2] )
		{
			if ( board[1][1] === sign)
			{ return true;	}	
		}
	}

    // This is the evaluation function
    function evaluate(board, depth)
    {
    	if ( isWin(board, ai_player) )
    	{
    		return 10 - depth;
    	}
    	else if ( isWin(board, opponent) )
    	{
    		return depth - 10;
    	}
    	else
    	{
    		return 0;
    	}
    }

    // This is the minimax function. It considers all
    // the possible ways the game can go and returns
    // the value of the board
    function minimax(board, depth, isMax)
    {
        var score = evaluate(board, depth);

        if ( isWin(board, ai_player) || isWin(board, opponent) ||
             isDraw(board) )
        {
        	return score;
        }

        // If this maximizer's move
        if (isMax)
        {
            var best = -1000;

            // Traverse all cells
            for (var row = 0; row < 3; row++)
            {
                for (var col = 0; col < 3; col++)
                {
                    // Check if cell is empty
                    if (board[row][col] === '-')
                    {
                        // Make the move
                        board[row][col] = ai_player;

                        // Call minimax recursively and choose
                        // the maximum value
                        best = Math.max(best, minimax(board, depth+1, !isMax));

                        // Undo the move
                        board[row][col] = '-';
                    }
                }
            }
            return best;
        }

        // If this minimizer's move
        else
        {
            var best = 1000;

            // Traverse all cells
            for (var row = 0; row < 3; row++)
            {
                for (var col = 0; col < 3; col++)
                {
                    // Check if cell is empty
                    if (board[row][col] === '-')
                    {
                        // Make the move
                        board[row][col] = opponent;

                        // Call minimax recursively and choose
                        // the minimum value
                        best = Math.min(best,  minimax(board, depth+1, !isMax));

                        // Undo the move
                        board[row][col] = '-';
                    }
                }
            }
            return best;
        }
    }

    // This will return the best possible move for the player
    this.findBestMove = function(board)
    {
        var bestVal = -1000;
        var bestMove = row_col;
        bestMove.row = -1;
        bestMove.col = -1;

        // Traverse all cells, evalutae minimax function for
        // all empty cells. And return the cell with optimal
        // value.
        for (var row = 0; row < 3; row++)
        {
            for (var col = 0; col < 3; col++)
            {
                // Check if cell is empty
                if (board[row][col] === '-')
                {
                    // Make the move
                    board[row][col] = ai_player;

                    // compute evaluation function for this
                    // move.
                    var moveVal = minimax(board, 0, false);

                    // Undo the move
                    board[row][col] = '-';

                    // If the value of the current move is
                    // more than the best value, then update
                    // best
                    if (moveVal > bestVal)
                    {
                        bestMove.row = row;
                        bestMove.col = col;
                        bestVal = moveVal;
                    }
                }
            }
        }

        // console.log("The value of the best Move is : " + bestVal);

        return bestMove;
    };

};

var board = new Array(3);
var playerSign = '';
var computerSign = '';
var moves = 0;
var playerTurn = false;
var playerScore = 0;
var computeScore = 0;


var board_obj = new Tic_Tac_Toe_Board();
var board = board_obj.getBoard();

var ai = new AI();

// Driver code for testing
function main()
{
    var ai = new AI();
    var board =
    [
        [ 'X', 'O', 'X' ],
        [ 'O', 'O', 'X' ],
        [ '-', '-', '-' ]
    ];

    ai.set_ai_Sign('X');
    ai.set_opponent_Sign('O');

    var bestMove = ai.findBestMove(board);

     console.log("The Optimal Move is :");
     console.log("ROW: " + bestMove.row + "\tCOL: " + bestMove.col );
     
    board =
    [
        [ '-', '-', 'X' ],
        [ '-', 'O', 'X' ],
        [ 'O', '-', '-' ]
    ];

    bestMove = ai.findBestMove(board);

    console.log("The Optimal Move is :");
    console.log("ROW: " + bestMove.row + "\tCOL: " + bestMove.col );

    ai.set_ai_Sign('O');
    ai.set_opponent_Sign('X');

    board =
    [
        [ '-', 'X', '-' ],
        [ '-', '-', 'X' ],
        [ 'O', 'O', 'X' ]
    ];

    bestMove = ai.findBestMove(board);

    console.log("The Optimal Move is :");
    console.log("ROW: " + bestMove.row + "\tCOL: " + bestMove.col );
}

// main();

function addBoard(sign)
{
   $("#ask").css('display', 'none');
   $("#board").css('display', 'block');
   $("#restart").css('display', 'block');

    moves = 0;
	game_won = false;
	game_draw = false;

   if (sign === 'X')
   {
      playerSign = 'X';
   	  computerSign = 'O';
   	  playerTurn = true;

   	  // Assign signs inside the AI object.
   	  ai.set_ai_Sign(computerSign);
      ai.set_opponent_Sign(playerSign);

   	  $("#turn").text("Your Turn!");
   }
   else 
   {
      playerSign = 'O';
      computerSign = 'X';
      $("#turn").text("Computer's Turn");

      ai.set_ai_Sign(computerSign);
      ai.set_opponent_Sign(playerSign);

      // Computer's sign is X so it goes first
      play_game();
   }

   $("#player").text("Player: " + playerSign + " = " + playerScore + " | ");
   $("#computer").text("Computer: " + computerSign + " = " + computeScore);

   // Add the event trigger
   $('td').on( 'click', play_game );
}

function play_game()
{
	id = event.target.id;

	var row = parseInt( id[0] );
    var col = parseInt( id[1] );  

	if (moves < 9 && !game_won)
	{
		if (playerTurn)
		{
            if ( !isNaN(row) && !isNaN(col) )
            {
				var move_made = board_obj.makeMove(row, col, playerSign);	

				if (move_made)
				{
					$('#'+id).text(playerSign);
		        	// board_obj.printBoard();

		        	playerTurn = false;
		            moves++;
		            $("#turn").text("Computer's Turn");
				}

            	if ( board_obj.checkWin( board_obj.getBoard() ) )
            	{
            		$("#turn").text("You Won!!");
            		game_won = true;

            		playerScore++;
            		$("#player").text("Player: " + playerSign + " = " + playerScore + " | ");
            	}
            }
		}

		if ( !playerTurn && !game_won )
		{
			var row_col = ai.findBestMove( board_obj.getBoard() );
			var id = '#' + row_col.row + row_col.col;

			if (row_col.row >=0 && row_col.col >=0 )
			{	
				board_obj.makeMove(row_col.row, row_col.col, computerSign);
				$(id).text(computerSign);
				// board_obj.printBoard();

				if ( board_obj.checkWin( board_obj.getBoard() ) )
	        	{
	        		$("#turn").text("Computer Won!");
	        		game_won = true;

	        		computeScore++;
   					$("#computer").text("Computer: " + computerSign + " = " + computeScore);
	        	}
	        	else
	        	{
					playerTurn = true;
					moves++;
					$("#turn").text("Your Turn!"); 
				}
			}
		}
	}

	if ( !game_won && board_obj.isDraw( board_obj.getBoard() ) )
	{
		game_draw = true;
		$("#turn").text("It was a Draw");
	}
}


function restart()
{
	board_obj = new Tic_Tac_Toe_Board();
    board = board_obj.getBoard();
	
    for (var row = 0; row < 3; row++) 
	{
		for (var col = 0; col < 3; col++)
		{
			var id = '#' + row + col;
			$(id).text('');
		}
	}

	addBoard(playerSign);
}

function restartAll()
{
   $("#restart").css('display', 'none');
   $("#turn").text("");
   $("#player").text("");
   $("#computer").text("");

   playerScore = 0;
   computeScore = 0;

   $("#ask").css('display', 'block');
   $("#board").css('display', 'none');

    board_obj = new Tic_Tac_Toe_Board();
    board = board_obj.getBoard();
	
    for (var row = 0; row < 3; row++) 
	{
		for (var col = 0; col < 3; col++)
		{
			var id = '#' + row + col;
			$(id).text('');
		}
	}
}