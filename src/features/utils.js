

export const mat = entity => ([
    `${entity}/pending`,
    `${entity}/fulfilled`,
    `${entity}/rejected`
])

export const mac = (type, ...argNames) =>
    (...args) => {
        const action = { type }
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        });
        return action
    }

export const asyncMac = asyncTypes => ([
    mac(asyncTypes[0]),
    mac(asyncTypes[1], 'payload'),
    mac(asyncTypes[2], 'error')
])

const initialFetching = { loading: 'idle' } 
export const makeFetchingReducer = actions => (state = initialFetching, action) => {
    switch (action.type) {
        case actions[0]: {
            return { ...state, loading: 'pending' }
        }
        case actions[1]: {
            return { ...state, loading: 'succeded' }
        }
        case actions[2]: {
            return { error: action.error, loading: 'rejected' }
        }
        default:
            return state 
    }
}


export const makeSetReducer = actions => (state = 'all', action) => {
    switch (action.type) {
        case actions[0]: {
            return action.payload
        }
        default:
            return state
    }
}