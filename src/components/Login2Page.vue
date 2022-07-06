<template>
    <div class="container">
        
        <el-form label-width="80px">
            <el-form-item>
                <h2>로그인</h2>
            
            </el-form-item>

            <div style="width:325px; margin-bottom: 20px;">
            <el-form-item type="text" label="아이디"> 
                <el-input v-model="state.userid" placeholder="아이디를 입력하세요" />
            </el-form-item> </div>

            <div style="width:325px; margin-bottom: 20px;">
             <el-form-item type="password" label="암호">
                <el-input v-model="state.userpw" type="password" autocomplete="off" />
            </el-form-item> </div>
        
            <div style="width:400px; margin-bottom: 20px;">
            <el-form-item>
                <el-button type="primary" @click="handleLogin()">로그인</el-button>                
                <el-button @click="handleJoin()">회원가입</el-button>
                <el-button @click="handleMain()">메인</el-button>
            </el-form-item></div>
        </el-form>    
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
            userid: 'abcd',
            userpw: 'abcd',
        });


        const handleLogin = async() => {
            console.log('handleLogin');
            const url = '/member101/select.json';
            const headers = {"Content-Type":"application/json"};
            const body = {
                id : state.userid,
                pw : state.userpw
            };
            const response = await axios.post(url, body,{headers});
            console.log(response.data);
            if(response.data.status === 200) {
                alert('로그인 성공');
                router.push({path:'/'});
            }
        };

        return {state, handleLogin};
    }
}
</script>

<style lang="css" scoped>
.container {
    width   : 400px;
    border  : 1px solid #cccccc;
    padding : 30px;
    margin : 20px auto 10px auto;
}
</style>
