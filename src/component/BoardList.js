import { useState, useEffect } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';



const BoardList = () =>{


    const [postsData, setPostsData] = useState([]);
    const [lastPostIdx, setLastPostIdx] = useState(null);

    const [ref, inView] = useInView();
    const [clickedPostId, setClickedPostId] = useState(null);

    const handlePostClick = (postId) => {
        setClickedPostId(postId);
    };

    const fetchPosts = () => {
        axios
            .get(`https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/list?limit=8&last_post_idx=${lastPostIdx || ''}`)
            .then((res) => {
                console.log(res)
                const jsonPostsData = JSON.parse(res.data.body);
                setPostsData((prevData) => [...prevData, ...jsonPostsData]);


                // setLastPostIdx(jsonPostsData[jsonPostsData.length - 1].post_idx);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (postsData.length === 0) {
            fetchPosts();
        }
    }, [postsData.length]);

    useEffect(() => {
        if (inView) {
            fetchPosts();
        }
    }, [inView]);
;









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
                            <Link to={`/posts/${post.post_idx}`}>{post.title}</Link>
                            </td>
                            <td>{post.nickname}</td>
                            <td>{post.created_at}</td>
                        </tr>
                        
                        )})

                        
                            }
                    </tbody>
                </table>

                <div ref={ref}></div>
            </div>
            

    

    
    
    </>)







}
export default BoardList;