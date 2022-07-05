<template>
    <div class="container">
        <div class="item">1</div>
        <div class="item">

            <el-button type="success" @click="handleBoardWrite">
                 글쓰기
            </el-button>
            
            <div style="width:200px; margin-bottom: 20px;">
                <el-input v-model="state.text" placeholder="검색어를 입력하세요"
                    @keyup.enter="handleSearch" />
            </div>

            <el-table :data="state.rows" style="width: 100%; cursor: pointer;" @row-click="handleContent">
                <el-table-column prop="_id" label="번호" width="80" />
                <el-table-column prop="title" label="제목" />
                <el-table-column prop="writer" label="작성자" />
                <el-table-column prop="hit" label="조회수" />
                <el-table-column prop="regdate" label="날짜" width="200" />
            </el-table>


            <el-pagination layout="prev, pager, next" :total="state.total"
                    @current-change="handlePage" 
                    style="width:400px; margin:0 auto; border:1px solid red"/>
            
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


        // 상태 변수 생성
        const state = reactive({
            rows    : null,
            page    : 1,  //현재의 페이지번호를 저장
            text    : '', //현재의 검색어 
            total   : 0,
        });

        // 벡엔드에서 데이터 가져오는 함수
        const handleData = async() => {
            const url = `/board101/select.json?page=${state.page}&text=${state.text}`;
            const headers = {"Content-Type":"application/json"};
            const {data} = await axios.get(url, headers);
            console.log(data);
            if(data.status === 200){
                state.rows = data.rows;     // 받은 데이터: state.rows
                state.total = data.total;   // 총 페이지 수
            }
        };

        // 페이지가 mount될때 자동 수행되는 생명주기
        onMounted(() => {
            handleData();
        });

        const handlePage = (page) => {
            // console.log('페이지네이션 클릭함',  page);
            state.page = page;
            handleData();
        }

        const handleSearch = () => {
            console.log('Board1Page.vue => handleSearch');
            state.page  = 1;   //검색하면 1페이지로 가야함
            handleData();
        }

        const handleContent = (row) => {
            console.log('Board1Page.vue => handleContent', row);
            router.push({name:'Board1ContentPage', query:{no:row._id}});
        }

        const handleBoardWrite = () => {
            router.push({path:'board1write'});
        }

        return {
            state, 
            handlePage, 
            handleSearch, 
            handleContent,
            handleBoardWrite
        };
    }
}
</script>

<style lang="css" scoped src="../assets/css/board1.css">

</style>




