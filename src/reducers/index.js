import { combineReducers } from 'redux';
import BlockchainReducer from './BlockchainReducer';
import CoreReducer from './CoreReducer';

export default combineReducers({
  blockchain: BlockchainReducer,
  core: CoreReducer
});
