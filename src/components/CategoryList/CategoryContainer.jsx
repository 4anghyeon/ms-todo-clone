import React from 'react';
import style from './css/CategoryList.module.css';
import common from './css/CategoryCommon.module.css';

// 단순 목록 아이템
const List = ({listId, category, handleChange, setCategoryMap}) => {
  const handleBlur = event => {
    setCategoryMap(prev => {
      let newMap = new Map(prev);
      let find = newMap.get(listId);
      find.name = event.target.value;
      if (find) find.isEdit = false;
      return newMap;
    });
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') handleBlur(event);
  };

  return (
    <>
      {category.isEdit ? (
        <div>
          <span className={style.icon}>📋</span>
          <input id={`input_${listId}`} onChange={handleChange} onBlur={handleBlur} onKeyDown={handleKeyDown} />
        </div>
      ) : (
        <div className={`${common.listItem}`}>
          <div>
            <span className={style.icon}>📋</span> {category.name}
          </div>
          <span className={common.count}>{category.todoList.length || ''}</span>
        </div>
      )}
    </>
  );
};

// TODO: 그룹 아이템
const Group = ({listId, group, category, handleKeyDown}) => {
  return (
    <React.Fragment>
      {category.isEdit ? (
        <div>
          <span className={style.icon}>📂</span>
        </div>
      ) : (
        <div>
          <span className={style.icon}>📂</span> {category.name}
        </div>
      )}
    </React.Fragment>
  );
};

// 작업 추가 INPUT

// MainContainer -> CategoryMainContainer -> CategoryListContainer -> CategoryContainer
const CategoryContainer = ({
  listId,
  category,
  setCategoryMap,
  setShowContextMenu,
  setContextInfo,
  setSelectedListId,
  setSearchState,
}) => {
  // 선택된 요소에 클래스 추가
  const addSelectClass = target => {
    document.querySelectorAll('.list-item').forEach(elem => elem.classList.remove(common.selected));
    if (target.tagName !== 'LI') {
      target.closest('.list-item').classList.add(common.selected);
    } else target.classList.add(common.selected);
    setSelectedListId(listId);
  };

  const handleLeftClick = event => {
    addSelectClass(event.target);
    document.querySelector(`.${common.selectedBlur}`)?.classList.remove(common.selectedBlur);
    setSearchState(prev => {
      return {...prev, isFocus: false};
    });
  };

  // 컨텍스트 메뉴 오픈
  const handleRightClick = event => {
    event.preventDefault();
    addSelectClass(event.target);
    setShowContextMenu(true);
    const rect = event.target.getBoundingClientRect();
    setContextInfo({listId: listId, x: event.clientX - rect.x, y: event.clientY - rect.y / 3});
  };

  return (
    <li
      className={style.container + ' list-item'}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
      onDoubleClick={handleRightClick}
    >
      {category.group ? (
        <Group listId={listId} group={category.group} category={category} />
      ) : (
        <List listId={listId} category={category} setCategoryMap={setCategoryMap} />
      )}
    </li>
  );
};

export default CategoryContainer;
