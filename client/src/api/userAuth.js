import {axiosInstance} from './axiosInstance'
import axios from "axios"
const userAllQuery = `query {
    users{
      _id
      name
      email
      role
      status
      createdAt
      updatedAt
    }
}
`
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
        const success = await axiosInstance.post('/graphql',{
           query:userAllQuery    
        },{
            headers:{
                'Content-Type': 'application/json'
            }
        })
        console.log('success.data',success)
        return success
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