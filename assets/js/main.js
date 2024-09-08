// Lenis Smooth Scroll
const lenis = new Lenis({
  lerp: 0.15,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Screensaver
function screenSaver() {
  var s_saver;
  const targetSaver = document.querySelector(".screensaver");
  const popup = document.querySelectorAll(".popup");

  document.addEventListener("scroll", function () {
    clearTimeout(s_saver);

    s_saver = setTimeout(function () {
      gsap.to(targetSaver, {
        opacity: 1,
        display: "block",
        duration: 0.2,
      });
    }, 40000);
    gsap.to(targetSaver, {
      opacity: 0,
      display: "none",
      duration: 0.2,
      delay: 0.2,
    });
  });

  document.addEventListener("mousemove", function () {
    clearTimeout(s_saver);

    s_saver = setTimeout(function () {
      gsap.to(targetSaver, {
        opacity: 1,
        display: "block",
        duration: 0.2,
      });
    }, 20000);
    gsap.to(targetSaver, {
      opacity: 0,
      display: "none",
      duration: 0.2,
      delay: 0.2,
    });
  });
}

// Scroll to Top
function scrollTop() {
  const target = document.querySelector(".site-footer");
  const rect = target.getBoundingClientRect().top;
  const height = window.innerHeight;
  const speed = Math.round(rect / height / 4) + 1;
  const topButton = document.querySelector(".top-button");
  topButton.addEventListener("click", function (e) {
    e.preventDefault();
    lenis.scrollTo("top", {
      duration: speed,
    });
  });
}

// Popup
const popupClose = () => {
  const popup = document.querySelector(".popup");
  const popupContent = document.querySelector(".popup-content");
  var tl = gsap.timeline({
    defaults: {
      ease: "expo.InOut",
      duration: 0.3,
      stagger: 0.15,
    },
  });

  tl.fromTo(
    popupContent,
    {
      y: "0",
      opacity: 1,
    },
    {
      y: "30",
      opacity: 0,
    }
  ).to(popup, {
    opacity: 0,
    onComplete: function () {
      popup.remove();
    },
  });
};

function popupVideo() {
  const popupButton = document.querySelectorAll(".popup-button");

  if (popupButton.length > 0) {
    popupButton.forEach((button) => {
      button.addEventListener("click", function () {
        const videoId = button.getAttribute("href").replace("#", "");
        const videoLink = `https://fast.wistia.net/embed/iframe/${videoId}?autoPlay=1`;

        document.body.insertAdjacentHTML(
          "beforeend",
          `<div class="popup"><div class="popup-container"><div class="popup-content"><div class="popup-scaler"><button onclick="popupClose();" class="popup-close">close</button><iframe width="560" height="315" src="${videoLink}" allow="autoplay; fullscreen" allowtransparency="true" frameborder="0" scrolling="no" msallowfullscreen width="100%" height="100%"></iframe></div></div></div></div>`
        );

        const popup = document.querySelectorAll(".popup");

        var tl = gsap.timeline({
          defaults: {
            ease: "expo.InOut",
            duration: 0.3,
            stagger: 0.15,
          },
        });

        tl.fromTo(
          popup,
          {
            display: "none",
            opacity: 0,
          },
          {
            display: "block",
            opacity: 1,
          }
        );
      });
    });
  } else {
  }
}

// Project Filter
function filterProject() {
  const projectFilterButtons = document.querySelectorAll(
    ".project-filter-button"
  );
  const projectAllItems = document.querySelectorAll(".project-all-item");
  const projectShownItems = document.querySelectorAll(
    ".project-all-item:not(.hide)"
  );
  const filterLabels = document.querySelectorAll(".project-filter label");

  projectFilterButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const val = this.value;

      if (val === "all") {
        gsap.to(projectAllItems, {
          opacity: 0,
          y: 10,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.inOut",
          onComplete: function () {
            projectAllItems.forEach((item) => {
              item.classList.remove("hide");
            });

            gsap.to(projectAllItems, {
              opacity: 1,
              y: 0,
              duration: 0.2,
              stagger: 0.1,
              ease: "power2.inOut",
            });
          },
        });
      } else {
        gsap.to(projectAllItems, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.inOut",
          onComplete: function () {
            projectAllItems.forEach((item) => {
              item.classList.remove("hide");
            });

            projectAllItems.forEach((item) => {
              if (!item.dataset.scope.includes(val)) {
                item.classList.add("hide");
              }
            });

            gsap.to(projectShownItems, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.inOut",
            });
          },
        });
      }
    });
  });

  filterLabels.forEach((label) => {
    label.addEventListener("click", function (e) {
      filterLabels.forEach((label) => {
        label.classList.remove("selected");
      });
      this.classList.add("selected");
    });
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

  tl.fromTo(
    logo,
    {
      y: "30",
      opacity: 0,
    },
    {
      y: "0",
      opacity: 1,
      duration: 0.5,
    }
  )
    .to(circle, {
      strokeDashoffset: 0,
      duration: 2.5,
    })
    .to(
      loader,
      {
        opacity: 0,
        onComplete: function () {
          loader.remove();
        },
      },
      "-=2"
    );
}

// Page Reveal Animation
function revealAnimation() {
  const target = document.querySelectorAll(".site-big-text h1");
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

  const targetHour = document.querySelector(".screensaver__hour");
  const targetMinute = document.querySelector(".screensaver__minute");

  targetHour.textContent = hour;
  targetMinute.textContent = minute;
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

// Close Function
function closeFunction() {
  const projects = document.querySelectorAll(".project");
  const closeButton = document.querySelector(".close");

  if (projects.length > 0) {
    closeButton.style.display = "inline-flex";
  } else {
    closeButton.style.display = "none";
  }
}

// Active Nav Link
function activeLink() {
  const navInactive = document.querySelectorAll(".site-nav__link-item");
  const navActive = document.querySelector(
    '.site-nav__link-item[href^="/' + location.pathname.split("/")[1] + '"]'
  );
  if (location.pathname.split("/")[1] !== "") {
    document;
    navInactive.forEach((link) => link.classList.remove("site-nav--active"));
    navActive.classList.add("site-nav--active");
  } else {
    document;
    navInactive.forEach((link) => link.classList.remove("site-nav--active"));
  }
}

// Load Functions on Initial Page Load
document.addEventListener("DOMContentLoaded", function () {
  history.scrollRestoration = "manual";

  gsap.config({
    nullTargetWarn: false,
  });

  if (window.innerWidth > 769) {
    closeFunction();
    screenSaver();
    headerAnimation();
    window.setInterval(function () {
      updateClock();
    }, 1000);
  } else {
  }

  popupVideo();
  scrollTop();
  activeLink();
  loaderAnimation();

  function delayAnimation() {
    revealAnimation();
  }
  setTimeout(delayAnimation, 850);

  filterProject();
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
        await lenis.scrollTo("top", {
          duration: 0.5,
        });
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
  history.scrollRestoration = "manual";

  window.lazySizes.init();
  activeLink();
  filterProject();
  revealAnimation();
  scrollTop();
  popupVideo();

  if (window.innerWidth > 769) {
    closeFunction();
  } else {
  }
});
