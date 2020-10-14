
Vue.component('user-form', {
    computed: {
        debug: function(){
            return true;
        },
        formPages: function(){
            return [
                {
                    "key": "page1",
                    "title": "Datos Generales",
                    "sections": [
                        {
                            "title": "",
                            "fields": {
                                "hLab":             "Duración en horas de la jornada laboral en su organización",
                                "cHorasEmpleado":   "Costo promedio por hora de un empleado administrativo de su organización",
                                "cantEquipos":      "Cantidad de equipos informáticos de su organización (PC, ordenadores, desktops)",
                            }
                        }
                    ]
                },
                {
                    "key": "page2",
                    "title": "Copias de seguridad",
                    "sections": [
                        {
                            "title": "",
                            "fields": {
                                "chUltiBackup":      "Frecuencia en horas mediante la cual se realizan copias de seguridad en su organización",
                                "chRegeInfoTotal":   "Suponiendo que el incidente de Ransomware afecta las copias de seguridad de su organización y no es posible recuperar la información perdida. ¿Cuántas horas laborales piensa que necesitaría trabajar <b>cada usuario</b> para regenerar toda la información que se considere relevante en su puesto de trabajo?",
                            }
                        }
                    ]
                },
                {
                    "key": "page3",
                    "title": "Recuperación de equipos",
                    "sections": [
                        {
                            "title": "Limpieza de cada equipo informático afectado. Implica formatear y volver instalar sistema, aplicaciones, y configuraciones del equipo",
                            "fields": {
                                "chFormatear":                      "Cantidad de horas necesarias para limpiar cada equipo informático",
                                "cFormatear":                       "Costo para limpiar cada equipo informático",
                                "cantEquiposParaleloFormatear":     "Cantidad de equipos informáticos que se pueden limpiar en paralelo",
                            }
                        },
                        {
                            "title": "Restaurado de la información de cada equipo informático desde las copias de seguridad",
                            "fields": {
                                "chRestaurar":                  "Cantidad de horas necesarias para restaurar la información en cada equipo informático",
                                "cRestaurar":                   "Costo para restaurar la información en cada equipo informático",
                                "cantEquiposParaleloRestaurar": "Cantidad de equipos informáticos que se pueden restaurar en paralelo",
                            }
                        }
                    ]
                },
                {
                    "key": "page4",
                    "title": "Rescate",
                    "sections": [
                        {
                            "title": "",
                            "fields": {
                                "cRescate":      "Costo del rescate solicitado por el ciberdelincuente",
                            }
                        }
                    ]
                },
                {
                    "key": "page5",
                    "title": "Rescate",
                    "sections": [
                        {
                            "title": "",
                            "fields": {
                                "porcenEquiposInfectados":  "Porcentaje de equipos informáticos que deben recuperarse para que el incidente se considere controlado",
                                "cOportunidadVentas":       "Costo de oportunidad <b>diario</b> producto de tener el negocio parado por la falta de disponibilidad tanto de los equipos informáticos, que se encuentran infectados, como del personal, que está tratando de regenerar la información perdida o no tiene su equipo informático",
                                "cReputacion":              "Ocurrido un incidente de Ransomware ¿Cuál piensa que sería el costo de reputación en el cual incurriría la organización debido a los problemas en su imagen?",
                                "cFiltradoInfo":            "Si los ciberdelincuentes filtran la información secuestrada (práctica conocida como Doxxing) ¿Cuál piensa que sería el costo que esta acción podría implicar para la organización?",
                            }
                        }
                    ]
                },
            ]
        }
    },
    data: function(){
        return {
            currentPage: 1,
            formData: {},
            error: false
        }
    },
    methods: {
        scrollUp: function(){
            var posicion= $("#app").offset().top;
            $('body,html').animate({ scrollTop:posicion-10 },1000);
        },
        loadDemoData: function(){
            this.formData = {
                hLab: 8,
                cHorasEmpleado: 350,
                cantEquipos: 20,

                chUltiBackup: 20,
                chRegeInfoTotal: 100,

                chFormatear: 2,
                cFormatear: 300,
                cantEquiposParaleloFormatear: 2,

                chRestaurar: 2,
                cRestaurar: 400,
                cantEquiposParaleloRestaurar: 1,

                cRescate: 1000,

                porcenEquiposInfectados: 50,
                cOportunidadVentas: 1000,
                cReputacion: 1,
                cFiltradoInfo: 1,
            }
            this.currentPage = this.formPages.length
            this.nextPage()
        },
        nextPage: function(){
            if(this.validateCurrentPage()){
                this.error = false;
                
                if(this.currentPage == this.formPages.length){
                    this.$emit("form-data-ready", this.formData)
                }else{
                    this.currentPage = this.currentPage + 1;
                }
            }else{
                this.error = true;
            }
            setTimeout(this.scrollUp, 100);
            
        },
        validateCurrentPage: function(){
            var p = this.formPages[this.currentPage-1]
            var pageIsValid = true;
            for(var s=0; s<p.sections.length; s++){
                var section = p.sections[s];
                var formData = this.formData;
                var validateField = this.validateField;
                Object.keys(section.fields).forEach(function(key) {
                    if(!validateField(formData[key])){
                        pageIsValid = false;
                    }
                });
            }
            return pageIsValid;
        },
        validateField: function(v){
            if(v === undefined || isNaN(v) || v==="" || v<"1"){
                return false;
            }else{
                return true;
            }
        }
    },
    template: `
    <div>
        <div class="alert alert-warning" role="alert">
            <b>Precaución:</b> Todos los valores monetarios deben ser ingresados en la misma moneda.
        </div>
        <div class="progress mb-4" style="height: 10px;">
            <div class="progress-bar" role="progressbar" v-bind:aria-valuenow="(100/formPages.length)*currentPage" v-bind:style="{width: (100/formPages.length)*currentPage +'%'}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>

        <div class="row">
            <div v-for="(page, index) in formPages" class="col-lg-12 mb-4" v-if="currentPage===index+1">
                <transition  name="slide-fade" mode="out-in">
                    <div class="card shadow mb-4"  :key="page.key">
                        <div class="card-header py-3">
                        
                            <h6 class="card-title m-0 font-weight-bold text-primary float-left">{{page.title}}</h6>
                            <h6 class="card-title m-0 font-weight-bold text-primary float-right step-count">Paso {{index+1}} de {{formPages.length}}</h6>
                        </div>
                        <div class="card-body">
                            <h6 class="text-danger" v-show="error">* Por favor, ingrese datos válidos en todos los campos</h6>
                            <form  v-for="(section, sectionIndex) in page.sections" class="container">
                                <div class="form-row">
                                    <div v-if="section.title != ''" class="form-group col-md-12 ">
                                        <p class="mt-4 font-weight-bold text-primary">{{section.title}}</p>
                                    </div>
                                    <div v-for="(item, key) in section.fields" class="form-group col-md-12">
                                        <label :for="key" v-html="item"></label>
                                        <input v-model="formData[key]" type="number" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <hr v-if="page.sections.length>1 && sectionIndex<page.sections.length-1">
                            </form>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <!--BOTONES FORMULARIO-->
        <div class="row">
            <div class="col-md-12 mb-3" style="text-align: right;">
                <button type="button" class="btn btn-outline-primary" v-if="debug" v-on:click="loadDemoData()" role="button">Cargar Datos Demo</button> &nbsp;
                <button type="button" class="btn btn-outline-primary" :disabled="currentPage == 1" v-on:click="currentPage -= 1;" role="button">Anterior</button> &nbsp;
                <button v-if="currentPage<formPages.length" href="#top" type="button" class="btn btn-outline-primary" :disabled="currentPage == 5" v-on:click="nextPage()" role="button">Siguiente</button>
                <button v-else type="button" class="btn btn-outline-primary" :disabled="currentPage == 6" v-on:click="nextPage()" role="button">Calcular</button>
            </div>

        </div>
    </div>
    `
    });