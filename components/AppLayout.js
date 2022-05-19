import PropTypes from 'prop-types';
import Link from 'next/link';

import styled from 'styled-components'
import { Menu, Input, Row, Col } from  'antd'
import { createGlobalStyle } from 'styled-components';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import UserForm from './UserForm'
const Global = createGlobalStyle`
.ant_row{
  margin-right: 0 !important;
  margin-left: 0 !important;
}
.ant_col:first-child{
  padding-left: 0 !important;
}

.ant-col:last-child{
  padding-right: 0 !important;
}
`
const Logo = styled.div`
  margin:10px`

const AppLayout =({children}) =>{ 

    const items = [
         { label: <Link href="/notice"><a>공지사항</a></Link>,
         key: '/notice', },
        { label: <Link href="/board"><a>자유게시판</a></Link>,
        key: '/board' },
       
        
      ];

    const router = useRouter();

    const {userInfo} = useSelector((state) => state.user)
      if(userInfo){
        console.log({userInfo})
        localStorage.setItem('user', JSON.stringify(userInfo))
        console.log(localStorage.getItem('user'))
      }
      return (
    
        <div> 
            <Logo>
                <h3>gachicoding</h3>
            </Logo>
            <div 
            style={{}}>
            <Menu 
            mode = "horizontal"
            items={items} />
               
            </div>
            <Row gutter={8}>
                <Col xs={24} md={4}>
                </Col>
                <Col xs={24} md={16}>
                {children}
                </Col>
                <Col xs={24} md={4}>
                <a href="https://www.naver.com" target="_blank" rel="noreferrer noopener">Made by gachi</a>
                </Col>
             </Row>
              
        </div>
       
        )

}
AppLayout.prototype ={
    children: PropTypes.node.isRequired
}

export default AppLayout;;