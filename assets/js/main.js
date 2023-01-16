// Screensaver
function screenSaver() {
  var s_saver;

  $("body").mousemove(function () {
    clearTimeout(s_saver);

    s_saver = setTimeout(function () {
      $(".screensaver").fadeIn(600);
    }, 40000);

    $(".screensaver").fadeOut(300);
  });

  $("body").on("wheel", function (e) {
    clearTimeout(s_saver);

    s_saver = setTimeout(function () {
      $(".screensaver").fadeIn(600);
    }, 20000);

    $(".screensaver").fadeOut(300);
  });
}

// Project Filter
function filterProject() {
  $(".project-filter-button").on("click", function (e) {
    var val = $(this).val();
    var tl = anime.timeline({
      easing: "easeInOutExpo",
      duration: 400
    });
    if (val == "all") {
      tl
        .add({
          targets: ".project-all-item",
          opacity: [1, 0],
          translateY: [0, 10],
          delay: anime.stagger(100),
          complete: function () {
            $('.project-all-item').removeClass('hide');
          }
        }).add({
          targets: ".project-all-item",
          opacity: [0, 1],
          translateY: [10, 0],
          delay: anime.stagger(100)
        });
    } else {
      tl
        .add({
          targets: ".project-all-item",
          opacity: [1, 0],
          translateY: [0, 10],
          delay: anime.stagger(100),
          complete: function () {
            $('.project-all-item').removeClass('hide');
            $('.project-all-item').filter(':not([data-scope*="' + val + '"])').addClass('hide');
          }
        }).add({
          targets: ".project-all-item",
          opacity: [0, 1],
          translateY: [10, 0],
          delay: anime.stagger(100)
        });
    }
  });

  $(".project-filter label").on("click", function (e) {
    $('.project-filter label').removeClass('selected');
    $(this).addClass('selected');
  });
}


// Text Animation
function revealAnimation() {
  const target = document.querySelector('h1');

  var tl = anime.timeline({
    easing: "easeInOutExpo",
    duration: 750
  });

  Splitting({
    target: target,
    by: 'chars'
  });

  tl
    .add({
      targets: ".char",
      translateY: ["1em", 0],
      opacity: [0, 1],
      delay: anime.stagger(10)
    }).add({
      targets: ".animation--line",
      scaleX: [0, 1],
      delay: anime.stagger(80)
    }, '-=600').add({
      targets: ".animation--fadein",
      opacity: [0, 1],
      translateY: ["10", 0],
      delay: anime.stagger(80)
    }, '-=600');
}

// Time
function updateClock() {
  var hour = moment(new Date());
  var minute = moment(new Date());
  hour = hour.tz("Asia/Makassar").format("hh");
  minute = minute.tz("Asia/Makassar").format("mm A");
  $(".screensaver-hour").text(hour);
  $(".screensaver-minute").text(minute);
}

// Header Animation
function headerAnimation() {
  var header = document.querySelector(".site-header");
  var headroom = new Headroom(header, {
    tolerance: {
      down: 10,
      up: 20,
    },
    offset: 15,
  });
  headroom.init();
}

// Scroll to Top
function srollToTop() {
  const scrollElement =
    window.document.scrollingElement ||
    window.document.body ||
    window.document.documentElement;
  var distance = jQuery(window).scrollTop();
  var scrollduration = distance / 10;
  if (distance > 800) {
    anime({
      targets: scrollElement,
      scrollTop: 0,
      duration: 500 + scrollduration,
      easing: "easeInOutExpo",
    });
  } else {
    anime({
      targets: scrollElement,
      scrollTop: 0,
      duration: 800,
      easing: "easeInOutExpo",
    });
  }
}

// Close Function
function closeFunction() {
  if ($(".project")[0]) {
    $(".close").css("display", "inline-flex");
  } else {
    $(".close").css("display", "none");
  }
}

// Video Popup
function videoPopup() {
  $(".video-popup").magnificPopup({
    type: "iframe",
    mainClass: "mfp-anim",
    removalDelay: 500,
    preloader: true,
    fixedContentPos: false,
    iframe: {
      markup: '<div class="mfp-iframe-scaler">' +
        '<div class="mfp-close"></div>' +
        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
        "</div>",
      srcAction: "iframe_src",
    },
  });
}

// Active Nav Link
function activeLink() {
  if (location.pathname.split("/")[1] !== "") {
    $(".site-nav-link-item").removeClass("site-nav--active");
    $(
      '.site-nav-link-item[href^="/' + location.pathname.split("/")[1] + '"]'
    ).addClass("site-nav--active");
  } else {
    $(".site-nav-link-item").removeClass("site-nav--active");
  }
}

// Load Functions on Initial Page Load
document.addEventListener("DOMContentLoaded", function () {
  if ($(window).width() > 769) {
    closeFunction();
    screenSaver();
    headerAnimation();
    window.setInterval(function () {
      updateClock();
    }, 1000);
  }

  history.scrollRestoration = "manual";
  $(".top-button").on("click", function () {
    srollToTop();
  });

  videoPopup();
  activeLink();
  revealAnimation();
  filterProject();
});

document.addEventListener("lazyloaded", function (e) {
  anime({
    targets: e.target,
    opacity: 0,
    easing: "easeInOutCubic",
    direction: "reverse",
    duration: 300,
  });
});

// Barba
barba.init({
  transitions: [{
    name: "page-transition",
    leave: (data) => {
      return new Promise((resolve) => {
        srollToTop();
        anime({
          targets: data.current.container,
          opacity: 0,
          translateY: 40,
          easing: "easeInOutExpo",
          duration: 400,
          complete: () => {
            resolve();
          },
        });
      });
    },
    enter: (data) => {
      anime({
        targets: data.next.container,
        opacity: 0,
        translateY: 80,
        direction: "reverse",
        easing: "easeInOutExpo",
        duration: 800,
      });
    },
  }, ],
});

barba.hooks.after((data) => {
  window.lazySizes.init();
  if ($(window).width() > 769) {
    closeFunction();
  }

  history.scrollRestoration = "manual";
  $(".top-button").on("click", function () {
    srollToTop();
  });

  videoPopup();
  activeLink();
  revealAnimation();
  filterProject();

  if (typeof ga === "function") {
    ga("send", "pageview", location.pathname);
  }
});