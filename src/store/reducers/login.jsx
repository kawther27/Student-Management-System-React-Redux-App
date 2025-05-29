const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

export const login = (infoLogin) => ({ type: LOGIN, payload: infoLogin })
export const logout = () => ({ type: LOGOUT })

const initialState = {
    user: {},
    token: null
}

export const loginReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case LOGIN: {
            return { ...state, user: payload.data, token: payload.token }
        }
        case LOGOUT:
            {
                return { ...state, user: null, token: null }
            }
        default:
            return state
    }
}