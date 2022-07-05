<template>
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
        </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>


</style>

