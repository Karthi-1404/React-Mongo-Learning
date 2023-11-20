import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loaderSlice';
import { getProductApi } from '../../api/product';
import { message } from 'antd';
import Divider from "../../components/divider";
import { useNavigate } from 'react-router-dom';
function Home() {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const [products,setProducts] = React.useState([])
  const [filter,setFilter] = React.useState({
    status:'approved'
  })
  const getData = async()=>{
    try {
      
      dispatch(setLoader(true))
      const response = await getProductApi(filter)
      dispatch(setLoader(false))
      if(response.success){
        setProducts(response.products)
        message.success(response.message)
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

  const {user}  = useSelector(state=>state.users)
    return (
      <div className='grid grid-cols-5 gap-2'>
        {products.map((product)=>{
          return (
            <div className='border border-gray-300 rounded border-solid flex flex-col gap-5 pb-2 cursor-pointer'
            onClick={()=>{navigate(`/product/${product._id}`)}}>
             <img src={product.images[0]}
             className='w-full h-40 object-cover'></img>

             <div className='px-2 flex flex-col gap-2'> 
               <h1 className='text-lg font-semibold'>{product.name}</h1>
               <text className='text-sm'>{product.description}</text>
               <Divider></Divider>
               <span className='text-xl font-semibold text-green-700'> ₹ {product.price}</span>
             </div>
            </div>
          )
        }
         
          )}
      </div>
    );
  }
  
  export default Home;