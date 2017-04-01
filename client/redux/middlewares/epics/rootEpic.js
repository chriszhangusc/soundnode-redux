import { combineEpics } from 'redux-observable';
import { dropdownSearchEpic } from './dropdownSearchEpic';

const rootEpic = combineEpics(
    dropdownSearchEpic
);

export default rootEpic;
