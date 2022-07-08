<template>
<div style="min-width:900px">
<div>
  <el-menu class ="el-menu-demo"
    background-color="#545c64"  
    text-color="#fff"
    active-text-color="#ffd04b"
    mode="horizontal" :router="true">    

        <el-menu-item index="/">메인</el-menu-item>
        <el-menu-item index="/login">로그인</el-menu-item>
        <el-menu-item index="/join">회원가입</el-menu-item>
        <el-menu-item index="/board">게시판</el-menu-item>
        <el-menu-item index="/item">물품</el-menu-item>
        <el-menu-item index="/admin">관리자</el-menu-item>
        <el-menu-item index="/board1">게시판1</el-menu-item>
        <el-menu-item index="/market">쇼핑몰</el-menu-item>                
                                              
        <el-menu-item index="/login1" v-if="state.logged === false">로그인1</el-menu-item>
        <el-menu-item index="/join1" v-if="!state.logged">회원가입1</el-menu-item>
        <el-menu-item index="/mypage1" v-if="state.logged">마이페이지1</el-menu-item>
        <el-menu-item index="/logout1" v-if="state.logged">로그아웃1</el-menu-item>
        
        <el-menu-item index="/login2">로그인2</el-menu-item>    

        </el-menu>
        {{state}}
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core';
export default {
  setup () {
    const store = useStore();

    const state = reactive({
      logged : computed( () => store.getters.getLogged) // 가지고 오는거
    });
    
    return {state}
  }
}
</script>

<style lang="css" scoped>

</style>

