import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';
import axios from 'axios';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('a');
	const [cocktails, setCocktails] = useState([]);

	const fetchDrinks = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await axios(url + searchTerm);
			const { drinks } = response.data;

			if (drinks) {
				const newDrinks = drinks.map((drink) => {
					const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = drink;
					return { id: idDrink, name: strDrink, image: strDrinkThumb, info: strAlcoholic, glass: strGlass };
				});
				setCocktails(newDrinks);
			} else {
				setCocktails([]);
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	}, [searchTerm]);

	useEffect(() => {
		fetchDrinks();
	}, [searchTerm, fetchDrinks]);

	return <AppContext.Provider value={{ isLoading, searchTerm, cocktails, setSearchTerm }}>{children}</AppContext.Provider>;
};
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
