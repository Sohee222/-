<template>
    <div>
        <h3>물품상세정보</h3>
        <div class="container">
            <div class="item">1</div>
            <div class="item">2</div>
            <div class="item">3</div>
            <div class="item">4</div>
            <div class="item">
                
                번호 : {{state.row._id}}<br />
                물품명 : {{state.row.name}}<br />


                서버이미지 표시
                <div v-for="tmp of state.subimage" :key="tmp" 
                            style="border:1px solid red">
                    {{tmp._id}}
                    <img :src="tmp.img" style="width:60px" />
                    <button @click="handleSubDelete( tmp._id )">삭제</button> 
                </div>

                <hr />
                서버이미지등록
                <p v-for="tmp in state.imagecount" :key="tmp">
                    <img :src="state.imagesurl[tmp]" style="width:30px" />
                    <input type="file" @change="handleChangeImage($event, tmp)" />
                    <!-- handleChangeImage === handleChangeImage($event) -->
                </p>
                <button @click="handleAdd">항목추가</button>
                <button @click="handleSub">항목삭제</button>
                <button @click="handleSubImage">이미지등록</button>

                {{state.images}}
            </div>
            <div class="item">6</div>
            <div class="item">7</div>
            <div class="item">8</div>
            <div class="item">9</div>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { useRoute } from 'vue-router';
export default {
    setup () {
        const route = useRoute();
        const state = reactive({
            no  : Number(route.query.no),
            row : '', /* null을 초기화하면 */
            imagecount : 3,
            images : [
                null,
                null, null, null, 
                null, null, null
            ], /* 여러개를 보관하는 변수 */
            imagesurl : [ 
                '사용안함',
                require('../assets/imgs/noimage.png'),    
                require('../assets/imgs/noimage.png'),
                require('../assets/imgs/noimage.png'),
                require('../assets/imgs/noimage.png'),
                require('../assets/imgs/noimage.png'),
                require('../assets/imgs/noimage.png'),
            ],

            subimage : []
        });

        const handleData = async() => {
            const url = `/item101/selectone.json?no=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            console.log(data);
            if(data.status === 200){
                state.row = data.result;
            }
        };

        const handleAdd = () => {
            state.imagecount++; //기존값에서 1증가됨.
            if(state.imagecount > 6) {
                state.imagecount = 6;
            }
        };

        const handleSub = () => {
            state.imagecount--; //기존값에서 1감소함.
            if(state.imagecount < 2) {
                state.imagecount = 2;
            }
        };

        const handleSubImage = async() => {
            console.log('handleSubImage');
            const url = `/item101/insertimages.json`;
            const headers = {"Content-Type":"multipart/form-data"};
            let body = new FormData();
            body.append("code", state.no);  /* 이미지의 번호 : code */
            
            for(let i=1; i<state.images.length; i++) {
                if(state.images[i] !== null) {
                    body.append("image", state.images[i]);
                }
            }

            const {data} = await axios.post(url, body, {headers})
            console.log(data);

            if(data.status === 200){
                handleData();      // 물품의 상세정보
                handleDataImage(); // 물품의 서버이미지들..
            }
        };

        const handleChangeImage = (e, idx) => {
            console.log('handleImage', e, idx);
            if(e.target.files.length > 0){
                state.images[idx] = e.target.files[0];
                state.imagesurl[idx] = URL.createObjectURL(e.target.files[0]);
            }
            else {
                state.images[idx] = null;
                state.imagesurl[idx] = require('../assets/imgs/noimage.png');
            }
        };

        const handleDataImage = async() => {
            const url = `/item101/subimagecode.json?code=${state.no}`;
            const headers = {"Content-Type":"applicaton/json"};
            const { data } = await axios.get(url, {headers});
            console.log(data);

            if(data.status === 200){
                state.subimage = data.result;
            }
        }

        onMounted(() => {      // 화면이 로딩될 때 또는 F5를 눌렀을 때
            handleData();      // 물품의 상세정보
            handleDataImage(); // 물품의 서버이미지들..
        });

        const handleSubDelete = async(no) =>{
            const url =`/item101/subimagedelete.json?no=${no}`;
            const headers = {"Content-Type":"application/json"};
            const { data } 
                = await axios.delete(url, {headers:headers, data:{}});
            if(data.status === 200)    {
                handleDataImage(); // 물품의 서버이미지들..
            }
        }

        return {
            state, 
            handleAdd, 
            handleSub, 
            handleSubImage,
            handleChangeImage,
            handleSubDelete
        }
    }
}
</script>

<style lang="css" scoped>
    .container {
        width : 800px;
        padding : 10px;
        border : 1px solid #cccccc;
        display: grid;
        grid-template-columns: 2fr 8fr 1fr;
        column-gap: 10px; /* item 사이의 가로 여백 */
        row-gap: 5px;   /* item 사이의 세로 여백 */
    }
    .item {
        border: 1px solid #cccccc;
        padding: 20px;
    }

    .item:nth-child(5) {
        grid-column-end: span 2;
    }

    .item:nth-child(6) {
        grid-column-end: span 3;
    }

</style>
