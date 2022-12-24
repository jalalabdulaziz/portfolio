// Screensaver
function screenSaver() {
  var s_saver;
  $("body").mousemove(function () {
    clearTimeout(s_saver);

    s_saver = setTimeout(function () {
      $(".screensaver").fadeIn(900);
    }, 50000);

    $(".screensaver").fadeOut(500);
  });
  $("body").on("wheel", function (e) {
    clearTimeout(s_saver);

    s_saver = setTimeout(function () {
      $(".screensaver").fadeIn(900);
    }, 30000);

    $(".screensaver").fadeOut(500);
  });
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
      markup:
        '<div class="mfp-iframe-scaler">' +
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
  transitions: [
    {
      name: "page-transition",
      leave: (data) => {
        return new Promise((resolve) => {
          srollToTop();
          anime({
            targets: data.current.container,
            opacity: 0,
            easing: "easeInOutExpo",
            duration: 500,
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
    },
  ],
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


  if (typeof ga === "function") {
    ga("send", "pageview", location.pathname);
  }
});
