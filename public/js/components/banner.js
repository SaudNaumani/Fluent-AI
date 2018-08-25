import Typed from 'typed.js';

function loadDynamicBannerText() {
  new Typed('#banner-typed-text', {
    strings: ["Speak The Language", "Get Instant Feedback", "Become Fluent"],
    typeSpeed: 100,
    loop: true
  });
}

export { loadDynamicBannerText };
