import React, { Component } from 'react';
import Immutable, { Map } from 'immutable';

global.Highcharts = require('highcharts');
var ReactHighcharts = require('react-highcharts');

export default class Chart extends Component {
    
    constructor(props) {
        super(props);
        
        const ageArray = this.generateAgeArray();
        
        this.menArray = ageArray.filter(e => e.charAt(0)==='M');
        this.womanArray = ageArray.filter(e => e.charAt(0)==='F');
                
        this.state = {
        
        };
        
        const { country, year, scale } = this.props;
        
        // Age categories
        const categories = ['0-4', '5-9', '10-14', '15-19',
                            '20-24', '25-29', '30-34', '35-39', '40-44',
                            '45-49', '50-54', '55-59', '60-64', '65-69',
                            '70-74', '75-79', '80-84', '85-89', '90-94',
                            '95-99', '100 + '];
        
        this.config = {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Population pyramid for ' + country.get('name') + ', ' + year
            },
            subtitle: {
                text: 'Source: <a href="http://www.census.gov/">US Census</a>'
            },
            xAxis: [{
                categories: categories,
                reversed: false,
                labels: {
                    step: 1
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: categories,
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value);
                    }
                },
                max: scale,
                min: -scale
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + country.get('name') + ', age ' + this.point.category + '</b><br/>' +
                        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },
            series: [{
                name: 'Male',
                //data: menData,
                animation: false,
            }, {
                name: 'Female',
                //data: womanData,
                animation: false,
            }]
        }
        
        //this.config = Immutable.fromJS(config);
        
    }
    
    componentWillReceiveProps() {
        
        // return false;
        
        // this.componentDidMount();
    }
    
    render() {
        
        const { country, year, scale } = this.props;
        
        if(!country) {
            return false;
        }

        this.config.series[0].data = this.menArray.map(e => -parseInt(country.getIn([''+year, e])));
        this.config.series[1].data = this.womanArray.map(e => parseInt(country.getIn([''+year, e])));        

        const menData = this.menArray.map(e => parseInt(country.getIn([''+year, e])));
        const womanData = this.womanArray.map(e => parseInt(country.getIn([''+year, e])));
        
        // Age categories
        const categories = ['0-4', '5-9', '10-14', '15-19',
                            '20-24', '25-29', '30-34', '35-39', '40-44',
                            '45-49', '50-54', '55-59', '60-64', '65-69',
                            '70-74', '75-79', '80-84', '85-89', '90-94',
                            '95-99', '100 + '];

        console.log('this.props', menData);

        console.log('womanData', womanData);

        const totalPop = menData.concat(womanData).reduce((v, sum) => v + sum, 0);

        const under20 = menData.slice(0, 4).concat(womanData.slice(0, 4)).reduce((v, sum) => v + sum, 0);
        const pop20to65 = menData.slice(5, 12).concat(womanData.slice(5, 12)).reduce((v, sum) => v + sum, 0);
        const over65 = menData.slice(13).concat(womanData.slice(13)).reduce((v, sum) => v + sum, 0);
        
        let config = {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Population pyramid for ' + country.get('name') + ', ' + year
            },
            subtitle: {
                text: 'Source: <a href="http://www.census.gov/">US Census</a>'
            },
            xAxis: [{
                categories: categories,
                reversed: false,
                labels: {
                    step: 1
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: categories,
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value);
                    }
                },
                max: scale,
                min: -scale
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + country.get('name') + ', age ' + this.point.category + '</b><br/>' +
                        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },
            series: [{
                name: 'Male',
                data: menData.map(m => -m),
                animation: false,
            }, {
                name: 'Female',
                data: womanData,
                animation: false,
            }]
        }
        
        // console.log("config", config, this.config);

        return (
            <div>
                <ReactHighcharts isPureConfig={true} config={config}></ReactHighcharts>
                <div className="row" style={{ margin: 20 }}>
                    <h3 className="col-xs-3">
                        Population: {(totalPop*1E-6).toFixed(1)}megahumans
                    </h3>
                    <h3 className="col-xs-3">
                        Under 20: {(100*under20/totalPop).toFixed(0)}%
                    </h3>
                    <h3 className="col-xs-3">
                        20-65: {(100*pop20to65/totalPop).toFixed(0)}%
                    </h3>
                    <h3 className="col-xs-3">
                        Over 65: {(100*over65/totalPop).toFixed(0)}%
                    </h3>
                </div>
            </div>
        );
    }
    
    generateAgeArray() {
        
        let out = [];
        for(let i=0; i<=95; i+=5) {
            out.push("FPOP" + i + "_" + (i+4));
            out.push("MPOP" + i + "_" + (i+4));
        }
        return out;
    }
    
    reMap(data) {
        let out = {};
        for(let i=0; i<data[0].length; ++i) {
            if(data[0][i] && data[1][i])
               out[data[0][i]] = data[1][i];
        }
        return out;
    }
    
}