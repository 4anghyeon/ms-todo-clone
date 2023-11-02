import React, {useState} from 'react';
import style from './CategoryListContainer.module.css';
import CategoryList from './CategoryList';

const ContextMenu = ({contextInfo, setShowContextMenu}) => {
  const onClickShadow = event => {
    if ([...event.target.classList].includes('contextShadow')) setShowContextMenu(false);
  };

  const onClickContext = event => {
    event.preventDefault();
    setShowContextMenu(false);
  };

  return (
    <div className={style.contextMenuShadow + ' contextShadow'} onClick={onClickShadow} onContextMenu={onClickContext}>
      <div className={style.contextMenu} style={{top: contextInfo.y, left: contextInfo.x}}>
        Context Menu
      </div>
    </div>
  );
};

const CategoryListContainer = ({categoryList}) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextInfo, setContextInfo] = useState({x: 0, y: 0});

  return (
    <>
      {showContextMenu && <ContextMenu setShowContextMenu={setShowContextMenu} contextInfo={contextInfo} />}
      <div className={style.container}>
        {categoryList.map(category => {
          return (
            <CategoryList
              key={category.id}
              category={category}
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
