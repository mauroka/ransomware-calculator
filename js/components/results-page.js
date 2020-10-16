Vue.component('results-page', {
    computed: {
        colors: function(){
            return{
                primary:"#4e73df",
                success: "#1cc88a", 
                info: "#36b9cc",                                        
                warning: "#f6c23e",
                danger: "#e74a3b",
                secondary:"#858796", 
            }
        }
    },
    data: function () {
        return {
            nombreEscenario:"Mejor escenario",
            data_scenarios: [],
            globalChart: undefined,
            reportView: false,
            reportViewPage: 1,
        }
    },
    props: ['user-data'],
    
    mounted: function(){
        console.log("mounted")
        this.createGlobalChart()
        this.update_scenarios()
    },
    methods: {
        
        enterModalEscenario: function(){
            this.$store.commit("showEscenarioModal")
            
        },

        exitModalEscenario: function(){
            this.$store.commit("dismissEscenarioModal")
        },
        enterReportView: function(){
            const RENDER_SIZE = "800px";
            //document.body.style.width = "2000px"
            var wrapper = document.getElementById("content-wrapper");
            
            wrapper.style.width=RENDER_SIZE;
            wrapper.style.fontSize="0.8em";
            var scale = 'scale(1)';
            document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
            document.body.style.msTransform =   scale;       // IE 9
            document.body.style.transform = scale;     // General
            this.reportView = true

            // show modal
            this.$store.commit("showReportModal")
        },
        exitReportView: function(){
            this.reportView = false
            var wrapper = document.getElementById("content-wrapper");
            wrapper.style.removeProperty("width");
            wrapper.style.fontSize="1em";
            // dismiss modal
            this.$store.commit("dismissReportModal")
        },
        generateReport: async function(){
            this.enterReportView();
            var t = this;
            setTimeout(async () => {
                await t.createPdf();
                t.exitReportView();
            }, (500));
        },
        createPdf: async function(){
            const { jsPDF } = window.jspdf;
            // portrait a4 page in mm
            const doc = new jsPDF('p', 'mm', 'a4');
            
            const PAGE_WIDTH = 210;
            const PAGE_HEIGHT = 297;
            const H_PADDING = 10;
            const V_PADDING = 25;
            
            var currentPageNum = 0;
            var d = new Date()
            var date=(""+d.getDate()).padStart('0',2)+"/"+(""+d.getMonth()).padStart('0',2)+"/"+d.getFullYear()

            var totalPages = this.data_scenarios.length*2 + 2 + 1

            async function renderRef(doc, elem, newPage=true, h_padding=H_PADDING, v_padding=V_PADDING){
                return await domtoimage.toPng(elem, {quality: 1})
                    .then(function (dataUrl) {
                        var page;
                        if(newPage){
                            page = doc.addPage();
                        }else{
                            page = doc;
                        }
                        
                        var imgRatio = elem.offsetWidth / elem.offsetHeight;
                        console.log("RATIO: "+imgRatio)

                        var IMAGE_WIDTH = PAGE_WIDTH-h_padding*2
                        
                        if(currentPageNum != 0){
                            page.setTextColor("#999");
                            page.setFontSize(9)
                            var a = "Informe de costos por infección de Ransomware\nGenerado el "+date;
                            var c = "Página "+currentPageNum+ " de "+totalPages
                            page.text(a, h_padding, v_padding*0.7);
                            page.text(c, PAGE_WIDTH-h_padding, PAGE_HEIGHT-10, "right");
                        }
                        currentPageNum = currentPageNum + 1
                        
                        page.addImage(dataUrl, 'PNG', h_padding, v_padding, IMAGE_WIDTH, IMAGE_WIDTH/imgRatio, "", "NONE");

                    })
                    .catch(function (error) {
                        console.error('Ha ocurrido un error'+error);
                    });
            }

            // render title page
            await renderRef(doc, this.$refs["report-title-page"], false, 0, 0)
            
            // render global chart and scenario cards
            await renderRef(doc, this.$refs["global-chart"])

            // render scenario details
            for(var i=0; i<this.data_scenarios.length; i++){
                var scenario_name = this.data_scenarios[i].nombre
                console.log("Rendering: "+this.data_scenarios[i].nombre)
                var elem = this.$refs[scenario_name][0].$vnode.elm
                this.reportViewPage = 1
                await renderRef(doc, elem)
                this.reportViewPage = 2
                await renderRef(doc, elem)
            }

            // render organization data
            this.reportViewPage = 1
            await renderRef(doc, this.$refs["organization-data"].$vnode.elm)
            this.reportViewPage = 2
            await renderRef(doc, this.$refs["organization-data"].$vnode.elm)

            // TODO: change file name
            doc.save("  Informe de costos por infección de Ransomware.pdf");        

        },
        createGlobalChart(){
            var ctx = document.getElementById('globalchart').getContext('2d');
            this.globalChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        data: [],
                        backgroundColor: []
                    }]
                },
                options:{
                    legend: {
                        display: false
                    },
                    tooltips: {
                        titleMarginBottom: 10,
                        titleFontColor: '#6e707e',
                        titleFontSize: 14,
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                        callbacks: {
                          label: function(tooltipItem, chart) {
                            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                            return datasetLabel + '$ ' + tooltipItem.yLabel;
                            },
                        }
                    }
                }
                
            });
        },
        register_scenario_total(scenario, total){
            //console.log("Registering total: "+scenario.nombre+" $"+total)
            var iScenario = this.find_scenario_index(scenario.nombre)
            this.data_scenarios[iScenario]['total'] = total
            this.data_scenarios[iScenario]['key'] = scenario.nombre+"_"+total
            this.updateGlobalChart()
        },
        find_scenario_index(scenario_name){
            for(var i=0; i<this.data_scenarios.length; i++){
                if(this.data_scenarios[i].nombre == scenario_name){
                    return i;
                }
            }
            return -1;
        },
        updateGlobalChart: function(){
            this.globalChart.data.labels = []
            this.globalChart.data.datasets[0].data = []
            this.globalChart.data.datasets[0].backgroundColor = []
            for(var i=0; i<this.data_scenarios.length; i++){
                //console.log("adding "+this.data_scenarios[i].nombre+" "+this.data_scenarios[i].total)
                this.globalChart.data.labels.push(this.data_scenarios[i].nombre);
                this.globalChart.data.datasets[0].data.push(this.data_scenarios[i].total)
                this.globalChart.data.datasets[0].backgroundColor.push(this.colors[this.data_scenarios[i].color])
            }
           
            this.globalChart.update()
        },
        update_scenario(scenarioName, scenarioData){
            var i = this.find_scenario_index(scenarioName);
            if(i != -1){
                this.data_scenarios[i] = scenarioData;
            }else{
                this.data_scenarios.push(scenarioData);
            }
        },
        update_scenarios: function(){
            // Mejor Escenario
            var dict_mejor_escenario = {}
            Object.assign(dict_mejor_escenario, this.userData);
            dict_mejor_escenario['nombre']='Mejor escenario'
            dict_mejor_escenario['decrypt_tool_exists'] = true
            dict_mejor_escenario['rescue_paid'] = 0
            dict_mejor_escenario['infected_terminals'] = 0.2
            dict_mejor_escenario['has_backup'] = true
            dict_mejor_escenario['data_is_exposed'] = false
            dict_mejor_escenario['color'] = 'primary'
            dict_mejor_escenario['total'] = 0
            dict_mejor_escenario['key'] =  dict_mejor_escenario['nombre'] +"_"+ Date.now()
            this.update_scenario("Mejor escenario", dict_mejor_escenario);

            // Optimista
            var dict_optimista = {}
            Object.assign(dict_optimista, this.userData);
            dict_optimista['nombre']='Optimista'
            dict_optimista['decrypt_tool_exists'] = true
            dict_optimista['rescue_paid'] = 0
            dict_optimista['infected_terminals'] = 0.5
            dict_optimista['has_backup'] = true
            dict_optimista['data_is_exposed'] = false
            dict_optimista['color'] = 'success'
            dict_optimista['total'] = 0
            dict_optimista['key'] =  dict_optimista['nombre'] +"_"+  Date.now()
            this.update_scenario("Optimista", dict_optimista);

            // Medio
            var dict_medio = {}
            Object.assign(dict_medio, this.userData);
            dict_medio['nombre']='Medio'
            dict_medio['decrypt_tool_exists'] = false
            dict_medio['rescue_paid'] = 1
            dict_medio['infected_terminals'] = 0.8
            dict_medio['has_backup'] = true
            dict_medio['data_is_exposed'] = true
            dict_medio['color'] = 'info'
            dict_medio['total'] = 0
            dict_medio['key'] =  dict_medio['nombre'] +"_"+  Date.now()
            this.update_scenario("Medio", dict_medio);

            // Pesimista
            var dict_pesimista = {}
            Object.assign(dict_pesimista, this.userData);
            dict_pesimista['nombre']='Pesimista'
            dict_pesimista['decrypt_tool_exists'] = false
            dict_pesimista['rescue_paid'] = 3
            dict_pesimista['infected_terminals'] = 0.8
            dict_pesimista['has_backup'] = true
            dict_pesimista['data_is_exposed'] = true
            dict_pesimista['color'] = 'warning'
            dict_pesimista['total'] = 0
            dict_pesimista['key'] =  dict_pesimista['nombre'] +"_"+  Date.now()
            this.update_scenario("Pesimista", dict_pesimista);

            // Desastroso
            var dict_desastroso = {}
            Object.assign(dict_desastroso, this.userData);
            dict_desastroso['nombre']='Desastroso'
            dict_desastroso['decrypt_tool_exists'] = false
            dict_desastroso['rescue_paid'] = 2
            dict_desastroso['infected_terminals'] = 1
            dict_desastroso['has_backup'] = false
            dict_desastroso['data_is_exposed'] = true
            dict_desastroso['color'] = 'danger'
            dict_desastroso['total'] = 0
            dict_desastroso['key'] =  dict_desastroso['nombre'] +"_"+  Date.now()
            this.update_scenario("Desastroso", dict_desastroso);

            // Tacaño
            var dict_tacanio = {}
            Object.assign(dict_tacanio, this.userData);
            dict_tacanio['nombre']='Tacaño'
            dict_tacanio['decrypt_tool_exists'] = false
            dict_tacanio['rescue_paid'] = 3
            dict_tacanio['infected_terminals'] = 1
            dict_tacanio['has_backup'] = false
            dict_tacanio['data_is_exposed'] = true
            dict_tacanio['color'] = 'secondary'
            dict_tacanio['total'] = 0
            dict_tacanio['key'] =  dict_tacanio['nombre'] +"_"+  Date.now()
            this.update_scenario("Tacaño", dict_tacanio);
            //console.log(JSON.stringify(this.data_scenarios))
            
            for(var i=0; i<this.$store.state.customScenarios.length; i++){
                var custom = {}
                var scenario = this.$store.state.customScenarios[i]
                console.log("Adding custom scenario: "+scenario.nombre)
                Object.assign(custom, this.userData);
                custom['nombre'] = scenario.nombre
                custom['decrypt_tool_exists'] = scenario.decrypt_tool_exists
                custom['rescue_paid'] = scenario.rescue_paid
                custom['infected_terminals'] = scenario.infected_terminals
                custom['has_backup'] = scenario.has_backup
                custom['data_is_exposed'] = scenario.data_is_exposed
                custom['color'] = 'secondary'
                custom['total'] = 0
                custom['key'] =  scenario.nombre +"_"+  Date.now()
                this.update_scenario(custom.nombre, custom);
            }
        },
        mostrarEscenario: function(nombre){
            this.nombreEscenario=nombre
        },
    },
    template: `
    
    <div class="col-lg-12">              
        <div class="row"  ref="global-chart">
            <div class="col-12">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="card-title m-0 font-weight-bold text-primary">
                            Escenarios posibles
                        </h6>
                    </div>
                    <div class="card-body offset-lg-2 col-lg-8 col-md-12 ">
                        <div class="card-body">
                            <div class="chart-pie-demo">
                                <canvas id="globalchart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
                                    
            <div class="col-12">
                <div v-show="!reportView" class="alert alert-warning" role="alert">
                    Haga clic en los siguientes indicadores para ver su detalle.
                </div>
            </div>

            
        
            <!--ESCENARIOS-->
            <scenario-card v-for="scenario in data_scenarios"
                :key="scenario.key"
                :label="scenario.nombre"
                :value="scenario.total"
                :color-class="scenario.color"
                v-on:click.native="mostrarEscenario(scenario.nombre)"
                >
            </scenario-card>

            
            
            <div v-if="$store.state.customScenarios.length<2" class="col-lg-4 col-md-6 mb-4 btn-escenario" v-on:click="enterModalEscenario()">
                <div class="card shadow h-100 py-2  border-left-success" >
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-uppercase mb-1 text-success" >Agregar esceneario personalizado</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800"> </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-plus fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
        
        
        <div class="row">
            <div class="col-12">
                <organization-info-report-page ref="organization-data" v-bind:user-data="userData" v-bind:report-view-page="reportViewPage" v-show="reportView"></organization-info-report-page>
            </div>
        </div>      

        <div class="row">
            <div id="descripcion-escenarios" class="col-lg-12">

                <scenario-detail v-for="scenario in data_scenarios"
                    :scenario-data="scenario"
                    v-on:total="register_scenario_total(scenario, $event)"
                    :key="scenario.key"
                    v-show="nombreEscenario == scenario.nombre || reportView"
                    class="scenario-detail"
                    :ref="scenario.nombre"
                    v-bind:report-view="reportView"
                    v-bind:report-view-page="reportViewPage"
                    >
                </scenario-detail>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12 mb-4">
                <div class="card shadow">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primaryoat-left">Detalle de los escenarios</h6>
                    </div>
                    <div class="card-body">
                        <table class="table table-responsive table-striped table-bordered table-hover scenario-details">
                            <thead class="thead-dark">
                                <tr>
                                    <th class="align-middle">Escenarios</th>
                                    <th class="align-middle" style="width:12%;">Mejor escenario</th>
                                    <th class="align-middle" style="width:12%;">Optimista</th>
                                    <th class="align-middle" style="width:12%;">Medio</th>
                                    <th class="align-middle" style="width:12%;">Pesimista</th>
                                    <th class="align-middle" style="width:12%;">Desastroso</th>
                                    <th class="align-middle" style="width:12%;">Tacaño</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="align-middle">Descifrador del Ransomware</td>
                                    <td class="align-middle" colspan="2">Existe descifrador</td>
                                    <td class="align-middle" colspan="4">No existe descifrador</td>
                                </tr>
                                <tr>
                                    <td class="align-middle">Pago del rescate</td>
                                    <td class="align-middle" colspan="2">No aplica</td>
                                    <td class="align-middle">Paga el rescate y obtiene la clave</td>
                                    <td class="align-middle">No paga el rescate</td>
                                    <td class="align-middle">Paga el rescate y no obtiene la clave</td>
                                    <td class="align-middle">No paga el rescate</td>
                                </tr>
                                <tr>
                                    <td class="align-middle">Porcentaje de equipos de la organización infectados por Ransomware
                                    </td>
                                    <td class="align-middle">20%</td>
                                    <td class="align-middle">50%</td>
                                    <td class="align-middle" colspan="2">80%</td>
                                    <td class="align-middle" colspan="2">100%</td>
                                </tr>
                                <tr>
                                    <td class="align-middle">Copias de seguridad y estado de las mismas </td>
                                    <td class="align-middle" colspan="4">Hay copias de seguridad y funcionan</td>
                                    <td class="align-middle" colspan="2">No hay copias de seguridad o no sirven</td>
                                </tr>
                                <tr>
                                    <td class="align-middle">Costo de reputación</td>
                                    <td class="align-middle" colspan="6">Existe un impacto en la imagen de la organización</td>
                                </tr>
                                <tr>
                                    <td class="align-middle">Costo de filtrado de información</td>
                                    <td class="align-middle" colspan="2">No se filtra información confidencial</td>
                                    <td class="align-middle" colspan="4">Se filtra información confidencial</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col" style="text-align: right;">
                <button type="button" class="btn btn-outline-primary" v-on:click="$emit('results-go-back')" role="button">Anterior</button> &nbsp;
                <button type="button" class="btn btn-outline-primary" v-on:click="generateReport()" role="button">Generar Informe</button>
            </div>
        </div>

        <div v-show="reportView" ref="report-title-page" class="report-title-page" style="position: relative; min-width: 2100px !important; min-height: 2970px !important; background-color: #4e73df; color: white; text-align: center;">
            <div style="position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%); ">
            <a class="sidebar-brand d-flex align-items-center justify-content-center" style="color: white;">
                <div class="sidebar-brand-icon" style="font-size: 256px;">
                    <i class="fas fa-chess-rook"></i>
                </div>
                &nbsp;
                &nbsp;
                <div class="sidebar-brand-text mx-3" style="font-size: 144px; font-weight: bold;">SA-MATE</div>
            </a>   
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <h1 style="font-size: 88px; line-height: 140px;">
                Informe de costos por infección de Ransomware
            </h1>
            </div>
        </div>
    </div>
    `
});