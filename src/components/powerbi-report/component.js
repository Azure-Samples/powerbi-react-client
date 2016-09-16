import React, { Component } from 'react'
import pbi from 'powerbi-client';

/* global powerbi */
export class Report extends Component {
  constructor(props) {
    super(props);
    this.component = null;
    this.state = {
      type: 'report'
    };
  }

  componentDidMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateState(nextProps);
  }

  componentDidUpdate() {
    if (this.validateConfig(this.state)) {
      return this.embed(this.state);
    }
  }

  componentWillUnmount() {
    this.reset();
  }

  embed(config) {
    this.component = powerbi.embed(this.rootElement, config);
    if (this.props.onEmbedded) {
      this.props.onEmbedded(this.component);
    }
    return this.component;
  }

  reset() {
    powerbi.reset(this.rootElement);
    this.component = null;
  }

  updateState(props) {
    const nextState = Object.assign({}, this.state, props, {
      settings: {
        filterPaneEnabled: this.props.filterPaneEnabled,
        navContentPaneEnabled: this.props.navContentPaneEnabled
      }
    });
    /**
     * This property must be removed from the state object so that it doesn't get used in the embedConfig.
     * This would be passed to `powerbi.embed(element, embedConfig)` and attempted to be sent over postMessage;
     * however, functions cannot be cloned and it will fail.
     */
    delete nextState.onEmbedded;
    this.setState(nextState);
  }

  validateConfig(config) {
    const errors = pbi.models.validateReportLoad(config);
    return (errors === undefined);
  }

  render() {
    return (
      <div className="powerbi-frame" ref={(ref) => this.rootElement = ref}></div>
    )
  }
}

Report.propTypes = {
  accessToken: React.PropTypes.string,
  embedUrl: React.PropTypes.string
}

export default Report;