<template>
    <div>
        <h3>게시판수정</h3>
        <div v-if="state.row">
            제목 : <input type="text" v-model="state.row.title"/><br />
            내용 : <textarea rows="6" v-model="state.row.content"></textarea><br />
            작성자 : <input type="text" v-model="state.row.writer" /><br />
            <input type="button" value="수정" @click="handleUpdate" />
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router'
import { onMounted, watch } from '@vue/runtime-core';
import axios from 'axios';
export default {
    setup () {
        const route = useRoute();   // 이전페이지에 넘어온 값 받기
        const router = useRouter(); // 다른페이지로 이동하기 위해

        const state = reactive({
            no  : Number(route.query.sendno),
            row : null,
        });

        // 특정 변수 값이 변경이 되면 수행
        watch(state, () => {
            console.log('watch => ', state);
        },{
            immediate   :   true, // 즉시
            deep    :   true, //state 내부의 객체가 바뀌면   
        });

        const handleData = async() => {
            const url = `/board101/selectone.json?no=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.row = response.data.result;
            }
        };

        onMounted( () => {
            handleData();
        });

        const handleUpdate = async() => {
            // GET방식 ?no=1   
            // POST방식 body  => 암호, 길거나, 파일
            const url = `/board101/update.json?no=${state.row._id}`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                title   : state.row.title,
                content : state.row.content,
                writer  : state.row.writer
            };

            const response  = await axios.put(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('수정되었습니다.');
                // 상세 페이지로 이동
                router.push({path:'/boardc', query:{sendno:state.row._id}});
            }
        };

        return {state, handleUpdate}
    }
}
</script>

<style lang="scss" scoped>

</style>