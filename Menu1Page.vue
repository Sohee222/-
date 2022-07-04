<template>
    <div>
        메뉴1 컴포넌트<br />
        {{ state.title }}
        {{ state.content }}
        <button @click="handleButton">버튼</button>
        <hr />
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
    props:{
        title : String,
        content : String,
    },
    
    setup (props, { emit }) {
        const state =  reactive({
            title : props.title,
            content : props.content + "!!!"
        });

        const handleButton = () => {
            emit('admin',{});
        };

        return {state, handleButton}
    }
}
</script>

<style lang="scss" scoped>

</style>


