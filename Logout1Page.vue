<template>
    <div class="container">
        <div style="text-align:center">
            <h3>로그아웃</h3>
        </div>
    </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
export default {
    setup () {
        const store = useStore();
        const router = useRouter();

        onMounted(() => {
            alert('로그아웃 성공');
            sessionStorage.removeItem("TOKEN");
            store.commit('setLogged', false);
            router.push({path:'/'});
        });

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>

