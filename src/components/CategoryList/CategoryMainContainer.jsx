import React from 'react';
import style from './css/CategoryMainContainer.module.css';
import CategoryButtonContainer from './CategoryButtonContainer';
import CategoryListContainer from './CategoryListContainer';
import StarCategoryContainer from './Star/StarCategoryContainer';
import SearchMainContainer from './Search/SearchMainContainer';

// MainContainer -> CategoryMainContainer
const CategoryMainContainer = ({setSearchState, categoryList, setCategoryMap, setSelectedListId}) => {
  return (
    <div className={style.container}>
      {/* 1. 검색 */}
      <SearchMainContainer setSearchState={setSearchState} setSelectedListId={setSelectedListId} />
      {/* 2. 중요 */}
      <StarCategoryContainer
        setSelectedListId={setSelectedListId}
        categoryList={categoryList}
        setSearchState={setSearchState}
      />
      {/* 3. 목록  */}
      <CategoryListContainer
        categoryList={categoryList}
        setCategoryMap={setCategoryMap}
        setSelectedListId={setSelectedListId}
        setSearchState={setSearchState}
      />
      {/* 4. 목록 추가 버튼 */}
      <CategoryButtonContainer setCategoryMap={setCategoryMap} />
    </div>
  );
};

export default CategoryMainContainer;
