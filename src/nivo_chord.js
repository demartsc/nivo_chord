import React, { Component } from 'react';
import { Chord } from 'nivo';
import Tableau from 'tableau-api';


class TableauChord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };

    //this.updateData = this.updateData.bind(this);
    this.defaultData =
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
    console.log(window.top.tableau);
    return (
       <div id = "chordDiv">
         <Chord
                matrix={this.data || this.defaultData}
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
                height={300}
                width={300}
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

export default TableauChord;
