<template>
    <div :class="width">
        <label>{{label}}</label>
        <input v-model="inputVal" v-telnumberformat />
        <span>{{error}}</span>
    </div>
</template>
<script lang="ts">
import InputComponent from './InputComponent';
export default InputComponent;
</script>
<style lang="css" scoped src="./InputComponent.css">

</style>