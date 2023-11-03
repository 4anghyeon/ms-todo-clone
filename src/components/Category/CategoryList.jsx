import React from 'react';
import style from './css/CategoryList.module.css';

// 단순 목록 아이템
const List = ({listId, category, handleChange, handleBlur, handleKeyDown}) => {
  // 일반 텍스트와 input창을 동시에 두고 편집 여부에 따라 번갈아 보이게 함
  return (
    <>
      {category.isEdit ? (
        <div>
          <span className={style.icon}>📋</span>
          <input id={`input_${listId}`} onChange={handleChange} onBlur={handleBlur} onKeyDown={handleKeyDown} />
        </div>
      ) : (
        <div className={`${style.listItem}`}>
          <span>
            {' '}
            <span className={style.icon}>📋</span> {category.name}
          </span>
          <span className={style.count}>{category.todoList.length || ''}</span>
        </div>
      )}
    </>
  );
};

// 그룹 아이템
const Group = ({listId, group, category, handleChange, handleBlur, handleKeyDown}) => {
  return (
    <React.Fragment>
      {category.isEdit ? (
        <div>
          <span className={style.icon}>📂</span>
          <input id={`input_${listId}`} onChange={handleChange} onBlur={handleBlur} onKeyDown={handleKeyDown} />
        </div>
      ) : (
        <div>
          <span className={style.icon}>📂</span> {category.name}
        </div>
      )}
    </React.Fragment>
  );
};

// MainContainer -> CategoryMainContainer -> CategoryListContainer -> CategoryList
const CategoryList = ({listId, category, setCategoryMap, setShowContextMenu, setContextInfo, setSelectedListId}) => {
  // 선택된 요소에 클래스 추가
  const addSelectClass = target => {
    document.querySelectorAll('.list-item').forEach(elem => elem.classList.remove(style.selected));
    if (target.tagName !== 'LI') {
      target.closest('.list-item').classList.add(style.selected);
    } else target.classList.add(style.selected);
    setSelectedListId(listId);
  };

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

  const handleLeftClick = event => {
    addSelectClass(event.target);
  };

  // 컨텍스트 메뉴 오픈
  const handleRightClick = event => {
    event.preventDefault();
    addSelectClass(event.target);
    setShowContextMenu(true);
    setContextInfo({listId: listId, x: event.clientX, y: event.clientY});
  };

  return (
    <li className={style.container + ' list-item'} onClick={handleLeftClick} onContextMenu={handleRightClick}>
      {category.group ? (
        <Group
          listId={listId}
          group={category.group}
          category={category}
          handleBlur={handleBlur}
          handleKeyDown={handleKeyDown}
        />
      ) : (
        <List listId={listId} category={category} handleBlur={handleBlur} handleKeyDown={handleKeyDown} />
      )}
    </li>
  );
};

export default CategoryList;
