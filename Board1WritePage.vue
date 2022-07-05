<template>
    <div class="container">
        
        <el-form label-width="80px">
            <el-form-item>
                <h3>글쓰기</h3>
            </el-form-item>

            <el-form-item label="제목">
                <el-input v-model="state.title" />
            </el-form-item>

            <el-form-item label="내용">
                <ckeditor v-model="state.content" 
                    :editor="state.editor" @ready="handleEditorInit"></ckeditor>
            </el-form-item>

            <el-form-item label="작성자">
                <el-input v-model="state.writer" />
            </el-form-item>
        
            <el-form-item>
                <el-button type="primary" @click="handleWrite">글쓰기</el-button>
                <el-button @click="handleBoard">목록으로</el-button>
            </el-form-item>
        </el-form>    
    </div>

</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { reactive } from '@vue/reactivity'
import axios from 'axios';
import { useRouter } from 'vue-router';
import UploadAdapter from './UploadAdapter';

// 이미지 업로드용

export default {
    components : {
        ckeditor : CKEditor.component
    },
    setup () {

        const router = useRouter();
        const state = reactive({
            title : '',
            content : '',
            writer:'',
            editor : ClassicEditor,
        });

        const handleEditorInit = (editor) => {

            // 직접 만든 UploadAdapter.js 적용
            editor.plugins.get('FileRepository')
                .createUploadAdapter =(loader) => {
                    return new UploadAdapter(loader);
                }

            editor.editing.view.change(writer => {
                writer.setStyle('height', '400px', 
                    editor.editing.view.document.getRoot());
            });
        };


        const handleWrite = async() => {
            const url = `/board101/insert.json`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                title : state.title,
                content : state.content,
                writer : state.writer,
            };

            const { data } = await axios.post(url, body, {headers});
            console.log(data);
            if(data.status === 200) {
                router.push({path:'/board1'});
            }
        };

        const handleBoard = () => {
            router.push({path:'/board1'});
        }

        return {
            state, 
            handleBoard,
            handleWrite, 
            handleEditorInit
        }
    }
}
</script>

<style lang="css" scoped>
    .container {
        width   : 710px;
        border  : 1px solid #cccccc;
        
        /* 12시 3시 6시 9시 순서로 여백*/
        margin  : 30px auto 0px auto;  
        padding : 30px;
    }
</style>

