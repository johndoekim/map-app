import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Paper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  borderRadius: "16px",
  display: "flex",
  maxWidth: "420px",
  minWidth: "320px",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
}));

const Icon = styled(CheckCircleOutlineIcon)(({ theme }) => ({
  fontSize: "80px",
  color: theme.palette.success.main,
}));

const Message = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  textAlign: "center",
}));

const StyledButton = styled(Button)({
  minWidth: "100%",
});

const CloseButton = styled(CloseIcon)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.grey[500],
  cursor: "pointer",
}));

const SuccessModal = (props) => {
  const { open, message, onClose } = props;

  return (
    <Container>
      <StyledModal
        open={open}
        onClose={onClose}
        disableBackdropClick
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper>
            <Icon />
            <Message variant="h5">{message}</Message>
            <StyledButton variant="contained" color="primary" onClick={onClose}>
              확인
            </StyledButton>
            <CloseButton onClick={onClose} />
          </Paper>
        </Fade>
      </StyledModal>
    </Container>
  );
};

SuccessModal.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SuccessModal;
