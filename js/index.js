// Game Constants & Variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('music/food.mp3');
foodSound.volume = 0.3;
const gameOverSound = new Audio('music/death.mp3');
const interfaceSound = new Audio('music/interface.mp3');
const musicSound = new Audio('music/8_Bit_Menu_- David_Renda.mp3');
musicSound.volume = 0.7;
let speed = 6;
let score = 0;
let lastPaintTime = 0;
let hiscoreval = 0;
let snakeArr = [
    {x: Math.round(1+(50-1)*Math.random()),y: Math.round(1+(50-1)*Math.random())} //randomize the position of the snake
]
food = {x: Math.round(1+(50-1)*Math.random()),y: Math.round(1+(50-1)*Math.random())};

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // snake eats itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //wall collide
    if(snake[0].x > 50 || snake[0].x <0 || snake[0].y > 50  || snake[0].y <0)
            return true;
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        //hiscoreval = localStorage.getItem('hiscore');
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            highScoreBox.innerHTML = "HiScore: " + localStorage.getItem("hiscore");
        }
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: Math.round(0+(50-0)*Math.random()),y: Math.round(0+(50-0)*Math.random())}];
        score = 0;
        scoreBox.innerHTML = "Score: "+score;
    }

    // If snake collides with food, add a new body before head, regenerate the food
    // unshift returns a new array with the new element placed before the first element
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score +=10;
        scoreBox.innerHTML = "Score: " +score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a = 1;
        let b = 50;
        food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
    }

    // Moving the snake
    for(let i = snakeArr.length - 2; i >=0; i--){
        snakeArr[i+1] = {...snakeArr[i]}; //destructuring //snakeArr[i+1] will reference a new object
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //display the food
    foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    board.appendChild(foodElement);
}

// Main Logic
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
} else {
    hiscoreval = JSON.parse(hiscore)
    highScoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x: 0, y: 1} //Start game
    musicSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
            
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        
        default:
            break;
    }
});

window.addEventListener('swiped', e=>{
    inputDir = {x: 0, y: 1} //Start game
    musicSound.play();
    switch(e.detail.dir){
        case "up":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
            
        case "down":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "left":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "right":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        
        default:
            break;
    }
});