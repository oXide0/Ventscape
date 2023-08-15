import { useState, useEffect } from 'react';
import axios from 'axios';

interface ICountry {
	name: {
		common: string;
	};
	currencies: {
		[key: string]: {
			name: string;
		};
	};
}

export const useCountries = () => {
	const [countries, setCountries] = useState<string[]>([]);
	const [currencies, setCurrencies] = useState<string[]>([]);

	useEffect(() => {
		const getCountries = async () => {
			try {
				const response = await axios.get('https://restcountries.com/v3.1/region/europe');
				const countriesNames = response.data.map((country: ICountry) => country.name.common);
				const currencies = response.data.map((country: ICountry) => Object.keys(country.currencies)[0]);
				const sortedCountries = countriesNames.sort();
				const sortedCurrencies = currencies.sort();
				const resCurrencies = new Set<string>(sortedCurrencies);
				setCountries(sortedCountries);
				setCurrencies(Array.from(resCurrencies));
			} catch (err) {
				console.log(err);
			}
		};

		getCountries();
	}, []);

	return { countries, currencies };
};
