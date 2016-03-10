import React, { Component } from 'react';
import Immutable, { Map } from 'immutable';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import CircularProgress from 'material-ui/lib/circular-progress';

import Chart from './Chart';
import Slider from './Slider';

import API from '../services/api';
import FIPS from '../services/data';

function* rangeGen(from, to, step = 1) {
  for (let i = from; i <= to; i += step) {
    yield i;
  }
}

const settings = {
    minYear: 1980,
    maxYear: 2040,
}

export default class Main extends Component {
    
    constructor(props) {
        super(props);
        
        this.fips1 = this.fips1.bind(this);
        this.fips2 = this.fips2.bind(this);
        this.getAPI = this.getAPI.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.onAnimate = this.onAnimate.bind(this);
        
        
        this.FIPSData = FIPS
        .map( (c,i) => <MenuItem value={c.FIPS} key={i} primaryText={c.name} /> );
        
        this.state = {
            fips1: 'KR',
            fips2: 'WS',
            fipsData1: Map(),
            fipsData2: Map(),
            interval: -1,
            wating1: false,
            wating2: false,
        };
        
    }
    
    fips1(event, index, value) {
        this.setState({ fips1: value});
        this.getAPI('wating1', 'fipsData1', FIPS[index].FIPS);
    }
    
    fips2(event, index, value) {
        this.setState({ fips2: value});
        this.getAPI('wating2', 'fipsData2', FIPS[index].FIPS);
    }
    
    onSliderChange(value) {
        this.setState({ year: value});
    }
    
    Loading(active) {
        if(active) {
            return <CircularProgress hidden={false} size={0.5} />
        }
        else {
            false;
        }
    }
    
    render() {
        
        const { year, fips1, fips2 } = this.props.params;
        
        console.log("asfd", year, fips1, fips2);
        
        const max = Math.max(this.state.fipsData1.get('maxYear'), this.state.fipsData2.get('maxYear'));
        
        return (
            <div>
            
                <div>
                    <Slider animate={this.state.interval===-1} year={parseInt(this.props.params.year)} min={settings.minYear} max={settings.maxYear} onChange={this.onSliderChange} onAnimate={ this.onAnimate } />
                </div>
                
                <div className="row">
                    <div className="col-lg-6">
                        <SelectField value={this.state.fips1} onChange={ this.fips1 }>
                            {this.FIPSData}
                        </SelectField>
                        {this.Loading(this.state.wating1)}
                        <Chart year={parseInt(this.props.params.year)} country={this.state.fipsData1} scale={0.1*this.state.fipsData1.get('maxYear')} />
                    </div>
                    
                    <div className="col-lg-6">
                        <SelectField value={this.state.fips2} onChange={ this.fips2 } >
                            {this.FIPSData}
                        </SelectField>
                        {this.Loading(this.state.wating2)}
                        <Chart year={parseInt(parseInt(this.props.params.year))}  country={this.state.fipsData2} scale={0.1*this.state.fipsData2.get('maxYear')}/>
                    </div>
                </div>

            </div>
        );
    }
    
    onAnimate() {
        
        if(this.state.interval===-1) {
            // Fire imidiatly
            const newYear = parseInt(this.props.params).year>=settings.maxYear ? settings.minYear : parseInt(this.props.params.year)+1;
            this.setState({year: newYear});
            
            this.setState({interval: 
                window.setInterval( (state => {
                    const newYear = parseInt(this.props.params.year)>=settings.maxYear ? settings.minYear : parseInt(this.props.params.year)+1;
                    this.setState({year: newYear});
                }).bind(this), 200) 
            });
        }
        else {
            window.clearInterval(this.state.interval);
            this.setState({interval: -1});
        }
        
    }
    
    
    componentDidMount() {
        
        console.log("this.props", this.props);
        
        this.getAPI('wating1', 'fipsData1', this.state.fips1);
        this.getAPI('wating2', 'fipsData2', this.state.fips2);
    
        document.addEventListener("visibilitychange", function() {
            clearInterval(this.state.interval);
            this.state.interval = -1;
        }.bind(this));
        
    }
    
    getAPI(watingIndex, fipsKey, country) {
        
        //let { country } = this.props;
        const year = [parseInt(this.props.params.year)];
        
        // TODO max for max POP, get all the years.
        this.setState({[fipsKey]: Map(), [watingIndex]: true});
        API.getCountry(country, year)
        .then( v => {
            const fips = FIPS.find( element => element.FIPS === country );
            v.name = fips ? fips.name : "";
            
            v.maxYear = Object.keys(v).reduce(function (previous, key) {
                const value = parseInt(v[key].POP);
                if( value && !isNaN(value) ) {
                    return Math.max(previous, value );
                } else {
                    return previous;
                }
            }, 0);
            
            const newState = {};
            newState[fipsKey] = Immutable.fromJS(v);
            this.setState(newState);
        })
        
        
        
        //let { country } = this.props;
        let years = [...rangeGen(settings.minYear, settings.maxYear, 1)];
        
        // TODO max for max POP, get all the years.
        this.setState({[fipsKey]: Map()});
        const p = API.getCountry(country, years)
        .then( v => {
            const fips = FIPS.find( element => element.FIPS === country );
            v.name = fips ? fips.name : "";
            
            v.maxYear = Object.keys(v).reduce(function (previous, key) {
                const value = parseInt(v[key].POP);
                if( value && !isNaN(value) ) {
                    return Math.max(previous, value );
                } else {
                    return previous;
                }
            }, 0);
            
            const newState = {};
            newState[fipsKey] = Immutable.fromJS(v);
            newState[watingIndex] = false;
            this.setState(newState);
            this.onAnimate();
        })
        
        return p;
        
    }
    
    
}