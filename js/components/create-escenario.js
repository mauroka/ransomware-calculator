
Vue.component('create-escenario', {
    data: function(){
        return {
            customScenarioData: {
                nombre:undefined,
                decrypt_tool_exists: false,
                rescue_paid: 0,
                infected_terminals:undefined,
                has_backup:false,
                data_is_exposed:false,
            }
        }
    },

    methods:{
        crear_escenario: function(){
            this.customScenarioData.infected_terminals /= 100
            this.$store.commit("addCustomScenario", this.customScenarioData)
            this.$emit("update-scenarios")
            this.$bvModal.hide('bv-modal-example')
        }
    },
    
    template: `
    
    <b-modal id="bv-modal-example" hide-footer v-model="$store.state.createModalEscenario" title="Agregar escenario personalizado">
        
          <form>
            <div class="form-group">
                <label>Nombre del escenario</label>
                <input class="form-control" type="text" placeholder="Escenario personalizado" v-model="customScenarioData.nombre">
            </div>

            <div class="custom-control custom-switch form-group">
                <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="customScenarioData.decrypt_tool_exists">
                <label class="custom-control-label" for="customSwitch1">Existe descifrador para el ransomware</label>
            </div>

            <div class="form-group" v-if="!customScenarioData.decrypt_tool_exists">
                <label>Pago del rescate</label>
                <select class="custom-select" v-model="customScenarioData.rescue_paid">
                    
                    <option value="1">Paga el rescate y obtiene la clave</option>
                    <option value="2">Paga el rescate y no obtiene la clave</option>
                    <option value="3">No paga el rescate</option>
                    
                    
                </select>
            </div>

            <div class="form-group">
                <label>Porcentaje de Equipos Infectados por Ransomware</label>
                <input class="form-control" type="number" placeholder="0" v-model="customScenarioData.infected_terminals">
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