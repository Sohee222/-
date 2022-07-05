<template>
    <div class="container">
        <div style="text-align:center">
            <h3>로그인</h3>
        </div>

        <el-form label-width="80px">
            <el-form-item label="아이디">
                <el-input v-model="state.userid" />
            </el-form-item>

            <el-form-item label="암호">
                <el-input v-model="state.userpw" type="password" autocomplete="off" />
            </el-form-item>

            <el-form-item style="margin-top:30px">
                <el-button type="primary" @click="handleLogin">로그인</el-button>
                <el-button>회원가입</el-button>
                <el-button>메인으로</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            userid : 'aaaa',
            userpw : 'aaaa',
        });

        const handleLogin = async() => {
            console.log('handleLogin');

            const url = '/member101/select.json';
            const headers = {"Content-Type":"application/json"};
            const body = {
                id : state.userid,
                pw : state.userpw
            };
            const { data } = await axios.post(url, body,{headers});
            console.log(data);
            if(data.status === 200) {
                alert('로그인 성공');
                sessionStorage.setItem("TOKEN", data.result);
                router.push({path:'/'});
            }
        }

        return {state, handleLogin}
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
