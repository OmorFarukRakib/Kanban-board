import { useState, useContext } from 'react'
import List from '../list/List'
import AddNewList from '../addNewList/AddNewList'
import { ListContext } from '../../App'
import { EXCHANGE_CARDS } from '../../reducer/actionType'
import './ListContainer.css'

type targetCardType = {
  cid: number,
  lid : number
}
type SingleListState = {
        id: number,
        title: string,
        cards: {
            id: number,
            title: string,
            lock: boolean
        }[]
    }

const ListContainer = () => {
  const listContext = useContext<any>(ListContext);
  const [targetCard, setTargetCard] = useState<targetCardType | null>(null);
  const [targetList, setTargetList] = useState(0)

  const handleDragEnd = (cid: number, lid: number) => {
      listContext.listsDispatch({
        type: EXCHANGE_CARDS,
        payload: {
          source: {
            cid,
            lid,
          },
          target: {
            cid: targetCard?.cid,
            lid: targetList,
          },
        },
      });
  };
  const handleDragEnter = (cid : number) => {
    setTargetCard({ cid, lid: targetList });
  };
  const handleOnListDragEnter = (listID : number) => {
    setTargetList(listID);
  };


  return (
    <>
      <div className="ListContainer-container">
        {listContext.listsValue.map((list : SingleListState) => (
          <List
            key={list.id}
            list={list}
            handleDragEnter={handleDragEnter}
            handleDragEnd={handleDragEnd}
            handleOnListDragEnter={handleOnListDragEnter}
          />
        ))}
        <AddNewList />
      </div>
    </>
  );
};

export default ListContainer