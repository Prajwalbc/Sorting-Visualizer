import {
  COLOR,
  ANIMATION_SPEED,
  sleep,
  disableGNA_btn,
  disableStop_btn,
} from "../helpers";

export async function bubbleSort(array) {
  const { PRIMARY_COLOR, SECONDARY_COLOR } = COLOR;
  let len = array.length;
  if (len <= 1) return array;
  const arrayBars = document.getElementsByClassName("array-bar");

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let [toUpdateColor_barOneIdx, toUpdateColor_barTwoIdx] = [j, j + 1];

        //Change color to show its selected
        arrayBars[
          toUpdateColor_barOneIdx
        ].style.backgroundColor = SECONDARY_COLOR;
        arrayBars[
          toUpdateColor_barTwoIdx
        ].style.backgroundColor = SECONDARY_COLOR;
        await sleep(ANIMATION_SPEED);

        //Update size
        let [Height_barOneIdx, Height_newHeight] = [j + 1, array[j]];
        arrayBars[Height_barOneIdx].style.height = `${Height_newHeight}px`;
        await sleep(ANIMATION_SPEED);

        //SWAP
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        //Update size
        let [toUpdateHeight_barOneIdx, toUpdateHeight_newHeight] = [
          j,
          array[j],
        ];
        arrayBars[
          toUpdateHeight_barOneIdx
        ].style.height = `${toUpdateHeight_newHeight}px`;
        await sleep(ANIMATION_SPEED);

        //Revert color
        arrayBars[
          toUpdateColor_barOneIdx
        ].style.backgroundColor = PRIMARY_COLOR;
        arrayBars[
          toUpdateColor_barTwoIdx
        ].style.backgroundColor = PRIMARY_COLOR;
        await sleep(ANIMATION_SPEED);
      }
    }
  }

  disableGNA_btn(false);
  disableStop_btn(true);
  // return array;
}
