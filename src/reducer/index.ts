
import { ADD_LIST, REMOVE_LIST, ADD_CARD, REMOVE_CARD , 
    EXCHANGE_CARDS, EDIT_LIST_TITLE, EDIT_CARD_TITLE, CARD_LOCK_STATUS_CHANGE} from './actionType'
import { ListState, ListaActionType } from './reducerPropsType'


export const reducer = (state: ListState, action: ListaActionType) => {
  switch (action.type) {
    case ADD_LIST:
      return [...state, action.payload];
    case REMOVE_LIST:
      return state.filter((list) => list.id !== action.payload);
    case ADD_CARD:
      let index = state.findIndex((obj) => obj.id === action.payload.listID);
      state[index].cards = [...state[index].cards, action.payload.newCardData];
      return [...state];
    case REMOVE_CARD:
      let listIndex = state.findIndex(
        (obj) => obj.id === action.payload.listID
      );
      state[listIndex].cards = state[listIndex].cards.filter(
        (cardItem) => cardItem.id !== action.payload.cardID
      );
      return [...state];
    case EXCHANGE_CARDS:
      let sourceListIndex = state.findIndex(
        (list) => list.id === action.payload.source.lid
      );
      if (sourceListIndex < 0) {
        return;
      }
      let sourceCardIndex = state[sourceListIndex].cards.findIndex(
        (cardItem) => cardItem.id === action.payload.source.cid
      );
      if (sourceCardIndex < 0) {
        return;
      }

      let targetListIndex = state.findIndex(
        (list) => list.id === action.payload.target.lid
      );
      if (targetListIndex < 0) {
        return;
      }
      let targetCardIndex = state[targetListIndex].cards.findIndex(
        (cardItem) => cardItem.id === action.payload.target.cid
      );
      if (targetCardIndex < 0) {
        targetCardIndex = 0;
        
      }
      const tempLists = [...state];
      const tempCard = tempLists[sourceListIndex].cards[sourceCardIndex];
      tempLists[sourceListIndex].cards.splice(sourceCardIndex, 1);
      tempLists[targetListIndex].cards.splice(targetCardIndex, 0, tempCard);
      return [...tempLists];
    case EDIT_LIST_TITLE:
      let listIndexForEdit = state.findIndex(
        (list) => list.id === action.payload.lid
      );
      state[listIndexForEdit].title = action.payload.newTitle;
      return [...state];
    case EDIT_CARD_TITLE:
      let listIndexForCardTitleEdit = state.findIndex(
        (list) => list.id === action.payload.lid
      );
      let cardIndexForCardTitleEdit = state[
        listIndexForCardTitleEdit
      ].cards.findIndex(
        (cardItem) => cardItem.id === action.payload.cid
      );
      state[listIndexForCardTitleEdit].cards[cardIndexForCardTitleEdit].title = action.payload.newTitle;
      return [...state]
      case CARD_LOCK_STATUS_CHANGE:
        let listIndexForLockStateChange = state.findIndex(
          (list) => list.id === action.payload.lid
        );
        let cardIndexForCardLockStateChange = state[
          listIndexForLockStateChange
        ].cards.findIndex((cardItem) => cardItem.id === action.payload.cid);
          state[listIndexForLockStateChange].cards[
            cardIndexForCardLockStateChange
          ].lock = !action.payload.lockStatus;
          return [...state]
    default:
      return state;
  }
};
