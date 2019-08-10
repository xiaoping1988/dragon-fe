<template>
    <div class="d-content">
        <div class="d-content-side d-side-nav" v-if="$slots.side">
            <slot name="side"></slot>
        </div>
        <div class="d-content-main" :style="contentMainStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DPageContent',
        computed: {
            contentMainStyle () {
                if (this.$slots.side) {
                    return {width: 'calc(100% - 195px)'}
                }
                return {width: '100%'}
            }
        }
    }
</script>

<style>

</style>