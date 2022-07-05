<template>
    <div>
        메뉴1 컴포넌트 props<br />
        {{ state.title }}
        {{ state.content }}
        <button @click="handleButton">버튼</button>
        <hr />
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
    props:{   // 부모로 부터 전송되어야 하는 값을 정의
        title : String,    // 문자로 된 title
        content : String,  // 문자로 된 content
    },
    
    setup (props, { emit }) {   //props는 Admin에서 오는 값을 받는다.
        const state =  reactive({
            title : props.title,
            content : props.content + "추가된 문자"
        });

        const handleButton = () => {
            alert('버튼 클릭됨');

            //부모의 admin 이벤트 발생시킴
            emit('admin',{});
        };

        return {state, handleButton}
    }
}
</script>

<style lang="scss" scoped>

</style>