import { combineReducers } from 'redux';
import BlockchainReducer from './BlockchainReducer';

export default combineReducers({
  blockchain: BlockchainReducer
});
