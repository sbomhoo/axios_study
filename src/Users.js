import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
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

export default Users;