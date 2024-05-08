/* eslint-disable no-underscore-dangle */
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const cacheGlobal: any = global || globalThis || window;

export const GlobalDndContext = React.memo(({
  useDnd = true,
  children,
}: any) => {
  if (useDnd) {
    return <DndProvider key={1} context={cacheGlobal} backend={HTML5Backend}>{children}</DndProvider>;
  }
  return (
    <>
      {children}
    </>
  );
});

export default GlobalDndContext;