<template>
    <div>
        <h4>메뉴4 컴포넌트</h4>
        <slot name="output" v-bind:data="state"></slot>
        <hr />
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
    setup () {
        const state = reactive({
            userid : 'aaa',
            userpw : 'bbb'
        });

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>