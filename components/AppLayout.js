import PropTypes from 'prop-types';
import Link from 'next/link';

import styled from 'styled-components'
import { Menu, Input, Row, Col } from  'antd'
import { createGlobalStyle } from 'styled-components';
import Router, { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import UserForm from './UserForm'
import React, { useCallback, useMemo } from 'react';
import { BackTop } from 'antd';


const Logo = styled.div`
  margin:10px`
 
  const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  };

const AppLayout = ({children}) =>{ 
    
    const {user} = useSelector((state) => state.user)
    const items = [
         { label: <Link href="/notice"><a>공지사항</a></Link>,
         key: '/notice', },
        { label: <Link href="/board"><a>자유게시판</a></Link>,
        key: '/board' },
        { label: <Link href="/qna"><a>가치고민</a></Link>,
        key: '/qna' },
        { label: <Link href="/signup"><a>회원가입</a></Link>,
        key: '/signup' }
      ];
      console.log('applayout')
      return (
    
        <div style={{
          height: '200vh',
          padding: 8,
        }}> 
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
             <BackTop>
            <div style={style}>UP</div>
          </BackTop>
        </div>
       
        )

}
AppLayout.prototype ={
    children: PropTypes.node.isRequired
}

export default AppLayout;