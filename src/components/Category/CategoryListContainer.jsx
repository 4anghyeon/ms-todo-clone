import React, {useState} from 'react';
import style from './css/CategoryListContainer.module.css';
import CategoryList from './CategoryList';
import CategoryContextMenu from './CategoryContextMenu';

// MainContainer -> CategoryMainContainer -> CategoryListContainer
const CategoryListContainer = ({categoryList, setCategoryMap, setSelectedListId}) => {
  const [showCategoryContextMenu, setShowCategoryContextMenu] = useState(false);

  // 컨텍스트 메뉴가 표시될 정보를 담은 state
  const [contextInfo, setContextInfo] = useState({x: 0, y: 0});

  return (
    <>
      {showCategoryContextMenu && (
        <CategoryContextMenu
          setCategoryMap={setCategoryMap}
          setShowContextMenu={setShowCategoryContextMenu}
          setSelectedListId={setSelectedListId}
          contextInfo={contextInfo}
        />
      )}
      <div className={style.container}>
        {[...categoryList.entries()].map(entry => {
          let key = entry[0];
          let category = entry[1];
          return (
            <CategoryList
              key={key}
              listId={key}
              category={category}
              setCategoryMap={setCategoryMap}
              setShowContextMenu={setShowCategoryContextMenu}
              setContextInfo={setContextInfo}
              setSelectedListId={setSelectedListId}
            />
          );
        })}
      </div>
    </>
  );
};

export default CategoryListContainer;
