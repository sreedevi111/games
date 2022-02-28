
const container = document.querySelector(".fire")
const fireworks = new Fireworks(container, {
    rocketsPoint: 50,
    hue: { min: 0, max: 360 },
    delay: { min: 15, max: 30 },
    speed: 2,
    acceleration: 1.05,
    friction: 0.95,
    gravity: 1.5,
    particles: 50,
    trace: 3,
    explosion: 5,
    autoresize: true,
    brightness: {
        min: 50,
        max: 80,
        decay: { min: 0.015, max: 0.03 }
    },
    mouse: {
        click: false,
        move: false,
        max: 3
    },
    boundaries: {
        x: 20,
        y: 20,
        width: container.clientWidth,
        height: container.clientHeight
    },
    sound: {
        enable: true,
        files: [
            'explosion0.mp3',
            'explosion1.mp3',
            'explosion2.mp3'
        ],
        volume: { min: 1, max: 2 },
    }
});




let blackjackGame = {                           //defining blackjackGame as object
    you: {
        scoreSpan: "#Player-Result",
        div: "#Player-Box",
        score: 0,
    },
    dealer: {
        scoreSpan: "#Dealer-Result",
        div: "#Dealer-Box",
        score: 0,
    },
    cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "Q", "J", "A"], //cards
    cardMap: {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        J: 10,
        Q: 10,
        K: 10,
        A: [1, 11],                     //cards with face value
    },
    suites: ["&#9824", "&#9670", "&#9827", "&#9829"],       //suites with 4 symbol
    wins: 0,
    losses: 0,
    draws: 0,
    isStand: false,
    turnsOver: false,
};
const YOU = blackjackGame["you"];           //caps refer const
const DEALER = blackjackGame["dealer"];

$("#playButton").on("click",blackjackHit)         //id selector, event, eventhandler
$("#standButton").click(dealerLogic)
$("#resetButton").click(blackjackDeal)

function blackjackHit() {
    if (blackjackGame["isStand"] === false) {
        let card = randomCard();            //shuffled card is thrown
        showCard(card, YOU);                //show its value
        updateScore(card, YOU);             //update its score
        showScore(YOU);                     //show score
    }
}
function randomCard() {                                 // generating random card
    let randomIndex = Math.floor(Math.random() * 13);               // math.random takes random value b/n 0 and 1
    return blackjackGame["cards"][randomIndex];                         //gets card with random index
}

//function to display card
function showCard(card, activePlayer) {
    if (activePlayer["score"] <= 21) {
        let cardImage = document.createElement("div");          //DOM manipulation
        let randomIndexSuit = Math.floor(Math.random() * 4);
        let singleSuit = blackjackGame["suites"][randomIndexSuit];
        cardImage.className = "card";                                             ///!!!!
        let objkeys = Object.keys(blackjackGame["cardMap"]);  //2,3,4,....
        for (let i = 0; i < objkeys.length; i++) {              //objkeys.length=13
            if (objkeys[i] == card) {
                if(randomIndexSuit==0 || randomIndexSuit==2){
                    cardImage.innerHTML = card + `<div id=suites style="color:black">${singleSuit}</div>`;      // add card with color
                    cardImage.style.color="black";
                }
                else{
                    cardImage.innerHTML = card + `<div id=suites style="color:red">${singleSuit}</div>`;          //???n
                    cardImage.style.color="red";

                }

            }
        }
        document.querySelector(activePlayer["div"]).appendChild(cardImage);

    }
}


//function to add the score of displayed cards
function updateScore(card, activePlayer) {
    if (card === "A") {                                                                 //taking value of A
        if ((activePlayer["score"] + blackjackGame["cardMap"][card][1]) <= 21) {        //if sum is less than 21, A with 11 takes
            activePlayer["score"] += blackjackGame["cardMap"][card][1];
        } else {
            activePlayer["score"] += blackjackGame["cardMap"][card][0];
        }
    } else {
        activePlayer["score"] += blackjackGame["cardMap"][card];
    }
}

//function to display score
function showScore(activePlayer) {
    if (activePlayer["score"] > 21) {
        document.querySelector(activePlayer["scoreSpan"]).textContent = "Oops.!!";
        document.querySelector(activePlayer["scoreSpan"]).style.color = "white";
    } else {
        document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"];
    }
}


//function for starting the next set game
function blackjackDeal() {
    let yourImages = document
        .querySelector("#Player-Box")
        .querySelectorAll("div");


    for (var i = 0; i < yourImages.length; i++) {
        yourImages[i].remove();
    }
    fireworks.stop();
    YOU["score"] = 0;
    document.querySelector("#Player-Result").textContent = 0;
    document.querySelector("#Player-Result").style.color = "#ffffff";
    if (blackjackGame["turnsOver"] === true) {
        let dealerImages = document
            .querySelector("#Dealer-Box")
            .querySelectorAll("div");

        blackjackGame["isStand"] = false;
        for (var i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        DEALER["score"] = 0;
        document.querySelector("#Dealer-Result").textContent = 0;
        document.querySelector("#Dealer-Result").style.color = "white";

        document.querySelector("#result").textContent = "Let's Play!";
        $("#result").style.color = "black";

        blackjackGame["turnsOver"] = false


    }

}


//function for setting timer of dealer
//promise allows to associate handlers with an asynchronous action
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

//function for dealer game
async function dealerLogic() {
    blackjackGame["isStand"] = true;

    while (DEALER["score"] < 16 && blackjackGame["isStand"] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(800);

    }

    blackjackGame["turnsOver"] = true;
    showResult(computeWinner());
}

//compute winner,update wins losses draws
function computeWinner() {
    let winner;
    if (YOU["score"] <= 21) {
        if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
            blackjackGame["wins"]++;
            winner = YOU;
        } else if (YOU["score"] < DEALER["score"]) {
            blackjackGame["losses"]++;
            winner = DEALER;
        } else if (YOU["score"] === DEALER["score"]) {
            blackjackGame["draws"]++;
        }
    } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
        blackjackGame["losses"]++
        winner=DEALER;
    } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
        blackjackGame["draws"]++;
    }
    return winner;
}

//to display the result
function showResult(winner) {
    let message, messageColor
    if (blackjackGame["turnsOver"] === true) {
        if (winner === YOU) {
            document.querySelector("#wins").textContent = blackjackGame["wins"];
            message = "Hurray!!!!..You won!"
            messageColor = "white"
            fireworks.start();



        } else if (winner === DEALER) {
            document.querySelector("#losses").textContent = blackjackGame["losses"];
            message = "You lost... Better luck next time";
            messageColor = "white";


        }
        else {
            document.querySelector("#draws").textContent = blackjackGame["draws"];
            message = "its a draw";
            messageColor = "white"

        }
        document.querySelector("#result").textContent = message;
        document.querySelector("#result").style.color = messageColor;
    }
}
let alertOnce = false;
// function to alert rotate device when the webpage is opened in smaller devices
// let limitFunc = function () {
//     if (window.innerWidth <= 1000 && alertOnce === false) {
//         alert("Rotate Device.");
//         alertOnce = true;
//     }
//
//
// }
window.addEventListener("resize", limitFunc);  //window size os resized=>event
window.addEventListener("onload", limitFunc);

function rules() {
    alert("The goal of blackjack is to beat the dealer's hand without going over 21.\n" +
        "Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand.\n" +
        "Each player starts with two cards, one of the dealer's cards is hidden until the end.\n" +
        "To 'Hit' is to ask for another card. To 'Stand' is to hold your total and end your turn.\n" +
        "If you go over 21 you bust, and the dealer wins regardless of the dealer's hand")


}