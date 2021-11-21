import { CoreTypes } from '../actions/types';

const initialState = {
  dwarvesForSale: [],
  usersDwarves: [],
  initLoader: false,
  userLoader: false,
  showToast: {
    status: false,
    title: 'Dwarfity',
    text: "Woohoo, hope you're doing well!"
  },
  breedingLoader: false
};

const CoreReducer = (state = initialState, action) => {
  let index = undefined;

  switch (action.type) {
    case CoreTypes.ADD_DWARF_FOR_SALE:
      index = state.dwarvesForSale.findIndex(
        (dwarf) => dwarf._id === action.payload.dwarf._id
      );

      if (index === -1) {
        return {
          ...state,
          dwarvesForSale: [...state.dwarvesForSale, action.payload.dwarf]
        };
      } else {
        return state;
      }

    case CoreTypes.ADD_USER_DWARF:
      index = state.usersDwarves.findIndex(
        (dwarf) => dwarf._id === action.payload.dwarf._id
      );

      if (index === -1) {
        return {
          ...state,
          usersDwarves: [...state.usersDwarves, action.payload.dwarf]
        };
      } else {
        return state;
      }

    case CoreTypes.CLEAR_DWARVES_FOR_SALE:
      return {
        ...state,
        dwarvesForSale: []
      };

    case CoreTypes.CLEAR_USER_DWARVES:
      return {
        ...state,
        usersDwarves: []
      };

    case CoreTypes.SHOW_TOAST:
      return {
        ...state,
        showToast: {
          ...state.showToast,
          status: action.payload.status,
          title:
            action.payload.status && action.payload.title
              ? action.payload.title
              : 'Dwarfity',
          text:
            action.payload.status && action.payload.text
              ? action.payload.text
              : "Woohoo, hope you're doing well!"
        }
      };

    case CoreTypes.INIT_LOADER_CHANGE:
      return {
        ...state,
        initLoader: action.payload.status
      };

    case CoreTypes.USER_LOADER_CHANGE:
      return {
        ...state,
        userLoader: action.payload.status
      };

    case CoreTypes.BREEDING_LOADER_CHANGE:
      return {
        ...state,
        breedingLoader: action.payload.status
      };

    default:
      return state;
  }
};

export default CoreReducer;
