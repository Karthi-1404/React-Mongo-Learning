import { Button, Table, message } from 'antd';
import React, { useEffect } from 'react'
import ProductsForm from './productsForm';
import {deleteProductApi, getProductApi} from '../../../api/product'
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../../redux/loaderSlice';
import moment from 'moment'



function Products() {
  const dispatch = useDispatch()
  const [SelectedData,setSelectedData]  = React.useState(null)
    const [showProductForm,setShowProductForm]  = React.useState(false)
    const [products,setproducts]  = React.useState([])
    const {user} = useSelector(state=>state.users)

    const getData = async() =>{
      try {
        dispatch(setLoader(true))
        const response = await getProductApi({seller:user._id})
        dispatch(setLoader(false))
        if(response.success){
          setproducts(response.products)
        }
      } catch (error) {
        dispatch(setLoader(false))
        message.success(error.message)
      }
      
    } 
    const deleteData = async(id) =>{
      try {
        dispatch(setLoader(true))
        const response = await deleteProductApi(id)
        dispatch(setLoader(false))
        if(response.success){
          message.success(response.message)
          getData()
        }else{
          message.error(response.message)
        }
      } catch (error) {
        dispatch(setLoader(false))
        message.error(error.message)
      }
      
    } 

    useEffect(()=>{
      getData()
    },[])
    const array = [
      {
        title:'Name',
        dataIndex:'name'
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
              return(
                <div className='flex gap-5'>
                  <i class="ri-pencil-line"
                  onClick={
                    ()=>{
                      setSelectedData(record);
                      setShowProductForm(true);
                      
    
                    }
                  }></i>
                 <i class="ri-delete-bin-5-line" 
                 onClick={
                  ()=>{
                    deleteData(record._id);
                    
  
                  }
                }></i>
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