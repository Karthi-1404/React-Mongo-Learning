import { Button, Upload, message } from 'antd';
import React from 'react'
import { addImageApi, editProductApi } from '../../../../api/product';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../../../redux/loaderSlice';


function Images({SelectedData,setShowProductForm,getData}) {
    const dispatch = useDispatch()
    const [file = null, setfile] = React.useState(null)
    const [Images = [], setImages] = React.useState(SelectedData.images)
    const [previewImage = false, setpreviewImage] = React.useState(true)
    
    const upload = async()=>{
        try {
            dispatch(setLoader(true))
            const formdata = new FormData()
            formdata.append('file',file)
            formdata.append('productId',SelectedData._id)
            console.log('formdata',formdata);
            const response = await addImageApi(formdata)
            dispatch(setLoader(false))
            if(response.success){
                message.success(response.message)
                setImages([...Images,response.image])
                setpreviewImage(false)
                setfile(null)
                
                getData()
            }else{
                message.error(response.message)
            }
            
        } catch (error) {
            dispatch(setLoader(false))
            message.error(error.message)
        }
       
    }
    const deleteImage = async(image)=>{
        try {
            dispatch(setLoader(true))
         const filteredImage = Images.filter(img => img != image)
        const response = await editProductApi(SelectedData._id,{images:filteredImage})
        dispatch(setLoader(false))
        if(response.success){
            message.success(response.message) 
            console.log('response product',response);
            setImages(response.product.images)          
            getData()
        }else{
            message.error(response.message)
        }
        } catch (error) {
            dispatch(setLoader(false))
            message.error(error.message) 
        }
        
    }
    return (
        <div >
            <div className='flex gap-5 mb-5'>{Images.map(image=>{
                    return (
                        <div className='flex gap-2 border border-solid border-gray-300 rounded p-2 items-end'> <img className='h-20 w-20 object-cover' src={image}></img> 
                        <i class="ri-delete-bin-5-line" 
                 onClick={
                  ()=>{
                    deleteImage(image)
                  }
                }></i></div>
                    )
                })}</div>
            <Upload listType='picture' 
            beforeUpload={()=>false}
             onChange={
                (info)=>
                {
                setfile(info.file)
                setpreviewImage(true)
            }} 
                
                showUploadList={previewImage}>
                    
                <Button type='dashed'>
                    Add Product
                </Button>
            </Upload>
            

                
                

          <div className='flex justify-end gap-5 mt-5' > <Button type='default' onClick={()=>{setShowProductForm(false)}}>
            cancel
            </Button><Button type='primary' disabled={!file} onClick={upload}>
            Upload
            </Button></div> 
        </div>
    );
}

export default Images;