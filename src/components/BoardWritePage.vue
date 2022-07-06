<template>
    <div class="container">
        <h3>글쓰기</h3>
        {{ state }}
        <input type="text" ref="title" placeholder="제목" v-model="state.title" /><br />
        <textarea rows="6" ref="content" placeholder="내용" v-model="state.content"></textarea><br />
        <input type="text" ref="writer" placeholder="작성자" v-model="state.writer" /><br />
        <button @click="handleWrite()">글쓰기</button>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup () {
        const router = useRouter();

        const title = ref(); //document.find.byid로 개체찾는
        const content = ref(); //document.find.byid로 개체찾는
        const writer = ref(); //document.find.byid로 개체찾는
        
        const state = reactive({
            title : '',
            content : '',
            writer: '',
        });

        // 글쓰기 버튼 클릭시 호출됨    
        const handleWrite = async () => {
            // 제목, 내용, 작성자를 입력나는 유효성 검사

            if(state.title === ''){
                alert('제목을 입력하세요');
                title.value.focus();
                return false;
            }

            if(state.content === ''){
                alert('내용을 입력하세요');
                content.value.focus();
                return false;
            }

            if(state.writer === ''){
                alert('작성자명을 입력하세요');
                writer.value.focus();
                return false;
            }

            const url = `/board101/insert.json`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                title : state.title,
                content : state.content,
                writer : state.writer,
            }

            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                router.push({path:'/board'});
            }
        };

        return {title, content, writer, state, handleWrite}
    }
}
</script>

<style lang="css" scoped>
.container {
    width   : 700px;
    padding : 20px;
    border  : 1px solid #cccccc;
}

</style>

