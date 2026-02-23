(function () {
  'use strict';

  var track = document.getElementById('galleryTrack');
  if (!track) return;

  var slides = track.querySelectorAll('.gallery__slide');

  // Sync scroll → countdown timer (optional future use)
  track.addEventListener('scroll', function () {
    var w = track.offsetWidth;
    if (!w) return;
    var idx = Math.round(track.scrollLeft / w);
    idx = Math.min(idx, slides.length - 1);
    // future: update dot indicators if added to gallery
  });
})();
