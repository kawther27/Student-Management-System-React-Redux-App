import { studentReducer } from "./etudiant"
import { loginReducer } from "./login"
import { combineReducers } from "redux"
const reducers = combineReducers({
    student: studentReducer,
    auth: loginReducer
})

export default reducers