import React, { Component } from 'react'
import pbi from 'powerbi-client';

/* global powerbi */
export class Embed extends Component {
  constructor(props) {
    super(props);
    this.component = null;
    this.state = null;
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
    else if (this.component !== null) {
      this.reset();
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
    const nextState = Object.assign({}, this.state, props.options);
    this.setState(nextState);
  }

  validateConfig(config) {
    let errors;

    if (typeof config === "object" && typeof config.type === "string") {
      if (config.type === pbi.Report.type.toLowerCase()) {
        errors = pbi.models.validateReportLoad(config);
      }
      else if (config.type === pbi.Dashboard.type.toLowerCase()) {
        errors = pbi.models.validateDashboardLoad(config);
      }
    }
    else {
      return false;
    }

    return (errors === undefined);
  }

  render() {
    return (
      <div className="powerbi-frame" ref={(ref) => this.rootElement = ref}></div>
    )
  }
}

Embed.propTypes = {
  options: React.PropTypes.any
}

export default Embed;