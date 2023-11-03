import React from 'react';
import style from './css/ContextMenu.module.css';

const ContextMenu = ({setShowContextMenu, contextInfo, menuList}) => {
  // context menu 바깥쪽 클릭할 경우 닫힘
  const onClickShadow = event => {
    if ([...event.target.classList].includes('contextShadow')) setShowContextMenu(false);
  };

  const onClickContext = event => {
    event.preventDefault();
    setShowContextMenu(false);
  };

  return (
    <div className={style.contextMenuShadow + ' contextShadow'} onClick={onClickShadow} onContextMenu={onClickContext}>
      <ul className={style.contextMenu} style={{top: contextInfo.y, left: contextInfo.x}}>
        {menuList.map(li => {
          return (
            <li key={li[0]} onClick={li[1]}>
              {li[0]}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContextMenu;
