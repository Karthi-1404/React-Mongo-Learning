import { Button, Table, message } from 'antd';
import React, { useEffect } from 'react'
import ProductsForm from '../../profile/products/productsForm/index';
import {editProductStatusApi, getProductApi} from '../../../api/product'
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../../redux/loaderSlice';
import moment from 'moment'



function Products() {
  const dispatch = useDispatch()
  const [SelectedData,setSelectedData]  = React.useState(null)
    const [showProductForm,setShowProductForm]  = React.useState(false)
    const [products,setproducts]  = React.useState([])
    const {user} = useSelector(state=>state.users)
    const changeStatus = async(id,status)=>{
      try {
        dispatch(setLoader(true))
        const response = await editProductStatusApi(id,{status})
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
        const response = await getProductApi(null)
        dispatch(setLoader(false))
        if(response.success){
          setproducts(response.products)
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
        title:'Product',
        dataIndex:'name'
      },
      {
        title:'seller',
        dataIndex:'name',
        render:(text,record)=>{
          return record.seller.name
        }
      },
      {
        title:'Description',
        dataIndex:'description'
      },
      {
        title:'Price',
        dataIndex:'price'
      },
      {
        title:'Category',
        dataIndex:'category'
      },
      {
        title:'Age',
        dataIndex:'age'
      },
      {
        title:'Status',
        dataIndex:'status'
      },
      {
        title:'Added On',
        dataIndex:'addedOn',
        render:(text,record)=>{return moment(record.createdAt).format('YYYY-MM-DD HH:MM A')}
      },
      {
        title:'Action',
        dataIndex:'action',
        render:(text,record)=>{
          const status = record.status
              return(
                <div className='flex gap-5'>
                  {status == 'pending' && 
                   ( <span className='underline cursor-pointer' onClick={()=>{
                    changeStatus(record._id,'approved')
                   }}>Approve</span>)}
                    {status == 'pending' && 
                   ( <span className='underline cursor-pointer' onClick={()=>{
                    changeStatus(record._id,'rejected')
                   }} >Reject</span>)}
                   {status == 'approved' && 
                   ( <span className='underline cursor-pointer' onClick={()=>{
                    changeStatus(record._id,'blocked')
                   }}>Block</span>)}
                   {status == 'blocked' && 
                   ( <span className='underline cursor-pointer' onClick={()=>{
                    changeStatus(record._id,'approved')
                   }}>unblocked</span>)}

                </div>
              )
        }
      },
    
    ]
    return (
        
      <div >
        <div className='flex justify-end'>
        <Button type='default'
        onClick={()=>{
          setSelectedData(null)
          setShowProductForm(true)
        }}
        >
            Add Product
       </Button>
        </div>
        <Table columns={array} dataSource={products}/>
        {showProductForm &&  <ProductsForm showProductForm={showProductForm} setShowProductForm={setShowProductForm} SelectedData={SelectedData} getData={getData}/> }
        
      </div>
    );
  }
  
  export default Products;