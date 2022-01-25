# Axios
- API연동의 기본 
- GET (조회), POST(등록) , PUT(수정), DELETE(삭제)

# 비동기 처리(동기 함수 -> 비동기 함수)
- 특정 로직의 실행이 끝날 때까지 기다려주지 않고 다른 코드를 먼저 실행하는 것
- 비동기 처리가 필요한 이유는 화면에서 서버로 데이터를 요청했을 때 서버가 언제 그 요청에 대한 응답을 줄 지 모르는데, 마냥 기다리며 자원을 차지할 수 없기 때문이다.
- 비동기 처리 하는 방법에는 콜백함수, promise & then, aysnc와 await가 있다. ( 이 중에서 aysnc와 await가 가장 최신의 방법이며 가장 편리하다.)
- 예시) 프로미스가 끝날 때 까지 기다렸다가(await)  끝나면 알려줄테니 그 동안 다른 작업 하고 있어~

# async와 await
- 비동기 함수 앞에 async를 넣으면 프로미스 객체를 리턴한다.
- await를 넣으면 프로미스가 끝날때까지 기다린다.(비동기 함수는 프로미스가 없기 때문에 기다려주지 않음, 때문에 async로 프로미스 만든다.)
- useEffect에 바로 async사용 할 수 없기때문에 내부에서 새로운 함수 선언하고 그 새로운 함수에 async 사용 
- 참고 : https://joshua1988.github.io/web-development/javascript/js-async-await/

```java
  const fetchUsers = async () => {  // 비동기 함수 앞에 async를 넣으면 프로미스 객체를 리턴한다. (프로미스는 비동기 처리를 위한 객체)
        try {
            //요청이 시작 할 때에는 error와  users를 초기화하고
            setError(null);
            setUsers(null);
            //loading 상태를 true로 바꿉니다.
            setLoading(true);
            const response = await axios.get(    // 프로미스가 끝날때까지 기다린다. (await를 사용하지 않으면 콜백함수나 .then()등을 사용)
                'https://jsonplaceholder.typicode.com/users'
            );
            setUsers(response.data); //데이터는 response.data 안에 들어있습니다.
        } catch(e){
            setError(e);
        }
        setLoading(false);
    };

    //useEffect에 바로 async사용 할 수 없기때문에 내부에서 새로운 함수 선언
    useEffect(() => {
        fetchUsers();
    }, []);

```

# useEffect
- 함수형 컴포넌트에서 LifeCycle 함수를 사용가능케 하는 라이브러리
- ,뒤에 []는 deps라고 부름

 1. deps가 빈 배열 일 경우 => 처음 컴포넌트 마운트 될 때 호출
```java
  useEffect(() => { console.log(user); } , []);
```
 2. deps가 빈배열 이고 함수 안에 return 함수가 있는 경우 => 언마운트 될 때
```java
  useEffect(() => {     
    return () => {
      console.log('user 가 바뀌기 전..');
    }; } , []);
```
 3. deps가 값이 있는 배열인 경우 => 언마운트 시, 값이 바뀌기 직전에 호출
```java
  useEffect(() => { console.log(user); } , [user]);
```
 4. deps가 생략이 된 경우 => 컴포넌트 리렌더링 될 떄 마다 호출
  ```java
  useEffect(() => { console.log(user); } );
```
