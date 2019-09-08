<template>
    <div class="d-chart-preview">
        <div class="d-chart-container"></div>
    </div>
</template>

<script>
    export default {
        name: 'DChartPreviewModule'
    }
</script>

<style>
    .d-chart-preview {
        width: calc(100% - 180px);
        display: table-cell;
        vertical-align: top;
        padding: 10px;
    }

    .d-chart-container {
        width: 100%;
        min-height: 400px;
        background: #ffffff;
    }
</style>