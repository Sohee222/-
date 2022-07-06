<template>
    <div>
        <h3>게시판</h3>

        <button @click="handleNext()">글쓰기</button>

        <table border="1">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>조회수</th>
                    <th>날짜</th>
                </tr>
            </thead>

            <tbody>
                <!--  state.rows [{},{},{}]   => tmp {   }  -->
                <tr v-for="tmp in state.rows" :key="tmp._id">
                    <td>{{ tmp._id }}</td>
                    <td @click="handleContent( tmp._id )" style="cursor:pointer;color:blue;">{{ tmp.title }}</td>
                    <td>{{ tmp.writer }}</td>
                    <td>{{ tmp.hit }}</td>
                    <td>{{ tmp.regdate }}</td>
                </tr>
            </tbody>
        </table>

        <!-- 1 2 3 <= 3-->
        <button v-for="tmp in state.pages" :key="tmp" @click="handlePage( tmp )">
            {{tmp}}
        </button>

    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, reactive } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

export default {
    setup () {

        // 1. 변수설정 및 import 
        const router = useRouter();

        // 객체 만들기 return 필수
        const state = reactive({
            rows    : null,  // [{},{}]벡엔드의 데이터 중에서 게시물 목록
            total   : 0,     // 45벡엔드의 데이터 중에서 게시물 전체 개수
            pages   : 0,     // 전체개수를 기반으로 계산된 페이지수
            page    : 1,     // 초기페이지 번호
        });
        
        // 함수는 호출되기 전에는 실행되지 않음.
        const handleData = async( ) => {
            const url = `/board101/select.json?page=${state.page}&text=`;
            const headers = {"Content-Type":"application/json"};

            const response = await axios.get(url, {headers:headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.rows = response.data.rows;
                state.total = response.data.total;
                // Math.floor(1.2345)  =>  1
                // Math.floor(13.5434)  =>  13
                // console.log( Math.floor( (state.total-1)/10 ) + 1 );
                state.pages = Math.floor( (state.total-1)/10 ) + 1;
            }
        };

        // F5 페이지가 로딩되면 자동으로 호출됨
        onMounted( () => {
            handleData();
        });

        const handlePage = ( tmp ) => {
            state.page = tmp;
            handleData();
        };

        const handleNext = () => {
            // 페이지 이동하기
            router.push({path:'/boardw'});
        };

        const handleContent = async ( no ) => {
            console.log('handleContent', no);
            // 조회수 1증가
            const url = `/board101/updatehit.json?no=${no}`;
            const headers  = {"Content-Type":"application/json"};
            const response = await axios.put(url, {}, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                // 상세페이지로 이동
                router.push({path:'/boardc', query:{sendno : no}});
            }
        };

        return {
            state, 
            handlePage, 
            handleNext,
            handleContent
        };
    }
}
</script>

<style lang="scss" scoped>

</style>