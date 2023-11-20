import { Modal, Tabs,Form, Input,Row, Col,message, Button, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useRef } from 'react'
import {addProductApi, editProductApi} from "../../../../api/product";
import { setLoader } from "../../../../redux/loaderSlice";
import { useDispatch, useSelector } from 'react-redux';
import Images from './images';
import { Footer } from 'antd/es/layout/layout';

const testingArray = [
  {
    Label:'bill Available',
    name:'billavailable'
  },
  {
    Label:'warrenty Available',
    name:'warrentyavailable'
  },
  {
    Label:'accessories Available',
    name:'accessoriesavailable'
  },
  {
    Label:'box Available',
    name:'boxavailable'
  }
]
const rules = [
  {
    required:true,
    message:'required'
  }
]


function ProductsForm({
  showProductForm,
  setShowProductForm,
  SelectedData,
  getData
}) {
  const [selectedTab = '1',setSelectedTab ]=React.useState('1')
 const dispatch = useDispatch()
  const {user} = useSelector(state=>state.users)
  const onFinish = async (values)=>{
   try {
    
    dispatch(setLoader(true))
    let response = null
    if(SelectedData){
      response = await editProductApi(SelectedData._id,values)
    }else{
      values.seller = user._id
      values.status = 'pending'
      response = await addProductApi(values);
    }
    
    dispatch(setLoader(false))
    console.log('response',response);
    if(response.success){
     
      message.success(response.message)
      getData()
      setShowProductForm(false)
    }else{
      message.error(response.message)
    }
   } catch (error) {
    
   }
   
  }
      const useref =  React.useRef(null)
      useEffect(()=>{
        if(SelectedData){
          useref.current.setFieldsValue(SelectedData)
        }
      },[SelectedData])
    return (
      <div >
        <Modal
        title=''
        open={showProductForm}
        onCancel={()=>{setShowProductForm(false)}}
        centered
        width={1000}
        okText='save'
        onOk={()=>{useref.current.submit()}}
        {...(selectedTab === '2' && {footer : false})}
        >
          <div>
          <h1> {SelectedData ? "Edit Product": "Add Product"}</h1>
          <Tabs defaultActiveKey='1'
          activeKey={selectedTab}
          onChange={key=>{setSelectedTab(key)}}
          >
            <Tabs.TabPane tab='General' key='1'>
             <Form layout='vertical' ref={useref} onFinish={onFinish}
             
             >
                  <Form.Item label='Name' name='name' rules={rules}>
                    <Input type='text'/>
                  </Form.Item>
                  <Form.Item label='Description' name='description' rules={rules}>
                    <TextArea type='text'/>
                  </Form.Item>
                  <Row gutter={[16,16]}> 
                    <Col span={8}>
                     <Form.Item label='Price' name='price' rules={rules}>
                     <Input type='number'/>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                     <Form.Item label='Age' name='age' rules={rules}>
                     <Input type='number'/>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                     <Form.Item label='Category' name='category' rules={rules}>
                     <select name='' id=''>
                        <option value=''>select</option>
                        <option value='electronics'>Electronics</option>
                        <option value='fashion'>fashion</option>
                        <option value='home'>home</option>
                        <option value='sport'>sport</option>
                     </select>
                    </Form.Item>
                    </Col>

                  </Row>
                  <Row>
                    <div className='flex gap-10'>
                    {testingArray.map(item=>{
                      return <Form.Item label={item.Label} name={item.name} valuePropName='checked'>
                           <Input type='checkbox' value={item.name}
                           onChange={(e)=>{
                            useref.current.setFieldsValue({
                              [item.name]:e.target.checked,
                            })
                           }}
                           checked={
                               useRef.current?.getFieldValue(item.name)
                           }/>
                      </Form.Item>
                    })}
                    </div>
                  
                  </Row>
             </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Images' key='2'
            disabled={!SelectedData}
            >
              <Images SelectedData={SelectedData} setShowProductForm={setShowProductForm} getData={getData}/>

            </Tabs.TabPane>
         </Tabs>
          </div>
          
         
        </Modal>
        
      </div>
    );
  }
  
  export default ProductsForm;