import { useContext, useRef, useState } from "react";
import { ListContext } from "../../App";
import { REMOVE_CARD, EDIT_CARD_TITLE, CARD_LOCK_STATUS_CHANGE } from "../../reducer/actionType";
import { CardPropsType } from './CardPropsType'
import DeleteModal from "../modals/DeleteModal";
import EditModal from "../modals/EditModal";
import { HiDotsVertical } from "react-icons/hi";
import { FaLock, FaUnlock } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";

import "./Card.css";


const Card = ({ card, listID, handleDragEnter, handleDragEnd } : CardPropsType) => {
  const listContext = useContext<any>(ListContext);
  const cardRef = useRef(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleDeleteCard = () => {
    listContext.listsDispatch({
      type: REMOVE_CARD,
      payload: { listID, cardID: card.id },
    });
    setOpenDeleteModal(false)
  };

  

  const handleEditTitle = (newTitle : string) => {
    listContext.listsDispatch({
      type: EDIT_CARD_TITLE,
      payload: { lid: listID, cid: card.id, newTitle },
    });
  };
  const handleLockUnlockCard = () => {
    listContext.listsDispatch({
      type: CARD_LOCK_STATUS_CHANGE,
      payload: { lid: listID, cid: card.id, lockStatus: card.lock },
    });
  };

  return (
    <>
      <div
        ref={cardRef}
        className={`card-container ${!card.lock ? "cursor-grab" : ""}`}
        draggable={!card.lock}
        
        onDragEnd={(evt) => {
          evt.dataTransfer.dropEffect = "move";
          if (card.lock) {
            return;
          } else {
            handleDragEnd(card.id, listID);
          }
        }}
        onDragEnter={(evt) => {
          evt.preventDefault();
          evt.dataTransfer.dropEffect = "move";
          handleDragEnter(card.id);
        }}
      >
        <div
          className={`Card-title-wrapper ${!card.lock ? "cursor-grab" : ""}`}
        >
          <div
            className={`Card-tittle-lock-wrapper ${
              !card.lock ? "cursor-grab" : ""
            }`}
            onDoubleClick={(e) => setOpenEditModal(true)}
          >
            {card.lock ? <FaLock /> : null}

            {card.title}
          </div>
          
          <div className="dropdown">
            <span className="dropbtn">
              <HiDotsVertical className="Card-option-dropdown-btn" />
            </span>
            <div className="dropdown-content">
              <div onClick={(e) => setOpenEditModal(true)}>
                <MdDriveFileRenameOutline />
                &nbsp;&nbsp; Rename
              </div>
              <div onClick={(e) => setOpenDeleteModal(true)}>
                <RiDeleteBinLine />
                &nbsp; &nbsp; Delete
              </div>
              <div onClick={(e) => handleLockUnlockCard()}>
                {card.lock ? <FaUnlock /> : <FaLock />}&nbsp;&nbsp;
                {`${card.lock === true ? "Unlock" : "Lock"}`}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openDeleteModal && (
        <DeleteModal
          closeModal={setOpenDeleteModal}
          data={card.title}
          okFunction={handleDeleteCard}
        />
      )}
      {openEditModal && (
        <EditModal
          setOpenEditModal={setOpenEditModal}
          existingTitle={card.title}
          updateFun={handleEditTitle}
        />
      )}
    </>
  );
};

export default Card;
