import {GET_COMPANIES,GET_COMPANY,ADD_COMPANY,DELETE_COMPANY,EDIT_COMPANY} from './types';
import Api from './Api';

export const getCompanies = () => async dispatch => {
    //GET
    const res = await Api().get('companies')
    dispatch({
        type:GET_COMPANIES,
        payload:res.data
    })

}
export const getCompany = (id) => async dispatch => {
    //GET a company via ID
    const res = await Api().get(`company/${id}`)
    dispatch({
        type:GET_COMPANY,
        payload:res.data
    })

}
export const addCompany=(company)=>async dispatch=>{
     //ADD
     const res = await Api().post('addCompany', company)
     dispatch({
         type:ADD_COMPANY,
         payload:res.data
     })
}
export const deleteCompany=(id)=>async dispatch=>{
    //DELETE
    await Api().delete(`deleteCompany/${id}`)
    dispatch({
        type:DELETE_COMPANY,
        payload:id
    })
}
export const editCompany=(id,company)=>async dispatch=>{
    //UPDATE
    const res = await Api().put(`updateCompany/${id}`, company)
    dispatch({
        type:EDIT_COMPANY,
        payload:res.data
    })
}