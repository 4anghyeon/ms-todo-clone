import React from 'react';
import style from './CategoryButtonContainer.module.css';
import {uuidv4} from '../../helpers/util';

class Group {
  constructor() {
    this.isOpen = false;
    this.children = [];
  }
}

const CategoryButtonContainer = ({setCategoryList}) => {
  const handleAttButton = isGroup => {
    setCategoryList(prev => {
      // 기본 제목의 목록 혹은 그룹을 만든다.
      // 계속 만들 경우 index가 증가하여 생성된다.
      // 목록의 id는 UUID로 생성된다.
      let defaultName = isGroup ? '제목 없는 그룹' : '제목 없는 목록';
      let index = 0;
      let filtered = [...prev].filter(p => p.name.indexOf(defaultName) !== -1);
      if (filtered.length > 0) {
        index += +filtered[filtered.length - 1].name.replace(defaultName, '') + 1 || 1;
      }

      return [
        ...prev,
        {id: uuidv4(), group: isGroup ? new Group() : null, name: `${defaultName} ${index === 0 ? '' : index}`},
      ];
    });
  };

  return (
    <div className={style.container}>
      <button onClick={handleAttButton.bind(null, false)}>+ 새 목록</button>
      <button onClick={handleAttButton.bind(null, true)}>새 그룹</button>
    </div>
  );
};

export default CategoryButtonContainer;
