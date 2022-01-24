import React, { useEffect, useReducer} from 'react';
import axios from 'axios';

//useReducer로 상태관리 하기 => 액션에 따라 처리 가능
function reducer(state,action) {
    switch(action.type){
        case 'LOADING' :
            return {
                loading : true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}


const Users2 = () => {
    const [ state, dispatch ]  = useReducer(reducer, {
        lading: false,
        data: null,
        error: null
    });

    
    const fetchUsers = async () => {  // 비동기 함수 앞에 async를 넣으면 프로미스 객체를 리턴한다.
        dispatch({type:'LOADING'});
        try {
            const response = await axios.get(    // 프로미스가 끝날때까지 기다린다.(비동기 함수는 프로미스가 없기 때문에 기다려주지 않음, 때문에 async로 프로미스 변홚나다.)
                'https://jsonplaceholder.typicode.com/users'
            );
            dispatch({type: 'SUCCESS', data: response.data});
        } catch(e){
            dispatch({type:'ERROR', error:e})
        }
    };

    //useEffect에 바로 async사용 할 수 없기때문에 내부에서 새로운 함수 선언
    useEffect(() => {
        fetchUsers();
    }, []);

    const { loading, data: users, error} = state; // state.data 를 users 키워드로 조회

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return null;
  
    return (
        <>
            <ul>
                {users.map(user => (
                    <li key = {user.id}>
                        {user.username} ({user.name})
                    </li> 
                ))}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </>
    );
};

export default Users2;