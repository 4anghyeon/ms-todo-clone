import React from 'react';
import style from './css/Todo.module.css';

const TodoRow = ({categoryMap, selectedListId, todo, setCategoryMap, setShowContextMenu, setContextInfo}) => {
  const toggleTodoAttribute = changeItem => {
    let find = categoryMap.get(selectedListId);
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
        newMap.get(selectedListId).todoList = newTodoList;
        setCategoryMap(newMap);
      }
    }
  };
  const handleClickCheckCircle = () => {
    toggleTodoAttribute('isDone');
  };

  const handleClickStar = event => {
    toggleTodoAttribute('star');
  };

  // 컨텍스트 메뉴 오픈
  const handleRightClick = event => {
    event.preventDefault();
    setShowContextMenu(true);
    setContextInfo({listId: selectedListId, todo: todo, x: event.clientX, y: event.clientY});
  };

  return (
    <div className={style.todo} onContextMenu={handleRightClick}>
      <div>
        <div
          className={`${style.checkCircle} ${style.circle} ${todo.isDone && style.doneCircle}`}
          onClick={handleClickCheckCircle}
        ></div>
        <div className={style.todoContent}>
          <span>{todo.content}</span>
          {selectedListId === 'star' && <span className={style.subText}>{categoryMap.get(todo.parentId).name}</span>}
        </div>
      </div>
      <div onClick={handleClickStar} className={`${todo.star ? style.stared : style.star}`}></div>
    </div>
  );
};

export default TodoRow;
