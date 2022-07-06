<template>
    <div class="container">
        <h3>물품목록</h3>
        <router-link to="/iteminsert">물품등록</router-link>


        <el-table :data="state.row" style="width: 100%"
            :default-sort="{ prop: 'name', order: 'ascending' }">
            <el-table-column prop="_id" label="번호" width="60" />

            <el-table-column label="_id" width="120">
                <template #default="scope">
                    <router-link :to="{path:'/itemc', query:{no:scope.row._id}}">{{scope.row._id}}</router-link>
                </template>
            </el-table-column>        
            

            <el-table-column sortable prop="name" label="물품명" />
            <el-table-column prop="content" label="내용" />
            <el-table-column prop="price" label="가격" width="100" />
            <el-table-column prop="quantity" label="수량" width="100" />
            <el-table-column prop="regdate" label="등록일" />

            <el-table-column label="이미지" width="120">
                <template #default="scope">
                    <img :src="scope.row.img" style="width:50px"/>
                </template>
            </el-table-column>

            <el-table-column label="버튼">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <el-pagination background layout="prev, pager, next" :total="state.total"
            :page-size="12"
            @current-change="handlePage" style ="width:400px; margin:0 auto;" />


        <!-- 삭제 확인용 다이얼로그 -->
        <el-dialog v-model="state.dialogVisible" 
            title="삭제" width="30%">
            <span>삭제 할까요?</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="handleDeleteAction">확인</el-button>
                    <el-button @click="state.dialogVisible=false">취소</el-button>
                </span>
            </template>
        </el-dialog>


        <!-- 수정용 다이얼로그 -->
        <el-dialog v-model="state.dialogVisible1" 
            title="수정" width="50%">

            <el-form label-width="120px">
                <el-form-item label="물품번호">
                    <el-input v-model="state.currentRow._id" readonly />
                </el-form-item>
                <el-form-item label="물품명">
                    <el-input v-model="state.currentRow.name" />
                </el-form-item>
                <el-form-item label="물품설명">
                    <el-input v-model="state.currentRow.content"
                        type="textarea" rows="6" />
                </el-form-item>
                <el-form-item label="가격">
                    <el-input v-model="state.currentRow.price"
                        type="number" />
                </el-form-item>
                <el-form-item label="수량">
                    <el-input v-model="state.currentRow.quantity" 
                        type="number" />
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="handleUpdateAction">확인</el-button>
                    <el-button @click="state.dialogVisible1=false">취소</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios';
import { onMounted } from '@vue/runtime-core';
export default {
    setup () {

        const state = reactive({
            dialogVisible : false,  // 삭제용 다이얼로그
            dialogVisible1 : false, // 수정용 다이얼로그

            page : 1,
            row  : [], //[{},{}...{}]   // 목록
            total : 0,    // 전체 개시물 개수
            pages : 0,   
            currentRow : '', 
        });

        const handleData = async() => {
            const url = `/item101/selectlistpage.json?page=${state.page}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                state.row = response.data.result;
                state.total = response.data.total;
                state.pages 
                    = Math.floor( (response.data.total-1)/12 )+1;
            }
        };

        onMounted(()=>{
            handleData();
        });

        const handlePage = (page) => {
            console.log(page);
            state.page = page;
            handleData();
        };

        const handleDelete = (idx, row) =>{
            console.log(idx, row);
            state.currentRow = row; // 현재 클릭한 내용의 정보를 보관
            state.dialogVisible = true; // 다이얼로그 띄우기
        }

        const handleDeleteAction = async() => {
            const url = `/item101/delete.json?no=${state.currentRow._id}`;
            const headers = {"Content-Type":"application/json"};
            const { data } 
                = await axios.delete(url, {headers:headers, data:{}});
            console.log(data);
            if(data.status === 200){
                state.page = 1;
                handleData();
                state.dialogVisible = false;
            }
        }

        const handleEdit = (idx, row) =>{
            console.log(idx, row);
            state.currentRow = row; // 현재 클릭한 내용의 정보를 보관
            state.dialogVisible1 = true; // 다이얼로그 띄우기
        }

        const handleUpdateAction = async() =>{
            console.log()
            const url = `/item101/update.json`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                no : Number(state.currentRow._id),
                name : state.currentRow.name,
                content : state.currentRow.content,
                price : Number(state.currentRow.price),
                quantity : Number(state.currentRow.quantity),
            }
        
            const { data } = await axios.put(url, body, {headers});

                if(data.status === 200){
                    handleData();   //목록 새로 읽기
                    state.dialogVisible1 = false;  // 다이얼로그 숨기기
            }
        }

        return {
            state, 
            handlePage, 
            handleDelete,
            handleDeleteAction,
            handleEdit,
            handleUpdateAction
        }
    }
}
</script>

<style lang="css" scoped>
    .container {
        width   : 100%;
        padding : 20px;
    }
</style>
