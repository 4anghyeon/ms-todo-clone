import React, {useState} from 'react';
import style from './CategoryContainer.module.css';
import CategoryButtonContainer from './CategoryButtonContainer';
import CategoryListContainer from './CategoryListContainer';

class Category {
  constructor(name, isGroup) {
    this.group = isGroup;
    this.name = name;
    this.isEdit = false;
  }
}

const CategoryContainer = () => {
  const [categoryList, setCategoryList] = useState([new Category('알고리즘')]);

  return (
    <div className={style.container}>
      {/* 1. 검색 */}
      <div>검색</div>
      {/* 2. 목록  */}
      <CategoryListContainer categoryList={categoryList} setCategoryList={setCategoryList} />
      {/* 3. 추가 버튼 */}
      <CategoryButtonContainer setCategoryList={setCategoryList} />
    </div>
  );
};

export default CategoryContainer;
