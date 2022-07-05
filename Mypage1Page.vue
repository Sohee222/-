<template>
    <div class="container">
        <el-tabs tab-position="left" style="height: 300px" class="demo-tabs">
            <el-tab-pane label="회원정보변경">

            <div style="width:300px;  margin-bottom: 20px;">
            <el-form label-width="130px">
                    <el-form-item label="이름">
                        <el-input v-model="state.username" />
                    </el-form-item>
                    <el-form-item label="나이">
                        <el-input type="number" v-model="state.userage" />
            </el-form-item> 
            </el-form>

            <el-form-item style="margin-top:30px; padding-left: 100px;">              
            <el-button type="primary" @click="handleUpdate1">변경하기</el-button>              
                <el-button>취소하기</el-button></el-form-item>
            </div>
            </el-tab-pane>

            <div style="width:300px; margin-bottom: 20px;">
            <el-tab-pane label="비밀번호변경">
            <el-form label-width="130px">
            <el-form-item label="현재 비밀번호">
                <el-input v-model="state.userpw" type="password" autocomplete="off" />
            </el-form-item>
        
            <el-form-item label="새로운 비밀번호">
                <el-input v-model="state.userpw1" type="password" autocomplete="off" />
            </el-form-item>
            </el-form>

            <el-form-item style="margin-top:30px; padding-left: 100px;">            
            <el-button type="primary" @click="handleLogout1">변경하기</el-button>
                <el-button>취소하기</el-button></el-form-item>
            </el-tab-pane>
            </div>

            <el-form-item style="margin-top:50px; padding-left: 50px;">
            <el-tab-pane label="회원탈퇴">
            <el-button type="primary" @click="handleLogout1">회원탈퇴</el-button>
                 <el-button>취소하기</el-button>
            </el-tab-pane></el-form-item>
        </el-tabs>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
export default {
    setup () {

        const state = reactive({
            username: '',
            userage : 0,
            token : sessionStorage.getItem("TOKEN")
        });

        // 로그인한 사용자의 이름과 나이 정보 받기
        const handleData = async() => {
            const url =`/member101/selectone.json`;
            const headers = {
                "Content-Type":"application/json",
                "auth" : state.token
            };

            const {data} = await axios.get(url, {headers});
            console.log(data);
        }

        onMounted(()=>{
            handleData();
        })

        // 실제 회원정보 변경
        const handleUpdate = async() => {
            const url =`/member101/update.json`;
            const headers = {
                "Content-Type":"application/json",
                "auth" : state.token    // 토큰 : 로그인 정보
            };
            const body = {
                name :state.username,
                age : state.userage
            };

            const { data } = await axios.put(url, body, {headers});
            console.log(data);

            state.username = data.result.name;
            state.userage = data.result.age;
        }


        return {state, handleUpdate}
    }
}
</script>

<style lang="css" scoped>
    .container {
        width   : 700px;
        border  : 1px solid #cccccc;
        padding : 10px;
        margin : 0 auto;
    }

</style>
