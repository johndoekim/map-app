import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button'; 
import styled from 'styled-components';
import { useConfirm } from "material-ui-confirm";
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const CardComponent = ({
  title,
  content,
  image_path,
  nickname,
  post_idx,
  user_idx,
  created_at,
  onTitleClick,
  onEdit
}) => {


  const confirm = useConfirm();


  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEditClick = () => {
    onEdit(post_idx);
  };




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



  //alert 관련
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  



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
            {image_path && <CardMedia component="img" alt="" height="auto" image={image_path} />}
            <ContentTypography paragraph>{content}</ContentTypography>
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




    </StyledCard>
  );
};

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
