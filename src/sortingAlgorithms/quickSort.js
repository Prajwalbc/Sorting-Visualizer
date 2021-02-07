import {
  ANIMATION_SPEED,
  COLOR,
  sleep,
  disableGNA_btn,
  disableStop_btn,
} from "../helpers";

const { PRIMARY_COLOR, SECONDARY_COLOR } = COLOR;
const arrayBars = document.getElementsByClassName("array-bar");

export async function quickSort(array) {
  let start = 0;
  let end = array.length - 1;
  await doQuickSort(array, start, end);

  disableGNA_btn(false);
  disableStop_btn(true);
  // return array;
}

async function doQuickSort(array, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(array, start, end);

  await Promise.all([
    doQuickSort(array, start, index - 1),
    doQuickSort(array, index + 1, end),
  ]);
}

async function partition(array, start, end) {
  let pivotValue = array[end];
  let pivotIndex = start;

  for (let i = start; i < end; i++) {
    if (array[i] < pivotValue) {
      await swap(array, i, pivotIndex);
      pivotIndex++;
    }
  }
  await swap(array, end, pivotIndex);
  return pivotIndex;
}

async function swap(array, a, b) {
  let [toUpdateColor_barOneIdx, toUpdateColor_barTwoIdx] = [a, b];

  //Change color to show its selected
  arrayBars[toUpdateColor_barOneIdx].style.backgroundColor = SECONDARY_COLOR;
  arrayBars[toUpdateColor_barTwoIdx].style.backgroundColor = SECONDARY_COLOR;
  await sleep(ANIMATION_SPEED);

  //Update size
  let [Height_barOneIdx, Height_newHeight] = [b, array[a]];
  arrayBars[Height_barOneIdx].style.height = `${Height_newHeight}px`;
  await sleep(ANIMATION_SPEED);

  // SWAP
  [array[a], array[b]] = [array[b], array[a]];

  //Update size
  let [toUpdateHeight_barOneIdx, toUpdateHeight_newHeight] = [a, array[b]];
  arrayBars[
    toUpdateHeight_barOneIdx
  ].style.height = `${toUpdateHeight_newHeight}px`;
  await sleep(ANIMATION_SPEED);

  //Revert color
  arrayBars[toUpdateColor_barOneIdx].style.backgroundColor = PRIMARY_COLOR;
  arrayBars[toUpdateColor_barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
  await sleep(ANIMATION_SPEED);
}
