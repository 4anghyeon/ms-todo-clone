import React from 'react';
import style from './css/TodoRow.module.css';
import style2 from './css/TodoListContainer.module.css';
import {chooseBackground, chooseColor, LongTouchEvent} from '../../helpers/util';
import {IMPORTANT_HEADER_ID, IMPORTANT_ID, SEARCH_ID} from '../../helpers/common';

const ToDoRow = ({categoryMap, selectedListId, todo, setCategoryMap, setShowContextMenu, setContextInfo}) => {
  // 완료(isDone) 혹은 중요(star)를 toggle 한다.
  const toggleTodoAttribute = changeItem => {
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
    }
  };

  const handleClickCheckCircle = () => {
    toggleTodoAttribute('isDone');
  };

  const handleClickStar = event => {
    toggleTodoAttribute(IMPORTANT_ID);
  };

  // 컨텍스트 메뉴 오픈
  const handleRightClick = event => {
    event.preventDefault();
    setShowContextMenu(true);
    const rect = event.target.getBoundingClientRect();
    setContextInfo({listId: selectedListId, todo: todo, x: event.clientX - rect.x / 2, y: event.clientY - rect.y / 3});
  };

  const backgroundClass = chooseBackground(selectedListId === IMPORTANT_ID ? IMPORTANT_HEADER_ID : selectedListId);
  const colorClass = chooseColor(selectedListId);

  return (
    <div className={style.todo} onContextMenu={handleRightClick}>
      <div>
        <div
          className={`${style.checkCircle} ${style.circle} ${todo.isDone && style.doneCircle} ${
            todo.isDone && backgroundClass
          }`}
          onClick={handleClickCheckCircle}
        ></div>
        <div className={style.todoContent}>
          <span>{todo.content}</span>
          {(selectedListId === IMPORTANT_ID || selectedListId === SEARCH_ID) && (
            <span className={style2.subText}>{categoryMap.get(todo.parentId).name}</span>
          )}
        </div>
      </div>
      <div onClick={handleClickStar} className={`${todo.star ? style.stared : style.star} ${colorClass}`}></div>
    </div>
  );
};

export default ToDoRow;
