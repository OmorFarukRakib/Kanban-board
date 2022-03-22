type ADD_LIST_ActionType = {
    type: 'ADD_LIST', 
    payload: {
        id: number,
        title: string,
        cards: []
    }
}
type REMOVE_LIST_ActionType = {
    type: 'REMOVE_LIST',
    payload: number
}
type ADD_CARD_ActionType = {
    type: 'ADD_CARD',
    payload: {
        listID: number,
        newCardData: {
            id: number,
            title: string,
            lock: false
        }
    }
}

type REMOVE_CARD_ActionType = {
    type: 'REMOVE_CARD',
    payload: {
        listID : number,
        cardID : number
    }
}

type EXCHANGE_CARDS_ActionType = {
    type: 'EXCHANGE_CARDS',
    payload : {
        source: {
            cid: number,
            lid: number
        },
        target: {
            cid: number,
            lid: number
        }
    }
}

type EDIT_LIST_TITLE_ActionType = {
    type: 'EDIT_LIST_TITLE',
    payload: {
        lid: number,
        newTitle: string
    }
}

type CARD_LOCK_STATUS_CHANGE_ActionType = {
    type: 'CARD_LOCK_STATUS_CHANGE',
    payload: {
        lid: number,
        cid: number,
        lockStatus: boolean
    }
}

type EDIT_CARD_TITLE_ActionType = {
    type: 'EDIT_CARD_TITLE',
    payload: {
        lid: number,
        cid: number,
        newTitle: string
    }
}

export type ListState = {
        id: number,
        title: string,
        cards: {
            id: number,
            title: string,
            lock: boolean
        }[]
    }[]

  export type ListaActionType = ADD_LIST_ActionType | REMOVE_LIST_ActionType | ADD_CARD_ActionType | REMOVE_CARD_ActionType | EXCHANGE_CARDS_ActionType | EDIT_LIST_TITLE_ActionType | CARD_LOCK_STATUS_CHANGE_ActionType | EDIT_CARD_TITLE_ActionType

