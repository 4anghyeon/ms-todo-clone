import React, {useState} from 'react';
import style from './css/CategoryMainContainer.module.css';
import CategoryButtonContainer from './CategoryButtonContainer';
import CategoryListContainer from './CategoryListContainer';
import {uuidv4} from '../../helpers/util';

class Category {
  constructor(name, isGroup) {
    this.id = uuidv4();
    this.group = isGroup;
    this.name = name;
    this.isEdit = true;
  }
}

// MainContainer -> CategoryMainContainer
const CategoryMainContainer = () => {
  const [categoryList, setCategoryList] = useState([new Category('알고리즘')]);

  return (
    <div className={style.container}>
      {/* 1. 검색 */}
      <div>검색</div>
      {/* 2. 목록  */}
      <CategoryListContainer categoryList={categoryList} setCategoryList={setCategoryList} />
      {/* 3. 목록 추가 버튼 */}
      <CategoryButtonContainer setCategoryList={setCategoryList} />
    </div>
  );
};

export default CategoryMainContainer;
