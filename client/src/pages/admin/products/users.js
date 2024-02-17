import { Button, Table, message } from 'antd';
import React, { useEffect } from 'react'
import ProductsForm from '../../profile/products/productsForm/index';
// import {editProductStatusApi, getProductApi} from '../../../api/product'
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../../redux/loaderSlice';
import moment from 'moment'
import { editUser, getallUser } from '../../../api/userAuth';



function Users() {
  const dispatch = useDispatch()
  const [SelectedData,setSelectedData]  = React.useState(null)
    const [showProductForm,setShowProductForm]  = React.useState(false)
    const [users,setusers]  = React.useState([])
    const {user} = useSelector(state=>state.users)
    const changeStatus = async(id,status)=>{
      try {
        dispatch(setLoader(true))
        const response = await editUser({status},id)
        dispatch(setLoader(false))
        if(response.success){
          message.success(response.message)
          getData()
        }else{
          throw new Error(response.message)
        }
      } catch (error) {
        dispatch(setLoader(false))
        message.error(error.message)
      }
    }

    const getData = async() =>{
      try {
        dispatch(setLoader(true))
        const response = await getallUser()
        console.log('response===',response);
        dispatch(setLoader(false))
        if(response){
            setusers(response.data.data.users)
        }
      } catch (error) {
        dispatch(setLoader(false))
        message.success(error.message)
      }
      
    } 

    useEffect(()=>{
      getData()
    },[])
    const array = [
      {
        title:'user',
        dataIndex:'name'
      },
      {
        title:'Email',
        dataIndex:'email',
      },
      {
        title:'Role',
        dataIndex:'role',
      },
      {
        title:'Status',
        dataIndex:'status',
      },
      {
        title:'created On',
        dataIndex:'createdAt',
        render:(text,record)=>{return moment(record.createdAt).format('YYYY-MM-DD HH:MM A')}
      },
      {
        title:'Action',
        dataIndex:'action',
        render:(text,record)=>{
          const status = record.status
              return(
                <div className='flex gap-5'>
                    {status == 'active' && <span className='underline cursor-pointer' onClick={()=>{changeStatus(record._id,'inactive')}}> InActive</span>}
                    {status == 'inactive' && <span className='underline cursor-pointer' onClick={()=>{changeStatus(record._id,'active')}}> Active</span>}

                </div>
              )
        }
      },
    
    ]
    return (
        
      <div >
        <div className='flex justify-end'>
        </div>
        <Table columns={array} dataSource={users}/>
        {showProductForm &&  <ProductsForm showProductForm={showProductForm} setShowProductForm={setShowProductForm} SelectedData={SelectedData} getData={getData}/> }
        
      </div>
    );
  }
  
  export default Users;