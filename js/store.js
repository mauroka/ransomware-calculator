Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    reportModalVisible: false
  },
  mutations: {
    showReportModal (state) {
        state.reportModalVisible = true;
    },
    dismissReportModal(state){
        state.reportModalVisible = false;
    }
  }
})