<template>
    <div>
        메뉴3 컴포넌트 <br />    
        <slot name="output"> </slot>  
        {{ state.type }}
        {{ state.placeholder }} 
      
        <button @click="handleButton">버튼</button>
        <hr />
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
    props:{
        slot : { 
        type : String,
        default:'asdf'
        }
    },
    
    setup (props, { emit }) {
        const state =  reactive({
            slot : props.slot
        });

        const handleButton = () => {
            emit('admin2', {});
        };

        return {state,handleButton}
    }
}
</script>

<style lang="scss" scoped>

</style>