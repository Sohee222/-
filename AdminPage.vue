<template>
    <div>
        <h3>관리자-컴포넌트</h3>
        <menu-1 :title="state.title" 
            :content="state.content"
            @admin="handleButton"></menu-1>

        <menu-2 
            name="홍길동" tel="010-0000-0000" 
            @admin1="handleButton1"></menu-2>
            
        <menu-3>
            <template #output>
                <input type="text" placeholder="slot" 
                v-model="state.slot" @admin2="handleButton2">
            </template>
        </menu-3>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';

import Menu1 from './admin/Menu1Page.vue';
import Menu2 from './admin/Menu2Page.vue';
import Menu3 from './admin/Menu3Page.vue';

export default {
    components : {
        Menu1, //<menu1
        Menu2, //<menu2 
        Menu3  //<menu3
    },
    setup () {
        const state = reactive({
            title : 'aaa',
            content : 'bbb',
            name : 'ccc',
            tel : 'ddd',
            slot : 'eee',
        });

        const handleButton = () => {
            alert('Menu1 컴포넌트에서 버튼 클릭');
        };  
        
        const handleButton1 = () => {
            alert('Menu2 컴포넌트에서 버튼 클릭');
        };    

        const handleButton2 = () => {
            alert('Menu3 컴포넌트에서 버튼 클릭');
        };    

        return {state, handleButton, handleButton1, handleButton2}
    }
}
</script>

<style lang="scss" scoped>

</style>