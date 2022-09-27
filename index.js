console.log('Live reloading')
//sounds
let simonAudio1 = document.createElement("audio")
simonAudio1.setAttribute("src", "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3")

let simonAudio2 = document.createElement("audio")
simonAudio2.setAttribute("src", "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3")

let simonAudio3 = document.createElement("audio")
simonAudio3.setAttribute("src", "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3")

let simonAudio4 = document.createElement("audio")
simonAudio4.setAttribute("src", "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")



// Audio to play when committing an error in the played pattern
let wrong = new Audio("sounds/wrong.mp3");
wrong.volume = 0.3;

let steps; // this counter will show how many steps to click are on each level
let hard_mode = false;  //  boolean variable to know the game status, hard or normal

//sleep function
function sleep(ms){
    return new Promise(resolve =>setTimeout(resolve, ms));
}

//function for the endscreen
function endtxt(){
    var txtEndTitle = document.getElementById('txtEndTitle');
    document.getElementById('endScreen').style.display = 'block';
}

//function to replay
function replay(){
    location.reload();
}

//Function that returns a random number between the specified values.
//The return value will not be lower than "min" , and will be less than (but not equal to) "max"
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

//Selecting the buttons
const start = document.querySelector('#buttonStart_id');
const hard = document.querySelector('#buttonHard_id');
const restart = document.querySelector('#buttonRestart_id');
const red_1 = document.querySelector('#red_1');
const green_2 = document.querySelector('#green_2');
const blue_3 = document.querySelector('#blue_3');
const yellow_4 = document.querySelector('#yellow_4');

let gamepattern = [];
//this variable stores the user's responses for each click
var userAnswerClick;

//This function is to wait and receive user responses
function userAnswer(){
    
    red_1.addEventListener('click',async function () {
            userAnswerClick=1;
            red_1.setAttribute('class','pattern_select_red');
            simonAudio1.play()
            await sleep(200); 
            red_1.setAttribute('class','red');
        });

    green_2.addEventListener('click',async function () {
            userAnswerClick=2;
            green_2.setAttribute('class','pattern_select_green');
            simonAudio2.play()
            await sleep(200);   
            green_2.setAttribute('class','green'); 
        });

    blue_3.addEventListener('click',async function () {
            userAnswerClick=3;
            blue_3.setAttribute('class','pattern_select_blue');
            simonAudio3.play()
            await sleep(200); 
            blue_3.setAttribute('class','blue'); 
        });

    yellow_4.addEventListener('click',async function () {
            userAnswerClick=4;
            yellow_4.setAttribute('class','pattern_select_yellow');
            simonAudio4.play()
            await sleep(200);  
            yellow_4.setAttribute('class','yellow');
        });

    //This promise is necessary to prevent the general function of the game from continuing to progress without waiting for the user's response
    const promise = new Promise((resolve) => {
            red_1.addEventListener('click', resolve)
            green_2.addEventListener('click', resolve)
            blue_3.addEventListener('click', resolve)
            yellow_4.addEventListener('click', resolve)
            })
            return  promise;          
}


//The game starts when you click "start"
start.addEventListener('click',async function () {
    
    if (hard.checked) {
        hard_mode = true;
    }
    
    //This array will save the answers of the 20 levels
    const gamePattern = [];
    
    //we create the answers for the 20 levels
    for(i=0; i < 20; i++) gamePattern[i]= getRandomInt(1, 5)
    
    await sleep(300);
    
    //The game starts here, "i" is the level
    i =0;
    
    //This "while" prevents us from going over 20 levels
    while( i < 20){
        document.querySelector(".tittle").innerHTML = "Simon's Game";
        
        steps = 1+i; // to know how many clickable steps are per level
        document.querySelector(".tittle").innerHTML = ("Level: " + steps);
        document.querySelector(".step").innerHTML = ("Step: " + 0 + "/" + steps);
        
       
        //This "for" shows the pattern to enter (its limit is the level reached)
        for(j =0; j<=i; j++){
            console.log(j);

            switch (gamePattern[j]){
                case 1:
                red_1.setAttribute('class','pattern_select_red');
                simonAudio1.play()
                await sleep(500); 
                red_1.setAttribute('class','red');
                break;

                case 2:
                green_2.setAttribute('class','pattern_select_green');
                simonAudio2.play()
                await sleep(500);   
                green_2.setAttribute('class','green'); 
                break;

                case 3:
                blue_3.setAttribute('class','pattern_select_blue');
                simonAudio3.play()
                await sleep(500); 
                blue_3.setAttribute('class','blue'); 
                break;

                case 4:
                yellow_4.setAttribute('class','pattern_select_yellow');
                simonAudio4.play()
                await sleep(500);  
                yellow_4.setAttribute('class','yellow');
                break;

                default:
                break;
            }


            await sleep(500);
        }

        
        //This "for" evaluates the user's response
        for(j =0; j<=i; j++){

            //We wait for the user's response
            await userAnswer();
            document.querySelector(".step").innerHTML = ("Step: " + (j+1) + "/" + steps);
            //If the user makes a mistake in any step, the "for" is broken without having leveled up
            if(userAnswerClick != gamePattern[j]){
                wrong.play(); // plays sound of error
                    if (hard.checked == true) {
                        document.querySelector(".tittle").innerHTML = "Game over, Start again";
                        // changing the page style to inform of the error
                        document.body.style.backgroundColor = "red";
                        await sleep(500)
                        document.body.style.backgroundColor = "white";
                        startOver();
                        break;

                    } else{
                        document.querySelector(".tittle").innerHTML = "You missed, try again!";
                        // changing the page style to inform of the error
                        document.body.setAttribute('class','body2');
                        await sleep(500)
                        document.body.setAttribute('class','body');


                        break;
                    }
                
                
            }
            
            //If the user reaches the last step, he levels up!
            if(j==i){
                console.log();
                if(i==19){ //a conditional to boot up the play again button and the endscreen
                    txtEndTitle.innerHTML = "You have completed all 20 levels";
                    document.getElementById('endScreen').style.display = 'block';
                    console.log();
                    document.body.style.backgroundColor = "#fbef06";
                    await sleep(500);
                    document.body.style.backgroundColor = "#fbef06";

                }
                i++; //level up
                break;

            }  

        }
        await sleep(1000);

        }
    }
);

//adding the restart button//
restart.addEventListener('click',async function () {
    alert("Game is restarting!") //pop-up message alerting the user the game is restarting//
    location.reload(); //refreshes the entire page in order to erase all the information and start from the beginning//
})

// reseting to a new game pattern
function startOver() {
    // hard_mode = false; // so the game doesn't enter the while loop 
    alert("No hard mode for you. Try normal mode!")
    location.reload();
 }
