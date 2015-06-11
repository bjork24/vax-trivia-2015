if ( location.hostname === 'localhost' ) {
  $('body').addClass('dan');
}

Reveal.addEventListener( 'slidechanged', function( event ) {
  var audio = document.querySelectorAll('.dan section.present:not(.stack) audio')[0];
  if ( audio ) {
    audio.currentTime = 0;
    audio.play();
  }
} );

Reveal.addEventListener( 'score', function( event ) {
  var json = 'https://spreadsheets.google.com/feeds/cells/1DHiAUNEQdf-p7ZkjpQmu6KlUD1nBBGmGqCMjAWc9LQQ/od6/public/values?alt=json-in-script&callback=?';
  $.getJSON(json).done(function(data){
    var scores = {};
    var scoreSort = [];
    var name;
    data.feed.entry.forEach(function(v, i){
      if ( i > 6 ) {
        var test = v.content.$t;
        var content = parseInt(test);
        if ( isNaN(content) ) {
          name = test;
          scores[name] = [];
        } else {
          scores[name].push(content);
        }
      }
    });
    for( name in scores ) {
      var score = _.reduce(scores[name], function(memo, num){ return memo + num });
      scoreSort.push({ name : name, score : score });
    }
    var sortedScores = _.sortBy(scoreSort, 'score');
    sortedScores.reverse();
    $('.live-scores').empty();
    sortedScores.forEach(function(v){
      $('.live-scores').append('<li><b>' + v.name + ':</b> ' + v.score + '</li>');
    });
  });

});