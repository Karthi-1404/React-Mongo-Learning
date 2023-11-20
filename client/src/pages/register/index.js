import React, { useEffect} from "react";
import Divider from "../../components/divider";
import {registerCall} from "../../api/userAuth";
import { Link, useNavigate} from "react-router-dom";
import {Button, Form,Input, message} from "antd"
import { setLoader } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const  onClickFunc =  async (values) =>{
      try {
        dispatch(setLoader(true))
        const response = await registerCall(values)
        dispatch(setLoader(false))
        if(response.success){
          navigate("/signin")
          message.success(response.message)
        }else{
          throw new Error(response.message)
        }
        
      } catch (error) {
        dispatch(setLoader(false))
        message.error(error.message)
      }
          
    }
    useEffect(()=>{
      if(localStorage.getItem('token')){
        navigate("/home");
      }
  },[])
    const rules = [{
        required:true
    }]
    return (
      <div className="h-screen bg-primary flex justify-center items-center">
          <div className="bg-white p-5 w-[550px]">
            <h1 className="text-primary">REGISTER</h1>
           <Divider />
           <Form
           layout="vertical" onFinish={onClickFunc}>
             <Form.Item
             label="name"
             name="name"
             rules={rules}
             ><Input placeholder="name" /></Form.Item>
             <Form.Item
             label="email"
             name="email"
             ><Input placeholder="email" /></Form.Item>
             <Form.Item
            
             label="password"
             name="password"
             ><Input type="password" placeholder="password" /></Form.Item>
            <Button type="primary" htmlType="submit" block> Register</Button>
            <div className="mt-5 flex justify-center">
            <span>
               Already have a account? <Link to="/signin">Login</Link>
            </span>
           </div>
           </Form>
           
          </div>
      </div>
    );
  }
  
  export default Register;