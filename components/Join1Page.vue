<template>
    <div class="container">
        <div style="text-align:center">
            <h3>회원가입</h3>
        </div>

        <el-form label-width="80px">
            <el-form-item label="아이디">
                <el-col :span="18">
                    <el-input v-model="state.userid" @keyup="handleIDCheck"/>
                </el-col>

                <el-col :span="6">
                    <label v-html="state.idcheck"></label>
                </el-col>
            </el-form-item>

            <el-form-item label="암호">
                <el-input v-model="state.userpw" 
                    type="password"
                    autocomplete="off" />
            </el-form-item>

            <el-form-item label="이름">
                <el-input v-model="state.username" />
            </el-form-item>

            <el-form-item label="나이">
                <el-input type="number" v-model="state.userage" />
            </el-form-item>


            <el-form-item label="이메일">
                <el-col :span="11">
                    <el-input v-model="state.useremail1" />
                </el-col>
                <el-col :span="2" class="text-center">
                    <span class="text-gray-500">@</span>
                </el-col>
                <el-col :span="11">
                    <el-select v-model="state.useremail2" placeholder="이메일선택">
                        <el-option label="naver.com" value="naver.com" />
                        <el-option label="daum.net" value="daum.net" />
                        <el-option label="gmail.com" value="gmail.com" />
                    </el-select>
                </el-col>
            </el-form-item>


            <el-form-item style="margin-top:30px">
                <el-button type="primary" @click="handleJoin">회원가입</el-button>
                <el-button>로그인</el-button>
                <el-button>메인으로</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios';
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
            idcheck : '중복확인',
        });

        const handleIDCheck = async() => {
            if(state.userid.length >= 4) {
                const url = `/member101/idcheck.json?id=${state.userid}`;
                const headers = {"Content-Type":"application/json"};
                const { data } = await axios.get(url, {headers});
                console.log(data);
                if(data.status === 200){
                    if(data.result === 1){
                        state.idcheck = '<font color="red">사용불가</font>';
                    }
                    else{
                        state.idcheck = '<font color="green">사용가능</font>';
                    }
                }
            }
            else {
                state.idcheck = '중복확인';
            }
        }


        const handleJoin = async() => {
            console.log('handleJoin');

            const url = '/member101/insert.json';
            const headers = {"Content-Type":"application/json"};
            const body = {
                id : state.userid,
                pw : state.userpw,
                name : state.username,
                email : state.useremail1 + '@' + state.useremail2,
                age : Number(state.userage)
            };
            const {data} = await axios.post(url, body, {headers});
            console.log(data);
            if(data.status === 200) {
                alert('회원가입완료');
                router.push({path:'/'});
            }
        }
        
        return {state, handleJoin, handleIDCheck}
    }
}
</script>

<style lang="css" scoped>
    .container {
        width   : 600px;
        padding : 30px;
        border  : 1px solid #cccccc;
        margin : 20px auto 10px auto;
    }
</style>