const INITIAL_STATE = {summary: {credit: 0, debit: 0}}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'BILLING_SUMMARY_FETCHED':
            return action.payload.data ? { ...action, summary: action.payload.data } : INITIAL_STATE
        default:
            return state;
    }    
    return state
}