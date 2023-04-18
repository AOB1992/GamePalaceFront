import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


 export default function MyVerticallyCenteredModal(props) {
    return (

      <Modal  
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        primary
      >

        <Modal.Body >
          <div className='d-grid gap-2 col-4 mx-auto'>
          <p class="align-justify-center">
            PRODUCT SUCCESFULLY CREATED!
          </p></div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        
      </Modal>
    );
  }


