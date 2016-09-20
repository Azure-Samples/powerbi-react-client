import React, { Component } from 'react';
import Embed from '../components/powerbi-component/component';

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
        embedConfig.pageName = 'ReportSection2';
        embedConfig.settings = {
          filterPaneEnabled: false,
          navContentPaneEnabled: true
        };

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
        <h1>Default Page and/or Default Filter</h1>
        <p>Load a report at a specified page and/or report level filter.</p>

        <Embed
          options={this.state.embedConfig}
        >
        </Embed>
      </div>
    );
  }
}
