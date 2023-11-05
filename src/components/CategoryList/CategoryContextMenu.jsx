import style from './css/CategoryListContainer.module.css';
import React from 'react';
import ContextMenu from '../Common/ContextMenu';

const CategoryContextMenu = ({setCategoryMap, contextInfo, setShowContextMenu, setSelectedListId}) => {
  let listId = contextInfo.listId;

  const onClickChangeName = () => {
    // 이름 변경을 하면 해당 목록 밑에 숨겨져 있던 input이 드러나게 한다.
    setCategoryMap(prev => {
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
      return newMap;
    });
    setShowContextMenu(false);
  };

  const onClickDeleteCategory = () => {
    if (window.confirm('해당 목록이 영구적으로 삭제됩니다.')) {
      setCategoryMap(prev => {
        let newMap = new Map(prev);
        newMap.delete(listId);

        // 목록을 삭제하고 현재 선택된 목록을 0으로 초기화 한다.
        setSelectedListId(0);
        return newMap;
      });
    }
    setShowContextMenu(false);
  };

  const menuList = [
    ['🔖 이름 변경', onClickChangeName],
    ['🗑️ 삭제', onClickDeleteCategory],
  ];

  return <ContextMenu setShowContextMenu={setShowContextMenu} contextInfo={contextInfo} menuList={menuList} />;
};

export default CategoryContextMenu;
