const PlayerDiv = document.querySelector('.player');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.box');

// Game Constants

const firstPlayer = 'X';
const secondPlayer = 'O';

// Gmae Variables

let GameOn = true;
let xIsNext = true;

// Functions

const letterToSymbol = (letter)=> letter ==='X'? firstPlayer : secondPlayer;

// Display which player wins

const GameWin = (letter)=> {
    GameOn = false;
    if(letter === 'X'){
        PlayerDiv.innerHTML = `${letterToSymbol(letter)}  won...!`;
        }else{
            PlayerDiv.innerHTML = `<span>${letterToSymbol(letter)}  won...!</span>`;

        }
};

// Checks the status of the Game ( Who wins , in which positions , and all)

const GameStatus = () => {
    const square1 = cellDivs[0].classList[1];
    const square2 = cellDivs[1].classList[1];
    const square3 = cellDivs[2].classList[1];
    const square4 = cellDivs[3].classList[1];            // defines each cell 
    const square5 = cellDivs[4].classList[1];
    const square6 = cellDivs[5].classList[1];
    const square7 = cellDivs[6].classList[1];
    const square8 = cellDivs[7].classList[1];
    const square9 = cellDivs[8].classList[1];

// check Winner

    if(square1 && square1===square2 && square1===square3){   // check first row
        GameWin(square1);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');       // for styling purpose after player wins
        cellDivs[2].classList.add('won');

    }else if(square4 && square4===square5 && square4===square6){  // checks second row
        GameWin(square4);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');

    }else if(square7 && square7===square8 && square7===square9){   // checks third row
        GameWin(square7); 
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');

    }else if(square1 && square1===square4 && square1===square7){    // checks first column
        GameWin(square1);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');

    }else if(square2 && square2===square5 && square2===square8){    // checks second column
        GameWin(square2);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');

    }else if(square3 && square3===square6 && square3===square9){    // checks third column
        GameWin(square3);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
    
    }else if(square1 && square1===square5 && square1===square9){   // checks diagonally
        GameWin(square1);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');

    }else if(square3 && square3===square5 && square3===square7){    // chekcks diagonally
        GameWin(square3);   
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');

    }else if(square1 && square2 && square3 && square4 && square5 && square6 && square7 && square8 && square9){
        GameOn = false;
        PlayerDiv.innerHTML = 'Game Tied !';
    }else{
        xIsNext = !xIsNext;  
        if(xIsNext){                                                            // Display next players move
            PlayerDiv.innerHTML = `${firstPlayer}'s Turn`;                  
        }else{
            PlayerDiv.innerHTML =  `<span>${secondPlayer}'s Turn</span>`;
        }
    }

};


// function to add life to reset button
 
const ResetCheck =() =>{
    xIsNext=true;
    PlayerDiv.innerHTML = `${firstPlayer}'s Turn`;
    for( const cellDiv of cellDivs){
        cellDiv.classList.remove('X');
        cellDiv.classList.remove('O');
        cellDiv.classList.remove('won');
    }
    GameOn = true;
}

// function to input X or O in game cell

const cellClick = (e) =>{
    const classList = e.target.classList;

    if(!GameOn || classList[1]==='X' || classList[1]==='O'){
        return;
    }
    if(xIsNext){
        classList.add('X');
        GameStatus();
    }else{
        classList.add('O');
        GameStatus();
    }
};

// event Listeners

resetDiv.addEventListener('click', ResetCheck);       //  functions when reset button is clicked

for(const cellDiv of cellDivs){
    cellDiv.addEventListener('click', cellClick)      //  functions when game cell is clicked
}