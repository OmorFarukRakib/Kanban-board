import { useState, useContext, useRef } from "react";
import { ListContext } from "../../App";
import { FaPlusCircle } from "react-icons/fa";
import { ADD_LIST } from "../../reducer/actionType";
import "./AddNewList.css";
const AddNew = () => {
  const listContext = useContext(ListContext);
  const btnRef = useRef(null);

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState(false);

  const handleNewFormSubmit = (e) => {
    e.preventDefault();
    if (newTitle.trim().length === 0) {
      setError(true);
    } else {
      setNewTitle((prev) => prev.trim());
      let newList = {
        id: Date.now(),
        title: newTitle,
        cards: [],
      };
      listContext.listsDispatch({ type: ADD_LIST, payload: newList });
      setNewTitle("");
      setShowForm(false);
      setError(false);
    }
  };
  const onInputEnterPress = (e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      btnRef.current.click();
    }
  };
  return (
    <div className="AddNew-container">
      {showForm ? (
        <>
          <div className="Addnew-form-wrapper">
            <div className="input-effect input-area">
              <form onSubmit={handleNewFormSubmit}>
                <textarea
                  onKeyDown={(e) => onInputEnterPress(e)}
                  className="addNew-effect"
                  autoFocus
                  type="text"
                  required
                  onChange={(e) => setNewTitle(e.target.value)}
                  value={newTitle}
                  placeholder="New List Name"
                />
                <span className="focus-border">
                  <i></i>
                </span>
                <button ref={btnRef} type="submit" hidden>
                  add new
                </button>
              </form>
            </div>
          </div>
          {error && (
            <p className="input-error-text">
              Only white space cannot be the title.
              <br /> Please enter valid title.
            </p>
          )}
          <button
            className="Addnew-form-btn"
            onClick={(e) => btnRef.current.click()}
          >
            Create List
          </button>
          <button
            className="Addnew-form-btn cls-btn"
            onClick={() => {
              setShowForm(false);
              setNewTitle("");
              setError(false);
            }}
          >
            Close
          </button>
        </>
      ) : (
        <span className="tooltip">
          <FaPlusCircle
            onClick={() => setShowForm(true)}
            className="Addnew-form-open-btn"
          />
          <span className="tooltiptext">Add New List</span>
        </span>
      )}
    </div>
  );
};

export default AddNew;
