import LineReaderSync from 'line-reader-sync';

const buildBoards = (strInput) => {
    var boards = [];

    for(let i=1; i<strInput.length; i++){
        let thisBoard = [];
        while(strInput[i] !== '' && i<strInput.length) {
            thisBoard.push(strInput[i].split(/\s+/).filter(num => num !== ''));
            i++;
        }
        boards.push(thisBoard);
    }

    return boards;
}

const getScore = (winningNum, board) => {
    let sumUnmarked = 0;

    for(let i=0; i<board.length; i++) {
        for(let j=0; j<board[i].length; j++) {
            if(board[i][j] !== "X") {
                sumUnmarked += parseInt(board[i][j])
            }
        }
    }

    return winningNum*sumUnmarked;
}

export const winningBingoBoard = (inputFile) => {

    const lrs = new LineReaderSync(inputFile);
    const strInput = lrs.toLines().map(line => line.replace(/[\r]/g, ''));

    var drawnNumbers = strInput[0].split(',');
    var boards = buildBoards(strInput);
    var winner = null;
    var i = 0;

    while(winner === null) {
        for(let j=0; j<boards.length; j++) {
            for(let k=0; k<boards[j].length; k++) {
                for(let l=0; l<boards[j][k].length; l++) {
                    if(boards[j][k][l] === drawnNumbers[i]) {
                        boards[j][k][l] = "X";
                        if(i>=4) {
                            let row = boards[j][k];
                            let col = [];
                            for(let m=0; m<boards[j].length; m++) {
                                col.push(boards[j][m][l]);
                            }
                            if(row.every(v => v === row[0])) {
                                winner = boards[j];
                            } else if(col.every(v => v === col[0])) {
                                winner = boards[j]
                            }
                        }
                    }
                }
            }
        }
        i++;
    }

    const winningNum = drawnNumbers[i-1]

    return getScore(winningNum, winner);
}

export const winningBingoBoardLast = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);
    const strInput = lrs.toLines().map(line => line.replace(/[\r]/g, ''));

    var drawnNumbers = strInput[0].split(',');
    var boards = buildBoards(strInput);
    var winningNum;
    var winners = [];

    for(let i=0; i<drawnNumbers.length; i++) {
        for(let j=0; j<boards.length; j++) {
            for(let k=0; k<boards[j].length; k++) {
                for(let l=0; l<boards[j][k].length; l++) {
                    if(boards[j][k][l] === drawnNumbers[i] && winners.indexOf(boards[j]) === -1) {
                        boards[j][k][l] = "X";
                        if(i>=4) {
                            let row = boards[j][k];
                            let col = [];
                            for(let m=0; m<boards[j].length; m++) {
                                col.push(boards[j][m][l]);
                            }
                            if(row.every(v => v === row[0])) {
                                winners.push(boards[j]);
                                winningNum = drawnNumbers[i];
                            } else if(col.every(v => v === col[0])) {
                                winners.push(boards[j]);
                                winningNum = drawnNumbers[i];
                            }
                        }
                    }
                }
            }
        }
    }

    return getScore(winningNum, winners[winners.length-1]);
}