import React, { useReducer } from 'react';
import { reducer } from './reducer';
import { initialState } from './data';
import ListContainer from './components/listContainer/ListContainer';
import Header from './components/header/Header';
import { ListState } from './reducer/reducerPropsType'

import './App.css';

export const ListContext = React.createContext<ListState | null | unknown>(null)

function App() {
  const [lists, dispatch] = useReducer<any>(reducer, initialState)
  return (
    <ListContext.Provider
      value={{ listsValue: lists, listsDispatch: dispatch }}
    >
      <div className="App">
        <Header/>
        <ListContainer/>
      </div>
    </ListContext.Provider>
  );
}

export default App;
