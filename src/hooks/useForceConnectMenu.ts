import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setConnectingStatus } from 'state/reducers/user';
import { useActiveWeb3React } from './useActiveWeb3React';

export default function useForceConnectMenu() {
	const { active } = useActiveWeb3React();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setConnectingStatus(!active));
	}, [active, dispatch]);
}
