Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    updateEscenario:false,
    reportModalVisible: false,
    createModalEscenario:false,
    customScenarios: []
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
    },
    addCustomScenario(state, customScenario){
      var newCustomScenario = {}
      Object.assign(newCustomScenario, customScenario)
      state.customScenarios.push(newCustomScenario)
    }
  }
})