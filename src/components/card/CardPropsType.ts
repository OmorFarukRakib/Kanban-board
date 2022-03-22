export type CardPropsType = {
  card: {
          id: number,
          title: string,
          lock: boolean
        },
  listID: number,
  handleDragEnter: (arg0: number) => void,
  handleDragEnd: (arg0: number, arg1: number) => void
}