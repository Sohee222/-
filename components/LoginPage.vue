<template>
    <div class="container">
        <h3>로그인</h3>
        {{state}}
        <input type="text" v-model="state.userid" />
        <input type="password" v-model="state.userpw" />
        <button @click="handleLogin()">로그인</button>
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
            userid: 'aaaa',
            userpw: 'aaaa',
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

<style lang="scss" scoped>

</style>