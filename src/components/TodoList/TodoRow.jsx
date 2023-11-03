import React from 'react';
import style from './css/Todo.module.css';

const TodoRow = ({categoryMap, selectedListId, todo, setCategoryMap, setShowContextMenu, setContextInfo}) => {
  const handleClickCheckCircle = () => {
    let find = categoryMap.get(selectedListId);
    if (find) {
      let findTodoIndex = find.todoList.findIndex(t => t.index === todo.index);
      if (findTodoIndex !== -1) {
        let findTodo = find.todoList[findTodoIndex];
        let newTodo = {...findTodo, isDone: !findTodo.isDone, test: true};

        // todoList의 todo를 새 todo로 교체!
        let newTodoList = [...find.todoList];
        newTodoList.splice(findTodoIndex, 1, newTodo);

        let newMap = new Map(categoryMap);
        newMap.get(selectedListId).todoList = newTodoList;
        setCategoryMap(newMap);
      }
    }
  };

  // 컨텍스트 메뉴 오픈
  const handleRightClick = event => {
    event.preventDefault();
    setShowContextMenu(true);
    setContextInfo({listId: selectedListId, todo: todo, x: event.clientX, y: event.clientY});
  };

  return (
    <div className={style.todo} onContextMenu={handleRightClick}>
      <div
        className={`${style.checkCircle} ${style.circle} ${todo.isDone && style.doneCircle}`}
        onClick={handleClickCheckCircle}
      ></div>
      <div>
        <span>{todo.content}</span>
      </div>
    </div>
  );
};

export default TodoRow;
