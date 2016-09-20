import React, { Component } from 'react';
import Report from '../components/powerbi-report/component';
import 'whatwg-fetch';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      embedConfig: {}
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
        this.setState({
          embedConfig
        });

        return embedConfig;
      });
  }

  onEmbedded(embed) {
    console.log(`Report embedded: `, embed, this);
  }

  render() {
    return (
      <div>
        <h2>Static Embed</h2>
        <p>Report to embed is known by the developer.</p>

        <Report 
          id={this.state.embedConfig.id}
          embedUrl={this.state.embedConfig.embedUrl}
          accessToken={this.state.embedConfig.accessToken}
          filterPaneEnabled={true}
          navContentPaneEnabled={false}
          onEmbedded={this.onEmbedded}
        />
      </div>
    );
  }
}
