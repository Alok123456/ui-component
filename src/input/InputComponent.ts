import { Vue, Component, Prop } from 'vue-property-decorator';
import { ILimits } from '@/models/limits';

@Component({
    directives: {
        telnumberformat: {
            bind: function (el : any, binding:any, vnode : any) {
              binding.def.handleKeyUp(el);
            },
            update: function (el : any, binding:any, vnode : any) {
              binding.def.handleKeyUp(el);
            },
            inserted: (el : any, binding: any, vnode : any) => {
              el.addEventListener("keyup", (evt: any) => {
                if (
                  evt.keyCode == 37 ||
                  evt.keyCode == 38 ||
                  evt.keyCode == 39 ||
                  evt.keyCode == 40
                ) {
                  return;
                }
                binding.def.handleKeyUp(el);
              });
            },
            handleKeyUp: (input : any) => {
              var val = input.value;
          
              var cursorIndex = input.selectionStart;
          
              var objReg = /\D/;
              for (var i = 0; i < cursorIndex; i++) {
                var sub = val.substr(i, 1);
                var test = objReg.test(sub.toString());
                if (test) {
                  cursorIndex--;
                }
              }
          
              val = val.replace(/\D/g, "").substring(0, 10);
          
              if (cursorIndex < 3) {
                cursorIndex += 1;
              } else if (cursorIndex > 2 && cursorIndex < 6) {
                cursorIndex += 3;
              } else {
                cursorIndex += 4;
              }
              const zip = val && val.substring(0, 3);
              const middle = val && val.substring(3, 6);
              const last = val && val.substring(6, 10);
              if (val.length == 0 || val.charAt(0) == '0') {
                val = "";
              } else if (val.length < 4) {
                //val = `(${zip}`
              } else if (val.length < 7) {
                val = `(${zip}) ${middle}`;
              } else {
                val = `(${zip}) ${middle}-${last}`;
              }
          
              input.value = val;
              const phone_error = document.querySelector('#phone_validation');
              if(phone_error) {
                phone_error.remove();
              }
              // if(input.value.length > 0 && input.value.length < 14) {
              //   var node = document.createElement("span");           
              //   node.id = 'phone_validation';
              //   var textnode = document.createTextNode("Phone number is invalid");
              //   node.appendChild(textnode);
              //   node.setAttribute('style', 'color:#c90000')                 
              //   input.parentNode.appendChild(node);
              //   input.setAttribute('style', 'border: 1px solid #c90000;')
              // } else {
              //   phone_error && phone_error.remove();
              //   input.setAttribute('style', 'border: 1px solid #c4cdd8;')
              // }
              //input.focus();
              //input.setSelectionRange(cursorIndex, cursorIndex);
            }
          }
    }
  })
export default class InputComponent extends Vue {
    @Prop({type: String})
    value!: '';

    @Prop({type: String, default: ''})
    label!: '';

    @Prop({type:String})
    inputType!: '';

    @Prop()
    width!: '';

    error: string = '';
    limits: Array<ILimits> = [{limit: 20, value: 'name'},
                            {limit: 50, value: 'description'}]

    validateMaxLength() {
      var want = this.limits.find((x) => x.value === this.inputType);
      if(want && (this.value.length > want.limit)){
          this.error = 'Limit exceeds';
      } else {
        this.error = '';
      }
    }

    get inputVal() {
        return this.value;
      }
    
    set inputVal(value: string) {
        this.validateMaxLength();
        this.$emit('input', value);
    }
}

