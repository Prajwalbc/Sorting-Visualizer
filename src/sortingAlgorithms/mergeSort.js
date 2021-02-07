//Merge sort is implemented differently so it returns animations and not the sorted array

import {
  COLOR,
  ANIMATION_SPEED,
  sleep,
  disableGNA_btn,
  disableStop_btn,
} from "../helpers";

export async function mergeSort(array) {
  const { PRIMARY_COLOR, SECONDARY_COLOR } = COLOR;
  const mergeAnimations = getMergeSortAnimations(array);
  for (let i = 0; i < mergeAnimations.length; i++) {
    const arrayBars = document.getElementsByClassName("array-bar");
    const isColorChange = i % 3 !== 2;
    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = mergeAnimations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      barOneStyle.backgroundColor = color;
      barTwoStyle.backgroundColor = color;
      await sleep(ANIMATION_SPEED);
    } else {
      const [barOneIdx, newHeight] = mergeAnimations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      barOneStyle.height = `${newHeight}px`;
      await sleep(ANIMATION_SPEED);
    }
  }

  disableGNA_btn(false);
  disableStop_btn(true);
}

function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // Push to change their color.
    animations.push([i, j]);

    // Push to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // Push to update height
      animations.push([k, auxiliaryArray[i]]);
      // Updating mainArray
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // Push to update height
      animations.push([k, auxiliaryArray[j]]);
      // Updating mainArray
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);

    animations.push([i, i]);

    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);

    animations.push([j, j]);

    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
