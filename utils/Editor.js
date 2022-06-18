import React,{useMemo, memo, useRef, useState, useCallback} from 'react'


import {Form, Button} from 'antd'
import dynamic from 'next/dynamic';
const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})


const Editor = () => {

  const [value, onChange] = useState('');
  const quillRef = useRef(); 
  
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ]


  
 
  return (
    <div>
    {Quill &&  <Quill
        ref={quillRef}
        theme="snow"
        placeholder="플레이스 홀더"
        modules={modules}
        formats={formats}
        value={value || ''}
        onChange={(content, delta, source, editor) => onChange(editor.getHTML())}  
      />}        
        
    </div>
  )
}
export default Editor;