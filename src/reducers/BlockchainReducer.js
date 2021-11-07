import { BlockchainTypes } from '../actions/types';

const initialState = {
  provider: null,
  signer: null,
  dwarfityCoreContract: null
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

    case BlockchainTypes.SET_DWARFITY_CORE_CONTRACT:
      return {
        ...state,
        dwarfityCoreContract: action.payload.contract
      };

    case BlockchainTypes.CLEAR_STATES:
      return initialState;

    default:
      return state;
  }
};

export default BlockchainReducer;
