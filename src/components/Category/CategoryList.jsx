import React from 'react';
import style from './CategoryList.module.css';

const List = ({name}) => {
  return <React.Fragment>📋 {name}</React.Fragment>;
};

const Group = ({group, name}) => {
  return <React.Fragment>📂 {name}</React.Fragment>;
};

const handleLeftClick = event => {
  let target = event.target;
  document.querySelectorAll('.list-item').forEach(elem => elem.classList.remove(style.selected));
  target.classList.add(style.selected);
};

const CategoryList = ({category, setShowContextMenu, setContextInfo}) => {
  const handleRightClick = event => {
    event.preventDefault();
    console.log(event);
    setShowContextMenu(true);
    setContextInfo({x: event.clientX, y: event.clientY});
  };

  return (
    <li className={style.container + ' list-item'} onClick={handleLeftClick} onContextMenu={handleRightClick}>
      {category.group ? <Group group={category.group} name={category.name} /> : <List name={category.name} />}
    </li>
  );
};

export default CategoryList;
