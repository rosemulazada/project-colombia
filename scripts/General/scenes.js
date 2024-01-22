// // Define an array of scenes
// const scenes = [
//   `<section id="scene-1">
//           <button class="start-btn" id="request-btn">
//             Click to give access
//           </button>
//           <button class="start-btn next-scene-btn" id="click-to-start-btn">
//             Click to start
//           </button>
//         </section>`,
//   `<section id="scene-2">
//           <img
//             id="bohios"
//             src="/src/assets/images/begin-bohios.jpg"
//             alt="Afbeelding van de bohios: woonplek van de Kogui."
//           />
//           <div id="swipe-container">
//             <img
//               id="swipe-image"
//               src="/src/assets/images/begin-planten.png"
//               alt="Swipe Image"
//               draggable="false"
//               class="begin-planten begin-plant1"
//             />
//           </div>
//           <button class="next-scene-btn">Next</button>
//         </section>`,
//   `<section id="scene-3">
//           <h1>hi</h1>
//           <button class="next-scene-btn">Next</button>
//         </section>`,
//   // Add more scenes as needed
// ];

// // Initial scene counter
// let currentScene = 0;

// // Function to handle scene transitions
// function transitionToNextScene() {
//   // Increment the scene counter
//   currentScene++;

//   // Check if there are more scenes
//   if (currentScene < scenes.length) {
//     // Remove the current scene
//     document.querySelector("main section").remove();

//     // Add the next scene
//     document.querySelector("main").innerHTML = scenes[currentScene];
//   } else {
//     // All scenes have been shown, you can handle this case (e.g., loop back to the beginning)
//     console.log("All scenes shown.");
//   }
// }

// // Event listener for the "Next" button
// document.addEventListener("click", function (event) {
//   if (event.target.classList.contains("next-scene-btn")) {
//     transitionToNextScene();
//   }
// });
