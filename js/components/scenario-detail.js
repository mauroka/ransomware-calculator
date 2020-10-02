/*
var scenario_data: {
    // user data
    hLab,               // duración en horas de la jornada laboral
    cHorasEmpleado,     // costo promedio por hora de un empleado administrativo
    cantEquipos,        // cantidad de equipos informáticos

    chUltiBackup,       // frecuencia en horas mediante la cual se realizan copias de seguridad
    chRegeInfoTotal,    // ¿Cuántas horas laborales piensa que necesitaría trabajar <b>cada usuario</b> para regenerar toda la información que se considere relevante en su puesto de trabajo

    chFormatear,        // cantidad de horas necesarias para limpiar cada equipo informático
    cFormatear,         // costo para limpiar cada equipo informático<
    cantEquiposParaleloFormatear,   // cantidad de equipos informáticos que se pueden limpiar en paralelo

    chRestaurar,        // Cantidad de horas necesarias para restaurar la información en cada equipo
    cRestaurar,         // Costo para restaurar la información en cada equipo informático

    cantEquiposParaleloRestaurar,   // Cantidad de equipos informáticos que se pueden restaurar en paralelo

    cRescate,           // Costo del rescate solicitado por el ciberdelincuente

    porcenEquiposInfectados,    // Porcentaje de equipos informáticos que deben recuperarse para que el incidente se considere controlado
    cOportunidadVentas,         // Costo de oportunidad
    cReputacion,                // ¿Cuál piensa que sería el costo de reputación en el cual incurriría 
    cFiltradoInfo,              // costo que esta acción podría implicar para la organización
    
    // predefined data
    decrypt_tool_exists: [true|false]
    rescue_paid:
        // 0: no aplica
        // 1: Paga el rescate y obtiene la clave
        // 2: Paga el rescate y no obtiene la clave
        // 3: No paga el rescate
    infected_terminals: [0.0-1.0]%
    has_backup: [true|false]
    data_is_exposed: [true|false]
}
*/
// components
Vue.component('scenario-detail', {
    computed: {
        // costo promedio de regenerar información no respaldada
        cPromedio: function (){
            return this.scenarioData.chUltiBackup*this.scenarioData.cHorasEmpleado;
        },
        // costo tecnológico de formatear los equipos infectados
        ctFormatear: function(){
            return this.scenarioData.cantEquipos*this.scenarioData.cFormatear*this.scenarioData.infected_terminals;
        },
        // costo tecnológico de restaurar los equipos infectados
        ctRestaurar: function(){
            if(this.scenarioData.has_backup){
                return this.scenarioData.cantEquipos*this.scenarioData.cRestaurar*this.scenarioData.infected_terminals;
            }else{
                return 0;
            }
        },
        // costo de negocio de formatear los equipos infectados
        cnFormatear: function(){
            if(((this.cantEquipos*this.scenarioData.infected_terminals)/this.scenarioData.cantEquiposParaleloFormatear)>1){
                return Math.ceil(((this.scenarioData.cantEquipos*this.scenarioData.infected_terminals)/this.scenarioData.cantEquiposParaleloFormatear))*this.scenarioData.chFormatear
            }else{
                return parseInt(this.scenarioData.chFormatear)
            }
        },
        // costo de negocio de restaurar los equipos infectados
        cnRestaurar: function(){
            if(this.scenarioData.has_backup){
                if(((this.scenarioData.cantEquipos*this.scenarioData.infected_terminals)/this.scenarioData.cantEquiposParaleloRestaurar)>1){
                    return Math.ceil(((this.scenarioData.cantEquipos*this.scenarioData.infected_terminals)/this.scenarioData.cantEquiposParaleloRestaurar))*this.scenarioData.chRestaurar
                }else{
                    return parseInt(this.scenarioData.chRestaurar)
                }
            }else{
                return 0;
            }
            
        },
        // tiempo en horas para volver al estado estable
        cnTotal: function(){
            var t = this.cnFormatear + this.cnRestaurar;
            var has_key = this.scenarioData.decrypt_tool_exists || this.scenarioData.rescue_paid == 2; //paga_y_obtiene_clave 
            if(!has_key && this.scenarioData.has_backup){
                t = t + this.cnRegenerar;
            }
            return t;
        },
        // cantidad de días para volver al estado estable
        cnEstable: function(){
            return Math.ceil(this.cnTotal/this.scenarioData.hLab)
        },
        // razón de equipos listos por día
        cnDisponibilidad: function(){
            return (((this.scenarioData.cantEquipos*this.scenarioData.infected_terminals)/this.cnEstable)*100)/(this.scenarioData.cantEquipos*this.scenarioData.infected_terminals)
        },
        // días para controlar el incidente
        cnControlar: function(){
            return Math.ceil((this.cnEstable*this.scenarioData.porcenEquiposInfectados)/100)
        },
        // costo de improductividad
        cnImproductividad: function(){
            return (this.cnControlar*this.scenarioData.hLab*this.scenarioData.cHorasEmpleado)*this.scenarioData.infected_terminals*this.scenarioData.cantEquipos
        },
        // costo de oportunidad
        cnOportunidad: function(){
            return this.cnControlar*this.scenarioData.cOportunidadVentas
        },
        // costo TOTAL
        tTotal: function(){
            return Math.round((this.ct+this.cn)* 1000)/1000;
        },
        // porcentaje de costo tecnologico
        ctPorcen: function(){
            return Math.round((this.ct/this.tTotal)*100);
        },
        // porcentaje de costo de negocio
        cnPorcen: function(){
            return Math.round((this.cn/this.tTotal)*100)
        },
        // costo tecnológico de restaurar
        ctRestaurar: function(){
            if(this.scenarioData.has_backup){
                return this.scenarioData.cantEquipos*this.scenarioData.cRestaurar*this.scenarioData.infected_terminals;
            }else{
                return 0;
            }
        },
        // costo tecnológico (en $) de regenerar la información
        ctRegenerar: function(){
            var cantEquiposInfectados = this.scenarioData.cantEquipos*this.scenarioData.infected_terminals;
            var has_key = this.scenarioData.decrypt_tool_exists || this.scenarioData.rescue_paid == 2; //paga_y_obtiene_clave 
            if (has_key){
                return 0;
            }else if(this.scenarioData.has_backup){
                return cantEquiposInfectados * this.cPromedio;
            }else{
                // cantidad de equipos infectados * horas a trabjar por equipo * costo de empleado por hora
                return cantEquiposInfectados * this.scenarioData.chRegeInfoTotal * this.scenarioData.cHorasEmpleado
            }
        },
        // costo de negocio (en $) de regenerar la información
        cnRegenerar: function(){
            var has_key = this.scenarioData.decrypt_tool_exists || this.scenarioData.rescue_paid == 2; //paga_y_obtiene_clave 
            if (has_key){
                return 0;       // tiene la clave, no regenera nada
            }else if(this.scenarioData.has_backup){
                return parseInt(this.scenarioData.chUltiBackup); // solo regenera informacion no respaldada
            }else{
                return parseInt(this.scenarioData.chRegeInfoTotal); // debe regenerar toda la informacion
            }
        },
        // costo del rescate
        ctRescate: function(){
            if(this.scenarioData.rescue_paid == 1 || this.scenarioData.rescue_paid == 2 ){
                return parseInt(this.scenarioData.cRescate)
            }else{
                return 0;
            }
        },
        // costo tecnológico
        ct: function(){
            var c = this.ctFormatear+this.ctRestaurar+this.ctRescate+this.ctRegenerar;
            return c;
        },
        // costo de negocio
        cn: function(){
            var c = this.cnImproductividad + this.cnOportunidad + parseInt(this.scenarioData.cReputacion)
            if(this.scenarioData.data_is_exposed){
                c = c + parseInt(this.scenarioData.cFiltradoInfo)
            }
            return c
        }        
    },
    data: function(){
        return{
            mostrar_ct: false,
            mostrar_cn: false,
        }
    },
    mounted: function(){
        this.makeChart(10, 20)
        this.$emit('total', this.tTotal)
    },
    methods: {
        makeChart: function(){
            var ctx = this.$refs['chart-canvas'].getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Costo de Negocio', 'Costo Tecnológico'],
                    datasets: [{
                        data: [this.ctTotal, this.cnTotal],
                        backgroundColor: [
                            "#4e73df",
                            "#e74a3b",
                        ]
                    }]
                },
                options:{
                    legend: {
                        position: "right",
                        align: "middle",
                    },
                    tooltips: {
                      backgroundColor: "rgb(255,255,255)",
                      bodyFontColor: "#858796",
                      borderColor: '#dddfeb',
                      borderWidth: 1,
                      xPadding: 15,
                      yPadding: 15,
                      displayColors: false,
                      caretPadding: 10,
                    },
                }
            });
        },
    },
    // porcentaje
    // existe descifrador
    // pago rescate
    // copias de seguridad
    // reputacion
    // filtrado de información
    // ct
    // cn
    // cFormatear
    // cRestaurar
    props: ['scenario-data'],
    template: `
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 id="card2" class="m-0 font-weight-bold">{{scenarioData.nombre}}</h6>
        </div>
        
        <div class="card-body">
            <table class="table table-striped table-bordered table-hover specific-scenario-details report-page">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Escenario</th>
                        <th scope="col">{{scenarioData.nombre}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Porcentaje de equipos informáticos de su organización infectados por Ransomware</th>
                        <td scope="col">20%</td>
                    </tr>
                    <tr>
                        <th scope="row">Descifrador del Ransomware</th>
                        <td scope="col">Existe descifrador</td>
                    </tr>
                    <tr>
                        <th scope="row">Pago del rescate</th>
                        <td scope="col">No aplica</td>
                    </tr>
                    <tr>
                        <th scope="row">Copias de seguridad de su organización y estado de las mismas </th>
                        <td scope="col">Hay copias de seguridad y funcionan correctamente</td>
                    </tr>
                    <tr>
                        <th scope="row">Reputación</th>
                        <td scope="col">Existe un impacto en la imagen de la organización</td>
                    </tr>
                    <tr>
                        <th scope="row">Filtrado de información</th>
                        <td scope="col">No se filtra información confidencial</td>
                    </tr>
                </tbody>
                </table>
                    <div class="row">
                        <div class="col-12">
                            <div class="alert alert-warning" role="alert">
                                Haga clic en los costos mencionados a continuación para ver su detalle.
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <!--CARD COSTO TECNOLOGICO-->
                        <div class="col-6 mb-4 btn-escenario" v-on:click="mostrar_ct = !mostrar_ct">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Costo Tecnológico</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">$ {{ct}}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--CARD COSTO DE NEGOCIO-->
                        <div class="col-6 mb-4 btn-escenario" v-on:click="mostrar_cn = !mostrar_cn;">
                            <div class="card border-left-danger shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">Costo de Negocio</div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800">$ {{cn}}</div>
                                                </div>
                                            <div class="col-auto">
                                                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--DESAGREGADO COSTO TECNOLOGICO-->
                        <transition name="slide-fade">
                            <table class="table table-striped table-bordered table-hover report-page" v-show="mostrar_ct">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Costo Tecnológico</th>
                                        <th scope="col">{{scenarioData.nombre}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Costo de limpiar los equipos</th>
                                        <td scope="col">$ {{ctFormatear}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Costo de restaurar las copias de seguridad</th>
                                        <td scope="col">$ {{ctRestaurar}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Costo de volver a generar la información perdida</th>
                                        <td scope="col">No aplica</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Costo del Rescate</th>
                                        <td scope="col">No aplica</td>
                                    </tr>
                                </tbody>
                            </table>
                        </transition>
                        <!--DESAGREGADO COSTO DE NEGOCIO-->
                        <transition name="slide-fade">
                            <table class="table table-striped table-bordered table-hover report-page" v-show="mostrar_cn">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Costo De Negocio</th>
                                        <th scope="col">{{scenarioData.nombre}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Tiempo en horas necesario para limpiar los equipos</th>
                                        <td scope="col">{{cnFormatear}} horas</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Tiempo en horas necesario para restaurar las copias de seguridad </th>
                                        <td scope="col">{{cnRestaurar}} horas</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Tiempo en horas necesario para volver a generar la información perdida</th>
                                        <td scope="col">No aplica</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Tiempo en horas necesario para realizar todas las actividades</th>
                                        <td scope="col">{{cnTotal}} horas</td>    
                                    </tr>
                                    <tr>
                                        <th scope="row">Cantidad de días laborales necesarios para realizar todas las actividades</th>
                                        <td scope="col">{{cnEstable}} días</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Porcentaje de equipos habilitados por día (Razón de disponibilidad)</th>
                                        <td scope="col">{{cnDisponibilidad}}%</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Días laborales necesarios para controlar el incidente</th>
                                        <td scope="col">{{cnControlar}} días</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Costo de improductividad, producto de tener empleados ociosos mientras se controla el incidente</th>
                                        <td scope="col">$ {{cnImproductividad}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Costo de oportunidad, producto de tener el negocio parado mientras se controla el incidente</th>
                                        <td scope="col">$ {{cnOportunidad}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Costo de reputación</th>
                                        <td scope="col">$ {{scenarioData.cReputacion}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </transition>
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 id="card3" class="m-0 font-weight-bold text-info">Comparativa entre costos</h6>
                            </div>
                            <div class="card-body offset-lg-2 col-lg-8 col-md-12">
                                <div class="chart-pie-demo">
              
                                    <canvas ref="chart-canvas"></canvas>
                                </div>
                            </div>     
                        </div>
                    </div>
                </table>
            </table>

            
        </div>
    </div>
    `
    });
   