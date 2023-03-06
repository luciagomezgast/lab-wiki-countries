import { Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const apiURL = 'https://ih-countries-api.herokuapp.com/countries';

function CountriesList({ countries }) {
  const [countriesUS, setCountriesUS] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    axios.get(apiURL)
    .then((response) => {
      setCountriesUS(response.data);
      console.log('data:', response.data)
      setFetching(false);
    })
    .catch(err=>{
      console.log(err)
      setCountriesUS(countries)
    });
    
  }, []);

  return (
    <>
      {fetching && <p>Loading ...</p>}

      {countriesUS.map((country) => {
        return (
          <div className="container" key={country.alpha3Code}>
            <div className="row">
              <div className="col-5">
                <Link to={'/' + country.alpha3Code}>
                  <div className="card mb-10 w-25">
                    <img
                      src={
                        'https://flagpedia.net/data/flags/icon/72x54/' +
                        country.alpha2Code.toLowerCase() +
                        '.png'
                      }
                      className="card-img-top"
                      alt="flag"
                    />
                    <div className="card-body">
                      <p className="card-text">{country.name.common}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default CountriesList;
