import { useState, useEffect } from 'react';
import axios from 'axios';

interface ICountry {
	name: {
		common: string;
	};
}

export const useCountries = () => {
	const [countries, setCountries] = useState<string[]>([]);

	useEffect(() => {
		const getCountries = async () => {
			try {
				const response = await axios.get('https://restcountries.com/v3.1/region/europe');
				const countriesNames = response.data.map((country: ICountry) => country.name.common);
				const sortedCountries = countriesNames.sort();
				setCountries(sortedCountries);
			} catch (err) {
				console.log(err);
			}
		};

		getCountries();
	}, []);

	return { countries };
};
