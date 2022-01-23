# Axios
- API연동의 기본 
- GET (조회), POST(등록) , PUT(수정), DELETE(삭제)


# async와 await
- 비동기 함수 앞에 async를 넣으면 프로미스 객체를 리턴한다.
- await를 넣으면 프로미스가 끝날때까지 기다린다.(비동기 함수는 프로미스가 없기 때문에 기다려주지 않음, 때문에 async로 프로미스 만든다.)
- useEffect에 바로 async사용 할 수 없기때문에 내부에서 새로운 함수 선언하고 그 새로운 함수에 async 사용 
- 참고 : https://joshua1988.github.io/web-development/javascript/js-async-await/

```java
  const fetchUsers = async () => {  // 비동기 함수 앞에 async를 넣으면 프로미스 객체를 리턴한다.
        try {
            //요청이 시작 할 때에는 error와  users를 초기화하고
            setError(null);
            setUsers(null);
            //loading 상태를 true로 바꿉니다.
            setLoading(true);
            const response = await axios.get(    // 프로미스가 끝날때까지 기다린다.(비동기 함수는 프로미스가 없기 때문에 기다려주지 않음, 때문에 async로 프로미스 변홚나다.)
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
  useEffect(() => { console.log(user); } , []);
- ,뒤에 []는 deps라고 부름
 1. deps가 빈 배열 일 경우 => 처음 컴포넌트 마운트 될 때 호출
 2. deps가 빈배열 이고 함수 안에 return 값이 있는 경우 => 언마운트 될 때
 3. deps가 값이 있는 배열인 경우 => 언마운트 시, 값이 바뀌기 직전에 호출
 4. deps가 생략이 된 경우 => 컴포넌트 리렌더링 될 떄 마다 호출
  
