import { CoreTypes } from './types';
import { CoreServiceInstance } from '../services';

export const loadDwarvesForSale = () => {
  return async (dispatch, getState) => {
    const { dwarfityCoreContract } = getState().blockchain;

    const dwarvesForSale = await dwarfityCoreContract.getTokensOfDeployer();

    for (let tokenId of dwarvesForSale) {
      const dwarf = await CoreServiceInstance.getDwarfityByTokenId(tokenId);

      if (dwarf && dwarf !== undefined) {
        dispatch({ type: CoreTypes.ADD_DWARF_FOR_SALE, payload: { dwarf } });
      }
    }
  };
};
