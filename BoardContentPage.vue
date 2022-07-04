<template>
    <div>
        <h3>게시판상세</h3>

            {{state}}

        <div v-if="state.row"> 
            번호 : {{ state.row._id }}<br />
            제목 : {{ state.row.title }}<br />            
            내용 : {{ state.row.content }}<br />
            작성자 : {{ state.row.writer }}<br />            
            조회수 : {{ state.row.hit }}<br />            
            등록일 : {{ state.row.regdate }}<br />
            <br />

            번호 : <input type="text" v-model="state.row._id"/><br />
            제목 : <input type="text" v-model="state.row.title"/><br />
            내용 : <input type="text" v-model="state.row.content"/><br />
            작성자 : <input type="text" v-model="state.row.writer"/><br />
            조회수 : <input type="text" v-model="state.row.hit"/><br />
            등록일 : <input type="text" v-model="state.row.regdate"/><br />
            <br />

            <button @click="handleUpdate()">수정</button>
            <button @click="handleDelete()">삭제</button>
            <button v-if="state.prev !==0" @click="handlePrev()">이전글</button>
            <button v-if="state.next !==0" @click="handleNext()">다음글</button>
            <button><router-link to="/board">목록</router-link></button>    
       </div>
     </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';

export default {
    setup () {
        const route = useRoute(); //query값 받기 
        const router = useRouter(); //페이지 이동 import 필수

        const state = reactive({
            no      : Number(route.query.sendno), // 목록에서 전달되는 글번호
            prev    : 0,  // 이전글정보
            next    : 0,  // 다음글정보
            row     : null,  // 게시물 내용 1개
        });
        
        const handleData = async() => {
            const url = `/board101/selectone.json?no=${state.no}`;
            const headers  = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            // response.data   => {  prevNo:  nextNo: result:     }
            console.log(response.data);
            if(response.data.status === 200){
                state.prev = response.data.prevNo;
                state.next = response.data.nextNo;
                state.row  = response.data.result;
            }
        };

        onMounted( () => {
            handleData();
        });

        const handlePrev = async() => {
            state.no = state.prev;
            handleData(); //여기는 state.no값을 가지고 내용을 가져옴.
        };

        const handleNext = async() => {
            state.no = state.next;
            handleData(); //여기는 state.no값을 가지고 내용을 가져옴.
        };

        const handleDelete = async() => {
            if(confirm('삭제할까요?')){
                const url = `/board101/delete.json?no=${state.no}`;
                const headers = {"Content-Type":"application/json"};
                
                const response =  await axios.delete(url, {headers:headers, data:{ }});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('삭제 되었습니다.');
                    router.push({path:'/board'});
                }
            }
        };
        
        const handleUpdate = () =>{
            // 컴포넌트 없음
            // BoardUpdatePage.vue 생성
            // 라우트 연결
            router.push({path:'/boardu', query :{sendno: state.no} });
        };

        return {
            state, 
            handlePrev, 
            handleNext, 
            handleDelete,
            handleUpdate
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
