import Api from './Api'

export default{
    getAllCompanies(){
        return Api().get('companies')
    },
    getSpecificCompany(id){
        return Api().get(`company/${id}`)
    },
    postCompany(newCompany){
        return Api().post('addCompany', newCompany)
    },
    deleteCompany(id){
        return Api().delete(`deleteCompany/${id}`)
    },
    updateCompany(id,updCompany){
        return Api().put(`updateCompany/${id}`, updCompany)
    }
}