import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from 'styled-components';


const CardComponent = ({ id, title, content, nickname, post_idx, created_at, onTitleClick }) => {
  return (
    <StyledCard>

    <Card sx={{ minWidth: 300, marginTop: 2, marginBottom: 2 }}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Box>
              <Typography variant="subtitle2" gutterBottom>{post_idx}</Typography>
              <Typography variant="h5" component="div" style={{cursor:'pointer'}}onClick={onTitleClick}>{title}</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" align="right">작성자: {nickname}</Typography>
            <Typography variant="body2" align="right">작성 시각: {created_at}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </StyledCard>
  );
};




const StyledCard = styled(Card)`
  width: 100%;
  max-width: 800px;
  margin: 1rem auto;
  @media (max-width: 600px) {
    margin: 0.5rem;
  }
`;

export default CardComponent;


