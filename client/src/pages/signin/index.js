import React, { useEffect } from "react";
import Divider from "../../components/divider";
import { loginCall } from "../../api/userAuth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd"
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onClickFunc = async (values) => {
    try {
      dispatch(setLoader(true))
      const response = await loginCall(values)
      dispatch(setLoader(false))
      console.log('login response', response);
      if (response.success) {
        console.log('localStorage', localStorage);
        localStorage.clear()
        localStorage.setItem('token', response.user.token)
        console.log('localStorage after', localStorage.getItem('token'));
        message.success(response.message)
        navigate("/home");
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      dispatch(setLoader(false))
      message.error(error.message)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/home");
    }
  }, [])
  const rules = [{
    required: true,
    message: 'required'
  }]
  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-5 w-[550px]">
        <h1 className="text-primary">Signin</h1>
        <Divider />
        <Form
          layout="vertical" onFinish={onClickFunc}>
          <Form.Item
            label="email"
            name="email"
            rules={rules}
          ><Input placeholder="email" /></Form.Item>
          <Form.Item
            rules={rules}
            label="password"
            name="password"
          ><Input type="password" placeholder="password" /></Form.Item>
          <Button type="primary" htmlType="submit" block> Signin</Button>
          <div className="mt-5 flex justify-center">
            <span>
              Don't have an account? <Link to="/register">Register</Link>
            </span>
          </div>
        </Form>

      </div>
    </div>
  );
}

export default Signin;