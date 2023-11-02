import style from './css/CategoryListContainer.module.css';
import React from 'react';

const ContextMenu = ({setCategoryList, contextInfo, setShowContextMenu}) => {
  // context menu 바깥쪽 클릭할 경우 닫힘
  const onClickShadow = event => {
    if ([...event.target.classList].includes('contextShadow')) setShowContextMenu(false);
  };

  const onClickContext = event => {
    event.preventDefault();
    setShowContextMenu(false);
  };

  const onClickChangeName = () => {
    let listId = contextInfo.id;

    // 이름 변경을 하면 해당 목록 밑에 숨겨져 있던 input이 드러나게 한다.
    setCategoryList(prev => {
      let newList = prev.map(list => {
        list.isEdit = false;
        return list;
      });
      let find = newList.find(list => list.id === listId);
      if (find) {
        find.isEdit = true;
        document.querySelectorAll('.list-item').forEach(elem => elem.classList.remove(style.selected));

        // input이 표시된 후 focus해야 하기 때문에 어쩔 수 없이 setTimeout걸음
        setTimeout(() => {
          document.getElementById(`input_${listId}`).focus();
        });
      }
      return newList;
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
