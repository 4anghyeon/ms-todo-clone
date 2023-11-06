# Microsoft To Do App Clone Web
MicroSoft To Do App을 참조하여 만든 To Do List 페이지.

## Deployment
배포된 사이트는 아래에서 확인이 가능하다.
https://ms-todo-clone-tan.vercel.app/

## 실행
```bash
yarn run start

# or

npm run start
```

## 주요 기능
### To Do Category
![](./public/help/usage1.gif)
- 오른쪽 클릭, 혹은 더블 클릭으로 Context Menu 오픈
- 목록 메뉴 추가
- 목록 메뉴 이름 변경
- 목록 메뉴 삭제

### To Do
![](./public/help/usage2.gif)
- To Do 추가
- To Do 삭제
- To Do 완료 체크
- To Do 중요 표시

### 중요
![](./public/help/usage3.png)
- To Do 목록 중 중요로 체크 한 것을 모아 봄

### 검색
![](./public/help/usage4.gif)
- 모든 목록 중 입력 키워드의 To Do를 검색

# 분리 컴포넌트
## `ContextMenu.jsx`
- To Do Category와, To Do 둘 다 Context Menu를 사용
- 공통 부분을 분리 후, Context Menu에 들어갈 목록만 전달하여 구현

## `CategoryContainer.jsx`
- To Do Category 부분이 반복적으로 사용 되어 분리

## `ToDoRow.jsx`
- To Do 부분이 반복적으로 사용 되어 분리