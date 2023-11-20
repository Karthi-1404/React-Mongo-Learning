import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loaderSlice';
import {  getProductbyIdApi } from '../../api/product';
import { Button, Divider, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import BitModel from './bidModel';

function ProfileInfo (req){
     let navigate = useNavigate()
  const dispatch = useDispatch()
  const {id} = useParams()
  const [products,setProducts] = React.useState(null)
  const [imageIndex,setImageIndex] = React.useState(0)
  const [showBitForm,setShowBitForm] = React.useState(false)
  const getData = async()=>{
    try {
      
      dispatch(setLoader(true))
      const response = await getProductbyIdApi(id)
      dispatch(setLoader(false))
      console.log('productsproducts',response);
      if(response.success){
        setProducts(response.product)
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

    return(
        products && (<div>
            <div className='grid grid-cols-2 gap-5'>
                <div className='flex flex-col gap-5'>
                    <img src={products.images[imageIndex]}> 
                    </img>
                    <div className='flex gap-5'>
                      {
                        products.images.map((image,index)=>{
                          return (<img 
                            className={"w-20 h-20 object-cover rounded-md cursor-pointer "+
                            (products.images[imageIndex] === image ? "border-2 border-green-700 border-solid":"")
                            }
                          onClick={()=>{setImageIndex(index)}}
                          src={image}
                          > 
                          </img>)
                        })
                      }

                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                  <div className='flex flex-col'>
                    <h1 className='text-2xl text-orange-700'>{products.name}</h1>
                   <span className='mt-1'>$ {products.description}</span>
                  </div>
                  <Divider/>
                  <div className='flex flex-col'>
                    <h1 className='text-2xl text-orange-700'>Product Details </h1>
                    <div className='flex justify-between mt-2'>
                    <span>Price</span>
                    <span> $ {products.price}</span>
                    </div>
                    <div className='flex justify-between mt-2'>
                    <span>Category</span>
                    <span> {products.category}</span>
                    </div>
                    <div className='flex justify-between mt-2'>
                    <span>Bill Availibity</span>
                    <span> {products.billavailable ? 'yes':'no'}</span>
                    </div>
                    <div className='flex justify-between mt-2'>
                    <span>warrent Available</span>
                    <span>{products.warrentyavailable ? 'yes':'no'}</span>
                    </div>
                    <div className='flex justify-between mt-2'>
                    <span> box Available</span>
                    <span> {products.boxavailable ? 'yes':'no'}</span>
                    </div>
                  </div>
                  <Divider/>
                  <div className='flex flex-col'>
                  <h1 className='text-2xl text-orange-700'>Seller</h1>
                  <div className='flex justify-between mt-2'>
                  
                    <span>Name</span>
                    <span>{products.seller.name}</span>
                    </div>
                    <div className='flex justify-between mt-2'>
                    <span> box Available</span>
                    <span> {products.boxavailable ? 'yes':'no'}</span>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    
                    <div className='flex justify-between mt-2'>
                      
                      <h1 className='text-2xl text-orange-700'>Bids</h1>
                      <Button onClick={()=>{setShowBitForm(!showBitForm)}}>                     
                        Add Bids
                      </Button>
                      {
                      showBitForm && 
                      <BitModel setShowBitForm={setShowBitForm} showBitForm={showBitForm} product={products} getData={getData}/>}
                    </div>
                    
                  </div>
                    
                </div>

            </div>
        </div>)
    )
}

export default ProfileInfo