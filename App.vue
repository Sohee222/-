<template>
  <div>
    <router-link to="/"><button>메인</button></router-link>
    <router-link to="/login"><button>로그인</button></router-link>
    <router-link to="/join"><button>회원가입</button></router-link>
    <router-link to="/board"><button>게시판</button></router-link>    
    <router-link to="/item"><button>물품</button></router-link>   
    <router-link to="/admin"><button>관리자</button></router-link>   
    <hr />

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

