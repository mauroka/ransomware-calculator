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
            reportView: false
        }
    },
    props: ['user-data'],
    
    mounted: function(){
        console.log("mounted")
        this.createGlobalChart()
        this.update_scenarios()
    },
    methods: {
        createPdf: async function(){
            const { jsPDF } = window.jspdf;
                
            const doc = new jsPDF();
            
            const RENDER_SIZE = "800px";
            const H_PADDING = 10;
            const V_PADDING = 10;


            // START report mode
            //this.$refs['report-process-modal'].show()
            var wrapper = document.getElementById("content-wrapper")
            wrapper.style.width=RENDER_SIZE;
            wrapper.style.fontSize="0.7em";
            var scale = 'scale(1)';
                document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
                document.body.style.msTransform =   scale;       // IE 9
                document.body.style.transform = scale;     // General
            this.reportView = true

            // TODO: mostrar modal
            
            // TODO: BORRAR ESTO A LA MIERDA Y METER UN RENDER ELEMENT
            async function renderRef(doc, elem){
                
                return await domtoimage.toPng(elem, {bgcolor: '#FFF', quality: 1})
                    .then(function (dataUrl) {
                        var page = doc.addPage()
                        page.addImage(dataUrl, 'PNG', H_PADDING, V_PADDING);
                        console.log(`rendering page`)
                    })
                    .catch(function (error) {
                        console.error('Ha ocurrido un error', JSON.stringify(error));
                    });
            }
            await renderRef(doc, this.$refs["global-chart"])
            await renderRef(doc, this.$refs["inputs"])
            

            
            for(var i=0; i<this.data_scenarios.length; i++){
                var scenario_name = this.data_scenarios[i].nombre
                var elem = this.$refs[scenario_name][0].$vnode.elm
                this.showOnlyDetails = false
                await renderRef(doc, elem)
            }

            // UNDO report mode
            this.reportView = false
            wrapper.style.removeProperty("width")
            wrapper.style.fontSize="1em";
            doc.save("a4.pdf");
            //this.$refs['report-process-modal'].hide()

            //var pages = data_scenarios.getElementsByClassName("scenario-detail");
            //var pages = 
            /*console.log(pages);
            function renderPage(pages, currentPage){
                var elem = pages[currentPage];
                
                window.setTimeout(function(){
                    domtoimage.toPng(elem, {bgcolor: '#FFF'})
                        .then(function (dataUrl) {
                            
                            var page = doc.addPage()
                            page.addImage(dataUrl, 'JPEG', 0, 0);
                            console.log("rendering page "+currentPage)
                            
                            if(currentPage+1 < pages.length){
                                renderPage(pages, currentPage+1);
                            }else{
                                // restore element size
                                document.body.style.removeProperty("width")
                                doc.save("a4.pdf");
                            }
                        })
                        .catch(function (error) {
                            alert("Ha ocurrido un error: "+error)
                            console.error('Ha ocurrido un error', error);
                        });
                }, 0.5);
                
            }*/
            //renderPage(pages, 0)            
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
            console.log("Registering total: "+scenario.nombre+" $"+total)
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
                console.log("adding "+this.data_scenarios[i].nombre+" "+this.data_scenarios[i].total)
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
            
            // otro
            /*var otro = {}
            Object.assign(otro, this.userData);
            otro['nombre'] = 'Otro'
            otro['decrypt_tool_exists'] = false
            otro['rescue_paid'] = 2
            otro['infected_terminals'] = 0.8
            otro['has_backup'] = false
            otro['data_is_exposed'] = true
            otro['color'] = 'secondary'
            otro['total'] = 0
            this.data_scenarios.push(otro)
            */
            this.mostrarEscenario(this.nombreEscenario)
            this.updateGlobalChart()
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
                            Resultados
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
        </div>
        <div class="col-12" ref="inputs">
            <div v-show="reportView" class="alert alert-warning" role="alert">
                <table class="table table-striped table-bordered table-hover specific-scenario-details report-page">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Campos</th>
                        <th scope="col">Datos ingresados</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Duración en horas de la jornada laboral en su organización</th>
                        <td scope="col">{{userData.hLab}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Costo promedio por hora de un empleado administrativo de su organización</th>
                        <td scope="col">{{userData.cHorasEmpleado}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Cantidad de equipos informáticos de su organización (PC, ordenadores, desktops)</th>
                        <td scope="col">{{userData.cantEquipos}}</td>
                    </tr>
                </tbody>
                </table>

                <table class="table table-striped table-bordered table-hover specific-scenario-details report-page">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Campos</th>
                        <th scope="col">Datos ingresados</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Frecuencia en horas mediante la cual se realizan copias de seguridad en su organización</th>
                        <td scope="col">{{userData.chUltiBackup}}</td>
                    </tr>
                    <tr>
                        <th scope="row">. ¿Cuántas horas laborales piensa que necesitaría trabajar cada usuario para regenerar toda la información que se considere relevante en su puesto de trabajo?</th>
                        <td scope="col">{{userData.chRegeInfoTotal}}</td>
                    </tr>
                </tbody>
                </table>

                <table class="table table-striped table-bordered table-hover specific-scenario-details report-page">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Campos</th>
                        <th scope="col">Datos ingresados</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Cantidad de horas necesarias para limpiar cada equipo informático</th>
                        <td scope="col">{{userData.chFormatear}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Costo para limpiar cada equipo informático</th>
                        <td scope="col">{{userData.cFormatear}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Cantidad de equipos informáticos que se pueden limpiar en paralelo</th>
                        <td scope="col">{{userData.cantEquiposParaleloFormatear}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Cantidad de horas necesarias para restaurar la información en cada equipo informático</th>
                        <td scope="col">{{userData.chRestaurar}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Costo para restaurar la información en cada equipo informático</th>
                        <td scope="col">{{userData.cRestaurar}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Cantidad de equipos informáticos que se pueden restaurar en paralelo</th>
                        <td scope="col">{{userData.cantEquiposParaleloRestaurar}}</td>
                    </tr>
                </tbody>
                </table>

                <table class="table table-striped table-bordered table-hover specific-scenario-details report-page">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Campos</th>
                        <th scope="col">Datos ingresados</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Costo del rescate solicitado por el ciberdelincuente</th>
                        <td scope="col">{{userData.cRescate}}</td>
                    </tr>
                </tbody>
                </table>

                <table class="table table-striped table-bordered table-hover specific-scenario-details report-page">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Campos</th>
                        <th scope="col">Datos ingresados</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Porcentaje de equipos informáticos que deben recuperarse para que el incidente se considere controlado</th>
                        <td scope="col">{{userData.porcenEquiposInfectados}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Costo de oportunidad diario producto de tener el negocio parado</th>
                        <td scope="col">{{userData.cOportunidadVentas}}</td>
                    </tr>
                    <tr>
                        <th scope="row">¿Cuál piensa que sería el costo de reputación en el cual incurriría la organización debido a los problemas en su imagen?</th>
                        <td scope="col">{{userData.cReputacion}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Si los ciberdelincuentes filtran la información secuestrada (práctica conocida como Doxxing) ¿Cuál piensa que sería el costo que esta acción podría implicar para la organización?</th>
                        <td scope="col">{{userData.cFiltradoInfo}}</td>
                    </tr>
                </tbody>
                </table>
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
                <button type="button" class="btn btn-outline-primary" v-on:click="createPdf()" role="button">Generar Informe</button>
            </div>
        </div>  
    </div>
    `
});