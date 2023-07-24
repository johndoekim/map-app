import React, { useState, useEffect, useCallback } from 'react';
import CardComponent from './CardComponent';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const CardTest = () => {

    const history = useHistory();
    const [postsData, setPostsData] = useState([]);
    const [lastPostIdx, setLastPostIdx] = useState(null);
    const [ref, inView] = useInView({
        threshold: 0.3,
      });
    
    const [clickedPost_idx, setClickedPost_idx] = useState(null);


    const fetchPosts = () => {
        console.log('fechpost called')
        
        axios
          .get(
            `https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/list?limit=30&last_post_idx=${
              lastPostIdx || ""
            }`
          )
          .then((res) => {
            const jsonPostsData = res.data;
            console.log(res)


            const newPostsData = jsonPostsData.filter(
                (newPost) => !postsData.some((oldPost) => oldPost.post_idx === newPost.post_idx)
              );
              
        
              setPostsData((prevData) => {
                const updatedData = [...prevData, ...newPostsData];
                console.log('updatedData:', updatedData);
                return updatedData;
              });
                      
              if (newPostsData.length > 0) {
                setLastPostIdx(newPostsData[newPostsData.length - 1].post_idx);
              }
            })
            .catch((err) => {
              console.log(err);
            });
    };

    useEffect(() => {
        if (inView) {
          fetchPosts();
        }
      }, [inView]);





  const [expandedCardId, setExpandedCardId] = useState(null);

  const handlePostClick = (post_idx) => {
    setClickedPost_idx(post_idx);
    // history.push(`/board/${post_idx}`);
};    






  return (

    <>
    <div>
      {postsData.map((post) => (
        <CardComponent
          key={post.post_idx}
          title={post.title}
          content={post.content}
          nickname={post.nickname}
          created_at={post.created_at}
          post_idx={post.post_idx}
          image_path={`https://seoul-taroot.s3.ap-northeast-2.amazonaws.com/${post.image_path}`}
          onTitleClick={() => handlePostClick(post.post_idx)}
        />
      ))}


    </div>






    <div ref={ref}></div>



    </>
  );
};

export default CardTest;
