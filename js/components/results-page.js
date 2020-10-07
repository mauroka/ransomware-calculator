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
            nombreEscenario:"",
            scenario_totals: {},
            data_scenarios: [],
            x : 0,
        }
    },
    
    methods: {
        createPdf:function(){
            this.mostrar_cn=true
            this.mostrar_ct=true
            const { jsPDF } = window.jspdf;
                const doc = new jsPDF({
                orientation:"portrait",
            });
            
            const RENDER_SIZE = "1000px";
            document.body.style.width=RENDER_SIZE;
            
            var pages = document.getElementsByClassName("report-page");
            console.log(pages);
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
                
            }
            renderPage(pages, 0)            
        },
        updateGlobalChart(){
            var ctx = document.getElementById('globalchart').getContext('2d');
            var totals = [];
            var nombre  = [];
            var backgroundColors  = [];
            for (const escenarios in this.data_scenarios) {
                totals.push(this.data_scenarios[escenarios].total);
                nombre.push(this.data_scenarios[escenarios].nombre)
                backgroundColors.push(this.colors[this.data_scenarios[escenarios].color])
            }
            //ver como recorremos el arreglo data_scenarios y encontrar de cada diccionario el valor de "total"
            //no usamos más scenario_totals
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: nombre,
                    datasets: [{
                        data: totals,
                        backgroundColor: backgroundColors
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
                            }
                        }
                    }
                }
                
            });
        },


        register_scenario_total(scenario, total){
            console.log("scenario: "+scenario.nombre)
            console.log("total: "+total)
            console.log("color: "+scenario.color)
            this.data_scenarios[this.x].total=total
            this.x=this.x+1
            if (this.x===this.data_scenarios.length){
                this.updateGlobalChart()
            }
            
        },
        update_scenarios: function(user_data){
            this.data_scenarios = []
            // Mejor Escenario
            var dict_mejor_escenario = {}
            Object.assign(dict_mejor_escenario, user_data);
            dict_mejor_escenario['nombre']='Mejor escenario'
            dict_mejor_escenario['decrypt_tool_exists'] = true
            dict_mejor_escenario['rescue_paid'] = 0
            dict_mejor_escenario['infected_terminals'] = 0.2
            dict_mejor_escenario['has_backup'] = true
            dict_mejor_escenario['data_is_exposed'] = false
            dict_mejor_escenario['color'] = 'primary'
            dict_mejor_escenario['total'] = 0
            this.data_scenarios.push(dict_mejor_escenario)

            // Optimista
            var dict_optimista = {}
            Object.assign(dict_optimista, user_data);
            dict_optimista['nombre']='Optimista'
            dict_optimista['decrypt_tool_exists'] = true
            dict_optimista['rescue_paid'] = 0
            dict_optimista['infected_terminals'] = 0.5
            dict_optimista['has_backup'] = true
            dict_optimista['data_is_exposed'] = false
            dict_optimista['color'] = 'success'
            dict_optimista['total'] = 0
            this.data_scenarios.push(dict_optimista)


            // Medio
            var dict_medio = {}
            Object.assign(dict_medio, user_data);
            dict_medio['nombre']='Medio'
            dict_medio['decrypt_tool_exists'] = false
            dict_medio['rescue_paid'] = 1
            dict_medio['infected_terminals'] = 0.8
            dict_medio['has_backup'] = true
            dict_medio['data_is_exposed'] = true
            dict_medio['color'] = 'info'
            dict_medio['total'] = 0
            this.data_scenarios.push(dict_medio)

            // Pesimista
            var dict_pesimista = {}
            Object.assign(dict_pesimista, user_data);
            dict_pesimista['nombre']='Pesimista'
            dict_pesimista['decrypt_tool_exists'] = false
            dict_pesimista['rescue_paid'] = 3
            dict_pesimista['infected_terminals'] = 0.8
            dict_pesimista['has_backup'] = true
            dict_pesimista['data_is_exposed'] = true
            dict_pesimista['color'] = 'warning'
            dict_pesimista['total'] = 0
            this.data_scenarios.push(dict_pesimista)

            // Desastroso
            var dict_desastroso = {}
            Object.assign(dict_desastroso, user_data);
            dict_desastroso['nombre']='Desastroso'
            dict_desastroso['decrypt_tool_exists'] = false
            dict_desastroso['rescue_paid'] = 2
            dict_desastroso['infected_terminals'] = 1
            dict_desastroso['has_backup'] = false
            dict_desastroso['data_is_exposed'] = true
            dict_desastroso['color'] = 'danger'
            dict_desastroso['total'] = 0
            this.data_scenarios.push(dict_desastroso)

            // Tacaño
            var dict_tacanio = {}
            Object.assign(dict_tacanio, user_data);
            dict_tacanio['nombre']='Tacaño'
            dict_tacanio['decrypt_tool_exists'] = false
            dict_tacanio['rescue_paid'] = 3
            dict_tacanio['infected_terminals'] = 1
            dict_tacanio['has_backup'] = false
            dict_tacanio['data_is_exposed'] = true
            dict_tacanio['color'] = 'secondary'
            dict_tacanio['total'] = 0
            this.data_scenarios.push(dict_tacanio)

            // otro
            var otro = {}
            Object.assign(otro, this.user_data);
            otro['nombre']='Otro'
            otro['decrypt_tool_exists'] = false
            otro['rescue_paid'] = 2
            otro['infected_terminals'] = 0.8
            otro['has_backup'] = false
            otro['data_is_exposed'] = true
            otro['color'] = 'secondary'
            otro['total'] = 0
            this.data_scenarios.push(otro)
            
            this.updateGlobalChart()
            // TODO: usar el nombre del escenario actual
            
            this.mostrarEscenario("Mejor escenario")
        },
        mostrarEscenario: function(nombre){
            this.nombreEscenario=nombre
        },
    },
    template: `
    <div class="col-lg-12">                        
        <div class="row">
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
                <div class="alert alert-warning" role="alert">
                    Haga clic en los siguientes indicadores para ver su detalle.
                </div>
            </div>
        </div>
        
        <div class="row report-page">
            <!--ESCENARIOS-->
            <scenario-card v-for="scenario in data_scenarios"
                :key="scenario.nombre"
                :label="scenario.nombre"
                :value="scenario.total"
                :color-class="scenario.color"
                v-on:click.native="mostrarEscenario(scenario.nombre)"
                >
            </scenario-card>
        </div>

        <div class="row">
            <div id="descripcion-escenarios" class="col-lg-12">
                <scenario-detail v-for="scenario in data_scenarios"
                    :scenario-data="scenario"
                    v-on:total="register_scenario_total(scenario, $event)"
                    :key="scenario.nombre"
                    v-show="scenario.nombre == nombreEscenario"
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