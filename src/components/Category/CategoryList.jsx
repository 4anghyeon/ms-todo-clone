import React from 'react';
import style from './css/CategoryList.module.css';

// 단순 목록 아이템
const List = ({category, setCategoryList, handleChange, handleBlur, handleKeyDown}) => {
  // 일반 텍스트와 input창을 동시에 두고 편집 여부에 따라 번갈아 보이게 함
  return (
    <React.Fragment>
      {category.isEdit ? (
        <div>
          📋
          <input
            id={`input_${category.id}`}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            value={category.name}
          />
        </div>
      ) : (
        <div className="list-item"> 📋 {category.name}</div>
      )}
    </React.Fragment>
  );
};

// 그룹 아이템
const Group = ({group, category, handleChange, handleBlur, handleKeyDown}) => {
  return (
    <React.Fragment>
      {category.isEdit ? (
        <div>
          📋
          <input
            id={`input_${category.id}`}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            value={category.name}
          />
        </div>
      ) : (
        <div className="list-item">📂 {category.name}</div>
      )}
    </React.Fragment>
  );
};

// MainContainer -> CategoryMainContainer -> CategoryListContainer -> CategoryList
const CategoryList = ({category, setCategoryList, setShowContextMenu, setContextInfo}) => {
  const listId = category.id;

  // 선택된 요소에 클래스 추가
  const addSelectClass = target => {
    document.querySelectorAll('.list-item').forEach(elem => elem.classList.remove(style.selected));
    if ([...target.classList].includes('list-item')) {
      if (target.tagName !== 'LI') target.parentNode.classList.add(style.selected);
      else target.classList.add(style.selected);
    }
  };

  const handleChange = event => {
    // 목록에서 선택된 카테고리를 찾아 값을 계속 바꿔줌... TODO: 이게 최선인가??
    setCategoryList(prev => {
      let find = prev.find(p => p.id === listId);
      if (find) find.name = event.target.value;
      return [...prev];
    });
  };

  const handleBlur = () => {
    setCategoryList(prev => {
      let find = prev.find(p => p.id === listId);
      if (find) find.isEdit = false;
      return [...prev];
    });
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') handleBlur();
  };

  const handleLeftClick = event => {
    addSelectClass(event.target);
  };

  // 컨텍스트 메뉴 오픈
  const handleRightClick = event => {
    event.preventDefault();
    addSelectClass(event.target);
    setShowContextMenu(true);
    setContextInfo({id: category.id, x: event.clientX, y: event.clientY});
  };

  return (
    <li className={style.container + ' list-item'} onClick={handleLeftClick} onContextMenu={handleRightClick}>
      {category.group ? (
        <Group
          group={category.group}
          category={category}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleKeyDown={handleKeyDown}
        />
      ) : (
        <List
          setCategoryList={setCategoryList}
          category={category}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleKeyDown={handleKeyDown}
        />
      )}
    </li>
  );
};

export default CategoryList;
