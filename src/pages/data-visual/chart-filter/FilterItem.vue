<template>
    <li class="d-chart-filter-item">
        <div class="label">
            {{meta.showName}}
        </div>
        <div class="control">
            
        </div>
    </li>
</template>

<script>
    import DDatePicker from './DatePicker'
    import DSelect from './Select'
    import DInputNumber from './InputNumber'
    import DInputText from './InputText'
    export default {
        name: 'DFilterItem',
        components: {DDatePicker, DSelect, DInputNumber, DInputText},
        props: {
            meta: Object
        }
    }
</script>

<style>
    .d-chart-filter-item .label {
        text-align: right;
    }
</style>