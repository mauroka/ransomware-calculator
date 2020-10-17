
Vue.component('report-modal', {
    props: ["report-progress"],
    template: `
    <b-modal
        no-close-on-backdrop
        no-close-on-esc
        hide-header-close
        hide-footer
        hide-header
        v-model="$store.state.reportModalVisible"
        >
        
        <p style="text-align: center; font-size: 36px;">
            <i class="fas fa-cog fa-spin"></i>
            
        </p>
        
        <p style="text-align: center;">
            Generando reporte ({{(reportProgress*100).toFixed(0)}} %)<br>
            <!--progress value="32" max="100" style="height: 2px; border: none; background-color: red;"> 32% </progress-->
            
        </p>
        <p style="text-align: center; font-size: 36px;">
            
        </p>
    </b-modal>
    `
    });