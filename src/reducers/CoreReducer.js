import { CoreTypes } from '../actions/types';

const initialState = {
  dwarvesForSale: []
};

const CoreReducer = (state = initialState, action) => {
  let index = undefined;

  switch (action.type) {
    case CoreTypes.ADD_DWARF_FOR_SALE:
      index = dwarvesForSale.findIndex(
        (dwarf) => dwarf.index === action.payload.dwarf.index
      );

      if (index === -1) {
        return {
          ...state,
          dwarvesForSale: [...state.dwarvesForSale, action.payload.dwarf]
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};

export default CoreReducer;
