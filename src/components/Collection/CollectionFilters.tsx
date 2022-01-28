import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearCollectionAssetsSearch,
	PriceSorting,
	selectCollectionAssetsSearch,
	selectPriceSorting,
	setCollectionAssetsSearch,
	setPriceSorting
} from 'state/reducers/user';

export interface CollectionFiltersProps {
	className?: string;
}

const CollectionFilters: React.FC<CollectionFiltersProps> = ({ className }) => {
	const dispatch = useDispatch();
	const priceSorting = useSelector(selectPriceSorting);
	const collectionAssetsSearch = useSelector(selectCollectionAssetsSearch);

	useEffect(() => {
		dispatch(clearCollectionAssetsSearch());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={className}>
			<form>
				<div>
					<input
						name="identifierSearch"
						id="identifierSearch"
						type="search"
						value={collectionAssetsSearch}
						onChange={(ev) => dispatch(setCollectionAssetsSearch(ev.target.value))}
					/>
				</div>
				<div>
					<select
						name="sorting"
						id="sorting"
						value={priceSorting}
						onChange={(ev) => dispatch(setPriceSorting(Number(ev.target.value) as PriceSorting))}
					>
						<option value={PriceSorting.LtH}>Price: Low to High</option>
						<option value={PriceSorting.HtL}>Price: High to Low</option>
					</select>
				</div>
			</form>
		</div>
	);
};

export default CollectionFilters;
