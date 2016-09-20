import React, { Component } from 'react';
import Embed from '../components/powerbi-component/component';

export default class extends Component {
  constructor(props) {
    super(props);
    
    this.onEmbedded = this.onEmbedded.bind(this);

    this.state = {
      embedConfig: {},
      dataSelected: ''
    };
  }

  componentDidMount() {
    fetch(`https://powerbiembedapi.azurewebsites.net/api/dxt/reports/c4d31ef0-7b34-4d80-9bcb-5974d1405572`)
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

  onEmbedded(report) {
    report.on('dataSelected', event => {
      console.log('dataSelected: ', event);
      var data = event.detail;
      this.setState({
        dataSelected: JSON.stringify(data, null, '  ')
      });
    });
  }

  render() {
    return (
      <div>
        <h2>Data Selection Events</h2>
        <p>Respond to user selecting data.</p>

        <Embed
          options={this.state.embedConfig}
          onEmbedded={this.onEmbedded}
        >
        </Embed>

        <h2>Data Selected Event Data:</h2>
        <p>Notice the event.detail contains information about the visual the user clicked and the page the visual is on. It also contains details about the data the user clicked such as identity, value, and regions if applicable.</p>
        <p>Note: the values rendered in the tooltip are currently not returned in event but we hope to have this feature soon.</p>
        <pre>{this.state.dataSelected}</pre>
      </div>
    );
  }
}
