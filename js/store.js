Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    reportModalVisible: false,
    createModalEscenario:false
  },
  mutations: {
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