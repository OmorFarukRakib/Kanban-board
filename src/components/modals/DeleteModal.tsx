import  ReactDOM  from 'react-dom';
import './DeleteModal.css'

type DeleteModalPropsType = {
  closeModal: (arg0: boolean) => void,
  data: string,
  okFunction: () => void
}


const DeleteModal = ({ closeModal, data, okFunction} : DeleteModalPropsType) => {
  return ReactDOM.createPortal(
    <div className="delete-modal-wrapper">
      <div className="delete-modal-backdrop" onClick={(e) => closeModal(false)}>
        <div
          className="delete-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            Are You sure to delete <br />
            {`${data.length > 100 ? data.substring(0, 100)+"..." : data}`} ?
            
          </div>
          <div className="delete-modal-confirmation-btn">
            <div className="delete-modal-OK-btn" onClick={okFunction}>
              Delete
            </div>
            <div
              className="delete-modal-cancel-btn"
              onClick={(e) => closeModal(false)}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("delete-modal") as HTMLElement
  );
}

export default DeleteModal