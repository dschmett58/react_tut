import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//------------
// - SQUARE - one element of the 3X3 tic-tac-toe board
function Square(props) {
    return (
        <button 
            className="square" 
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

//-----------
// - BOARD - 
class Board extends React.Component {
    constructor(props) {
        super(props);     
        this.state = {            
            squares: Array(9).fill(null),
            winners: Array(9).fill(false),
            xIsNext: true,
            count: 0,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        // on endgame, click will reset the board
        if(calculateWinner(squares) || this.state.count > 8) {
            this.setState({
                squares: Array(9).fill(null),  
                winners: Array(9).fill(false),
                xIsNext: true,
                count: 0,
            });
            return;
        }
        // clicking a filled square does nothing
        if (squares[i]) {
            return;
        }
        // on normal click: set X or O, flip turn bool, increment count
        

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            count: this.state.count+1,
        });
    }

    renderSquare(i) {
        return (
            <Square 
                value={this.state.squares[i]} 
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        // end game
        if (winner) {
            status = 'Winner: ' + winner;
        } else if(this.state.count > 8) {
            status = 'Draw';
        // end turn
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <div className="status">
                    {status}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

//----------
// - GAME - 
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

//----------------
// - calcWINNER - identifies winner based on pre-defined win lines
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
