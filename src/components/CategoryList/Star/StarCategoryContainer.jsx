import React from 'react';
import style from './css/StarCategoryContainer.module.css';
import common from '../css/CategoryCommon.module.css';
import {IMPORTANT_ID} from '../../../helpers/common';

const StarCategoryContainer = ({setSelectedListId, categoryList, setSearchState}) => {
  const addSelectClass = target => {
    document.querySelectorAll('.list-item').forEach(elem => elem.classList.remove(common.selected));

    // li에만 selected css class가 들어가야 한다.
    // 따라서 클릭된 element가 li가 아니면 가장 가까운 li를 찾는다.
    if (target.tagName !== 'LI') {
      target.closest('.list-item').classList.add(common.selected);
    } else target.classList.add(common.selected);
    setSelectedListId(IMPORTANT_ID);
  };

  const handleLeftClick = event => {
    addSelectClass(event.target);
    document.querySelector(`.${common.selectedBlur}`)?.classList.remove(common.selectedBlur);

    // 중요 메뉴를 클릭했을 때 검색 Input이 focus해제 되었다는 것을 알린다.
    setSearchState(prev => {
      return {...prev, isFocus: false};
    });
  };

  // 중요로 표시된 개수 파악
  let staredCount = [...categoryList.values()]
    .map(c => c.todoList)
    .flat()
    .filter(c => c.star).length;

  return (
    <React.Fragment>
      <ul onClick={handleLeftClick} className={`${style.container}`}>
        <li className={`list-item`}>
          <div className={style.spaceBetween}>
            <div>
              <span className={style.icon}>✩</span>
              <span>중요</span>
            </div>
            <span className={common.count}>{staredCount || ''}</span>
          </div>
        </li>
      </ul>
      <hr className={style.hr} />
    </React.Fragment>
  );
};

export default StarCategoryContainer;
