import React, { useState, useEffect, useRef } from "react";
import { stepsGenerator, rgbInit, colorCalculator } from "../utils/tools";

const RectGenerator = () => {
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(8);
  const ALPHA = 255;
  // Generate image step which is start from 8 to 256
  const steps = stepsGenerator(8, 32);
  const rgb = rgbInit();
  let red = useRef(rgb[0]);
  let green = useRef(rgb[1]);
  let blue = useRef(rgb[2]);

  // Canvas would be redraw when the step from either direction is changed
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imageData = ctx.createImageData(width, height);

    // Iterate through every pixel
    for (let i = 0; i < imageData.data.length; i += 4) {
      // Modify pixel data
      imageData.data[i + 0] = red.current; // R value
      imageData.data[i + 1] = green.current; // G value
      imageData.data[i + 2] = blue.current; // B value
      imageData.data[i + 3] = ALPHA; // A value

      /* 
      Using n-ary tree data structure to store (logically) colors and find unique path which represents the unique color 
      in RGB mode throughout the tree, blue color is the leaf layer, when the leaves count to 256, trace back to the 
      parent node layer which is green and create a new green node, when the green nodes count to 256, trace back to the 
      parent node layer which is red, this algorithm can cover 16,777,216 colors and render image from random start color 
      with efficient calculations according to the image size.  
      */
      blue.current = colorCalculator(blue.current);
      const realIndex = i / 4;
      if (realIndex % 256 === 0) {
        green.current = colorCalculator(green.current);
      }
      if (realIndex % Math.pow(256, 2) === 0) {
        red.current = colorCalculator(red.current);
      }
    }

    // Draw image data to the canvas
    ctx.putImageData(imageData, 0, 0);
  });

  const handleChange = (e) => {
    switch (e.target.id) {
      case "width":
        setWidth(e.target.value);
        break;
      case "height":
        setHeight(e.target.value);
        break;
      default:
        console.log("Invalid handler");
        break;
    }
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {" "}
        <h1>Image Generator</h1>
        <label htmlFor="width">Width (px):</label>
        <select
          id="width"
          name="width"
          style={{ margin: "1rem" }}
          onChange={handleChange}
        >
          {steps.map((value) => {
            return (
              <option value={value} key={"width" + value}>
                {value}
              </option>
            );
          })}
        </select>
        <label htmlFor="height">Height (px):</label>
        <select
          id="height"
          name="height"
          style={{ margin: "1rem" }}
          onChange={handleChange}
        >
          {steps.map((value) => {
            return (
              <option value={value} key={"height" + value}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
      <div style={{ textAlign: "center" }}>
        <canvas id="canvas" width={width} height={height}></canvas>
      </div>
    </>
  );
};

export default RectGenerator;
