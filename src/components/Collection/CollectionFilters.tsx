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
				<div className="flex min-w-full">
					<div className="w-3/4 px-4">
						<input
							name="identifierSearch"
							id="identifierSearch"
							type="search"
							value={collectionAssetsSearch}
							onChange={(ev) => dispatch(setCollectionAssetsSearch(ev.target.value))}
							placeholder="Search"
							className="w-full rounded-xl p-2 py-3 dark:bg-darks-100 dark:text-black"
						/>
					</div>
					<div className="w-1/4 px-4">
						<select
							name="sorting"
							id="sorting"
							value={priceSorting}
							onChange={(ev) => dispatch(setPriceSorting(Number(ev.target.value) as PriceSorting))}
							className="w-full rounded-xl p-2 py-3 dark:bg-darks-100 dark:text-black"
						>
							<option value={PriceSorting.LtH}>Price: Low to High</option>
							<option value={PriceSorting.HtL}>Price: High to Low</option>
						</select>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CollectionFilters;
