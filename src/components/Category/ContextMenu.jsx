import style from './css/CategoryListContainer.module.css';
import React from 'react';

const ContextMenu = ({setCategoryMap, contextInfo, setShowContextMenu}) => {
  // context menu 바깥쪽 클릭할 경우 닫힘
  const onClickShadow = event => {
    if ([...event.target.classList].includes('contextShadow')) setShowContextMenu(false);
  };

  const onClickContext = event => {
    event.preventDefault();
    setShowContextMenu(false);
  };

  const onClickChangeName = () => {
    let listId = contextInfo.listId;

    // 이름 변경을 하면 해당 목록 밑에 숨겨져 있던 input이 드러나게 한다.
    setCategoryMap(prev => {
      console.log(prev);
      let newMap = new Map(prev);
      for (const element of newMap.values()) {
        element.isEdit = false;
      }

      let find = newMap.get(listId);

      if (find) {
        find.isEdit = true;
        document.querySelectorAll('.list-item').forEach(elem => elem.classList.remove(style.selected));

        // input이 표시된 후 focus해야 하기 때문에 어쩔 수 없이 setTimeout걸음
        setTimeout(() => {
          const inputElem = document.getElementById(`input_${listId}`);
          inputElem.value = find.name;
          inputElem.focus();
        });
      }
      console.log(newMap);
      return newMap;
    });
    setShowContextMenu(false);
  };

  return (
    <div className={style.contextMenuShadow + ' contextShadow'} onClick={onClickShadow} onContextMenu={onClickContext}>
      <ul className={style.contextMenu} style={{top: contextInfo.y, left: contextInfo.x}}>
        <li onClick={onClickChangeName}>🔖 이름 변경</li>
        <li>🗑️ 삭제</li>
      </ul>
    </div>
  );
};

export default ContextMenu;
