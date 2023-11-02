import React from 'react';
import style from "./CategoryList.module.css"

const List = ({name}) => {
  return <li>📋 {name}</li>
}

const Group = ({group, name}) => {
  return <li>📂 {name}</li>
}

const handleLeftClick = event => {
  let target = null;
  if (event.target.tagName === "UL") target = event.target;
  else if (event.target.tagName === "LI") target = event.target.parentNode;
  console.log(event.target.tagName)
  console.log(target)
  document.querySelectorAll(".list-item").forEach(elem => elem.classList.remove(style.selected))
  target.classList.add(style.selected);
}

const CategoryList = ({category}) => {

  return (
    <ul className={style.container + " list-item"} onClick={handleLeftClick}>
      {category.group ? <Group group={category.group} name={category.name} /> : <List name={category.name}/>}
    </ul>
  );
};

export default CategoryList;
