<template>
    <div>
        <h3>물품 목록</h3>

        <router-link to="/iteminsert">물품등록</router-link>
        <table border ="1">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>물품명</th>
                    <th>내용</th>
                    <th>가격</th>
                    <th>수량</th>
                    <th>등록일</th>
                    <th>이미지</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tmp in state.row" :key="tmp._id">
                   <td>{{tmp._id}}</td>  
                   <td>{{tmp.name}}</td>  
                   <td>{{tmp.content}}</td>  
                   <td>{{tmp.price}}</td>  
                   <td>{{tmp.quantity}}</td>  
                   <td>{{tmp.regdate}}</td>  
                   <td><img :src="tmp.img" style="width:50px"
                        /></td>  
                </tr>
            </tbody>
        </table>

        <button v-for="tmp in state.pages" :key="tmp" 
                    @click="handlePage(tmp)">
            {{tmp}}
        </button>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import axios from 'axios';
import { onMounted } from '@vue/runtime-core';
export default {
    setup () {

        const state = reactive({
            page : 1,
            row  : null, //[{},{}...{}]
            total : 0,
            pages : 0,
        });

        const handleData = async() => {
            const url = `/item101/selectlistpage.json?page=${state.page}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                state.row = response.data.result;
                state.total = response.data.total;
                state.pages 
                    = Math.floor( (response.data.total-1)/12 )+1;
            }
        };

        onMounted(()=>{
            handleData();
        });

        const handlePage = (page) => {
            state.page = page;
            handleData();
        };

        return {state, handlePage}
    }
}
</script>

<style lang="css" scoped>


</style>