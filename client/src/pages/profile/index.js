import React from 'react'
import {Tabs} from 'antd'
import Products from './products'

function Profile() {
    return (
      <div >
        <Tabs defaultActiveKey='1'>
          <Tabs.TabPane tab='products' key='1'>
              <Products/>
          </Tabs.TabPane>
          <Tabs.TabPane tab='bids' key='2'>
              {/* <h1>bids</h1> */}
          </Tabs.TabPane>
          <Tabs.TabPane tab='General' key='3'>
              {/* <h1>General</h1> */}
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
  
  export default Profile;