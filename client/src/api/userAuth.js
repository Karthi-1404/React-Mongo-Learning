import {axiosInstance} from './axiosInstance'
import axios from "axios"
console.log('axiosInstance',axiosInstance);
export const registerCall = async (payload)=>{
    try {
        const success = await axiosInstance.post('/auth/register',payload)
        console.log('success',success);
        return success.data
    } catch (error) {
        return error.message
    }
      
}
export const loginCall = async (payload)=>{
    try {
        const success = await axios.post('/auth/signin',payload)
        return success.data
    } catch (error) {
        return error.message
    }
      
}
export const currentUser = async ()=>{
    try {
        const success = await axiosInstance.get('/auth/currentuser')
        console.log('currentUser resp',success.data);
        return success.data
    } catch (error) {
        return error.message
    }
      
}
export const getallUser = async ()=>{
    try {
        const success = await axiosInstance.get('/user/get-users')
        return success.data
    } catch (error) {
        return error.message
    }
      
}
export const editUser = async (payload,id)=>{
    try {
        const success = await axiosInstance.put(`/user/update-user/${id}`,payload)
        return success.data
    } catch (error) {
        return error.message
    }
      
}