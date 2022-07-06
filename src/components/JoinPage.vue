<template>
    <div class="container">
        <h3>회원가입</h3>
        {{state}}
        <hr />
        아이디<input type="text" v-model="state.userid"/><br />
        암호<input type="password" v-model="state.userpw"/><br />
        암호확인<input type="password" v-model="state.userpw1"/><br />
        이름<input type="text" v-model="state.username"/><br />
        나이<input type="number" v-model="state.userage"/><br />
        이메일<input type="text" v-model="state.useremail1"/>
        <label>@</label>
        <select v-model="state.useremail2">
            <option>daum.net</option>
            <option>naver.com</option>
            <option>gmail.com</option>
        </select><br />
        <button @click="handleJoin">회원가입</button> 
        
    </div>
</template>

<script>
import axios from 'axios';
import { reactive } from '@vue/reactivity';
import { useRouter } from 'vue-router';

export default {
    
    setup () {
        const router = useRouter();

        const state = reactive({
            userid : 'aaaa1',
            userpw : 'aaaa1',
            userpw1 : 'aaaa1',
            username : '가나다',
            useremail1 : 'a',
            useremail2 : 'naver.com', //@생략됨.
            userage : 12,
        });

        const handleJoin = async() => {
            //유효성검사
            if(state.userid === ''){
                alert('아이디 입력하세요.');
                return false;
            }

            const url = '/member101/insert.json';
            const headers = {"Content-Type":"application/json"};
            const body = {
                id : state.userid,
                pw : state.userpw,
                name : state.username,
                email : state.useremail1 + '@' + state.useremail2,
                age : Number(state.userage)
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                alert('회원가입완료');
                router.push({path:'/login'});
            }
        }

        return {state, handleJoin}
    }
}
</script>


<style lang="css" scoped>
.container {
    width   : 700px;
    border  : 1px solid #cccccc;
    padding : 30px;
    margin  : 0 auto;
}

.lbl {
    display : inline-block;
    width   : 100px;
}

.row {
    margin-bottom : 5px;
}
</style>