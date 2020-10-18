
Vue.component('create-escenario', {
    data: function(){
        return {
            triedValidation: false,
            customScenarioData: {
                nombre:undefined,
                decrypt_tool_exists: false,
                rescue_paid: 0,
                infected_terminals:0,
                has_backup:false,
                data_is_exposed:false,
            }
        }
    },
    computed:{
        nameIsValid: function(){
            return this.customScenarioData.nombre != ""
        },
        rescuePaidIsValid: function(){
            return this.customScenarioData.decrypt_tool_exists || this.customScenarioData.rescue_paid != 0
        },
        infectedTerminalsIsValid: function(){
            return this.customScenarioData.infected_terminals > 0 && this.customScenarioData.infected_terminals <= 100 
        }
    },
    methods:{
        validate: function(){
            this.triedValidation = true
            this.customScenarioData.nombre = this.customScenarioData.nombre.trim()
            return this.nameIsValid && this.rescuePaidIsValid && this.infectedTerminalsIsValid
        },
        crear_escenario: function(){
            if(!this.validate()) return;
            this.customScenarioData.infected_terminals /= 100
            if(this.customScenarioData.decrypt_tool_exists){
                this.customScenarioData.rescue_paid = 0
            }
            this.$store.commit("addCustomScenario", this.customScenarioData)
            this.$emit("update-scenarios")
            this.$bvModal.hide('bv-modal-example')
            this.$emit("scroll-up")
        },
        onModalShow: function(){
            this.triedValidation = false
            this.customScenarioData = {
                nombre: '',
                decrypt_tool_exists: false,
                rescue_paid: 0,
                infected_terminals: 0,
                has_backup:false,
                data_is_exposed:false,
            }
        }
    },
    
    template: `
    
    <b-modal v-on:show="onModalShow" id="bv-modal-example" hide-footer v-model="$store.state.createModalEscenario" title="Agregar escenario personalizado">
          <form>
            <div class="form-group">
                <label>Nombre del escenario</label>
                <b-form-input autofocus maxlength="20" :class="{'is-invalid': triedValidation && !nameIsValid}" class="form-control" type="text" v-model="customScenarioData.nombre"></b-form-input>
                <h6 v-show="triedValidation && !nameIsValid" class="text-danger">Por favor, ingrese un nombre para el escenario</h6>
            </div>

            <div class="custom-control custom-switch form-group">
                <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="customScenarioData.decrypt_tool_exists">
                <label class="custom-control-label" for="customSwitch1">Existe descifrador para el ransomware</label>
            </div>

            <div class="form-group" :class="{'is-invalid': triedValidation && !rescuePaidIsValid}" v-if="!customScenarioData.decrypt_tool_exists">
                <label>Pago del rescate</label>
                <select class="custom-select" v-model="customScenarioData.rescue_paid">
                    <option value="1">Paga el rescate y obtiene la clave</option>
                    <option value="2">Paga el rescate y no obtiene la clave</option>
                    <option value="3">No paga el rescate</option>
                </select>
                <h6 v-show="triedValidation && !rescuePaidIsValid" class="text-danger">Por favor, seleccione un valor</h6>
            </div>

            <div class="form-group">
                <label>Porcentaje de Equipos Infectados por Ransomware</label>
                <input class="form-control" type="number" :class="{'is-invalid': triedValidation && !infectedTerminalsIsValid}" v-model="customScenarioData.infected_terminals">
                <h6 v-show="triedValidation && !infectedTerminalsIsValid" class="text-danger">Por favor, ingrese un valor entre 1 y 100</h6>
            </div>

            <div class="custom-control custom-switch form-group">
                
                <input type="checkbox"  class="custom-control-input" id="customSwitch2" v-model="customScenarioData.has_backup">
                <label class="custom-control-label" for="customSwitch2">Hay copias de seguridad y funcionan</label>
            </div>
            <div class="custom-control custom-switch form-group">
                
                <input type="checkbox" class="custom-control-input" id="customSwitch3" v-model="customScenarioData.data_is_exposed">
                <label class="custom-control-label" for="customSwitch3">Se filtra información confidencial</label>
            </div>
            
            

            

            
          </form>
          <b-button variant="primary" class="mt-3" block @click="crear_escenario()">Agregar</b-button>
    </b-modal>
    `
    });