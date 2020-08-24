<template>
    <div class="">
    
        <label>Label</label>
    
        <input v-model="inputVal" />
    
    </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: 'Input',
    props: {
        value: {
            type: String || Number,
            default: null
        }
    },
    computed: {
        inputVal: {
            get: function() {
                return this.value;
            },
            set: function(value) {
                this.$emit('input', value);
            }
        }
    }
})
// import InputComponent from './InputComponent';
// export default InputComponent;
</script>
<style lang="css" scoped src="./InputComponent.css">

</style>