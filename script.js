(function () {
  var track = document.querySelector('.gallery-pv__track');
  var dots = document.querySelectorAll('.gallery-pv__dot');
  var slides = document.querySelectorAll('.gallery-pv__slide');

  if (!track || !dots.length) return;

  function setActive(i) {
    dots.forEach(function (d, j) {
      d.classList.toggle('gallery-pv__dot--active', j === i);
      d.setAttribute('aria-selected', j === i);
    });
  }

  track.addEventListener('scroll', function () {
    var index = Math.round(track.scrollLeft / track.offsetWidth);
    setActive(Math.min(index, dots.length - 1));
  });

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      var slide = slides[i];
      if (slide) {
        slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        setActive(i);
      }
    });
  });
})();
