// Constants
export const COLOR = { PRIMARY_COLOR: "#40dfdf", SECONDARY_COLOR: "red" };
export let ANIMATION_SPEED;
export let NUMBER_OF_ARRAY_BARS;
export let MAX_HEIGHT;

if (window.screen.width > 600) {
  ANIMATION_SPEED = 3;
  NUMBER_OF_ARRAY_BARS = 150;
  MAX_HEIGHT = 700;
} else {
  ANIMATION_SPEED = 15;
  NUMBER_OF_ARRAY_BARS = 40;
  MAX_HEIGHT = 550;
}

//HELPER FUNCTIONS
export function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function arraysAreEqual(jsSortedArray, mySort) {
  if (jsSortedArray.length !== mySort.length) return false;

  for (let i = 0; i < jsSortedArray.length; i++) {
    if (jsSortedArray[i] !== mySort[i]) {
      return false;
    }
  }
  return true;
}

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// Disable/Enable all buttons
export function disableAllButtons(arg) {
  const buttons = document.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = arg;
  }
}

// Enable generate new array btn only so this btn can then enable all button and at the same time generate new array
export function disableGNA_btn(arg) {
  const button = document.getElementById("GNA-btn");
  button.disabled = arg;
}

//Stop button
export function disableStop_btn(arg) {
  const button = document.getElementById("stop-btn");
  button.disabled = arg;
}
