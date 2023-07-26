import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function SuccessModal({ isOpen, closeModal, children }) {
  const history = useHistory();

  const handleConfirmClick = () => {
    closeModal(); 
    history.push("/boardlist");

  };

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Paper
        elevation={2}
        sx={{
          position: "absolute",
          borderRadius: '12px',
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: '16px 32px 24px 32px',
          width: 400,
          maxWidth: "100%",
          maxHeight: "90%",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          boxShadow: `0px 2px 6px`,
          alignItems: 'center'

        }}
      >
        {children}
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirmClick}
          sx={{ alignSelf: "center", mt: 2 }}
        >
          확인
        </Button>
      </Paper>
    </Modal>
  );
}


export default SuccessModal;