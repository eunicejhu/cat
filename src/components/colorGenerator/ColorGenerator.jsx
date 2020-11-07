import React from "react";

const hexaColorGenerator = () => {
  const str = "0123456789abcdef";
  let color = "";
  for (let i = 0; i < 6; i += 1) {
    color += str[Math.floor(Math.random() * str.length)];
  }
  return "#".concat(color);
};
const colorStrips = (num) =>
  new Array(num).fill(0).map(() => {
    const color = hexaColorGenerator();
    return (
      <li key={color} style={{ backgroundColor: color }}>
        {color}
      </li>
    );
  });

class ColorGenerator extends React.PureComponent {
  render() {
    return <ul className="colors-wrapper">{colorStrips(6)}</ul>;
  }
}

export default ColorGenerator;
