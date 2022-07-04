<template>
    <div>
        <h3>물품등록</h3>
            {{state}}
        <br />
        물품명: <input type="text" v-model="state.name" /><br />
        물품설명 : <textarea rows="6" v-model="state.content"></textarea><br />
        가격: <input type="text" v-model="state.price" /><br />
        수량: <input type="text" v-model="state.quantity" /><br />
        대표이미지 : 
        <img :src="state.img" style="width:100px" />
        <input type="file" @change="handleImage($event)" /><br />
        <button @click="handleInsert" >등록하기</button>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
    setup () {

        const router = useRouter();

        const state = reactive({
            img     : require('../assets/imgs/noimage.png'),
            name    : 'aaa',
            content : 'bbb',
            price   : '1000',
            quantity : '800',
            file    : ''
        });

        const handleImage = (e) => {
              // 실제 첨부한 파일 정보는 e.target.files[0]
                console.log(e.target.files[0]);
                console.log(e.target.files.length);
                if(e.target.files.length > 0){
                    state.file = e.target.files[0];
                    state.img  = URL.createObjectURL( e.target.files[0] );
                }
                else{
                    state.file = '';
                    state.img = require('../assets/imgs/noimage.png');
                }
            };   
            
        const handleInsert = async() => {
            console.log('handleInsert');
            const url = `/item101/insert.json`;
            const headers = {"Content-Type":"multipart/form-data"};
            let body = new FormData();
                body.append("name", state.name);
                body.append("price", Number(state.price));
                body.append("quantity", Number(state.quantity));
                body.append("content", state.content);
                body.append("image", state.file);
                //const body = {name:state.name ... , image:state.file};

                //const의 하위 객체 data
            const { data } = await axios.post(url, body, {headers});
            console.log(data);

            if(data.status === 200){
                router.push({path:'/item'});
            }
        };

        return {state, handleImage, handleInsert}
    }
}
</script>

<style lang="scss" scoped>

</style>


