<template>
    <div class="container">
        <el-tabs tab-position="left" style="height: 300px" class="demo-tabs">
            <el-tab-pane label="회원정보변경">

                <el-form label-width="120px" style="padding:20px">
                    <el-form-item label="이름">
                        <el-input v-model="state.username" style="width:150px"/>
                    </el-form-item>
                    <el-form-item label="나이">
                        <el-input v-model="state.userage" style="width:150px"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleUpdate">변경</el-button>
                        <el-button>취소</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>

            <el-tab-pane label="비밀번호변경">
                <el-form label-width="120px" style="padding:20px">
                    <el-form-item label="현재암호">
                        <el-input v-model="state.userpw" type="password" autocomplete="off" style="width:160px" />
                    </el-form-item>
                    <el-form-item label="변경암호">
                        <el-input v-model="state.userpw1" type="password" autocomplete="off" style="width:160px" />
                    </el-form-item>
                    <el-form-item label="변경암호확인">
                        <el-input v-model="state.userpw2" type="password" autocomplete="off" style="width:160px" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" 
                                @click="handleUpdatePw">암호변경</el-button>
                        <el-button>취소</el-button>
                    </el-form-item>
                </el-form>    
            </el-tab-pane>

            <el-tab-pane label="회원탈퇴">
                <el-form label-width="110px" style="padding:20px">
                    <el-form-item label="현재암호">
                        <el-input v-model="state.userpw" type="password" autocomplete="off" style="width:160px" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" 
                                @click="handleDelete">회원탈퇴</el-button>
                        <el-button>취소</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
    setup () {

        const router = useRouter();

        const state = reactive({
            username    : '', // 이름
            userage     : 0,  // 나이 
            token       : sessionStorage.getItem("TOKEN"),
            userpw      : '',  // 현재비번
            userpw1     : '',  // 바꿀비번
            userpw2     : '',  // 바꿀비번 확인 
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

            state.username = data.result.name;
            state.userage = data.result.age;
        }

        onMounted(()=>{
            handleData();
        })

        // 실제 회원정보 변경
        const handleUpdate = async() => {
            const url =`/member101/update.json`;
            const headers = {
                "Content-Type":"application/json",
                "auth" : state.token
            };
            const body = {
                name :state.username,
                age : state.userage
            };

            const { data } = await axios.put(url, body, {headers});
            console.log(data);
        }


        const handleUpdatePw = async() => {
            //유효성검사 변경암호2개 일치하는지
            const url = `/member101/updatepw.json`;
            const headers = {
                "Content-Type":"application/json",
                "auth" : state.token
            };
            const body = {
                pw : state.userpw,
                newpw : state.userpw1
            }
            const { data } = await axios.put(url, body, {headers});
            console.log(data);
            if(data.status === 200){
                alert('변경되었습니다.');
            }
        }


        const handleDelete = async() => {
            const url= `/member101/delete.json`;
            const headers = {
                "Content-Type":"application/json",
                "auth" : state.token
            };
            const body = {
                pw : state.userpw,
            }
            const {data} = 
                await axios.delete(url, {headers:headers, data:body});
            console.log(data);
            if(data.status === 200){
                alert('탈퇴되었습니다.');
                router.push({path:'/logout1'});
            }
        }

        return {state, handleUpdate, handleUpdatePw, handleDelete}
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
