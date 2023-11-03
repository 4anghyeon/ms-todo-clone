import style from './css/TodoListContainer.module.css';
import React from 'react';
import ContextMenu from '../Common/ContextMenu';

const TodoContextMenu = ({selectedListId, setCategoryMap, contextInfo, setShowContextMenu}) => {
  const onClickChangeName = () => {
    // 이름 변경을 하면 해당 목록 밑에 숨겨져 있던 input이 드러나게 한다.
    setCategoryMap(prev => {
      let newMap = new Map(prev);
      for (const element of newMap.values()) {
        element.isEdit = false;
      }

      let find = newMap.get(selectedListId);

      if (find) {
        find.isEdit = true;
        document.querySelectorAll('.list-item').forEach(elem => elem.classList.remove(style.selected));

        // input이 표시된 후 focus해야 하기 때문에 어쩔 수 없이 setTimeout걸음
        setTimeout(() => {
          const inputElem = document.getElementById(`input_${selectedListId}`);
          inputElem.value = find.name;
          inputElem.focus();
        });
      }
      return newMap;
    });
    setShowContextMenu(false);
  };

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
    ['⭐️ 중요로 표시', onClickChangeName],
    ['🗑️ 삭제', onClickDeleteTodo],
  ];

  return (
    <div className={style.contextMenuShadow + ' contextShadow'}>
      <ContextMenu setShowContextMenu={setShowContextMenu} contextInfo={contextInfo} menuList={menuList} />
    </div>
  );
};

export default TodoContextMenu;
