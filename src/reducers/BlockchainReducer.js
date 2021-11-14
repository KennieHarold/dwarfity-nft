import { BlockchainTypes } from '../actions/types';

const initialState = {
  provider: null,
  signer: null,
  account: '0x0',
  dwarfityCoreContract: null,
  initLoader: true,
  walletLoader: false
};

const BlockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case BlockchainTypes.SET_PROVIDER:
      return {
        ...state,
        provider: action.payload.provider
      };

    case BlockchainTypes.SET_SIGNER:
      return {
        ...state,
        provider: action.payload.signer
      };

    case BlockchainTypes.SET_ACCOUNT:
      return {
        ...state,
        account: action.payload.account
      };

    case BlockchainTypes.SET_DWARFITY_CORE_CONTRACT:
      return {
        ...state,
        dwarfityCoreContract: action.payload.contract
      };

    case BlockchainTypes.CLEAR_STATES:
      return initialState;

    case BlockchainTypes.INIT_LOADER_CHANGE:
      return {
        ...state,
        initLoader: action.payload.status
      };

    case BlockchainTypes.WALLET_LOADER_CHANGE:
      return {
        ...state,
        walletLoader: action.payload.status
      };

    default:
      return state;
  }
};

export default BlockchainReducer;
