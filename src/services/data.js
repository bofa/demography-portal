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
    FIPS: 'AF',
    name: 'Afghanistan'
},
{
    FIPS: 'AG',
    name: 'Algeria'
},
{
    FIPS: 'AJ',
    name: 'Azerbaijan'
},
{
    FIPS: 'AL',
    name: 'Albania'
},
{
    FIPS: 'AM',
    name: 'Armenia'
},
{
    FIPS: 'AN',
    name: 'Andorra'
},
{
    FIPS: 'AQ',
    name: 'American Samoa'
},
{
    FIPS: 'AR',
    name: 'Argentina'
},
{
    FIPS: 'AU',
    name: 'Austria'
},





{
    FIPS: 'AS',
    name: 'Australia'
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
    FIPS: 'DK',
    name: 'Denmark'
},
{
    FIPS: 'MX',
    name: 'Mexico'
},
{
    FIPS: 'GM',
    name: 'Germany'
},
{
    FIPS: 'BX',
    name: 'Brunei'
},
{
    FIPS: 'PL',
    name: 'Poland'
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
    FIPS: 'KS',
    name: 'Korea, South'
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
    FIPS: 'JA',
    name: 'Japan'
},
{
    FIPS: 'NZ',
    name: 'New Zealand'
},
].sort(compare);
