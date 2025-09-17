// js/gsap.js
export function initAnimations() {
  if (typeof window === "undefined" || !window.gsap) return;

  const { gsap } = window;
  gsap.registerPlugin(window.ScrollTrigger);

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DUR = prefersReduced ? 0.001 : 0.7;
  const STG = prefersReduced ? 0     : 0.08;

  // Helper: reveal
  const reveal = (targets, opts = {}) => {
    const els = gsap.utils.toArray(targets);
    if (!els.length) return;
    gsap.set(els, { opacity: 0, y: 24, willChange: "transform, opacity" });
    els.forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: DUR, delay: (opts.delay ?? 0) + i * (opts.stagger ?? STG),
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" }
      });
    });
  };

  // HERO entrance + gentle parallax
  const hero = document.querySelector(".hero-bg");
  if (hero) {
    const h1    = hero.querySelector("h1");
    const p     = hero.querySelector("p.mt-5");
    const chips = hero.querySelectorAll(".chip");
    const shot  = hero.querySelector("[data-parallax]");

    gsap.set([h1,p,shot, chips], { opacity: 0, y: 18 });
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: DUR }});
    tl.to(h1, { opacity: 1, y: 0 })
      .to(p,  { opacity: 1, y: 0 }, "-=0.35")
      .to(chips, { opacity: 1, y: 0, stagger: 0.05 }, "-=0.35")
      .to(shot,  { opacity: 1, y: 0 }, "-=0.2");

    // background drift
    if (!prefersReduced) {
      const grid = hero.querySelector(".grid-mask");
      if (grid) {
        gsap.to(grid, {
          y: 60, ease: "none",
          scrollTrigger: { trigger: hero, start: "top bottom", end: "bottom top", scrub: 0.5 }
        });
      }
    }
  }

  // Floating ORBITS (rotation + bobbing)
  if (!prefersReduced) {
    const orbits = document.querySelector(".orbits");
    if (orbits) {
      const rings = orbits.querySelectorAll(".orbit-ring");
      const dots  = orbits.querySelectorAll(".orbit-dot");

      // slow ring rotations
      gsap.to(rings[0], { rotate:  15, repeat: -1, yoyo: true, duration: 12, ease: "sine.inOut" });
      gsap.to(rings[1], { rotate: -22, repeat: -1, yoyo: true, duration: 16, ease: "sine.inOut" });
      gsap.to(rings[2], { rotate:   9, repeat: -1, yoyo: true, duration: 14, ease: "sine.inOut" });

      // dots orbit + bob
      dots.forEach((d, idx) => {
        gsap.to(d, { rotate: 360, duration: 28 + idx * 6, ease: "none", repeat: -1 });
        gsap.to(d, { y: "+=6", duration: 2 + idx * .3, yoyo: true, repeat: -1, ease: "sine.inOut" });
      });

      // parallax orbits on scroll
      gsap.to(orbits, {
        y: -40, x: 10,
        scrollTrigger: { trigger: ".hero-bg", start: "top bottom", end: "bottom top", scrub: 0.6 }
      });
    }
  }

  // Angled wipe on section headers
  gsap.utils.toArray(".angled-wrap").forEach(box => {
    const wipe = box.querySelector(".angled-wipe");
    if (!wipe) return;
    gsap.set(wipe, { opacity: 0, xPercent: -30, rotate: -3 });
    gsap.to(wipe, {
      opacity: 1, xPercent: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: box, start: "top 85%", toggleActions: "play none none reverse" }
    });
  });

  // Section reveals
  reveal("#overview h2");
  reveal("#overview p.text-white\\/80", { delay: 0.05 });
  reveal("#overview .glass", { delay: 0.1 });

  reveal("#work h2");
  reveal("#work article", { delay: 0.1 });
  reveal("#work .grid > div", { delay: 0.1, stagger: 0.06 });

  reveal("#capabilities h2");
  reveal("#capabilities .rounded-2xl.border", { delay: 0.1 });

  reveal("#education h2");
  reveal("#education article", { delay: 0.1 });

  reveal("#contact h2");
  reveal("#contact .glass", { delay: 0.1 });

  // Hover lift
  if (!prefersReduced) {
    gsap.utils.toArray("#work article, #capabilities .rounded-2xl.border, #education article")
      .forEach(card => {
        card.addEventListener("mouseenter", () =>
          gsap.to(card, { y: -4, duration: 0.25, ease: "power2.out" }));
        card.addEventListener("mouseleave", () =>
          gsap.to(card, { y: 0,  duration: 0.3,  ease: "power2.out" }));
      });
  }

  // Simple parallax system (data attributes)
  if (!prefersReduced) {
    const items = gsap.utils.toArray("[data-parallax]");
    items.forEach(el => {
      const axis  = el.getAttribute("data-parallax"); // 'y' or 'x'
      const speed = parseFloat(el.getAttribute("data-speed") || "0.1");
      const distance = axis === "x" ? 40 : 60;
      gsap.fromTo(el,
        { [axis]: 0 },
        {
          [axis]: distance * speed,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
        }
      );
    });
  }
}

// Optional: animate testimonial slide changes
export function animateTestimonialSwap(container) {
  const { gsap } = window;
  if (!gsap || !container) return;
  const quote = container.querySelector("p");
  const meta  = container.querySelector(".flex.items-center.justify-between");

  const tl = gsap.timeline({ defaults: { duration: 0.35, ease: "power2.out" }});
  tl.to([quote, meta], { opacity: 0, y: 8 })
    .set([quote, meta], { y: -8 })
    .to([quote, meta], { opacity: 1, y: 0 });
}
