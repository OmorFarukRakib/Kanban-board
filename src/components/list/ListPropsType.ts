export type ListPropsType = {
  list: {
        id: number,
        title: string,
        cards: {
            id: number,
            title: string,
            lock: boolean
        }[]
    },
    handleDragEnter: (arg0: number) => void,
    handleDragEnd: (arg0: number, arg1: number) => void,
    handleOnListDragEnter: (arg0: number) => void
}
