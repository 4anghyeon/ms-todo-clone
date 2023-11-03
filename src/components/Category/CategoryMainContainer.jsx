import React, {useState} from 'react';
import style from './css/CategoryMainContainer.module.css';
import CategoryButtonContainer from './CategoryButtonContainer';
import CategoryListContainer from './CategoryListContainer';

// MainContainer -> CategoryMainContainer
const CategoryMainContainer = ({categoryList, setCategoryMap, setSelectedListId}) => {
  return (
    <div className={style.container}>
      {/* 1. 검색 */}
      <div>검색</div>
      {/* 2. 목록  */}
      <CategoryListContainer
        categoryList={categoryList}
        setCategoryMap={setCategoryMap}
        setSelectedListId={setSelectedListId}
      />
      {/* 3. 목록 추가 버튼 */}
      <CategoryButtonContainer setCategoryMap={setCategoryMap} />
    </div>
  );
};

export default CategoryMainContainer;
