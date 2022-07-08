<template>
    <div class="container">

        <div class="box">
            <div class="item" v-for="tmp in state.rows" :key="tmp">
                <el-card class="box-card" 
                    @click="handleContent(tmp._id)"
                    style="cursor:pointer">
                    
                    <img :src="tmp.img" style="width:100%; height:100px" />
                    <p v-text="tmp.name"></p>

                    <p>{{tmp.price}}원</p>
                    <p>{{tmp.content}}</p>
                </el-card>
            </div>
        </div>

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
            page : 1,
            rows : [],
            total : 0,
            pages : 0,
        });

        const handleData = async() => {
            const url = `/item101/selectlistpage.json?page=${state.page}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                state.rows = response.data.result;
                state.total = response.data.total;
                state.pages 
                    = Math.floor( (response.data.total-1)/12 )+1;
            }
        };

        onMounted(()=>{
            handleData();
        })

        const handleContent = (  code  ) => {
            router.push({path:'/marketcontent', query:{code:code}});
        }

        return {state, handleContent}
    }
}
</script>

<style lang="css" scoped>
    .box { 
        width   : 1000px;
        padding : 20px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        column-gap: 5px;
        row-gap: 5px;
        margin : 0 auto;
    }

    .item {
        border:0px solid #cccccc;
        padding: 0px;
    }
</style>




