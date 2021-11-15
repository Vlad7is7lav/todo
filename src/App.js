import React from 'react';
import './sass/index.sass';
import InputArea from './components/InputArea';
import ListArea from './components/ListArea';
import { useSelector } from 'react-redux';
import { selectTodos } from './store/features/todoSlice';
import { styled } from 'styled-components';

function App() {
  const todos = useSelector(selectTodos)

  return (
    <>
      <InputArea></InputArea>
      <ListArea/>
    </>
  );
}

export default App;
