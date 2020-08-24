import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class InputComponent extends Vue {
    @Prop({type: String || Number})
    value!: '';

    get inputVal() {
        return this.value;
      }
    
    set inputVal(value: string | number) {
        this.$emit('input', value);
    }
}

