import React, { Component } from 'react';
import Embed from '../components/powerbi-component/component';
import PageNavigation from '../components/powerbi-page-navigation/component';
import 'whatwg-fetch';

export default class extends Component {
  constructor(props) {
    super(props);

    this.onEmbedded = this.onEmbedded.bind(this);
    this.state = {
      embedConfig: {},
      activePage: {},
      pages: []
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
        <h1>Custom Page Navigation</h1>
        <p>Page navigation is hidden in the embedded report and recreated by developer to allow custom branding or even automation to tell stories and navigate user.</p>

        <Embed
          options={this.state.embedConfig}
          id="reportcustompagenav"
          className="powerbi-container"
          onEmbedded={this.onEmbedded}
        >
        </Embed>

        <h3 class="text-center">
          {this.state.activePage.displayName}
        </h3>

        <PageNavigation></PageNavigation>
      </div>
    );
  }
}
