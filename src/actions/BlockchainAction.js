import { BlockchainTypes } from './types';
import { ethers } from 'ethers';
import dwarfityContract from '../abis/DwarfityCore.json';

const contractAddress = process.env.REACT_APP_DWARFITY_CORE_ADDRESS;

export const loadProviderAndContract = () => {
  return async (dispatch) => {
    if (typeof window.ethereum !== 'undefined') {
      let contract = null;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();

      if (accounts.length > 0) {
        const signer = provider.getSigner();

        contract = new ethers.Contract(
          contractAddress,
          dwarfityContract.abi,
          signer
        );

        dispatch({ type: BlockchainTypes.SET_SIGNER, payload: { signer } });
        dispatch({
          type: BlockchainTypes.SET_ACCOUNT,
          payload: { account: accounts[0] }
        });
      } else {
        contract = new ethers.Contract(
          contractAddress,
          dwarfityContract.abi,
          provider
        );
      }

      dispatch({ type: BlockchainTypes.SET_PROVIDER, payload: { provider } });
      dispatch({
        type: BlockchainTypes.SET_DWARFITY_CORE_CONTRACT,
        payload: { contract }
      });
    } else {
      window.alert('Non ethereum browser');
    }

    dispatch({
      type: BlockchainTypes.INIT_LOADER_CHANGE,
      payload: { status: false }
    });
  };
};
