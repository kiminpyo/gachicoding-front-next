import PropTypes from 'prop-types';
import Link from 'next/link';

import styled from 'styled-components'
import { Menu, Input, Row, Col } from  'antd'
import { createGlobalStyle } from 'styled-components';
import Router, { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import UserForm from './UserForm'
import React from 'react';



const Logo = styled.div`
  margin:10px`

const AppLayout = ({children}) =>{ 

    const {user} = useSelector((state) => state.user)
    const items = [
         { label: <Link href="/notice"><a>공지사항</a></Link>,
         key: '/notice', },
        { label: <Link href="/board"><a>자유게시판</a></Link>,
        key: '/board' },
       
        
      ];



  
      return (
    
        <div> 
            <Logo>
                <h3><Link href="/">Gachicoding</Link></h3>
            </Logo>
            <div 
            >
            <Menu 
            mode = "horizontal"
            items={items} />
               
            </div>
            <Row gutter={8}>
                <Col xs={24} md={4}>
                  {user && user ? <UserForm/> :<LoginForm />}
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

export default AppLayout;