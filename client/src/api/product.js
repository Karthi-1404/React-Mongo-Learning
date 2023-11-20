import {axiosInstance} from './axiosInstance'

export const addProductApi = async (payload)=>{
    try {
        const success = await axiosInstance.post('product/add',payload)
        return success.data
    } catch (error) {
        return error.message
    }
    
}
export const getProductApi = async (filter)=>{
    try {
        const success = await axiosInstance.post('product/get-product',filter)
        console.log('success',success);
        return success.data
    } catch (error) {
        return error.message
    }
    
}
export const getProductbyIdApi = async (id)=>{
    try {
        console.log('getProductbyIdApi',id);
        const success = await axiosInstance.get(`http://localhost:3000/product/get-product-id/${id}`)
        console.log('get-product-id',success);
        return success.data
    } catch (error) {
        return error.message
    }
    
}
export const editProductApi = async (id, payload)=>{
    try {
        const success = await axiosInstance.put(`product/edit-product/${id}`,payload)
        console.log('success',success);
        return success.data
    } catch (error) {
        return error.message
    }
    
}
export const editProductStatusApi = async (id, payload)=>{
    try {
        const success = await axiosInstance.put(`product/edit-product-status/${id}`,payload)
        console.log('success',success);
        return success.data
    } catch (error) {
        return error.message
    }
    
}
export const deleteProductApi = async (id)=>{
    try {
        const success = await axiosInstance.delete(`product/delete-product/${id}`)
        console.log('success',success);
        return success.data
    } catch (error) {
        return error.message
    }
    
}
export const addImageApi = async (payload)=>{
    try {
        const success = await axiosInstance.post(`product/add-image`,payload)
        console.log('success',success);
        return success.data
    } catch (error) {
        return error.message
    }
    
}