import React, { Component } from 'react';
import './App.css';
import { Chord } from 'nivo';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    //this.updateData = this.updateData.bind(this);
    this.data =
    [
      [
        64,
        331,
        491,
        77,
        202
      ],
      [
        1775,
        440,
        944,
        1052,
        154
      ],
      [
        18,
        397,
        404,
        42,
        125
      ],
      [
        374,
        415,
        494,
        242,
        790
      ],
      [
        1363,
        376,
        627,
        319,
        98
      ]
    ];
  }

  render() {
    return (
      <div className="App">
       <Chord
              matrix={this.data}
              keys={[
                  "John",
                  "Raoul",
                  "Jane",
                  "Marcel",
                  "Ibrahim"
              ]}
              margin={{
                  "top": 60,
                  "right": 60,
                  "bottom": 60,
                  "left": 60
              }}
              width={600}
              height={600}
              padAngle={0.02}
              innerRadiusRatio={0.96}
              innerRadiusOffset={0.02}
              arcOpacity={1}
              arcBorderWidth={1}
              arcBorderColor="inherit:darker(0.4)"
              ribbonOpacity={0.5}
              ribbonBorderWidth={1}
              ribbonBorderColor="inherit:darker(0.4)"
              enableLabel={true}
              label="id"
              labelOffset={12}
              labelRotation={0}
              labelTextColor="inherit:darker(1)"
              colors="nivo"
              isInteractive={true}
              arcHoverOpacity={1}
              arcHoverOthersOpacity={0.25}
              ribbonHoverOpacity={0.75}
              ribbonHoverOthersOpacity={0.25}
              animate={true}
              motionStiffness={90}
              motionDamping={7}
          />
      </div>
    );
  }
}

export default App;
