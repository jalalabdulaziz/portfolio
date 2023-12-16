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

// Lenis Smooth Scroll
function lenisScroll() {
  const lenis = new Lenis({
    duration: 1,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

// Dark Mode
function darkMode() {
  var toggle = document.getElementById("theme-toggle");

  var storedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  if (storedTheme)
    document.documentElement.setAttribute("data-theme", storedTheme);

  toggle.onclick = function () {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = "light";

    if (currentTheme === "light") {
      targetTheme = "dark";
    }

    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
  };
}

// Project Filter
function filterProject() {
  $(".project-filter-button").on("click", function (e) {
    var val = $(this).val();

    if (val == "all") {
      gsap.to(".project-all-item", {
        opacity: 0,
        y: 10,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.inOut",
        onComplete: function () {
          $(".project-all-item").removeClass("hide");
          gsap.to(".project-all-item", {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.inOut",
          });
        },
      });
    } else {
      gsap.to(".project-all-item", {
        opacity: 0,
        y: 10,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.inOut",
        onComplete: function () {
          $(".project-all-item").removeClass("hide");
          $(".project-all-item")
            .filter(':not([data-scope*="' + val + '"])')
            .addClass("hide");

          gsap.to(".project-all-item:not(.hide)", {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.3,
            ease: "power2.inOut",
          });
        },
      });
    }
  });

  $(".project-filter label").on("click", function (e) {
    $(".project-filter label").removeClass("selected");
    $(this).addClass("selected");
  });
}

// Loader Animation
function loaderAnimation() {
  const loader = document.querySelector(".loader");
  const circle = document.querySelector(".loader-circle");
  const logo = document.querySelector(".loader-logo");
  var tl = gsap.timeline({
    defaults: {
      ease: "expo.InOut",
      duration: 0.5,
      stagger: 0.15,
    },
  });

  tl.from(logo, {
    y: "30",
    opacity: 0,
  })
    .to(circle, {
      strokeDashoffset: 0,
      duration: 3.5,
    })
    .to(
      loader,
      {
        opacity: 0,
        onComplete: function () {
          $(loader).fadeOut(300);
          $(loader).remove();
        },
      },
      "-=2.5"
    );
}

// Reveal Animation
function revealAnimation() {
  const target = document.querySelector(".site-big-text h1");
  const split = new SplitType(target, { types: "lines, words" });

  var tl = gsap.timeline({
    defaults: {
      ease: "expo.InOut",
      duration: 0.6,
      stagger: 0.05,
    },
  });

  tl.from(".word", {
    y: "1em",
    opacity: 0,
    onComplete: function () {
      SplitType.revert(target);
    },
  })
    .fromTo(
      ".animation--line",
      {
        scaleX: 0,
      },
      {
        scaleX: 1,
        duration: 0.8,
      },
      "-=0.5"
    )
    .fromTo(
      ".animation--fadein",
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
      },
      "-=0.5"
    );
}

// Time
function updateClock() {
  var hour = moment(new Date());
  var minute = moment(new Date());
  hour = hour.tz("Asia/Makassar").format("hh");
  minute = minute.tz("Asia/Makassar").format("mm A");
  $(".screensaver__hour").text(hour);
  $(".screensaver__minute").text(minute);
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
  var totalduration = 500 + scrollduration;
  if (distance > 800) {
    $("html, body").animate({ scrollTop: 0 }, totalduration, "swing");
  } else {
    $("html, body").animate({ scrollTop: 0 }, 500, "swing");
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
    iframe: {
      patterns: {
        wistia: {
          index: "wistia.com",
          id: "/",
          src: "//fast.wistia.net/embed/iframe/%id%?autoPlay=1",
        },
      },
    },
  });
}

// Active Nav Link
function activeLink() {
  if (location.pathname.split("/")[1] !== "") {
    $(".site-nav__link-item").removeClass("site-nav--active");
    $(
      '.site-nav__link-item[href^="/' + location.pathname.split("/")[1] + '"]'
    ).addClass("site-nav--active");
  } else {
    $(".site-nav__link-item").removeClass("site-nav--active");
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
  loaderAnimation();
  filterProject();
  lenisScroll();
});

document.addEventListener("lazyloaded", function (e) {
  gsap.from(e.target, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.inOut",
  });
});

// Barba
barba.init({
  transitions: [
    {
      name: "page-transition",
      async leave(data) {
        await srollToTop();
        return gsap
          .to(data.current.container, {
            opacity: 0,
            y: 40,
            duration: 0.4,
            ease: "power2.inOut",
          })
          .then(() => new Promise((resolve) => setTimeout(resolve, 400)));
      },
      enter(data) {
        gsap.from(data.next.container, {
          opacity: 0,
          y: 80,
          duration: 0.6,
          ease: "power2.inOut",
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
  revealAnimation();
  filterProject();
  lenisScroll();
});
