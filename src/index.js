import React, { useState } from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import InitialData from "./InitialData";
import Column from "./Column";

const App = () => {
  const [dataSource, setDataSource] = useState(InitialData);

  const onDragEnd = result => {};

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
