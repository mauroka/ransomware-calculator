
Vue.component('report-modal', {
    template: `
    <b-modal
        no-close-on-backdrop
        no-close-on-esc
        hide-header-close
        hide-footer
        v-model="$store.state.reportModalVisible"
        title="Generando reporte">
        <p style="text-align: center; font-size: 32px;">
            <i class="fas fa-cog fa-spin"></i>
        </p>
    </b-modal>
    `
    });