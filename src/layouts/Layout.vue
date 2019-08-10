<template>
    <div class="d-layout">
        <div class="d-head">
            <div class="d-logo">
                <span v-if="!$slots.logo">{{logo}}</span>
                <slot name="logo"></slot>
            </div>
            <div class="d-head-nav">
                <slot></slot>
            </div>
        </div>
        <div class="d-container">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DLayout',
        props: {
            logo: String // logo标题
        }
    }
</script>

<style>
</style>