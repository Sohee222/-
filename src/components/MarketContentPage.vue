<template>
    <div>
        {{state}}
     
        
        <el-select v-model="state.count" placeholder="Select">
            <el-option v-for="item in 100" :key="item"
                    :label="item"
                    :value="item"/>
        </el-select>      
        <el-button type="primary" @click="handleOrder">주문하기</el-button>       

    </div>
    
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
export default {
    setup () {
        const route = useRoute();
        const router = useRouter();
        
        const state = reactive({
            code : Number(route.query.code),
            count : 1,
            token : sessionStorage.getItem("TOKEN")
        })

        const handleOrder = () => {
            // 로그인 사용자의 토큰
            // 주문수량과 물품번호
            if(state.token !== null ) {
                alert('주문이 완료되었습니다.');
            }
            else {
                router.push({path:'/login1'});
            }
        }

        return {state, handleOrder}
    }
}
</script>

<style lang="scss" scoped>

</style>