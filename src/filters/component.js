import React, { Component } from 'react';
import Embed from '../components/powerbi-component/component';
import FilterPane from '../components/powerbi-filter-pane/component';

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
        <h1>Custom Filter Pane</h1>
        <p>Filter pane is hidden in the embedded report and recreated by developer to allow custom branding or special preconfigured filters.</p>

        <div className="row">
          <div className="col-md-9">
            <div className="row">
              <div className="col-xs-12">
                <Embed
                  options={this.state.embedConfig}
                  onEmbedded={this.onEmbedded}
                >
                </Embed>
              </div>
            </div>
            <div className="row">
              Pre-defined Filter Buttons (Not Implemented)
            </div>
          </div>
          <div className="col-md-3">
            <FilterPane></FilterPane>
          </div>
        </div>
      </div>
    );
  }
}
