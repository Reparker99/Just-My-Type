$("#keyboard-upper-container").hide();

$(document).keydown(function (e) {
  if (e.which == 16) {
    $("#keyboard-upper-container").show();
    $("#keyboard-lower-container").hide();
  }
});

$(document).keyup(function (e) {
  if (e.which == 16) {
    $("#keyboard-upper-container").hide();
    $("#keyboard-lower-container").show();
  }
});

$(document).keypress(function (e) {
  let key = $("#" + e.which);
  $(key).css({ "background-color": "yellow" });
  $(document).keyup(function (e) {
    $(key).css({ "background-color": "#f5f5f5" });
  });
});

let sentences = [
  "ten ate neite ate nee enet ite ate inet ent eate",
  "Too ato too nOt enot one totA not anot tOO aNot",
  "oat itain oat tain nate eate tea anne inant nean",
  "itant eate anot eat nato inate eat anot tain eat",
  "nee ene ate ite tent tiet ent ine ene ete ene ate",
];

let wordCount = 54;

let i = 0;
let j = 0;
let errors = 0;
$("#sentence").append(sentences[i]);
$("#target-letter").append(sentences[i].charAt(j));

$(".col-xs-12").css({
  "padding-left": "5px",
  "padding-right": "5px",
  "margin-left": "0",
});

let start = new Date();
console.log(start);

$(document).keypress(function (e) {
  /* console.log(e.which);
  console.log(sentences[i].charCodeAt(j)); */
  if (e.which == sentences[i].charCodeAt(j)) {
    $("#feedback").append('<span class="glyphicon glyphicon-ok"></span>');
    j++;
    $("#target-letter").text(sentences[i].charAt(j));
    let leftMargin = parseInt($(".col-xs-12").css("margin-left"));
    if (e.which == 32) {
      let newMargin = leftMargin + 22 + "px";
      $(".col-xs-12").css({ "margin-left": newMargin });
    } else {
      let newMargin = leftMargin + 16 + "px";
      $(".col-xs-12").css({ "margin-left": newMargin });
      if (j == sentences[i].length) {
        i++;
        let end = new Date();
        let timeMS = end.getTime() - start.getTime();
        let time = Math.round((timeMS / 1000 / 60) * 100) / 100;
        let wordsPerMinute = Math.round(wordCount / time - 2 * errors);
        console.log(time, errors, wordsPerMinute);
        if (i >= sentences.length) {
          let end = new Date();
          let timeMS = end.getTime() - start.getTime();
          let time = Math.round((timeMS / 1000 / 60) * 100) / 100;
          console.log(time, errors);
          let netWPM = Math.round((wordCount - errors) / time);
          let wordsPerMinute = Math.round(wordCount / time);
          let gameOver = confirm(
            `Practice complete! Time: ${time} Minutes; Number of Errors: ${errors}; Words Per Minute: ${wordsPerMinute}; Net Words Per Minute: ${netWPM};
            Would you like to try again?`
          );
          if (gameOver) {
          errors = 0;
          i = 0;
          j = 0;
          $("#sentence").text(sentences[i]);
          $(".col-xs-12").css({ "margin-left": "0" });
          $("#feedback").empty();
          start = new Date();
          } else {
            $('#feedback').text(`Time: ${time} Minutes; Number of Errors: ${errors}; Words Per Minute: ${wordsPerMinute}; Net Words Per Minute: ${netWPM};`)
          }
        } else {
          j = 0;
          $("#sentence").text(sentences[i]);
          $(".col-xs-12").css({ "margin-left": "0" });
          $("#feedback").empty();
        }
      }
    }
  } else {
    $("#feedback").append('<span class="glyphicon glyphicon-remove"></span>');
    errors++;
  }
});
