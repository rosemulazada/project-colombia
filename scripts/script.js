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
        src="/assets/images/bohios-planten1.png"
        alt="Swipe Image"
        draggable="false"
        class="begin-planten begin-plant1 draggable"
      />
    </div>
    <div class="next-scene-btn drag-next-button"></div>
  </section>`,

  `<div id="container">
    <div id="map">
      <img src="/assets/images/hut-geen-tekst.jpeg" />
      <img class="marker hangmat"  src="/assets/images/hangmat-tekst.png"/>
      <img class="marker pan" src="/assets/images/pan-tekst.png"/>
    </div>
    <div class="next-scene-btn hut-next-button">Next</div>
  </div>`,

  `<section id="section-4">
  <img src="/assets/images/einde-kogui.jpg" alt="Background Image" class="background-image">
  <button class="next-scene-btn">Next</button>
</section>`,
];

let currentScene = 0;

function transitionScenes() {
  currentScene++;

  if (currentScene < scenes.length) {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = scenes[currentScene];
    // array, for each, herhalen voor elke image

    if (currentScene === 1) {
      const draggable = document.querySelector(".draggable");

      Draggable.create(draggable, {
        type: "x,y",
        edgeResistance: 0.65,
        onDragEnd: function () {
          if (this.x > window.innerWidth || this.y > window.innerHeight) {
            gsap.to(draggable, {
              x: window.innerWidth + 100,
              y: window.innerHeight + 100,
              ease: "power2.inOut",
              duration: 0.5,
            });
          }
        },
      });
    }

    if (currentScene === 2) {
      initializeZoomAndVisibility();
    }

    if (currentScene === 3) {
      history.scrollRestoration = "manual";
      window.scrollTo(0, document.body.scrollHeight);
    }
  }
}

document.body.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("next-scene-btn")) {
    transitionScenes();
  }
});

// zoom function & device motion
if (currentScene === 2) {
}
function initializeZoomAndVisibility() {
  var zoomer = panzoom(document.querySelector("#container"), {
    maxZoom: 20,
    minZoom: 1,
    onTouch: (event) =>
      event.target.classList.contains("next-scene-btn") ? false : true,
  });

  let timeoutId;

  zoomer.on("zoom", (event) =>
    document.querySelectorAll(".marker[data-visible]").forEach(checkIfZoomed)
  );

  function checkIfZoomed(marker) {
    let treshold = 0.7;
    let markerSize = marker.getBoundingClientRect();
    if (markerSize.width / window.innerWidth > treshold) {
      if (!marker.hasAttribute("data-active")) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          marker.toggleAttribute("data-active");
          console.log("Activated", marker.id);
        }, 2000);
      }
    } else {
      if (marker.hasAttribute("data-active")) {
        clearTimeout(timeoutId);

        marker.setAttribute("data-active", "");
        console.log("De-activated", marker.id);
      }
    }
  }

  let observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.toggleAttribute("data-visible", entry.isIntersecting);
      });
    },
    { threshold: 0.5 }
  );

  document
    .querySelectorAll(".marker")
    .forEach((element) => observer.observe(element));
}

window.addEventListener("load", (event) => {
  setTimeout(() => {
    window.scrollTo({
      left: window.innerWidth,
      behavior: "smooth",
    });
  }, 0);
});

// device motion event

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
  // Adjust the scaling factor for more pronounced movement
  const scrollFactor = 1;
  const scrollAmount = e.accelerationIncludingGravity.x * scrollFactor;

  const hologram = document.getElementById("hologram");
  hologram.style.transform = `translateX(${-scrollAmount}vw)`;
}

const btn = document.getElementById("request");
btn.addEventListener("click", permission);

// const btn = document.getElementById("request");
// btn.addEventListener("click", permission);

window.addEventListener("deviceorientation", (evt) => {
  // Adjust the scaling factor for more pronounced movement
  const angle = -evt.gamma;
  const rotation = Math.min(75, Math.max(-75, angle)); // You can change this value

  const hologram = document.getElementById("hologram");
  hologram.style.transform = `translateX(${-rotation}vw)`;
});
