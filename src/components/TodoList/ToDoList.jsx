import React from 'react';
import ToDoRow from './ToDoRow';

const ToDoList = ({list, selectedListId, categoryMap, setCategoryMap, setShowToDoListContextMenu, setContextInfo}) => {
  const toggleTodoAttribute = (changeItem, todo, cb) => {
    let find = categoryMap.get(todo.parentId);
    let obj = {};
    obj[changeItem] = null;

    if (find) {
      let findTodoIndex = find.todoList.findIndex(t => t.index === todo.index);
      if (findTodoIndex !== -1) {
        let findTodo = find.todoList[findTodoIndex];
        obj[changeItem] = !findTodo[changeItem];
        let newTodo = {...findTodo, ...obj};

        // todoList의 todo를 새 todo로 교체!
        let newTodoList = [...find.todoList];
        newTodoList.splice(findTodoIndex, 1, newTodo);

        let newMap = new Map(categoryMap);
        newMap.get(todo.parentId).todoList = newTodoList;
        setCategoryMap(newMap);
      }

      if (cb) cb();
    }
  };

  return list.map(todo => (
    <ToDoRow
      key={todo.index}
      selectedListId={selectedListId}
      todo={todo}
      categoryMap={categoryMap}
      setCategoryMap={setCategoryMap}
      setShowContextMenu={setShowToDoListContextMenu}
      setContextInfo={setContextInfo}
      toggleTodoAttribute={toggleTodoAttribute}
    />
  ));
};

export default ToDoList;
