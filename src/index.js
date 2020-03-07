import React, { useState } from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import InitialData from "./InitialData";
import Column from "./Column";

const App = () => {
  const [dataSource, setDataSource] = useState(InitialData);

  const onDragEnd = result => {
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

    const column = dataSource.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {dataSource.columnOrder.map(columnId => {
        const column = dataSource.columns[columnId];
        const tasks = column.taskIds.map(taskId => dataSource.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
