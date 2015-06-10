if ( location.hostname === 'localhost' ) {
  $('body').addClass('dan');
}

Reveal.addEventListener( 'slidechanged', function( event ) {
  var audio = document.querySelectorAll('.dan section.present:not(.stack) audio')[0];
  if ( audio ) {
    audio.play();
  }
} );