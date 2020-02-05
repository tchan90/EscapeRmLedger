import {GET_COMPANIES,GET_COMPANY,ADD_COMPANY,DELETE_COMPANY,EDIT_COMPANY} from '../actions/types'

const initialState={
    companies:[],
    company:{}
};
export default function(state=initialState, action){
    switch(action.type){
            case GET_COMPANIES:
                return{
                    ...state,
                    companies:action.payload
                }
            case GET_COMPANY:
                return{
                    ...state,
                    company:action.payload
                }
            case ADD_COMPANY:
                return{
                    ...state,
                    companies:[action.payload, ...state.companies]
                }
            case DELETE_COMPANY:
                return{
                    ...state,
                    companies:state.companies.filter(company => company.id!==action.payload)
                }
            case EDIT_COMPANY:
                    return{
                        ...state,
                        companies:state.companies.filter(company => company.id!==action.payload ? (company=action.payload):company)
                    }
        default:
            return state;
    }
}