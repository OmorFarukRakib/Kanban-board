import { useContext, useState } from "react";
import Card from "../card/Card";
import AddNewCard from "../addNewCard/AddNewCard";
import { ListContext } from "../../App";
import { EDIT_LIST_TITLE , REMOVE_LIST} from "../../reducer/actionType";
import { ListPropsType } from './ListPropsType'
import DeleteModal from "../modals/DeleteModal";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import EditModal from "../modals/EditModal";
import "./List.css";
 


const List = ({
  list,
  handleDragEnter,
  handleDragEnd,
  handleOnListDragEnter,
} : ListPropsType) => {

  const listContext = useContext<any>(ListContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const handleListDeleteBtn = () => {
    listContext.listsDispatch({ type: REMOVE_LIST, payload: list.id });
  };

  const handleListDragEnter = () => {
    handleOnListDragEnter(list.id);
  };

const handleEditTitle = (newTitle : string) => {
listContext.listsDispatch({
  type: EDIT_LIST_TITLE,
  payload: { lid: list.id, newTitle: newTitle },
});
}

  return (
    <>
      <div
        className="List-container scrollbar list-scrollbar"
        onDragEnter={(e) => handleListDragEnter()}
        onDragOver={(e) => e.preventDefault()}
      >
        <div
          className="List-title-wrapper"
          onDoubleClick={(e) => setOpenEditModal(true)}
        >
          <h3>{list.title}</h3>

          <div className="dropdown">
            <span className="dropbtn">
              <HiDotsVertical className="List-option-dropdown-btn" />
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
            </div>
          </div>
        </div>
        <hr />
        <div className="List-card-wrapper">
          {list.cards.map((card, indx) => (
            <Card
              key={indx}
              card={card}
              listID={list.id}
              handleDragEnter={handleDragEnter}
              handleDragEnd={handleDragEnd}
            />
          ))}
        </div>
        <AddNewCard listID={list.id} />
      </div>
      {openDeleteModal && (
        <DeleteModal
          closeModal={setOpenDeleteModal}
          data={list.title}
          okFunction={handleListDeleteBtn}
        />
      )}
      {openEditModal && (
        <EditModal
          setOpenEditModal={setOpenEditModal}
          existingTitle={list.title}
          updateFun={handleEditTitle}
        />
      )}
    </>
  );
};

export default List;
