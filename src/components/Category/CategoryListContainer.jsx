import React from 'react';
import style from "./CategoryListContainer.module.css"
import CategoryList from "./CategoryList";

const CategoryListContainer = ({categoryList}) => {
  return (
    <div className={style.container}>
      {categoryList.map(category => {
        return <CategoryList key={category.id} category={category} />
      })}
    </div>
  );
};

export default CategoryListContainer;
