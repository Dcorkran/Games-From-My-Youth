$( "input[value='Play!']" ).on('click', function(){

  function isSquareFilled(box) {
    if (box.hasClass('X')) {
      return true;
    } else if (box.hasClass('O')) {
      return true;
    } else {
      return false;
    }
  }

  function markBoard(player,box) {
    if (player === 1) {
      box.addClass('X');
      box.text('X');
      return '.X';
    } else {
      box.addClass('O');
      box.text('O');
      return '.O';
    }
  }

  function whoseTurn(player){
    if (player === 1) {
      return 2;
    } else {
      return 1;
    }
  }

  function checkWinOrDraw(player,symbol) {
    if ($('.tl, .tm, .tr').filter(symbol).length === 3) {
      return true;
    } else if ($('.l, .m, .r').filter(symbol).length === 3) {
      return true;
    } else if ($('.bl, .bm, .br').filter(symbol).length === 3){
      return true;
    } else if ($('.tl, .m, .br').filter(symbol).length === 3) {
      return true;
    } else if ($('.bl, .m, .tr').filter(symbol).length === 3) {
      return true;
    } else if ($('.tl, .l, .bl').filter(symbol).length === 3) {
      return true;
    } else if ($('.tm, .m, .bm').filter(symbol).length === 3) {
      return true;
    } else if ($('.tr, .r, .br').filter(symbol).length === 3) {
      return true;
    } else {
      return false;
    }
  }

  var player = 1;
  $('.box').on('click',function() {
    var box = $(this);
    var mark = isSquareFilled(box);
    if (!mark) {
      var symbol = markBoard(player,box);
    } else {
      alert('Please click an empty box!');
      return;
    }
    var win = checkWinOrDraw(player,symbol);
    if (win) {
      alert('you win!');
      return;
    }
    player = whoseTurn(player);
  });
});

$( "input[value = 'Play Hangman!']").on('click',function(){
  function getWord(){
    var word = 'test';
    return word;
  }

  function displayWordBox(word){
    for (var i = 0; i < word.length; i++) {
      var $div = $('<div>').addClass('hangman-box').text('-');
      $('.hangman-letters').append($div);
    }
  }



function doesGuessMatch(character,word){
  for (var i = 0; i < word.length; i++) {
    if (character === word[i]) {
      return i+1;
    }
  }
  return 0;
}

function fillInLetter(number,letter){
  if (number !== 0) {
    $('.hangman-letters div:nth-of-type('+number+')').text(letter);
  }
}


  var word = getWord();
  displayWordBox(word);
  var guess = '';

  $('#hangman-button').on('click', function(event){
    event.preventDefault();
    guess = $('#hangman-val').val();
    var fillInNumber = doesGuessMatch(guess,word);
    fillInLetter(fillInNumber,guess);
  });





});
