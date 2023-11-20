import React from "react";
import {Form, Input, Modal} from "antd";

function BitModel ({setShowBitForm,showBitForm,product,getData}){

    return (
        <div>
             <Modal
             onCancel={()=>{setShowBitForm(false)}}
             open={showBitForm}
             centered
             >
                <Form>
                <Form.Item label='Bid' name='bid'>
                    <Input type='text'/>
                  </Form.Item>
                </Form>

             </Modal>
        </div>
    )

}

export default BitModel