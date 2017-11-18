import React, { Component } from 'react';
import './App.css';
import Tableau from 'tableau-api';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url:"https://public.tableau.com/views/NivoChordIntegration/Dashboard2?:embed=y&:display_count=yes"
    };

    this.initTableau = this.initTableau.bind(this);

    this.width = 800; // default, although this gets overwritten in the initTableau function
    this.height = 800; // default, although this gets overwritten in the initTableau function
  }
  
  initTableau() {
    const vizURL = this.state.url;
    const options = {
      hideTabs: true,
      width: this.width,
      height: this.height,
      onFirstInteractive: () => {
        const wrkbk = viz.getWorkbook();
        const activeSheet = viz.getWorkbook().getActiveSheet();
        const sheets = activeSheet.getWorksheets();
        const name = wrkbk.getName();
        const objs = activeSheet.getObjects();
        const pubSheets = wrkbk.getPublishedSheetsInfo();
        //console.log(objs);
        const filters = [];
        //console.log(sheets);

        // need to check what happens with automatic sized workbooks...
        //console.log(activeSheet.getSize());
        if (activeSheet.getSize().maxSize) {
          this.width = activeSheet.getSize().maxSize.width;
          this.height = activeSheet.getSize().maxSize.height;
        } else {
          this.width = 800;
          this.height = 800;
        }

        // this will set the frame size the maximum allowed by the viz
        // need to vet whether this will be a problem with automatic vizzes however
        // see note herein for dashboards as well...
        // https://onlinehelp.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_sample_resize.html
        viz.setFrameSize(this.width, this.height + 100);
      }
    };

    //initiate the viz
    let viz = new Tableau.Viz(this.container, vizURL, options);

  }

  componentDidMount() {
    this.initTableau(); // we are just using state, so don't need to pass anything
  }

  render() {
    console.log(window.top.tableau);
    return (
      <div className="App">
        <div className="tabithaRootDiv">
          <div
            id="tableauViz"
            className="tableauContainer"
            ref={c => (this.container = c)}
            style={{ margin: '0 auto' }}
          />
        </div>
      </div>
    );
  }
}

export default App;
