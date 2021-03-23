0. 꾸미는 것은 나중에 여유로울 때.

1. firebase에 userInfo라는 collection을 만들어서 sign up한 유저들의 정보를 저장해놓음. 여기에 저장되는 정보의 형식은 다음과 같다
- emailAddress: 이메일 주소 저장 
- password: 비밀번호
- firstName: 성
- lastName: 이름
- nickName: 닉네임. 실제 채팅에서 보일 이름
- uid: 각 유저의 고유 식별자

2. 로그인 한 상태로 채팅을 치면 '닉네임: 내용'의 형식으로 글이 나옴. 만약 로그인이 되어있지 않으면 닉네임은 default로 'Anonymous'로 설정

3. 유저가 채팅을 친 순서대로 채팅이 정렬되도록 함. 방법은 chat collection의 각 문서에 chatCnt를 추가하여 useEffect에서 데이터를 불러온
데이터를 chatCnt로 정렬하도록 함. 이 chatCnt는 chat이 비어있지 않으면 새로고침할 때마다 현재의 chat 중 가장 큰 chatCnt 값에 1을 더한 값으로
설정된다. 만약 chatCnt가 비어있으면 0부터 시작한다.

4. Sign up페이지를 분리하였다. 받아온 정보들을 firebase의 userInfo collection에 저장한다.

5. 추가하고 싶은 것
- '언제' 채팅을 쳤는지 함께 기록
- 채팅을 수정하거나 삭제할 때 작성한 사람만이 가능하게 하고, 특히 수정했을 때는 수정된 글에 몇 번 수정됐는지 표시
- 성파님이 올려준 수정본에서 나온 것 처럼 채팅방 구현
- UI 정리. 예를 들어 채팅 올라오는 곳을 오른쪽으로 빼고 div를 지정해서 카카오톡 처럼 채팅이 위로 쌓이다가 height가 넘어가면 스크롤바가
생기도록 (overflow: hidden?)
-  비번칠 때 안보이도록( *로 표시 )

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
