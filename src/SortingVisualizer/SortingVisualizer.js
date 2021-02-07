import React, { useState, useEffect } from "react";
import "./styles/SortingVisualizer.css";
import {
  mergeSort,
  bubbleSort,
  quickSort,
  heapSort,
} from "../sortingAlgorithms";
//CONSTANTS and some helper functions
import {
  NUMBER_OF_ARRAY_BARS,
  randomIntBetween,
  arraysAreEqual,
  disableAllButtons,
  disableStop_btn,
  MAX_HEIGHT,
} from "../helpers";

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [sortMethod, setSortMethod] = useState("Select a sorting algorithm");

  useEffect(() => {
    resetArray();
  }, []);

  function resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntBetween(10, MAX_HEIGHT));
    }
    setArray(array);
  }

  async function selectAlgorithm() {
    // INBUILT JS SORT USED FOR COMPARING
    const jsSortedArray = array.slice().sort((a, b) => a - b);

    if (
      arraysAreEqual(jsSortedArray, array) === false &&
      sortMethod !== "Select a sorting algorithm"
    ) {
      disableAllButtons(true);
      disableStop_btn(false);
      switch (sortMethod) {
        case "BUBBLE SORT":
          bubbleSort(array);
          break;

        case "HEAP SORT":
          heapSort(array);
          break;

        case "MERGE SORT":
          mergeSort(array);
          break;

        case "QUICK SORT":
          quickSort(array);
          break;

        default:
          console.log(sortMethod);
          break;
      }
    } else if (sortMethod === "Select a sorting algorithm") {
      console.log("Select a sorting algorithm");
    } else {
      console.log("Already Sorted, Try shuffling");
    }
  }

  return (
    <>
      <div className="header">
        <h1>Sorting Visualizer</h1>
        <button
          className="btn"
          onClick={() => {
            selectAlgorithm();
          }}
        >
          Visualize
        </button>
        <button
          id="GNA-btn"
          className="btn"
          onClick={() => {
            resetArray();
            disableAllButtons(false);
          }}
        >
          {/* Generate New Array */}
          Shuffle
        </button>
        <button
          id="stop-btn"
          className="btn"
          onClick={() => {
            window.location.reload();
          }}
        >
          Stop
        </button>
      </div>

      <div className="sort-type">
        <button className="btn" onClick={() => setSortMethod("BUBBLE SORT")}>
          bubble sort
        </button>
        <button className="btn" onClick={() => setSortMethod("HEAP SORT")}>
          heap sort
        </button>
        <button className="btn" onClick={() => setSortMethod("MERGE SORT")}>
          merg sort
        </button>
        <button className="btn" onClick={() => setSortMethod("QUICK SORT")}>
          quick sort
        </button>
      </div>
      <p className="sortName">{sortMethod}</p>

      <div className="array-holder" style={{ height: `${MAX_HEIGHT + 35}px` }}>
        {array.map((value, id) => (
          <div
            key={id}
            className="array-bar"
            style={{ height: `${value}px`, width: `10px` }}
          ></div>
        ))}
      </div>
    </>
  );
}
