import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import TechReducer from './TechReducer';
import ProjectReducer from './ProjectReducer';
import ReportReducer from './ReportReducer';

export default combineReducers({
    UserReducer,TechReducer,ProjectReducer, ReportReducer
})

