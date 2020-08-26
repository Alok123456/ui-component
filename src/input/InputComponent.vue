<template>
    <div :class="width" class="input-group">
        <label v-if="label">{{label}}<span class="asterisk" v-if="required">*</span></label>
        <input v-model="inputVal" v-telnumberformat />
        <span class="error-message">{{error}}</span>
    </div>
</template>
<script lang="ts">
import InputComponent from './InputComponent';
export default InputComponent;
</script>
<style lang="css" scoped src="./InputComponent.css">

</style>