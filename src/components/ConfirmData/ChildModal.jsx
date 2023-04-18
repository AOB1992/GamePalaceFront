import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const ChildModal = ({handleOnSubmit}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={handleOnSubmit}>Save Data</button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
      >
        <Box>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Tus datos estan correctos?
          </p>
          {/* <button onClick={handleOnSubmit}>Save</button> */}
        </Box>
      </Modal>
    </React.Fragment>
  );
}
