import React, { Component } from 'react';
import { Chord } from 'nivo';
import Tableau from 'tableau-api';

class TableauChord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      viz: {},
      data: {}
    };

    //this.updateData = this.updateData.bind(this);
    this.defaultData =
    [
      [ 64, 331, 491, 77, 202 ],
      [ 1775, 440, 944, 1052, 154 ],
      [ 18, 397, 404, 42, 125 ],
      [ 374, 415, 494, 242, 790 ],
      [ 1363, 376, 627, 319, 98 ]
    ];

    this.viz = {};
    this.workbook = {};
    this.activeSheet = {};
    this.sheets = {};

  }

  componentDidMount() {
    this.viz = window.top.tableau.VizManager.getVizs()[0];
    this.workbook = this.viz.getWorkbook();
    this.activeSheet = this.workbook.getActiveSheet();
    this.sheets = this.activeSheet.getWorksheets();

    // get data code for react from https://github.com/cmtoomey/TableauReact
    const sheet = this.sheets.get("Sheet 6");
    const options = {
        ignoreAliases: false,
        ignoreSelection: false,
        includeAllColumns: false
    };
    sheet.getSummaryDataAsync(options).then((t) => {
      const tableauData = t.getData();
      console.log(tableauData);
      let data = [];
      const pointCount = tableauData.length; 
      for(let a = 0; a < pointCount; a++ ) {
          data = data.concat({
              Out: tableauData[a][0].value,
              In: tableauData[a][1].value,
              Ct: Math.round(tableauData[a][2].value,0)
          })
      };
      console.log(data);
      this.setState({
          viz: this.viz,
          data: data
      });
    })

  }



  render() {
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
