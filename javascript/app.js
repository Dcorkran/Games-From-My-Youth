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
  // function getWord(){


  function RandomWord() {
      var requestStr = "http://randomword.setgetgo.com/get.php";

      $.ajax({
          type: "GET",
          url: requestStr,
          dataType: "jsonp",
          success: function(data){
            console.log(data);
            displayWordBox(data);
          }
      });
  }



  // }

  function displayWordBox(data){
    for (var i = 0; i < data.Word.length; i++) {
      var $div = $('<div>').addClass('hangman-box').text('-');
      $('.hangman-letters').append($div);
      word = data.Word;
    }
  }



  function doesGuessMatch(character,word){
    var newArr = [];
    for (var i = 0; i < word.length; i++) {
      if (character === word[i]) {
        newArr.push(i+1);
      }
    }
    return newArr;
  }

  function fillInLetter(letterArray,letter){
    if (letterArray.length !== 0) {
      for (var i = 0; i < letterArray.length; i++) {
        $('.hangman-letters div:nth-of-type('+letterArray[i]+')').text(letter);
      }

    }
  }
  var word = '';
  RandomWord();
  var guess = '';
  var correctGuesses = [];
  var attempts = 5;
  $('#guesses-left').text(attempts);


  $('#hangman-button').on('click', function(event){
    event.preventDefault();
    guess = $('#hangman-val').val();
    $('#hangman-val').val('');
    var fillInNumber = doesGuessMatch(guess,word);

    if (fillInNumber.length === 0) {
      attempts -= 1;
      $('#guesses-left').text(attempts);
      alert('That is not correct. Try again!');
    } else {
      correctGuesses = correctGuesses.concat.apply(correctGuesses, fillInNumber);
      fillInLetter(fillInNumber,guess);
    }
    if ($('#guesses-left').text() === '0') {
      alert('You lose :(');
    } else if (correctGuesses.length === word.length) {
      alert('You win!');
    }

  });
});


$('#pokemon-button').on('click',function(){


  function playAudio(){

    var songChoices = ['6xG2ZGudUgtV235xvDlSEt','16m4pel49Xid6zIf5Ov2v0'];
    var randomChoice = Math.random();
    randomChoice = Math.round(randomChoice);

    $.get('https://api.spotify.com/v1/tracks/'+songChoices[randomChoice],function(data){
      $('#audio').attr('src',data.preview_url);
      $('#audio').trigger('play');;
    });
  }
  playAudio();

  $('.pokemon-main').append($('<form>').attr('id','pokemon-form'));
  $('#pokemon-form').append($('<input>').attr({type:'text',placeholder:'What is your guess?',id:'pokemon-value'}));
  $('#pokemon-form').append($('<input>').attr({type:'submit',id:'pokemon-submit'}));

  var pokenum = Math.floor(Math.random() * 151) + 1;
  var guess = '';
  var pokename = '';

  $.get('http://pokeapi.co/api/v2/pokemon/'+pokenum+'/',function(data){
    console.log(data);
    $('#pokemon-image').attr('src',data.sprites.front_default);
    pokename = data.name;
  });

  $('#pokemon-submit').on('click',function(event){
    event.preventDefault();
    guess = $('#pokemon-value').val().toLowerCase();
    $('#pokemon-value').val('');
    if (guess === pokename) {
      alert('You are correct!');
    } else {
      alert('try again');
    }
  });



});
