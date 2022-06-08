import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css'; 
import wrapper from '../store/configureStore';
import './style.css'
import 'react-quill/dist/quill.snow.css';
const Gachicoding =({ Component }) => {
  return (
    <>
      <Head>
      <link href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Yeon+Sung&display=swap" rel="stylesheet" />
        <meta charSet="utf-8" />
      </Head>
      <Component />
    </>
  );
}

Gachicoding.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export function reportWebVitals(metric) {
  console.log(metric);
}

export default wrapper.withRedux(Gachicoding);