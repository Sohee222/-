<template>
    <div>
        <h3>AdminPage</h3>
        <menu-1-page title="전송되는제목"
            content="전송되는내용" @admin="handleClick"></menu-1-page>

        <menu-3-page>
            <template #output>
                <button @click="handleClick3">버튼</button>
            </template>
            <template #main>
                <label>메인</label>
            </template>
        </menu-3-page>    

        <menu-4-page>
            <template #output="slotProps">
                {{slotProps}}
                <input type="text" placeholder="아이디" 
                    :value="slotProps.data.userid"/>
            </template>
        </menu-4-page>
    </div>
</template>

<script>
import Menu1Page from './admin/Menu1Page.vue';
import Menu3Page from './admin/Menu3Page.vue';
import Menu4Page from './admin/Menu4Page.vue';

export default {
    components:{   //남이 만들어 놓은 conponets를 쓰기 위해
        Menu1Page,
        Menu3Page,
        Menu4Page,
    },  

    setup () {
        const handleClick = () => {
            alert('부모 handleclick');
        }

        const handleClick3 = () => {
            alert('부모 handleclick3');
        }

        return {handleClick, handleClick3}
    }
}
</script>

<style lang="scss" scoped>

</style>