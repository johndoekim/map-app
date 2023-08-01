import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button'; 
import styled from 'styled-components';
import { useConfirm } from "material-ui-confirm";
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MapPolyLineForBoard from './MapPolyLineForBoard';
import { Input, TextField } from '@mui/material';
import { Box, CardContent, Typography, Divider, Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import SuccessModal from "./NotPushAlertModal";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useAuth from './useAuth';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';



const CardComponent = ({
  title,
  content,
  image_path,
  nickname,
  post_idx,
  user_idx,
  created_at,
  onTitleClick,
  onEdit,
  route_path
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { isLogin, refetch } = useAuth();

  const {register, handleSubmit, watch, formState: {errors}, setFocus} = useForm();




  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  

  const history = useHistory();
  const confirm = useConfirm();

  const [routeData, setRouteData] = useState()


  const [markerWayPoint, setMarkerWayPoint] = useState(null)


  console.log(markerWayPoint)




  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = async () => {
    await delay(100)
    setExpanded(!expanded);
  };

  const handleEditClick = () => {
    onEdit(post_idx);
  };





  const [comments, setCommnets] = useState([]);


  console.log(comments)





//댓글 작성

  const queryClient = useQueryClient();

  const commentSubmitMutation = useMutation(
    async (data) => {
      const body = {...data};
      const config = {
        headers: {
        'Authorization': sessionStorage.getItem('token'),
      }};
      console.log(body)

      const res = await axios.post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/comment', body, config)
      return res.data;
    },
    {onSuccess: () =>{
      queryClient.invalidateQueries('commentList')
    }
  }
  )

  const onSubmit = async (data) => {

    try{
      const config = {
        headers: {
        'Authorization': sessionStorage.getItem('token'),
      }};

      const body = {'content' : data.comment, 'post_idx' : post_idx}
      console.log(body)

      await commentSubmitMutation.mutateAsync(body)


      openModal();
    }
    catch(err){console.log(err)}
  }






//댓글 조회


const getComment = useQuery(
  'commentList',
  async () => {
    const res = await axios.get(`https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/${post_idx}/comment`);
    return res.data;
  }
);



//댓글 작성 후 리액트 쿼리 이용해서 리패치 해야할듯


useEffect(() => {
  if (getComment.isSuccess) {
    setCommnets(getComment.data);
  }
}, [getComment.isSuccess, expanded]);


//글 삭제 처리
  const handleDeleteClick = () => {
    const config = {
      headers: {
      'Authorization': sessionStorage.getItem('token'),
    }};

    const body = {'post_idx' : post_idx}


    confirm({description : "정말로 게시글을 삭제 하시겠습니까?"})
    .then(() => {
      axios
        .post('https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/board/delete', body, config)
        .then(res => {
          console.log(res);
          setSnackbarOpen(true);
          window.location.reload()

          
        });
    })
.catch(() => {
  console.log('back');
});}


//권한 확인 관련
  const [logineduserIdx, setLoginedUserIdx] = useState()
  const [loginednickname, setLoginedNickname] = useState()


  useEffect(() => {
    setLoginedNickname(sessionStorage.getItem('nickname'))
    setLoginedUserIdx(sessionStorage.getItem('idx'))
    
  },[logineduserIdx, loginednickname])



  //alert 처리
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  
  //라우트 데이터 처리
  useEffect(() =>{
    if (route_path){
      axios.get(`https://seoul-taroot.s3.ap-northeast-2.amazonaws.com/${route_path}`)
      .then(res => {
      console.log(res)
      setRouteData(res.data.body)
      setMarkerWayPoint(res.data.markerWayPoint)
    
    
    })
      .catch(err => console.log(err))
    }
  },[expanded])


  const CommentContentTypography = (props) => (
    <Typography {...props} component="span" variant="body2"/>
  );



  return (
    <StyledCard>
      <Card sx={{ minWidth: 300, marginTop: 2, marginBottom: 2 }}>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Box>
                <Typography variant="subtitle2" gutterBottom>{post_idx}</Typography>
                <Typography
                  variant="h5"
                  component="div"
                  style={{ cursor: 'pointer' }}
                  onClick={handleExpandClick}
                >
                  {title}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" align="right">작성자: {nickname}</Typography>
              <Typography variant="body2" align="right">작성 시각: {created_at}</Typography>

              {loginednickname === nickname && (
                <Box display="flex" justifyContent="flex-end" marginTop={1}>
                  <Button variant="outlined" color="primary" onClick={handleEditClick}>
                    수정
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteClick}
                    style={{ marginLeft: 8 }}
                  >
                    삭제
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {routeData && <MapPolyLineForBoard routeData={routeData} markerWayPoint={markerWayPoint}/>}
            {image_path && <CardMedia component="img" alt="" height="auto" image={image_path} />}
            <ContentTypography paragraph>{content}</ContentTypography>



       {/* 댓글 작성 */}
{/* 

{isLogin && (
        <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
       
        <TextField
          label="댓글 작성"
          placeholder="댓글을 입력해주세요."
          value={comment}
          onChange={handleCommentChange}
          fullWidth
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleCommentSubmit}
          style={{ marginLeft: 8 }}
        >
          등록
        </Button>

      </Box>)} */}

{isLogin && (
  <Box marginTop={2}>
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexGrow: 1 }}>
      <TextField
        label="댓글 작성"
        fullWidth
        type="text"
        placeholder="댓글을 입력해 주세요"
        {...register("comment", { required: true })}
      />

      <Button variant="outlined" style={{ marginLeft: 8 }}
          color="primary" type="submit" value="등록">등록</Button>
    </form>
    <Box marginTop={1}>
      <ErrorMessage>
      {errors.comment?.type === "required" && <p>필수 입력 항목입니다</p>}
      </ErrorMessage>
    </Box>
  </Box>
)}










{/* 댓글 조회 */}
{comments.map((comment) => (
  <Box key={comment.comment_idx} marginBottom={2}>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar>{comment.comment_user_nickname.charAt(0).toUpperCase()}</Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" component="span">
            {comment.comment_user_nickname}
          </Typography>
          <Typography component="span" color="textSecondary" style={{ margin: '0px 4px' }}>
            {' / '}
          </Typography>
          <Typography variant="body2" component="span" color="textSecondary">
            {comment.created_at}
          </Typography>
        </Box>
        <CommentContentTypography color="textPrimary" style={{ marginTop: 4 }}>
          {comment.content}
        </CommentContentTypography>
      </ListItemText>
    </ListItem>
    <Divider variant="inset" />
  </Box>
))}





          </CardContent>
        </Collapse>
      </Card>


{/* alert 처리 */}

      <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert onClose={handleCloseSnackbar} severity="success">
        게시글이 성공적으로 삭제되었습니다.
      </MuiAlert>
    </Snackbar>

{/* alert 처리 */}



{/* 모달 */}


<div>
      <SuccessModal
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <Box>
          <Typography variant="h6" component="h2">
            댓글 작성에 성공하였습니다
            </Typography>

        </Box>
      </SuccessModal>
    </div>





    </StyledCard>
  );
};



const ErrorMessage = styled.p`
  margin-top: 4px;
  font-size: 14px;
  color: red;
`;

const ContentTypography = styled(Typography)`
  white-space: pre-line;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 800px;
  margin: 1rem auto;
  box-shadow: 20px;
  @media (max-width: 600px) {
    margin: 0.5rem;
  }
`;




export default CardComponent;
