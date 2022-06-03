import React,{useState, useCallback, useRef, useEffect} from 'react'
import AppLayout from '../components/AppLayout'

import { Form, Input, InputNumber, Button ,message, Upload} from 'antd';
import ImgCrop from 'antd-img-crop';
import { IMAGE_UPLOAD_REQUEST, SIGN_UP_CHECK_REQUEST, SIGN_UP_REQUEST } from '../reducers/post';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { replaceBasePath } from 'next/dist/server/router';
import { AlertOutlined } from '@ant-design/icons';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label}은 필수사항입니다!',
  types: {
    string : '${label}이 아니다',
    email: '${label}형식이 아닙니다.',
    number: '${label} is not a valid number!',
    text: '${label}형식이 아닙니다.',
    password: '${label}형식이 아닙니다.'
  },

};



const Signup = () => {
  const router = useRouter();
  const {emailCheck}  = useSelector((state) => state.post)
  const [ email, setEmail] = useState('')
  const  {img} =useSelector((state) => state.post)
  const   {logoutError} = useSelector((state) => state.post)
  const [checkEmail,setCheckEmail] = useState(false);
  const [fileList, setFileList] = useState([]);


  console.log("이메일 체크", emailCheck)
  const ref= useRef();

  const dispatch =useDispatch();
  console.log(img)
  const profile = img.map((v) => v);
  console.log(profile)
 
  const onChange = ({ fileList: newFileList }) => {
    console.log(fileList)
    setFileList(newFileList);
   
    if(fileList[0]){
      console.log(fileList[0].originFileObj)
     const formData = new FormData();
      formData.append('files', fileList[0].originFileObj);
      console.log(formData)
      dispatch({
        type: IMAGE_UPLOAD_REQUEST,
        data: formData,
        
      }) 
    }
    
  };
  const onPreview = async (file) => {
    let src = file.url;
    console.log(file)
    console.log(typeof file)
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  
      /* 회원가입 전송 */
      const onFinish = (values) => {
        
        console.log(values)
        if(checkEmail === false){
          return alert('이메일 중복체크를 해주세요')
        }else{
          if(profile[0]){
            dispatch({
              type: SIGN_UP_REQUEST,
              data: {
               userEmail: email,
               userName: values.data.userName,
               userNick: values.data.userNickname,
               userPassword: values.data.userPassword,
               userPicture:  profile[0]
       
              }
            })
          }else{
            dispatch({
              type: SIGN_UP_REQUEST,
              data: {
               userEmail: email,
               userName: values.data.userName,
               userNick: values.data.userNickname,
               userPassword: values.data.userPassword,
               userPicture: "aa"
       
              }
            })
          }
          alert('회원가입이 정상적으로 되었습니다')
         return  router.push('/')
        }
         
      
        
      };
  
        /* 중복여부 클릭시 */
      const onClickEmailCheck = () =>{ 
        if(email.trim() !== "" && email.includes("@")){
          console.log(checkEmail)
          console.log(emailCheck)
          setCheckEmail(true)
          dispatch({
            type: SIGN_UP_CHECK_REQUEST,
            data: email})
        }else{
          return alert('형식을 확인해주세요')
        }
     
    
      }
     
  return (
      <AppLayout>
      <div style={{ width:'60%',display:'flex', marginLeft:'20%', marginTop:'30px'}}>
        <div style={{width:'20%'}}>
          프로필사진 등록
          {fileList && fileList.length === 1
        ? <ImgCrop rotate>
        <Upload  
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}   
        >     
    
        </Upload>

      </ImgCrop>
        : <ImgCrop rotate>
      <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
            {fileList && '+ Upload'}
        </Upload>
    
      </ImgCrop>
      } 
        </div>
        <div style={{width:'60%'}}>
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
              
            <Form.Item
              name={['data', 'userEmail']}
              label="이메일"
            >
              <div style={{display:'flex'}}>
              <Input 
              id="userEmail" 
              value={email} 
              onChange={(e) => setEmail(e.target.value) }/>
              </div>
              <div>
                { emailCheck ? <div>가능</div> : emailCheck === null ? "": <div>불가능</div>}
              </div>
            </Form.Item>
            <Form.Item
              name={['data', 'userPassword']}
              label="비밀번호"
              rules={[
                {
                  required: true,
                  type: 'string'
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['data', 'userName']}
              label="이름"
              rules={[
                  {
                      required: true,
                      type:'string'
                  }
              ]}
          
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['data', 'userNickname']}
              label="닉네임"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Button id='checkButton' onClick={onClickEmailCheck}>중복여부</Button>
       
      </div>
      </AppLayout>

  )
}

export default Signup