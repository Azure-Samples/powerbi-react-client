import React, { Component } from 'react';
import Embed from '../components/powerbi-component/component';
import 'whatwg-fetch';

export default class extends Component {
  constructor(props) {
    super(props);

    this.timerId = null;
    this.searchInputChanged = this.searchInputChanged.bind(this);
    this.showAllClicked = this.showAllClicked.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetClicked = this.resetClicked.bind(this);
    this.navContentPaneEnabledChanged = this.navContentPaneEnabledChanged.bind(this);
    this.filterPaneEnabledChanged = this.filterPaneEnabledChanged.bind(this);
    
    this.state = {
      embedConfig: {},
      searchInput: '',
      filterPaneEnabled: true,
      navContentPaneEnabled: true,
      reports: []
    };
  }

  showAllClicked() {
    fetch(`https://powerbiembedapi.azurewebsites.net/api/reports`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        else {
          throw new Error(response.json());
        }
      })
      .then(reports => {
        this.setState({
          reports
        });
        return reports;
      });
  }

  embedReport(report) {
    fetch(`https://powerbiembedapi.azurewebsites.net/api/reports/${report.id}`)
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
      });
  }

  resetClicked() {
    this.setState({
      embedConfig: {}
    });
  }

  navContentPaneEnabledChanged() {
    this.setState({
      navContentPaneEnabled: !this.state.navContentPaneEnabled
    });
  }

  filterPaneEnabledChanged() {
    this.setState({
      filterPaneEnabled: !this.state.filterPaneEnabled
    });
  }

  searchInputChanged(event) {
    this.setState({
      searchInput: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    fetch(`https://powerbiembedapi.azurewebsites.net/api/reports?query=${this.state.searchInput}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        else {
          throw new Error(response.json());
        }
      })
      .then(reports => {
        this.setState({
          reports
        });
        return reports;
      });
  }

  render() {
    return (
      <div>
        <h1>Dynamic Embed</h1>
        <p>Report to embed is chosen by the user.</p>

        <p>Example: Search reports by name, render selected report.</p>
        <small>Hint: Type 'Re' in the text field and search to find all reports that begin with 'Re'</small>

        <form id="search-form" className="form-inline" onSubmit={this.onSubmit}>
            <div className="form-group">
                <label htmlFor="searchinput">Search</label>
                <input type="text" value={this.state.searchInput} onChange={this.searchInputChanged} className="form-control" required placeholder="Enter report name" autoComplete="off" />
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
            <button type="button" className="btn btn-success" onClick={this.showAllClicked}>Show All</button>
            <div className="checkbox">
                <label htmlFor="navContentPaneCheckbox" onClick={this.navContentPaneEnabledChanged}>
                    <input type="checkbox" name="navContentPaneCheckbox" checked={this.state.navContentPaneEnabled}  onChange={this.navContentPaneEnabledChanged}/> Show/Hide page navigation pane.
                </label>
                <label htmlFor="filterPaneCheckbox" onClick={this.filterPaneEnabledChanged}>
                    <input type="checkbox" name="filterPaneCheckbox" checked={this.state.filterPaneEnabled} onChange={this.filterPaneEnabledChanged} /> Show/Hide filter pane.
                </label>
            </div>
        </form>

        <p className="reportslistdescription">Total Results: <span>{this.state.reports.length}</span></p>
        <ol id="reportslist">
          {
            this.state.reports.map(report => {
              return <li key={report.id}>
                  <span className="report-name">{report.name}</span>
                  <button type="button" className="btn btn-success" onClick={() => this.embedReport(report)}>Embed!</button>
              </li>
            })
          }
        </ol>
        <p className="text-right">
            <button type="button" className="btn btn-danger" onClick={this.resetClicked}>Reset</button>
        </p>
        <Embed
          options={this.state.embedConfig}
        >
        </Embed>
      </div>
    );
  }
}
