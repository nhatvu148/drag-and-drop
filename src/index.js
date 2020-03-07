import React, { useState } from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import InitialData from "./InitialData";
import Column from "./Column";

const Container = styled.div`
  display: flex;
`;

const App = () => {
  const [dataSource, setDataSource] = useState(InitialData);

  //   const onDragStart = () => {
  //     document.body.style.color = "orange";
  //     document.body.style.transition = "background-color 0.2s ease";
  //   };

  //   const onDragUpdate = update => {
  //     const { destination } = update;
  //     const opacity = destination
  //       ? destination.index / Object.keys(dataSource.tasks).length
  //       : 0;

  //     document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  //   };

  const onDragEnd = result => {
    // document.body.style.color = "inherit";
    // document.body.style.backgroundColor = "inherit";

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = dataSource.columns[source.droppableId];
    const finish = dataSource.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...dataSource,
        columns: {
          ...dataSource.columns,
          [newColumn.id]: newColumn
        }
      };

      setDataSource(newState);

      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    const newState = {
      ...dataSource,
      columns: {
        ...dataSource.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    setDataSource(newState);
  };

  return (
    <DragDropContext
      //   onDragStart={onDragStart}
      //   onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Container>
        {dataSource.columnOrder.map(columnId => {
          const column = dataSource.columns[columnId];
          const tasks = column.taskIds.map(taskId => dataSource.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
