import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router';
import './style.css';

export default class extends Component {
  render() {
    return (
      <div>
        <h1>Power BI - Sample - Client - React</h1>
        <p>Demonstrate how to embed reports using the react library for powerbi. <a href="https://github.com/Microsoft/PowerBI-React" target="_blank">react-powerbi</a></p>
        
        <h2>Scenarios:</h2>
        <ul id="navigation" className="nav nav-pills">
            <li id="pageLinkStatic"><IndexLink to={`/`} activeClassName="active">Scenario 1: Static Embed</IndexLink></li>
            <li id="pageLinkDynamic"><Link to={`/dynamic`} activeClassName="active">Scenario 2: Dynamic Embed</Link></li>
            <li id="pageLinkPageNav"><Link to={`/pagenavigation`} activeClassName="active">Scenario 3: Custom Page Navigation</Link></li>
            <li id="pageLinkFilters"><Link to={`/filters`} activeClassName="active">Scenario 4: Custom Filter Pane</Link></li>
            <li id="pageLinkDefaults"><Link to={`/defaults`} activeClassName="active">Scenario 5: Default Page and/or Filter</Link></li>
            <li id="pageLinkSettings"><Link to={`/settings`} activeClassName="active">Scenario 6: Update Settings</Link></li>
            <li id="pageLinkDataSelection"><Link to={`/dataselected`} activeClassName="active">Scenario 7: Data Selection</Link></li>
        </ul>

        {this.props.children}
      </div>
    )
  }
}