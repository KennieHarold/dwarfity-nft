import { CoreTypes } from './types';

export const loadDwarvesForSale = () => {
  return async (dispatch, getState) => {
    const { dwarfityCoreContract } = getState().blockchain;

    const dwarvesForSale = await dwarfityCoreContract.getTokensOfDeployer();

    console.log(dwarvesForSale);
  };
};
