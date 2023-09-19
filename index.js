var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var keyPressCount = 0;
var patternIndex = 0;
var isalive = true;


function nextSequence(){
    if(isalive = false){
        return;
    }
    level++
    userClickedPattern = [];
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("." + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
}

$(".btn").on("click", function (){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});


function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
        audio.play();
   
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
    $("#" + currentColour).removeClass("pressed")
    }, 100);
}
$(document).on('keydown', function(){
    keyPressCount++
    if(keyPressCount === 1){
        keyPressCount++
        nextSequence()
    }

});

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
        setTimeout(() => {
            nextSequence()
        }, 1000);
    }
    }else{
        var overAudio = new Audio('sounds/wrong.mp3')
        overAudio.play();
        isalive = false;
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        keyPressCount = 0;
        level = 0;
        gamePattern = [];

    }


}