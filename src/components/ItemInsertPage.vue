<template>
    <div class="container">

        <h3>물품등록</h3>

        <el-form label-width="120px">
            <el-form-item label="물품명">
                <el-input v-model="state.name" style="width:500px"/>
            </el-form-item>
            
            <el-form-item label="물품내용">
                <el-input v-model="state.content" type="textarea" rows="6" style="width:500px" />
            </el-form-item>

            <el-form-item label="가격"> 
                <el-input v-model="state.price" type="number" style="width:150px"/> 원
            </el-form-item>

            <el-form-item label="수량">
                <el-input v-model="state.quantity" type="number" style="width:150px"/> 개
            </el-form-item>

            <el-form-item label="대표이미지">
                <img :src="state.img" style="width:100px" />
                <input type="file" @change="handleImage($event)" /><br />
            </el-form-item>

            {{state.uploadfiles}}
            <el-form-item label="대표이미지">
                <el-upload :file-list="state.uploadfiles" 
                    list-type="picture-card" :auto-upload="false">
                    <el-icon><Plus /></el-icon>

                    <template #file="{ file }">
                        <div>
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview"
                                    @click="handlePictureCardPreview(file)">
                                    <el-icon><zoom-in /></el-icon>
                                </span>

                                <span v-if="!disabled" class="el-upload-list__item-delete"
                                    @click="handleRemove(file)">
                                    <el-icon><Delete /></el-icon>
                                </span>
                            </span>
                        </div>
                    </template>            
            </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleInsert">등록</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" style="width:100%" alt="Preview Image" />
        </el-dialog>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
export default {
    components : {
        Plus,
        Delete,
        ZoomIn
    },

    setup () {
        const router = useRouter();

        const dialogImageUrl = ref('')
        const dialogVisible = ref(false)  // 다이얼 로그에 표시할 이미지
        const disabled = ref(false)       // 다이얼로그 표시유무

        const state = reactive({
            img     : require('../assets/imgs/noimage.png'),
            name    : 'aaa',
            content : 'bbb',
            price   : '1000',
            quantity : '800',
            file    : '',
            uploadfiles : [], //첨부하는 이미지를 보관하는 배열
        });

        const handleImage = (e) => {
            //실제 첨부한 파일 정보는 e.target.files[0]
            console.log(e.target.files[0]);
            console.log(e.target.files.length);
            if(e.target.files.length > 0){
                state.file = e.target.files[0];
                state.img  = URL.createObjectURL( e.target.files[0] );
            }
            else {
                state.file = '';
                state.img  = require('../assets/imgs/noimage.png');
            }
        };

        const handleInsert = async() => {

            // 유효성검사
            if(state.uploadfiles.length <=0 ) {
                alert('이미지를 첨부하세요.')
                return false;
            }
            console.log('handleInsert');
            const url = `/item101/insert.json`;
            const headers = {"Content-Type":"multipart/form-data"};
            let body = new FormData();
            body.append("name", state.name);
            body.append("price", Number(state.price));
            body.append("quantity", Number(state.quantity));
            body.append("content", state.content);
            //body.append("image", state.file);
            body.append("image", state.uploadfiles[0].raw);

            //const body = {name:state.name ... , image:state.file};

            //response의 하위 객체 data
            const { data } = await axios.post(url, body, {headers});
            console.log(data);
            if(data.status === 200){
                router.push({path:'/item'});
            }
        };

        const handlePictureCardPreview = (file) =>{
            console.log(file);
            // 파일의 url의 정보 dialogImageUrl에 추가
            dialogImageUrl.value = file.url; 
            // 다이얼로그 표시 유무 변경
            dialogVisible.value = true;
        }

        const handleRemove = (file) => {
            console.log(file);

            //state.uploadfiles => [ {0, uid}, {1, uid}, {2, uid} ]
            for(let i=0;i<state.uploadfiles.length;i++ ) {
                if(state.uploadfiles[i].uid === file.uid){
                   // splice => 배열의 i번째의 1개 삭제
                   state.uploadfiles.splice(i,1);  
                   break;
                }
            }
        }
        return { 
            state, 
            dialogImageUrl,
            dialogVisible,
            disabled,
            handleRemove,
            handleImage, 
            handleInsert, 
            handlePictureCardPreview
        }
    }
}
</script>

<style lang="css" scoped>
    .container {
        width : 700px;
        border:1px solid #cccccc;
        padding: 20px;
    }
</style>