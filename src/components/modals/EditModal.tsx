import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "./EditModal.css";

type EditModalPropsType = {
  setOpenEditModal: (arg0: boolean) => void,
  existingTitle: string,
  updateFun: (arg0: string) => void
}


const EditModal = ({ setOpenEditModal, existingTitle, updateFun } :EditModalPropsType) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [listRenamedData, setListRenamedData] = useState(existingTitle);
  const [error, setError] = useState(false);

  const handleEditListTitleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (listRenamedData.trim().length === 0) {
      setError(true);
    } else {
      setListRenamedData((prev) => prev.trim());
      updateFun(listRenamedData);

      setOpenEditModal(false);
    }
  };
  const onInputEnterPress = (e : React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      btnRef.current?.click();
    }
  };
  return ReactDOM.createPortal(
    <>
      <div className="edit-modal-wrapper">
        <div
          className="edit-modal-backdrop"
          onClick={(e) => {
            setOpenEditModal(false);
            setListRenamedData(existingTitle);
          }}
        >
          <div
            className="edit-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              Do you want to edit: <br />
              {`${existingTitle.length > 100 ? existingTitle.substring(0, 100)+"..." : existingTitle}`} ?
            </div>
            <div className="edit-modal-rename-input-wrapper">
              <form onSubmit={e => handleEditListTitleSubmit(e)}>
                <textarea
                  onKeyDown={(e) => onInputEnterPress(e)}
                  className="edit-textarea-effect"
                  // className="effect-2"
                  autoFocus
                  onFocus={function(e) {
                    let val = e.target.value;
                    e.target.value = '';
                    e.target.value = val;
                  }}
                  placeholder="Rename"
                  required
                  value={`${listRenamedData}`}
                  onChange={(e) => setListRenamedData(e.target.value)}
                  
                />
                <span className="focus-border"></span>
                <button ref={btnRef} type="submit" hidden>
                  Rename
                </button>
              </form>
              {error && (
                <p className="input-error-text">
                  Only white space cannot be the title. Please enter valid
                  title.
                </p>
              )}
            </div>
            <div className="edit-modal-confirmation-btn">
              <div
                className="edit-modal-OK-btn"
                onClick={() => {
                  btnRef.current?.click();
                }}
              >
                Rename
              </div>
              <div
                className="edit-modal-cancel-btn"
                onClick={(e) => {
                  setOpenEditModal(false);
                  setListRenamedData(existingTitle);
                }}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("edit-modal") as HTMLElement
  );
};

export default EditModal;
