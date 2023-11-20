import { Tabs } from 'antd';
import React, { useEffect } from 'react'
import Products from './products'
import Users from './products/users';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Profile() {
  const navigate = useNavigate()
  const {user} = useSelector((state)=>state.users)
  
  useEffect(()=>{
    if(user.role != 'admin'){
      navigate('/home')
    }
  },[])
    return (
      <div >
        <Tabs defaultActiveKey='1'>
          <Tabs.TabPane tab='products' key='1'>
              <Products/>
          </Tabs.TabPane>
          <Tabs.TabPane tab='user' key='2'>
              <Users/>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
  
  export default Profile;