import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, Redirect } from 'react-router'

import Chart from './components/Chart';
import Main from './components/Main';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

var css = require('flexboxgrid/css/flexboxgrid.min.css');
require('es6-promise').polyfill();

export default class App extends Component {
    
    constructor() {
        super();
        this.state = {};
        
    }
    
    render() {
        
        return (
            <Main />
        );
    }
}
