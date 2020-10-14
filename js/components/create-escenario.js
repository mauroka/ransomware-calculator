
Vue.component('create-escenario', {
    data: function(){
        return {
            activo: true
        }
    },
    
    template: `
    
    <b-modal id="bv-modal-example" hide-footer v-model="$store.state.createModalEscenario" title="Personalizar Escenario">
        
          <form>
            <div class="form-group">
                <label>nombre esceneario</label>
                <input class="form-control" type="text" placeholder="Nombre escenario" >
            </div>

            <div class="custom-control custom-switch form-group">
                
                <input type="checkbox"  class="custom-control-input" id="customSwitch1" v-model="activo">
                <label class="custom-control-label" for="customSwitch1">Existe descifrador para el ransomware?</label>
            </div>

            <div class="form-group" v-if="!activo">
                <select class="custom-select">
                    
                    <option value="1">Paga el rescate y obtiene la clave</option>
                    <option value="2">Paga el rescate y no obtiene la clave</option>
                    <option value="3">No paga el rescate</option>
                    
                    
                </select>
            </div>

            <div class="form-group">
                <label>Porcentaje de Equipos Infectados por Ransomware</label>
                <input class="form-control" type="number" placeholder="0" >
            </div>

            <div class="custom-control custom-switch form-group">
                
                <input type="checkbox"  class="custom-control-input" id="customSwitch2" >
                <label class="custom-control-label" for="customSwitch2">Hay copias de seguridad y funcionan</label>
            </div>
            <div class="custom-control custom-switch form-group">
                
                <input type="checkbox"  class="custom-control-input" id="customSwitch3" >
                <label class="custom-control-label" for="customSwitch3">Se filtra información confidencial</label>
            </div>
            
            

            

            
          </form>
          <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Send</b-button>
    </b-modal>
    `
    });