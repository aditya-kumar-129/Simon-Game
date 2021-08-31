var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
var level = 0;
$(document).keypress(function() 
{
    if (!started) 
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() 
{
    //Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");      //don't know the logic why THIS ONLY???
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel) 
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    {
        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }
    } 
    else 
    {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
function nextSequence() 
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function animatePress(currentColor) 
{
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function playSound(name) 
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function startOver() 
{
    level = 0;
    gamePattern = [];
    started = false;
}