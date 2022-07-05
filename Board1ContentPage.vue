<template>
    <div class="container">
        <div class="item">1</div>

        <div class="item">
            <el-form label-width="120px">
                <el-form-item label="글번호">
                    <label>{{state.row._id}}</label>
                </el-form-item>

                <el-form-item label="제목">
                    <label>{{state.row.title}}</label>
                </el-form-item>

                <el-form-item label="작성자">
                    <label>{{state.row.writer}}</label>
                </el-form-item>

                <el-form-item label="내용">
                    <label>{{state.row.content}}</label>
                </el-form-item>

                <el-form-item label="조회수">
                    <label>{{state.row.hit}}</label>
                </el-form-item>

                <el-form-item label="날짜">
                    <label>{{state.row.regdate}}</label>
                </el-form-item>

                <el-button-group>
                    <el-button type="primary" :icon="ArrowLeft">이전 글</el-button>
                    <el-button type="primary">
                     다음 글<el-icon class="el-icon--right"><ArrowRight /></el-icon>
                    </el-button>
                </el-button-group>
                <el-button-group class="ml-4">
                    <el-button type="primary" :icon="수정" />
                    <el-button type="primary" :icon="공유" />
                    <el-button type="primary" :icon="삭제" />
                </el-button-group>


            </el-form>
        </div>

        <div class="item">3</div>
    </div>
</template>
<script>

import { reactive } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';

export default {
    setup () {
        const route = useRoute();
        const state = reactive({
            no : Number(route.query.no),
            row : '',   //40번 state.row = data.result;에서 온다
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

        return {state}
    }
}
</script>

<style lang="css" scoped>
    .container { 
        width:800px;
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