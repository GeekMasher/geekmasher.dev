/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('callback - particles.js config loaded');
});


const typewriterInfo = new Typewriter('#typewriter-info', {
  delay: 1,
  deleteSpeed: 1
});
const typewriterMain = new Typewriter('#typewriter-main', {
  loop: true,
  delay: 40
});

function writeText(title, data) {
  typewriterMain
  .callFunction(() => {
    typewriterInfo.typeString(data).start();
  })
  .typeString(title)
  .pauseFor(2500)
  .callFunction(() => {
    typewriterInfo.deleteAll(0).start();
  })
  .deleteAll()
}

typewriterMain.start();

writeText(
  "Securing Code",
  "Static Code Analysis, Web Security, and Finding Awesome Bugs..."
)

writeText(
  "Developing Software",
  "Python & Rust in Neovim..."
)

writeText(
  "Gaming",
  "Playing, Developing, and Learning..."
)

writeText(
  "Homelab",
  "Self Hosting, Hardware, and Services..."
)

