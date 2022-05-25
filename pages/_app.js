import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css'; 
import wrapper from '../store/configureStore';
import '../components/css/button.css'
import 'react-quill/dist/quill.snow.css';
function gachicoding({ Component }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>gachicoding</title>
      </Head>
      <Component />
    </>
  );
}

gachicoding.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export function reportWebVitals(metric) {
  console.log(metric);
}

export default wrapper.withRedux(gachicoding);