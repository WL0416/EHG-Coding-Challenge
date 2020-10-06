/*
    This function is used to generate the steps functionally
*/
export const stepsGenerator = (start, steps) => {
  const result = [];
  for (let i = 1; i <= steps; i++) {
    result.push(start * i);
  }
  return result;
};

// initialise red, green and blue with random numbers
export const rgbInit = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return [red, green, blue];
};

// calculate colors based on the initial random number and image size
export const colorCalculator = (color) => {
  let nextColor = color + 1;
  if (nextColor >= 256) {
    nextColor = 0;
  }
  return nextColor;
};
