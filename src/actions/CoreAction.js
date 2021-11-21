import { ethers } from 'ethers';
import { CoreTypes } from './types';
import { CoreServiceInstance } from '../services';

export const loadDwarvesForSale = () => {
  return async (dispatch, getState) => {
    const { dwarfityCoreContract } = getState().blockchain;

    dispatch({ type: CoreTypes.INIT_LOADER_CHANGE, payload: { status: true } });

    const dwarvesForSale = await dwarfityCoreContract.getTokensOfDeployer();

    dispatch({ type: CoreTypes.CLEAR_DWARVES_FOR_SALE });

    for (let tokenId of dwarvesForSale) {
      const dwarf = await CoreServiceInstance.getDwarfityByTokenId(tokenId);

      if (dwarf && dwarf !== undefined) {
        dispatch({ type: CoreTypes.ADD_DWARF_FOR_SALE, payload: { dwarf } });
      }
    }

    dispatch({
      type: CoreTypes.INIT_LOADER_CHANGE,
      payload: { status: false }
    });
  };
};

export const purchaseDwarfFromSale = (dwarf) => {
  return async (dispatch, getState) => {
    const { dwarfityCoreContract } = getState().blockchain;

    await dwarfityCoreContract.purchaseDwarfFromDeployer(dwarf.token_id, {
      value: ethers.utils.parseEther(dwarf?.price?.value.toString())
    });

    dispatch({
      type: CoreTypes.SHOW_TOAST,
      payload: {
        status: true,
        title: 'Purchase Dwarf',
        text:
          'Congratulations! You have successfully purchase a Dwarfity NFT for ' +
          dwarf?.price?.value
      }
    });

    //dispatch(loadDwarvesForSale());
  };
};

export const getUsersDwarves = () => {
  return async (dispatch, getState) => {
    const { dwarfityCoreContract, account } = getState().blockchain;

    dispatch({ type: CoreTypes.USER_LOADER_CHANGE, payload: { status: true } });

    const tokenIds = await dwarfityCoreContract.getTokenIds(account);

    dispatch({ type: CoreTypes.CLEAR_USER_DWARVES });

    for (let tokenId of tokenIds) {
      const dwarf = await CoreServiceInstance.getDwarfityByTokenId(
        tokenId
      ).catch((error) => console.log(error));

      if (dwarf && dwarf !== undefined) {
        dispatch({ type: CoreTypes.ADD_USER_DWARF, payload: { dwarf } });
      }
    }

    dispatch({
      type: CoreTypes.USER_LOADER_CHANGE,
      payload: { status: false }
    });
  };
};

export const breedDwarvesAndGenerateImage = (
  parentXtokenId,
  parentYtokenId
) => {
  return async (dispatch, getState) => {
    const { dwarfityCoreContract, account } = getState().blockchain;

    dispatch({
      type: CoreTypes.BREEDING_LOADER_CHANGE,
      payload: { status: true }
    });
    const response = await (
      await dwarfityCoreContract.breedDwarves(parentXtokenId, parentYtokenId)
    ).wait();

    const index = response.events.findIndex((event) => event.event === 'Birth');

    if (index !== -1) {
      const newGene = response.events[index].args.genes;
      const newTokenId = response.events[index].args.tokenId.toString();

      const upload = await CoreServiceInstance.generateImageByGene(
        newGene
      ).catch((error) => console.log(error));

      if (upload && upload !== undefined) {
        const addRes = await CoreServiceInstance.addDwarfToDb({
          image: upload.secure_url,
          token_id: newTokenId,
          name: 'Dwarfity-Breed-' + newTokenId
        }).catch((error) => console.log(error));

        if (addRes && addRes !== undefined) {
          window.location.href = '/view-dwarf/' + newTokenId;
        }
      }
    }

    dispatch({
      type: CoreTypes.BREEDING_LOADER_CHANGE,
      payload: { status: false }
    });
  };
};
