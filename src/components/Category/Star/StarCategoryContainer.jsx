import React from 'react';
import style from './css/StarCategoryContainer.module.css';
import common from '../css/CategoryCommon.module.css';

const StarCategoryContainer = ({setSelectedListId, categoryList}) => {
  const addSelectClass = target => {
    document.querySelectorAll('.list-item').forEach(elem => elem.classList.remove(common.selected));
    if (target.tagName !== 'LI') {
      target.closest('.list-item').classList.add(common.selected);
    } else target.classList.add(common.selected);
    setSelectedListId('star');
  };

  const handleLeftClick = event => {
    addSelectClass(event.target);
  };

  let staredCount = [...categoryList.values()]
    .map(c => c.todoList)
    .flat()
    .filter(c => c.star).length;

  return (
    <React.Fragment>
      <div onClick={handleLeftClick} className={`${style.container}`}>
        <li className={`list-item`}>
          <div className={style.spaceBetween}>
            <div>
              <span className={style.icon}>✩</span>
              <span>중요</span>
            </div>
            <span className={common.count}>{staredCount || ''}</span>
          </div>
        </li>
        <hr />
      </div>
    </React.Fragment>
  );
};

export default StarCategoryContainer;
