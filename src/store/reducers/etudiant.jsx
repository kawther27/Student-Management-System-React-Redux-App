//Les actions (identiques au CRUD)
// const ADD_STUDENT = 'ADD_STUDENT'
// const UPDATE_STUDENT = 'UPDATE_STUDENT'
// const DELETE_STUDENT = 'DELETE_STUDENT'
const SET_STUDENT = 'SET_STUDENT'
const SET_ALL_STUDENT = 'SET_ALL_STUDENT'

//Les createurs d'actions
// export const addStudent = student => ({ type: ADD_STUDENT, payload: student })
// export const updateStudent = (student, id) = ({ type: UPDATE_STUDENT, payload: { id, student } })
// export const deleteStudent = id => ({ type: DELETE_STUDENT, payload: id })
export const setStudent = student => ({ type: SET_STUDENT, payload: student })
export const SetAllStudents = students => ({ type: SET_ALL_STUDENT, payload: students })

/* Etat initial*/
const initialState = {
    students: [],
    student: {}
}

/*Les reducteurs*/

export const studentReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_STUDENT: {
            return { ...state, student: payload }
        }
        case SET_ALL_STUDENT: {
            return { ...state, students: payload }
        }
        default: {
            return state
        }
    }
}