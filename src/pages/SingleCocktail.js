import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [cocktail, setCocktail] = useState(null);

	const fetchCocktail = async () => {
		try {
			const { data } = await axios(url + id);
			if (data.drinks) {
				const {
					strDrink: name,
					strDrinkThumb: image,
					strAlcoholic: info,
					strCategory: category,
					strGlass: glass,
					strInstructions: instructions,
					strIngredient1,
					strIngredient2,
					strIngredient3,
					strIngredient4,
					strIngredient5,
				} = data.drinks[0];
				const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5];
				const newDrink = { name, image, info, category, glass, instructions, ingredients };

				setCocktail(newDrink);
				setIsLoading(false);
			} else {
				setCocktail(null);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchCocktail();
	}, [id]);

	if (isLoading) {
		return <Loading />;
	}

	if (!cocktail) {
		return <h2>cocktail failed to load</h2>;
	}

	const { name, image, category, info, glass, instructions, ingredients } = cocktail;

	return (
		<section className="section cocktail-section">
			<h2 className="section-title">{name}</h2>
			<div className="drink">
				<img src={image} alt={name} />
				<div className="drink-info">
					<p>
						<span className="drink-data">name : </span>
						{name}
					</p>
					<p>
						<span className="drink-data">category : </span>
						{category}
					</p>
					<p>
						<span className="drink-data">info : </span>
						{info}
					</p>
					<p>
						<span className="drink-data">glass : </span>
						{glass}
					</p>
					<p>
						<span className="drink-data">instructions : </span>
						{instructions}
					</p>
					<p>
						<span className="drink-data">ingredients : </span>
						{ingredients.map((item, index) => {
							return item ? <span key={index}>{item}</span> : null;
						})}
					</p>
				</div>
			</div>
			<Link to="/" className="btn btn-primary">
				Back home
			</Link>
		</section>
	);
};

export default SingleCocktail;
