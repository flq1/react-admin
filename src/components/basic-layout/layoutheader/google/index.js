import React from "react";
import ReactDOM from "react-dom";
import { Map, Circle } from "react-amap";
const randomIndex = len => Math.floor(Math.random() * len);
const randomColor = () => {
  const chars = "0123456789abcdef".split("");
  const len = chars.length;
  return (
    `#${chars[randomIndex(len)]}${chars[randomIndex(len)]}` +
    `${chars[randomIndex(len)]}${chars[randomIndex(len)]}` +
    `${chars[randomIndex(len)]}${chars[randomIndex(len)]}`
  );
};

class Goolge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { longitude: 120, latitude: 20 },
      radius: 15000,
      visible: true,
      style: { strokeColor: "#f00" },
      draggable: true
    };
    this.circleEvents = {
      created: ins => {
        console.log((window.circle = ins));
      },
      click: () => {
        console.log("clicked");
      },
      mouseover: () => {
        console.log("mouseover");
      }
    };
  }

  toggleVisible() {
    this.setState({
      visible: !this.state.visible
    });
  }

  toggleDraggable() {
    this.setState({
      draggable: !this.state.draggable
    });
  }

  changeCenter() {
    this.setState({
      center: {
        longitude: 120 + Math.random() * 20,
        latitude: 20 + Math.random() * 10
      }
    });
  }

  changeStyle() {
    this.setState({
      style: { strokeColor: randomColor() }
    });
  }

  changeRadius() {
    this.setState({
      radius: 15000 + Math.random() * 15000
    });
  }

  render() {
    return (
      <div>
        <div style={{ width: "80%", height: "400px" }}>
          <Map plugins={["ToolBar"]} center={this.state.center}>
            <Circle
              center={this.state.center}
              radius={this.state.radius}
              events={this.circleEvents}
              visible={this.state.visible}
              style={this.state.style}
              draggable={this.state.draggable}
            />
          </Map>
        </div>
      </div>
    );
  }
}

export default Goolge;
