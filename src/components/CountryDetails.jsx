import { useParams, useSearchParams } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

function CountryDetails({ countries }) {
  const [countryUS, setCountryUS] = useState([]);
  const [fetching, setFetching] = useState(true);
  const[bordersUS, setBordersUS]=useState([])
 

  const { id } = useParams();

  const apiURL = `https://ih-countries-api.herokuapp.com/countries/${id}`;

  useEffect(() => {
    axios
      .get(apiURL)
      .then((response) => {
        setCountryUS(response.data);
        console.log('dataUS:', response.data);
        setFetching(false);

      /*   const countryBorders = countries.filter((country) =>
        countries.borders.includes(country.alpha3Code)); */

        setBordersUS(response.data.borders)

      })
      .catch((err) => {
        console.log(err);
        const currentCountry = countries.find(
          (country) => country.alpha3Code === id
        );
        setCountryUS(currentCountry);

        const countryBorders = countries.filter((country) =>
          countries.borders.includes(country.alpha3Code)
        );

        setBordersUS(countryBorders)
        console.log('found,', countryBorders);
        setFetching(false);
      });
  }, []);

  /*  
  console.log('countries,', countries);
  console.log('current,', currentCountry); */

  return (
    <>
      {fetching  && <p>Loading ...</p>}

        <div className="card mb-3 w-25">
          <div c="row g-0">
            <div c="col-md-4">
              <img
                src={
                  'https://flagpedia.net/data/flags/icon/72x54/' +
                  countryUS.alpha2Code.toLowerCase() +
                  '.png'
                }
                c="card-img-top w-25"
                alt="flag"
              />
            </div>
            <div c="col-md-8">
              <div c="card-body">
                <h5 c="card-title">Country :{countryUS.name.common}</h5>
                <>
                  Borders:
                  <br></br>
                  {bordersUS.map((border) => (
                    <Link to={'/' + border} key={border}>
                      <p>{border}</p>
                    </Link>
                  ))}
                </>

                <p c="card-text">Capital: {countryUS.capital[0]}</p>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
}
export default CountryDetails;
