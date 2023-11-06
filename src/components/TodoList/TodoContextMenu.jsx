import style from './css/TodoListContainer.module.css';
import React from 'react';
import ContextMenu from '../Common/ContextMenu';
import {IMPORTANT_ID} from '../../helpers/common';

const TodoContextMenu = ({selectedListId, setCategoryMap, contextInfo, setShowContextMenu, toggleTodoAttribute}) => {
  const onClickDeleteTodo = () => {
    if (window.confirm('해당 할 일이 영구적으로 삭제됩니다.')) {
      setCategoryMap(prev => {
        let newMap = new Map(prev);
        let todoList = newMap.get(selectedListId).todoList;
        newMap.get(selectedListId).todoList = todoList.filter(t => t.index !== contextInfo.todo.index);
        return newMap;
      });
    }
    setShowContextMenu(false);
  };

  const menuList = [
    [
      '️✅ 완료로 표시',
      toggleTodoAttribute.bind(null, `isDone`, contextInfo.todo, setShowContextMenu.bind(null, false)),
    ],
    [
      '⭐️ 중요로 표시',
      toggleTodoAttribute.bind(null, IMPORTANT_ID, contextInfo.todo, setShowContextMenu.bind(null, false)),
    ],
    ['🗑️ 삭제', onClickDeleteTodo],
  ];

  return <ContextMenu setShowContextMenu={setShowContextMenu} contextInfo={contextInfo} menuList={menuList} />;
};

export default TodoContextMenu;
