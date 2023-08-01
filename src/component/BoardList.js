import { useState, useEffect } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';



const BoardList = () =>{


    const [postsData, setPostsData] = useState([]);
    const [lastPostIdx, setLastPostIdx] = useState(null);

    const [ref, inView] = useInView({
        threshold: 0.1,
      });
    
    const [clickedPostId, setClickedPostId] = useState(null);

    const handlePostClick = (postId) => {
        setClickedPostId(postId);
    };

    





    const fetchPosts = () => {
        console.log('fechpost called')
        
        axios
          .get(
            `https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/list?limit=20&last_post_idx=${
              lastPostIdx || ""
            }`
          )
          .then((res) => {
            const jsonPostsData = res.data;


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
    






    return(<>

<div className="container">
                <h2>게시판 목록</h2>
                <table className="posts_list">
                    <colgroup>
                        <col width="10%" />
                        <col width="*" />
                        <col width="15%" />
                        <col width="20%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">글번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성자</th>
                            <th scope="col">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            postsData.length === 0 && (
                                <tr>
                                    <td colSpan="4">게시글이 존재하지 않습니다.</td>
                                </tr>
                            )
                        }

                        {postsData.map(post => 
                        {
                            return(
                            <tr key={post.post_idx}>
                            <td>{post.post_idx}</td>
                            <td className={`title ${clickedPostId === post.post_idx ? 'clicked' : ''}`} 
                            onClick={() => handlePostClick(post.post_idx)}>
                            <Link to={`/board/${post.post_idx}`}>{post.title}</Link>
                            </td>
                            <td>{post.nickname}</td>
                            <td>{post.created_at}</td>
                        </tr>
                        
                        )})

                        
                            }
                    </tbody>
                    <div ref={ref}></div>

                </table>

            </div>
            

    

    
    
    </>)







}
export default BoardList;