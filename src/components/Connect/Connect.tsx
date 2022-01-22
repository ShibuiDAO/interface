import GenericModal from 'components/Modals/GenericModal';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useEagerConnect from 'hooks/useEagerConnect';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectConnectingStatus, setConnectingStatus, setEagerAttempt } from 'state/reducers/user';
import MetamaskConnect from './MetamaskConnect';
import TorusConnect from './TorusConnect';
import WalletConnectConnect from './WalletConnectConnect';
import WalletLinkConnect from './WalletLinkConnect';

const Connect: React.FC = () => {
	const dispatch = useDispatch();
	const { active } = useActiveWeb3React();
	const triedToEagerConnect = useEagerConnect();
	const open = useSelector(selectConnectingStatus);

	useEffect(() => {
		dispatch(setEagerAttempt(triedToEagerConnect));
	}, [triedToEagerConnect, active, dispatch]);

	return (
		<GenericModal
			show={open}
			onDialogClose={(state) => dispatch(setConnectingStatus(state))}
			modalTitle="Connect a wallet"
			onTitleCloseClick={() => dispatch(setConnectingStatus(false))}
		>
			<MetamaskConnect />
			<WalletConnectConnect />
			<WalletLinkConnect />
			<TorusConnect />
		</GenericModal>
	);
};

export default Connect;
