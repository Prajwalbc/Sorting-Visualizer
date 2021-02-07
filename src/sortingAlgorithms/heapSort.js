import {
  sleep,
  ANIMATION_SPEED,
  COLOR,
  disableGNA_btn,
  disableStop_btn,
} from "../helpers";
const { PRIMARY_COLOR, SECONDARY_COLOR } = COLOR;
const arrayBars = document.getElementsByClassName("array-bar");

export async function heapSort(array) {
  // Build max heap
  await buildMaxHeap(array);

  // Get the index of the last element
  let lastElement = array.length - 1;

  // Continue heap sorting until we have
  // One element left
  while (lastElement > 0) {
    await swap(array, 0, lastElement);
    await heapify(array, 0, lastElement);
    lastElement -= 1;
  }

  disableGNA_btn(false);
  disableStop_btn(true);
  // return array;
}

async function buildMaxHeap(arr) {
  // Get index of the middle element
  let i = Math.floor(arr.length / 2 - 1);

  // Build a max heap out of
  // All array elements passed in
  while (i >= 0) {
    await heapify(arr, i, arr.length);
    i -= 1;
  }
}

async function heapify(heap, i, max) {
  let index;
  let leftChild;
  let rightChild;

  while (i < max) {
    index = i;

    // Get the left child index
    // Using the known formula
    leftChild = 2 * i + 1;

    // Get the right child index
    // Using the known formula
    rightChild = leftChild + 1;

    // If the left child is not last element
    // And its value is bigger
    if (leftChild < max && heap[leftChild] > heap[index]) {
      index = leftChild;
    }

    // If the right child is not last element
    // And its value is bigger
    if (rightChild < max && heap[rightChild] > heap[index]) {
      index = rightChild;
    }

    // If none of the above conditions is true
    // Just return
    if (index === i) {
      return;
    }

    // Else swap elements
    await swap(heap, i, index);

    // Continue by using the swapped index
    i = index;
  }
}

async function swap(arr, a, b) {
  let [toUpdateColor_barOneIdx, toUpdateColor_barTwoIdx] = [a, b];

  //Change color to show its selected
  arrayBars[toUpdateColor_barOneIdx].style.backgroundColor = SECONDARY_COLOR;
  arrayBars[toUpdateColor_barTwoIdx].style.backgroundColor = SECONDARY_COLOR;
  await sleep(ANIMATION_SPEED);

  //Update size
  let [Height_barOneIdx, Height_newHeight] = [b, arr[a]];
  arrayBars[Height_barOneIdx].style.height = `${Height_newHeight}px`;
  await sleep(ANIMATION_SPEED);

  // SWAP
  [arr[a], arr[b]] = [arr[b], arr[a]];

  //Update size
  let [toUpdateHeight_barOneIdx, toUpdateHeight_newHeight] = [a, arr[b]];
  arrayBars[
    toUpdateHeight_barOneIdx
  ].style.height = `${toUpdateHeight_newHeight}px`;
  await sleep(ANIMATION_SPEED);

  //Revert color
  arrayBars[toUpdateColor_barOneIdx].style.backgroundColor = PRIMARY_COLOR;
  arrayBars[toUpdateColor_barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
  await sleep(ANIMATION_SPEED);
}
