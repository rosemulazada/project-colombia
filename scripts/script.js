// volgorde van de scenes

const scenes = [
  `<section id="section-1" >
    <button class="start-btn" id="request-btn">
      Click to give access
    </button>
    <button class="start-btn next-scene-btn" id="click-to-start-btn">
      Click to start
    </button>
  </section>`,
  `<section id="section-2">
    <img
      id="bohios"
      src="/assets/images/begin-bohios.jpg"
      alt="Afbeelding van de bohios: woonplek van de Kogui."
    />
    <div id="swipe-container">
      <img
        id="swipe-image"
        src="/assets/images/begin-planten.png"
        alt="Swipe Image"
        draggable="false"
        class="begin-planten begin-plant1"
      />
    </div>
    <button class="next-scene-btn">Next</button>
  </section>`,
  `<div id="container">
      <div id="hologram"></div>
    </div>
    <button class="next-scene-btn">Next</button>
  </section>`,
  `<section id="section-4">
  <img src="/assets/images/einde-kogui.jpg" alt="Background Image" class="background-image">
  <!-- Your other content goes here -->
  <button class="next-scene-btn">Next</button>
</section>`,
];

let currentScene = 0;

function transitionToNextScene() {
  currentScene++;

  if (currentScene < scenes.length) {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = scenes[currentScene];
    if (currentScene === 1) {
      initializeDragging();
    }
    if (currentScene === 3) {
      history.scrollRestoration = "manual";
      window.scrollTo(0, document.body.scrollHeight);
    }
  }

  // initializeDragging();

  function initializeDragging() {
    let isDragging = false;
    let startX, startY;
    let initialX, initialY;
    let rotation = -50;

    const swipeImage = document.getElementById("swipe-image");

    const startDragging = (e) => {
      isDragging = true;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      startY = e.touches ? e.touches[0].clientY : e.clientY;
      initialX = swipeImage.getBoundingClientRect().left;
      initialY = swipeImage.getBoundingClientRect().top;

      swipeImage.style.cursor = "grabbing";

      e.preventDefault();
    };

    const handleDragging = (e) => {
      if (!isDragging) return;

      const offsetX = e.touches
        ? e.touches[0].clientX - startX
        : e.clientX - startX;
      const offsetY = e.touches
        ? e.touches[0].clientY - startY
        : e.clientY - startY;

      swipeImage.style.transform = `translate(${offsetX + initialX}px, ${
        offsetY + initialY
      }px) rotate(${rotation}deg)`;

      e.preventDefault();

      // document.body.style.position = 'fixed';
    };

    const stopDragging = () => {
      isDragging = false;
      swipeImage.style.cursor = "grab";
    };

    if (swipeImage) {
      interact(swipeImage).draggable({
        inertia: true,
        onstart: startDragging,
        onmove: handleDragging,
        onend: stopDragging,
        touchAction: "none",
      });
    }
  }
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("next-scene-btn")) {
    transitionToNextScene();
  }
});

function permission() {
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response == "granted") {
          window.addEventListener("devicemotion", (e) => {
            handleMotion(e);
          });
        }
      })
      .catch(console.error);
  } else {
    alert("Accept the Device Motion Event to use this application.");
  }
}

function handleMotion(e) {
  const scrollFactor = 0.02;
  const scrollAmount = e.accelerationIncludingGravity.x * scrollFactor;

  const hologram = document.getElementById("hologram");
  hologram.style.transform = `translateX(${scrollAmount}vw)`;
}

const btn = document.getElementById("request");
btn.addEventListener("click", permission);

window.addEventListener("deviceorientation", (evt) => {
  const angle = -evt.gamma;
  const rotation = Math.min(50, Math.max(-50, angle));

  const hologram = document.getElementById("hologram");
  hologram.style.transform = `translateX(${rotation}vw)`;
});
