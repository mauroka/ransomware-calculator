Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    updateEscenario:false,
    reportModalVisible: false,
    createModalEscenario:false,
    dataEscenarioPer:{
      activo: false,
      nombre:undefined,
      rescate:undefined,
      porcenEquiposInfectados:undefined,
      backup:false,
      informacionConfidencial:false,
    },
    
    
  },
  mutations: {
    escenarioPersonalizado (state){
      state.updateEscenario=true;
    },
    showReportModal (state) {
        state.reportModalVisible = true;
    },
    dismissReportModal(state){
        state.reportModalVisible = false;
    },
    showEscenarioModal(state){
      state.createModalEscenario=true;
    },
    dismissEscenarioModal(state){
      state.createModalEscenario=false;
    }
  }
})