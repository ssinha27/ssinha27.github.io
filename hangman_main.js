//GAME
//click on an alphabet --> run function
//set start with correct alphabet 
//deduct guesses, if any incorrect
//mark selected letter used
//define all 10 letter variables, guesses, and game_over
//only keep one letter variable

 //VARIABLES
var maskedWord = [];
var letter = "*";
var guesses = 6;
var game_over = false;
var element = document.getElementById('masked_word');
//create an array of letters
var alphabetS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
//create an array of selected word of < 10
var word_list = ["ABDUCTED", "ACCEPTED", "CARRAWAY", "DECADENT", "FAINTING", "HEADBAND", "KILOGRAM", "ONLOOKER", "UNSPRUCED", "SURFER", "DICER", "BLAST", "SPOOF", "AIRLINES", "SKEIGH", "HOMELIKE", "PRIEST", "LIGHTEN", "SPIRAL", "COB", "MONO", "UPSWING", "EVEN", "FRANK", "DIVULGE", "FUMIGATED"]  
//if each word is assigned value between 1 and 26 (i.e total numb of words), select a matching word for the next step
var word_index= word_list[Math.floor((Math.random()*26))]; 
//split letters of word_index and store into an array
var word_index_letters = word_index.split("");
var len = word_index.length;

//function for maskedword
function newMaskedWord() {
  for (var k = 0; k < len; k += 1) {
    maskedWord.push("*");
    var res = maskedWord.join("");
    document.getElementById('masked_word').innerHTML=res;
  }
}


//ready jquery elements when page loading complete
$(document).ready(function () {
  //apply # of initial maskedletter *
  newMaskedWord();
  //create a variable to append to 
  var $alphaContainer = $( ".alphabets" );
  // for loop or something to get the alphabetS var through here
  for (var j = 0; j < alphabetS.length; j++) {
    // final html to be added to the html class
    var $btn = $ ('<input/>').attr({type: "button", value: alphabetS[j], onclick: "game_let('"+alphabetS[j]+"');", id: alphabetS[j], name: alphabetS[j]});
    $btn.appendTo($alphaContainer);
  }
});
  

//GAME function
function game_let(incoming_letter) {
  var Boo_Found_Match = false;
//end game if game is over
if (game_over == true) {
  return;
}  
//disable incoming letter
document.getElementById(incoming_letter).disabled = true;
//for loop to assign incoming letter if correct or star if not
for (var i = 0; i <word_index_letters.length; i++) { 
  if (word_index_letters[i] === incoming_letter) {
    maskedWord[i] = incoming_letter;
    Boo_Found_Match = true;
    //assign value to h2
    document.getElementById('masked_word').innerHTML = maskedWord.join(""); 
  }
}    
//ensure guesses counter doesn't go below 0 
if(Boo_Found_Match === false) {
    guesses -= 1;
    document.getElementById("guess_text").innerHTML = "You have " + guesses +" incorrect guesses left.";
  if(guesses == 0) { 
      game_over = true;
      document.getElementById("guess_text").innerHTML = "GAME OVER. Try again."; 
      }
  }     
}
 
                  
//NEW GAME  
function resetx() {
  //clear variables, choose word, assign masked word 
  maskedWord = [];
  guesses = 6;
  game_over = false;
  word_index = word_list[Math.floor((Math.random()*26))];
  len = word_index.length;
  word_index_letters = word_index.split("");
  $("#guess_text").html(""); 
  $(".alphabets input").prop("disabled",false); //clear display buttons (i.e.) mark them unused
  newMaskedWord(); //choose a word from array and assign masked word
}
