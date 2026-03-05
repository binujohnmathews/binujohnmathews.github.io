jQuery(function ($) {
  var myNav = $(".navbar-sticky");
  var hasStickyNav = myNav.length > 0;
  var stickyTop = hasStickyNav ? myNav.offset().top : 0;

  function stickyNavigation() {
    if (!hasStickyNav) {
      return;
    }

    if ($(window).scrollTop() > stickyTop) {
      myNav.addClass("stick");
    } else {
      myNav.removeClass("stick");
    }
  }

  function initParallaxAnimation() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    $(".parallax").each(function () {
      var speed = Number($(this).attr("parallax-speed"));
      if (!speed) {
        return;
      }

      var backgroundPos = "-" + window.pageYOffset / speed + "px";
      $(this).css("background-position", "center " + backgroundPos);
    });
  }

  function initSmoothScroll() {
    $("a[href^='#']").on("click", function (event) {
      var target = $(this.getAttribute("href"));
      if (!target.length) {
        return;
      }

      event.preventDefault();
      var navOffset = myNav.length ? myNav.outerHeight() : 0;
      var destination = target.offset().top - navOffset + 1;

      $("html, body").animate({ scrollTop: destination }, 500);
    });
  }

  function initRevealAnimation() {
    var revealItems = document.querySelectorAll(".reveal");
    if (!revealItems.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach(function (item) {
        item.classList.add("in-view");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  stickyNavigation();
  initParallaxAnimation();
  initSmoothScroll();
  initRevealAnimation();

  $(window).on("resize", function () {
    if (hasStickyNav) {
      stickyTop = myNav.offset().top;
      stickyNavigation();
    }
  });

  $(window).on("scroll", function () {
    stickyNavigation();
    initParallaxAnimation();
  });
});
