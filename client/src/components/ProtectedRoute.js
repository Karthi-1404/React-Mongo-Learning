import React, { useEffect } from 'react'
import { currentUser } from '../api/userAuth'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../redux/loaderSlice'
import { setUser } from '../redux/userslice'

function ProtectedRoute({children}){
      const {user} = useSelector(state=>state.users)
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const validateUser = async()=>{
        try {
          console.log('user',user);
            dispatch(setLoader(true))
            const response = await currentUser()
            dispatch(setLoader(false))
            console.log('response',response);
          if(response.success){
            dispatch(setUser(response.data))
          }else{
            console.log('inside else');
            // localStorage.removeItem('token')
            navigate('/signin')
            message.error(response.message)
          }
        } catch (error) {
          dispatch(setLoader(false))
            navigate('/signin')
            message.error(error.message) 
        }
          
     };
     useEffect(()=>{
        if(localStorage.getItem('token')){
          console.log('validate user');
          validateUser();
        }else{
            
            message.error('Please Log in')
            navigate('/signin')
        } 
     },[]);
    return(
      user && (
      <div>
      <div className='flex justify-between items-center bg-primary p-5'>
         
           <h1  className='text-white text-2xl cursor-pointer' onClick={()=>{navigate('/home')}}>ShEY</h1>
           <div className='bg-white py-2 px-5 rounded flex gap-1 items-center'>
            <i class="ri-shield-user-line"></i>
            <span className='cursor-pointer'
            onClick={()=>{
              if(user.role == 'admin'){
                navigate('/admin')
              }else{
                navigate('/profile')
              }
              }}
            > {user.name} </span>
            <i class="ri-logout-box-r-line cursor-pointer" 
            onClick={()=>{
              localStorage.removeItem('token');
              localStorage.clear()
              navigate('/signin')}}></i>
           </div>
      </div>
      {
        <div>
                  
          {children}
        </div>
      }
    </div>
      )
    )

};

export default ProtectedRoute