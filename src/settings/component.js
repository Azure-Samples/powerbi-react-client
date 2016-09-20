import React, { Component } from 'react';
import Embed from '../components/powerbi-component/component';

export default class extends Component {
  constructor(props) {
    super(props);

    this.onEmbedded = this.onEmbedded.bind(this);
    this.toggleFilterPaneClicked = this.toggleFilterPaneClicked.bind(this);
    this.toggleNavContentPaneClicked = this.toggleNavContentPaneClicked.bind(this);
    this.report = null;
    this.filterPaneEnabled = false;
    this.navContentPaneEnabled = false;

    this.state = {
      embedConfig: null
    };
  }

  componentDidMount() {
    fetch(`https://powerbiembedapi.azurewebsites.net/api/reports/c52af8ab-0468-4165-92af-dc39858d66ad`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        else {
          throw new Error(response.json());
        }
      })
      .then(embedConfig => {
        embedConfig.settings = {
          filterPaneEnabled: this.filterPaneEnabled,
          navContentPaneEnabled: this.navContentPaneEnabled
        };
        
        this.setState({
          embedConfig
        });

        return embedConfig;
      });
  }

  onEmbedded(embed) {
    this.report = embed;
  }

  toggleFilterPaneClicked() {
    console.log('toggleFilterPaneClicked');
    this.filterPaneEnabled = !this.filterPaneEnabled;
    this.report.updateSettings({
        filterPaneEnabled: this.filterPaneEnabled
    });
  }

  toggleNavContentPaneClicked() {
    console.log('toggleNavContentPaneClicked');
    this.navContentPaneEnabled = !this.navContentPaneEnabled;
    this.report.updateSettings({
        navContentPaneEnabled: this.navContentPaneEnabled
    });
  }

  render() {
    return (
      <div>
        <h1>Update Settings</h1>
        <p>Change visibility of filter pane or page navigation dynamically</p>

        <Embed
          options={this.state.embedConfig}
          onEmbedded={this.onEmbedded}
        >
        </Embed>

        <button type="button" className="btn btn-primary" onClick={this.toggleFilterPaneClicked}>Toggle Filter Pane</button>
        <button type="button" className="btn btn-primary" onClick={this.toggleNavContentPaneClicked}>Toggle Page Navigation</button>
      </div>
    );
  }
}
