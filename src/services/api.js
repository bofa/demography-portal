import axios from 'axios';
import LS from 'local-storage';

function* rangeGen(from, to, step = 1) {
  for (let i = from; i <= to; i += step) {
    yield i;
  }
}

export default class API {
    
    static generateAgeArray() {
        
        let out = [];
        for(let i=0; i<=95; i+=5) {
            out.push("FPOP" + i + "_" + (i+4));
            out.push("MPOP" + i + "_" + (i+4));
        }
        return out;
    }
    
    static reMap(data) {
        let out = {};
        for(let i=0; i<data[0].length; ++i) {
            if(data[0][i] && data[1][i])
               out[data[0][i]] = data[1][i];
        }
        return out;
    }
    
    static getCountry(country, years) {
        
        // LS.clear();
        const apiKey = '09befa8408a54a731b74a37f7b816fee2346d506';
        const ageArray = API.generateAgeArray();

        console.log('ageArray', ageArray);

        const ageString = ageArray.join();
        
        let localStorage = LS.get(country);
        localStorage = localStorage ? JSON.parse(localStorage) : {};
        
        
        let promises = [];
        for(let year of years) {
            
            let url = "http://api.census.gov/data/timeseries/idb/5year?get=NAME,POP," + ageString + "&FIPS=" + country + "&time=" + year + '&key=' + apiKey;

            if( year in localStorage  ) {
                promises.push(Promise.resolve( {[year]: localStorage[year] } ));
            }
            else {
                promises.push(axios.get(url)
                .then(function (response) {
                    let out = {};
                    out[year] = API.reMap(response.data)
                    return out;
                })
                .catch(function (response) {
                    return undefined;
                }));
            }
            
        }
        
        let pOut = Promise.all(promises).then(values => { 
            return values.reduce( (a,b) => Object.assign(a,b) );
        }, f => console.log("API fail", f) );
        
        pOut.then( v => LS(country, JSON.stringify(v) ) );
        
        return pOut;
    }
}