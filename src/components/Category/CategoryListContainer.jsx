import React, {useState} from 'react';
import style from './css/CategoryListContainer.module.css';
import CategoryList from './CategoryList';
import ContextMenu from './ContextMenu';

// MainContainer -> CategoryMainContainer -> CategoryListContainer
const CategoryListContainer = ({categoryList, setCategoryList}) => {
  const [showContextMenu, setShowContextMenu] = useState(false);

  // 컨텍스트 메뉴가 표시될 정보를 담은 state
  const [contextInfo, setContextInfo] = useState({x: 0, y: 0});

  return (
    <>
      {showContextMenu && (
        <ContextMenu
          setCategoryList={setCategoryList}
          setShowContextMenu={setShowContextMenu}
          contextInfo={contextInfo}
        />
      )}
      <div className={style.container}>
        {categoryList.map(category => {
          return (
            <CategoryList
              key={category.id}
              category={category}
              setCategoryList={setCategoryList}
              setShowContextMenu={setShowContextMenu}
              setContextInfo={setContextInfo}
            />
          );
        })}
      </div>
    </>
  );
};

export default CategoryListContainer;
