import { useState, useContext, useRef } from "react";
import { ListContext } from "../../App";
import { ADD_CARD } from "../../reducer/actionType";
import "./AddNewCard.css";
const AddNewCard = ({ listID }) => {
  const btnRef = useRef(null);
  const listContext = useContext(ListContext);

  const [newCardData, setNewCardData] = useState("");
  const [error, setError] = useState(false);

  const handleNewFormSubmit = (e) => {
    e.preventDefault();
    if (newCardData.trim().length === 0) {
      setError(true);
    } else {
      setNewCardData((prev) => prev.trim());
      let newData = {
        id: Date.now(),
        title: newCardData,
        lock: false,
      };
      listContext.listsDispatch({
        type: ADD_CARD,
        payload: { listID, newCardData: newData },
      });

      setNewCardData("");
      setError(false);
    }
  };
  const onInputEnterPress = (e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      btnRef.current.click();
    }
  };
  return (
    <div>
      <div className="AddnewCard-form-wrapper ">
        <div className="input-effect input-area">
          <form onSubmit={handleNewFormSubmit}>
            <textarea
              onKeyDown={(e) => onInputEnterPress(e)}
              className="addNew-effect"
              type="text"
              required
              onChange={(e) => setNewCardData(e.target.value)}
              value={newCardData}
              placeholder=" + Add New Card"
            />
            <span className="focus-border">
              <i></i>
            </span>

            <button ref={btnRef} type="submit" hidden>
              Create Card
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
        Create Card
      </button>
    </div>
  );
};

export default AddNewCard;
