// https://en.wikipedia.org/wiki/List_of_FIPS_country_codes

function compare(a,b) {
    if (a.name < b.name)
        return -1;
    else if (a.name > b.name)
        return 1;
    else 
        return 0;
}

export default  [
{
    FIPS: 'AA',
    name: 'Aruba'
},
{
    FIPS: 'AC',
    name: 'Antigua and Barbuda'
},
{
    FIPS: 'AE',
    name: 'United Arab Emirates'
},
{
    FIPS: 'AR',
    name: 'Argentina'
},
{
    FIPS: 'BR',
    name: 'Brazil'
},
{
    FIPS: 'CB',
    name: 'Cambodia'
},
{
    FIPS: 'CU',
    name: 'Cuba'
},
{
    FIPS: 'MX',
    name: 'Mexico'
},
{
    FIPS: 'BX',
    name: 'Brunei'
},
{
    FIPS: 'QA',
    name: 'Qatar'
},
{
    FIPS: 'SY',
    name: 'Syria'
},
{
    FIPS: 'PO',
    name: 'Portugal'
},
{
    FIPS: 'KN',
    name: 'Korea, North'
},
{
    FIPS: 'WS',
    name: 'Samoa'
},
{
    FIPS: 'SP',
    name: 'Spain'
},
{
    FIPS: 'SW',
    name: 'Sweden'
},
{
    FIPS: 'SZ',
    name: 'Switzerland'
},
{
    FIPS: 'UP',
    name: 'Ukraine'
},
{
    FIPS: 'KR',
    name: 'Kiribati'
},
{
    FIPS: 'NG',
    name: 'Niger'
},
{
    FIPS: 'NO',
    name: 'Norway'
},
{
    FIPS: 'FI',
    name: 'Finland'
},
{
    FIPS: 'SU',
    name: 'Sudan'
},
{
    FIPS: 'TH',
    name: 'Thailand'
},
{
    FIPS: 'TW',
    name: 'Taiwan'
},
{
    FIPS: 'UK',
    name: 'United Kingdom'
},
{
    FIPS: 'AS',
    name: 'Australia'
},
].sort(compare);
