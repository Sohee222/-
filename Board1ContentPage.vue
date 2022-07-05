<template>
    <div class="container">
        <div class="item">1</div>

        <div class="item">
            
            <el-form label-width="120px">
                <el-form-item label="글번호" style="border:1px solid #cccccc">
                    <label v-text="state.row._id"></label>
                </el-form-item>

                <el-form-item label="제목" style="border:1px solid #cccccc">
                    <label v-text="state.row.title"></label>
                </el-form-item>

                <el-form-item label="내용" style="border:1px solid #cccccc">
                    <label v-html="state.row.content"></label>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="handleBoardList">목록</el-button>
                    <el-button type="primary">이전글</el-button>
                    <el-button type="primary">다음글</el-button>
                    <el-button type="primary">삭제</el-button>
                    <el-button type="primary">수정</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="item">3</div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';

export default {
    setup () {
        const route = useRoute();
        const router = useRouter();
        
        const state = reactive({
            no  : Number(route.query.no),
            row : '',
        });

        const handleData = async() => {
            const url = `/board101/selectone.json?no=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            console.log(data);
            if(data.status === 200) {
                state.row = data.result;
            }
        };

        onMounted(()=>{
            handleData();
        });

        const handleBoardList = () => {
            router.push({path:'/board1'});
        }
        return {state, handleBoardList}
    }
}
</script>

<style lang="css" scoped>
    .container { 
        width:1000px;
        padding: 10px;
        border: 1px solid #cccccc;
        display: grid;
        grid-template-columns: 2fr 8fr 1fr;
        column-gap: 5px;
    }

    .item {
        border:1px solid #cccccc;
        padding: 10px;
    }

    .item:nth-child(2) {
        background: #e3f2de;
    }
</style>
