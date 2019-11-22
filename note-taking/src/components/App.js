import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import TextEditorPage from './TextEditorPage';


const App = () => (
  <DndProvider backend={HTML5Backend}>
    <TextEditorPage />
  </DndProvider>
);

export default App;
