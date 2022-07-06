<template>
    <div>
        메뉴2 컴포넌트<br />
        {{ state.name }}
        {{ state.tel }}
        <button @click="handleButton">버튼</button>        
        <hr />
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
    props:{
        name:{
        type : String,
        default:'aaa2'
        },

        tel : { 
        type : String,
        default:'bbb2'
        }
    },
    
    setup (props, { emit }) {
        const state =  reactive({
            name : props.name,
            tel : props.tel
        });

        const handleButton = () => {
            emit('admin1', {});
        };

        return {state, handleButton}
    }
}
</script>

<style lang="scss" scoped>

</style>

