import React, {useState} from 'react';
import style from './CategoryContainer.module.css';
import CategoryButtonContainer from './CategoryButtonContainer';
import CategoryListContainer from './CategoryListContainer';

const CategoryContainer = () => {
  const [categoryList, setCategoryList] = useState([{group: null, name: '알고리즘'}]);

  return (
    <div className={style.container}>
      {/* 1. 검색 */}
      <div>검색</div>
      {/* 2. 목록  */}
      <CategoryListContainer categoryList={categoryList} />
      {/* 3. 추가 버튼 */}
      <CategoryButtonContainer setCategoryList={setCategoryList} />
    </div>
  );
};

export default CategoryContainer;
