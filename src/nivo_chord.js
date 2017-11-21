import React, { Component } from 'react';
import { Chord } from 'nivo';
import Tableau from 'tableau-api';
import _ from 'lodash';

class TableauChord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      viz: {},
      data: {}, 
      keys: null,
      matrix: null
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
    this.defaultKeys = [ "React", "D3", "Is", "Awesome", "Tableau"];
    
    this.uniqKeys = [];
    this.matrix = [];
    this.viz = {};
    this.workbook = {};
    this.activeSheet = {};
    this.sheets = {};

    this.matrixify = this.matrixify.bind(this);
    this.onTabSwitch = this.onTabSwitch.bind(this);
    this.onMarkSelect = this.onMarkSelect.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onParameterChange = this.onParameterChange.bind(this);

  }

  matrixify(arr, size) 
  {
    var matrix = [];
    for(var i=0; i < size; i++) {
        matrix[i] = [];
        for(var j=0; j < size; j++) {
            matrix[i][j] = 0.0; // default all values to 0
            //matrix[i][j] = Math.random();
            for (var k=0; k<arr.length; k++){
              if (arr[k]["Out"] === this.uniqKeys[i] && arr[k]["In"] === this.uniqKeys[j]) {
                matrix[i][j] = arr[k]["Ct"]; //if we find a match, then populate value
              }
            }
        }
    }
    console.log(matrix);
    return matrix;
  }

  onTabSwitch() {
    console.log("made mark it");
  }

  onMarkSelect() {
    console.log("made mark it");
  }

  onFilterChange() {
    console.log("made filter it");
  }

  onParameterChange() {
    console.log("made parameter it");
  }

  componentDidMount() {
    this.viz = window.top.tableau.VizManager.getVizs()[0];
    this.workbook = this.viz.getWorkbook();
    this.activeSheet = this.workbook.getActiveSheet();
    this.sheets = this.activeSheet.getWorksheets();

    // get data code for react from https://github.com/cmtoomey/TableauReact
    const sheet = this.sheets[0];
    const options = {
        ignoreAliases: false,
        ignoreSelection: false,
        includeAllColumns: false
    };
    sheet.getSummaryDataAsync(options).then((t) => {
      const tableauData = t.getData();
      console.log(tableauData);
      let data = [];
      for(let a = 0; a < tableauData.length; a++ ) {
          data = data.concat({
              Out: tableauData[a][0].value,
              In: tableauData[a][1].value,
              Ct: parseFloat(tableauData[a][2].value)
          })
      };
      console.log(data);

      // use lodash to create a unique list of values in an array
      this.uniqKeys = _.sortBy(_.union(_.map(data,"Out"),_.map(data,"In")));
      //console.log(this.uniqKeys);

      // this doesn't work yet but can use something like this to create matrix from array
      this.matrix = this.matrixify(data, this.uniqKeys.length);
      
      this.setState({
          viz: this.viz,
          data: data, 
          keys: this.uniqKeys,
          matrix: this.matrix
      });
    })
    
    //add event listener to the viz
    //return this.viz.addEventListener(window.top.tableau.TableauEventName.TAB_SWITCH, this.onTabSwitch());
    //return this.viz.addEventListener(window.top.tableau.TableauEventName.MARKS_SELECTION, this.onMarkSelect());
    //return this.viz.addEventListener(window.top.tableau.TableauEventName.FILTER_CHANGE, this.onFilterChange());
    //return this.viz.addEventListener(window.top.tableau.TableauEventName.PARAMETER_VALUE_CHANGE, this.onParameterChange());
  }

  render() {
    return (
       <div id = "chordDiv">
         <Chord
                matrix={this.state.matrix || this.defaultData}
                keys={this.state.keys || this.defaultKeys}
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
                labelRotation={-90}
                labelTextColor="inherit:darker(1)"
                colors="nivo"
                isInteractive={true}
                arcHoverOpacity={1}
                arcHoverOthersOpacity={0.15}
                ribbonHoverOpacity={1}
                ribbonHoverOthersOpacity={0.15}
                animate={true}
                motionStiffness={90}
                motionDamping={7}
            />
      </div>
    );
  }
}

export default TableauChord;
