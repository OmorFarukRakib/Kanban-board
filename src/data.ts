export const initialState = [
  {
    id: Date.now() + 1,
    title: "TO DO",
    cards: [
      {
        id: Date.now() + 10,
        title: "Task 1",
        lock: true,
      },
      {
        id: Date.now() + 15,
        title: "Task 2",
        lock: false,
      },
    ],
  },
  {
    id: Date.now() + 2,
    title: "PENDING",
    cards: [
      {
        id: Date.now() + 30,
        title: "Task 3",
        lock: false,
      },
      {
        id: Date.now() + 40,
        title: "Task 4",
        lock: false,
      },
    ],
  },
];

