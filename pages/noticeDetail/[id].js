import React, {useEffect, useCallback, useState, startTransition} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {END} from 'redux-saga';
import wrapper from '../../store/configureStore';
import axios from 'axios'
import { useRouter } from 'next/router';

import {List,  Comment , Button, Skeleton} from 'antd'
import AppLayout from '../../components/AppLayout';
import { BOARDS_DETAIL_REQUEST, BOARDS_REQUEST, BOARD_DELETE_REQUEST, BOARD_EDIT_REQUEST, NOTICELIST_REQUEST, NOTICE_DETAIL_REQUEST } from '../../reducers/post';
import BoardEditor from '../../components/BoardEditor';
import Link from 'next/link';
import MyButton from '../../components/MyButton';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import HashTag from '../../components/HashTag';
import CommentForm from '../../components/CommentForm';


const noticeDetail = () => {
    const [loading,setLoading] = useState(true);
    const [commentFormOpened, setCommentFormOpened] =useState(false)
    const dispatch = useDispatch();
    const router = useRouter();
    /* 게시판 번호불러오기 */
    const { id } = router.query;
    const {notice,tags}  = useSelector((state) => state.post);
    const {user} = useSelector((state) => state.user)
   const userEmail = user?.userEmail;
   console.log(userEmail)
   const noticeEmail = notice?.userEmail;
   console.log(noticeEmail)
    const style= {background:'lightcyan', display:'inline-block', margin:'10px', borderRadius:'10px', fontSize:'15px'}
    useEffect(()=>{
        dispatch({
            type: NOTICE_DETAIL_REQUEST,
            data: id
        })
       
    },[id])
    const styleButton ={color: 'red !important'}
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setLoading(false);
        },300)
        return () => clearTimeout(timer)
    },[])
  

     const onDeleteNotice = useCallback(()=>{
        
        const result = confirm('삭제하시겠습니까?')
        if(result){
            dispatch({
                type: BOARD_DELETE_REQUEST,
                data: id
            })       
        }else{
            return;
        }
    },[id]) 
 
    
            console.log(notice)
            console.log(user)
          return (   
       
            <AppLayout>
                <Skeleton
              loading={loading}>
                <div>
                    <label htmlFor="">제목:</label>
                    {notice && notice.boardTitle}
                </div> 
                
              {tags && 
              tags.map((v,i) => <HashTag key={i} data={v} style={style}/>)
              }
    
                <div>
                   <label htmlFor="">내용:</label>
                   <div dangerouslySetInnerHTML={ notice &&  {  __html: notice.boardContent }}/>
                
                    <div>
                        <MyButton onClick={() => setCommentFormOpened((prev) => !prev)} style={styleButton}text="댓글달기"/>
                    </div>
                    {commentFormOpened && 
                        <div>
                            <CommentForm data={commentFormOpened}/>
                            <List
                    /*            header={`${post.Comments.length}개의 댓글`} */
                            itemLayout ="horizontal"
                            /*  dataSource={post.Comments} */
                            /*    renderItem={(item)=>(
                                <li>
                                    <Comment
                                        author={item.User.nickname}
                                        avatar={ <Link href={`/user`}>
                                                <a ><Avatar>hi</Avatar></a>
                                            </Link>
                                            }
                                        content={item.content}
                                    />
                                    
                                    
                                </li>
                            )} */
    
                            />
                        </div>}    
                </div>
           
                {  noticeEmail === userEmail
                ?  
                <Link href={`/noticeEdit/${id}`} >
                     <MyButton text={'수정'} type={'positive'} data={notice}/>
                </Link>
                : null
                }
                   
               { noticeEmail === userEmail
               ?
                <MyButton onClick={onDeleteNotice} text={'삭제'} type={'negative'}/>
                : null
                }  
       
                </Skeleton>
            </AppLayout>
                )
  
          
        

     
     
       
   
 
 
  
}
/* context안에 store가 들어있다. */
export const getServerSideProps = wrapper.getServerSideProps((store)=> async({req}) => {
  
  const cookie = req ? req.headers.cookie : '';
  
  axios.defaults.headers.Cookie = '';
  /* 쿠키가 있고, 서버에 요청을 할 때만 넣는다. (다른사람의 내 쿠키 공유 문제 제거. 굉장히 중요하다) */
  if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({
        type: LOAD_USER_REQUEST
     }); 


  store.dispatch(END);
  await store.sagaTask.toPromise();
})
export default noticeDetail;