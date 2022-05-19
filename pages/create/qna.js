import React from 'react'
import {Form} from 'antd';
const CreateQna = () => {




  return (
    <div>
        <Form
         onFinish={onSubmitForm}
        >
        <label htmlFor="">타이틀</label>
             <input type="text" />

             <label htmlFor="">내용</label>
             <input type="text" />

             <label htmlFor="">에러코드</label>
             <input type="text" />
             
        <Button type="primary" htmlType="submit">글쓰기</Button>

        </Form>
    </div>
  )
}

export default CreateQna