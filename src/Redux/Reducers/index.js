import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import TechReducer from './TechReducer';
import ProjectReducer from './ProjectReducer';
export default combineReducers({
    UserReducer,TechReducer,ProjectReducer
})

