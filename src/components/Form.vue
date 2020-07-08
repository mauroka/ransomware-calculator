<template>
    <div>
        <!-- Content Row -->
        <div class="progress mb-4" style="height: 10px;">
            <div class="progress-bar" role="progressbar" v-bind:aria-valuenow="(100/5)*page"
                v-bind:style="{width: (100/5)*page +'%'}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <!-- Content Row -->
        <div class="row">
            <div class="col-lg-12 mb-4">
                <transition name="slide-fade" mode="out-in">
                    <!-- Illustrations -->

                    <!-- DATOS GENERALES -->
                    <div class="card shadow mb-4" v-if="page === 1" key="page1">
                        <div class="card-header py-3">
                            <h6 class="card-title m-0 font-weight-bold text-primary float-left">Datos Generales</h6>
                            <h6 class="card-title m-0 font-weight-bold text-primary float-right step-count">Paso
                                {{page}} de
                                5</h6>
                        </div>
                        <div class="card-body">
                            <h6 class="text-danger" v-show="error">* Por favor, ingrese datos válidos en todos los
                                campos
                            </h6>
                            <form class="container" id="datosGenerales">
                                <div class="form-row">
                                    <div v-for="field in ['hLab', 'cHorasEmpleado', 'cantEquipos']" :key="field" class="form-group col-md-12">
                                        <label for="hLab" v-html="labels[field]"></label>
                                        <input v-model="form_data[field]" :id="field" type="number" class="form-control" placeholder="">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!--BACKUPS-->
                    <div class="card shadow mb-4" v-if="page === 2" key="page2">
                        <div class="card-header py-3">
                            <h6 class="card-title m-0 font-weight-bold text-primary float-left">Copias de seguridad</h6>
                            <h6 class="card-title m-0 font-weight-bold text-primary float-right step-count">Paso
                                {{page}} de
                                5</h6>
                        </div>
                        <div class="card-body">
                            <h6 class="text-danger" v-show="error">* Por favor, ingrese datos válidos en todos los
                                campos
                            </h6>
                            <form class="container" id="datosGenerales">
                                <div class="form-row">
                                    <div v-for="field in ['chUltiBackup', 'chRegeInfoTotal']" :key="field" class="form-group col-md-12">
                                        <label for="hLab" v-html="labels[field]"></label>
                                        <input v-model="form_data[field]" :id="field" type="number" class="form-control" placeholder="">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!--RECUPERACION DE EQUIPOS-->
                    <div class="card shadow mb-4" v-if="page === 3" key="page3">
                        <div class="card-header py-3">
                            <h6 class="card-title m-0 font-weight-bold text-primary float-left">Recuperación de equipos
                            </h6>
                            <h6 class="card-title m-0 font-weight-bold text-primary float-right step-count">Paso
                                {{page}} de
                                5</h6>
                        </div>
                        <div class="card-body">
                            <h6 class="text-danger" v-show="error">* Por favor, ingrese datos válidos en todos los
                                campos
                            </h6>
                            <form class="container" id="recuperacion">
                                
                                <div class="form-row" id="tabla1">
                                    <div class="form-group col-md-12 ">
                                        <p class="mt-4 font-weight-bold text-primary">Limpieza de cada equipo
                                            informático
                                            afectado. Implica formatear y volver instalar sistema, aplicaciones, y
                                            configuraciones del equipo</p>
                                    </div>
                                    <div v-for="field in ['chFormatear', 'cFormatear', 'cantEquiposParaleloFormatear']" :key="field" class="form-group col-md-12">
                                        <label for="hLab" v-html="labels[field]"></label>
                                        <input v-model="form_data[field]" :id="field" type="number" class="form-control" placeholder="">
                                    </div>
                                </div>
                                <hr>
                                <div class="form-row" id="tabla2">
                                    <div class="form-group col-md-12 ">
                                        <p class="mt-4 font-weight-bold text-primary">Restaurado de la información de
                                            cada
                                            equipo informático desde las copias de seguridad</p>
                                    </div>
                                    <div v-for="field in ['chRestaurar', 'cRestaurar', 'cantEquiposParaleloRestaurar']" :key="field" class="form-group col-md-12">
                                        <label for="hLab" v-html="labels[field]"></label>
                                        <input v-model="form_data[field]" :id="field" type="number" class="form-control" placeholder="">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!--RESCATE-->
                    <div class="card shadow mb-4" v-if="page === 4" key="page4">
                        <div class="card-header py-3">
                            <h6 class="card-title m-0 font-weight-bold text-primary float-left">Rescate</h6>
                            <h6 class="card-title m-0 font-weight-bold text-primary float-right step-count">Paso
                                {{page}} de
                                5</h6>
                        </div>
                        <div class="card-body">
                            <h6 class="text-danger" v-show="error">* Por favor, ingrese datos válidos en todos los
                                campos
                            </h6>
                            <form class="container" id="rescate">
                                <div class="form-row">
                                    <div v-for="field in ['cRescate']" :key="field" class="form-group col-md-12">
                                        <label for="hLab" v-html="labels[field]"></label>
                                        <input v-model="form_data[field]" :id="field" type="number" class="form-control" placeholder="">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!--INFORMACION DE NEGOCIO-->
                    <div class="card shadow mb-4" v-if="page === 5" key="page5">
                        <div class="card-header py-3">
                            <h6 class="card-title m-0 font-weight-bold text-primary float-left">Información de negocio
                            </h6>
                            <h6 class="card-title m-0 font-weight-bold text-primary float-right step-count">Paso
                                {{page}} de
                                5</h6>
                        </div>
                        <div class="card-body">
                            <h6 class="text-danger" v-show="error">* Por favor, ingrese datos válidos en todos los
                                campos
                            </h6>
                            <form class="container" id="rescate">
                                <div class="form-row">
                                    <div v-for="field in ['porcenEquiposInfectados', 'cOportunidadVentas']" :key="field" class="form-group col-md-12">
                                        <label for="hLab" v-html="labels[field]"></label>
                                        <input v-model="form_data[field]" :id="field" type="number" class="form-control" placeholder="">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </transition>

                <!--BOTONES FORMULARIO-->
                <div class="row">
                    <div class="col-md-12 mb-3" style="text-align: right;">
                        <button type="button" class="btn btn-outline-primary" :disabled="page == 1"
                            v-on:click="page -= 1;" role="button">Anterior</button> &nbsp;
                        <button v-if="page === 5" type="button" class="btn btn-outline-primary"
                            v-on:click="sendFormData()" role="button">Calcular</button>
                        <button v-else type="button" class="btn btn-outline-primary"
                            v-on:click="page += 1" role="button">Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Form',
        methods: {
            sendFormData(){
                for (let key of Object.keys(this.form_data)) {
                    this.form_data[key] = parseInt(this.form_data[key]) 
                }
                this.$emit("formDataReady", this.form_data)
            }
        },
        data: function () {
            return {
                page: 1,
                resultado:true,
                error:false,

                form_data: {
                    //DATOS GENERALES
                    hLab:undefined,
                    cHorasEmpleado:undefined,
                    cantEquipos:undefined,

                    //BACKUPS
                    chRegeInfo:undefined,
                    chUltiBackup:undefined,
                    chRegeInfoTotal:undefined,
                    cPromedio:undefined,
            
                    //RESCATE
                    cRescate:undefined,
            
                    //RECUPERAR FORMATEAR
                    cEmpleadoFormatear:undefined,
                    chFormatear:undefined,
                    cFormatear:undefined,
                    cantEquiposParaleloFormatear:undefined,

                    //RECUPERAR RESTAURAR
                    cEmpleadoRestaurar:undefined,
                    chRestaurar:undefined,
                    cRestaurar:undefined,
                    cantEquiposParaleloRestaurar:undefined,

                    //RECUPERAR REGENERAR
                    cRegeInfo:undefined,
                    
                    //PERDIDA
                    porcenEquiposInfectados:undefined,
                    cOportunidadVentas:undefined,
                },
                labels: {
                    //DATOS GENERALES
                    "hLab":             "Frecuencia en horas mediante la cual se realizan copias de seguridad en su organización",
                    "cHorasEmpleado":   "Costo promedio por hora de un empleado administrativo de su organización",
                    "cantEquipos":      "Cantidad de equipos informáticos de su organización (PC, ordenadores, desktops)",
                    
                    //BACKUPS
                    chRegeInfo:undefined,
                    "chUltiBackup":     "Frecuencia en horas mediante la cual se realizan copias de seguridad en su organización",
                    "chRegeInfoTotal":  "Suponiendo que el incidente de Ransomware afecta las copias de seguridad de su organización y no es posible recuperar la información perdida. ¿Cuántas horas laborales piensa que necesitaría trabajar <b>cada usuario</b> para regenerar toda la información que se considere relevante en su puesto de trabajo?",
                    cPromedio:undefined,
            
                    //RECUPERAR FORMATEAR
                    cEmpleadoFormatear:undefined,
                    chFormatear:        "Cantidad de horas necesarias para limpiar cada equipo informático",
                    cFormatear:         "Costo para limpiar cada equipo informático",
                    cantEquiposParaleloFormatear: "Cantidad de equipos informáticos que se pueden limpiar en paralelo",

                    //RECUPERAR RESTAURAR
                    cEmpleadoRestaurar:undefined,
                    chRestaurar:        "Cantidad de horas necesarias para restaurar la información en cada equipo informático",
                    cRestaurar:         "Costo para restaurar la información en cada equipo informático",
                    cantEquiposParaleloRestaurar:"Cantidad de equipos informáticos que se pueden restaurar en paralelo",


                    //RESCATE
                    cRescate:           "Costo del rescate solicitado por el ciberdelincuente",

                   
                
                    //RECUPERAR REGENERAR
                    
                    cRegeInfo:undefined,
                    
                    //PERDIDA
                    porcenEquiposInfectados:    "Porcentaje de equipos informáticos que deben recuperarse para que el incidente se considere controlado",
                    cOportunidadVentas:         "Costo de oportunidad <b>diario</b> producto de tener el negocio parado por la falta de disponibilidad tanto de los equipos informáticos, que se encuentran infectados, como del personal, que está tratando de regenerar la información perdida o no tiene su equipo informático",
                }
                
            }
        }
    }
</script>