
// components
Vue.component('scenario-card', {
    computed: {
        textClass: function(){
            return 'text-'+this.colorClass;
        },
        borderClass: function(){
            return 'border-left-'+this.colorClass;
        }
    },
    props: ['label', 'value', 'color-class'],
    template: `
    <div class="col-lg-4 col-md-6 mb-4 btn-escenario" v-on:click="$emit('clicked');">
        <div class="card shadow h-100 py-2" :class="borderClass">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-uppercase mb-1" :class="textClass">{{ label }}</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">$ {{value}} </div>
                    </div>
                    <div class="col-auto">
                        <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    });
   


const app = new Vue({
    el:'#app',
    data:{
        page: 1,
        resultado:true,
        error:false,
        escenario:false,
        nombreEscenario:"",
        mostrar_ct:false,
        mostrar_cn:false,
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
        cReputacion:undefined,
        cFiltradoInfo:undefined,
    //INICIO COSTO TECNOLOGICO
        //COSTO FORMATEAR Y REINSTALAR TODOS LOS EQUPIPOS AFECTADOS
        ctFormatear1:undefined,
        ctFormatear2:undefined,
        ctFormatear3:undefined,
        ctFormatear4:undefined,
        ctFormatear5:undefined,
        ctFormatear6:undefined,

        //COSTO RESTAURAR LA INFORMACION DE LOS EQUIPOS AFECTADOS
        ctRestaurar1:undefined,
        ctRestaurar2:undefined,
        ctRestaurar3:undefined,
        ctRestaurar4:undefined,

        //COSTO REGENERAR LA INFORMACION PERDIDA
        ctRegenerar4:undefined,
        ctRegenerar5:undefined,
        ctRegenerar6:undefined,

        //COSTO DEL RESCATE
        ctRescate3:undefined,
        ctRescate5:undefined,

        //COSTO TECNOLOGICO TOTAL
        ct1:undefined,
        ct2:undefined,
        ct3:undefined,
        ct4:undefined,
        ct5:undefined,
        ct6:undefined,
    //FIN COSTO TECNOLOGICO

    //INICIO COSTO DE NEGOCIO
        //TIEMPO EN HORAS PARA LIMPIAR TODOS LOS EQUIPOS
        cnFormatear1:undefined,
        cnFormatear2:undefined,
        cnFormatear3:undefined,
        cnFormatear4:undefined,
        cnFormatear5:undefined,
        cnFormatear6:undefined,

        //TIEMPO NECESARIO PARA RESTAURAR LOS BACKUPS
        cnRestaurar1:undefined,
        cnRestaurar2:undefined,
        cnRestaurar3:undefined,
        cnRestaurar4:undefined,

        //TIEMPO NECESARIO VOLVER A GENERAR LA INFORMACION PERDIDA
        cnRegenerar4:undefined,
        cnRegenerar5:undefined,
        cnRegenerar6:undefined,

        //TIEMPO TOTAL HORAS PARA VOLVER A ESTAR ESTABLES
        cnTotal1:undefined,
        cnTotal2:undefined,
        cnTotal3:undefined,
        cnTotal4:undefined,
        cnTotal5:undefined,
        cnTotal6:undefined,

        //DIAS LABORABLES PARA VOLVER A UN ESTADO ESTABLE
        cnEstable1:undefined,
        cnEstable2:undefined,
        cnEstable3:undefined,
        cnEstable4:undefined,
        cnEstable5:undefined,
        cnEstable6:undefined,

        //RAZON DE DISPONIBILIDAD
        cnDisponibilidad1:undefined,
        cnDisponibilidad2:undefined,
        cnDisponibilidad3:undefined,
        cnDisponibilidad4:undefined,
        cnDisponibilidad5:undefined,
        cnDisponibilidad6:undefined,

        //DIAS LABORABLES NECESARIOS PARA CONTROLAR INCIDENTE
        cnControlar1:undefined,
        cnControlar2:undefined,
        cnControlar3:undefined,
        cnControlar4:undefined,
        cnControlar5:undefined,
        cnControlar6:undefined,

        //COSTO DE IMPRODUCTIVIDAD
        cnImproductividad1:undefined,
        cnImproductividad2:undefined,
        cnImproductividad3:undefined,
        cnImproductividad4:undefined,
        cnImproductividad5:undefined,
        cnImproductividad6:undefined,

        //COSTO DE OPORTUNIDAD
        cnOportunidad1:undefined,
        cnOportunidad2:undefined,
        cnOportunidad3:undefined,
        cnOportunidad4:undefined,
        cnOportunidad5:undefined,
        cnOportunidad6:undefined,

        //COSTO DE NEGOCIO TOTAL
        cn1:undefined,
        cn2:undefined,
        cn3:undefined,
        cn4:undefined,
        cn5:undefined,
        cn6:undefined,

    //FIN COSTO DE NEGOCIO
    
    //TOTAL DE TOTALES
    tTotal1:undefined,
    tTotal2:undefined,
    tTotal3:undefined,
    tTotal4:undefined,
    tTotal5:undefined,
    tTotal6:undefined,

    cnPorcen1:undefined,
    cnPorcen2:undefined,
    cnPorcen3:undefined,
    cnPorcen4:undefined,
    cnPorcen5:undefined,
    cnPorcen6:undefined,

    ctPorcen1:undefined,
    ctPorcen2:undefined,
    ctPorcen3:undefined,
    ctPorcen4:undefined,
    ctPorcen5:undefined,
    ctPorcen6:undefined,

    //COLORS
    primary:"#4e73df",
    success: "#1cc88a", 
    info: "#36b9cc",                                        
    warning: "#f6c23e",
    danger: "#e74a3b",
    secondary:"#858796", 
    },
    

    methods:{
        createPdf:function(){
            alert("da")
            const { jsPDF } = window.jspdf;

            const doc = new jsPDF({
                orientation:"landscape",
                
                
            });
            
            var source;

            html2canvas(document.querySelector("#page-top")).then(canvas => {
                var source=canvas.toDataURL('image/png');

                console.log('Report Image URL: '+source);
                doc.addImage(source, 'PNG', 0, 0);
                doc.save("a4.pdf");
            });
            
        },

        mostrar: function(){
            this.page += 1,
            this.calculoSueltos(),
            this.costoTecnologico(),
            this.costoNegocio(),
            this.costoTotal()
            this.globalChart()
        },
        removeclass: function(div){
            div.classList.remove("text-primary")
            div.classList.remove("text-success")
            div.classList.remove("text-info")
            div.classList.remove("text-warning")
            div.classList.remove("text-danger")
            div.classList.remove("text-secondary")
        },
        globalChart(){
            var ctx = document.getElementById('globalchart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Mejor escenario', 'Optimista', 'Medio', 'Pesimista', 'Desastroso', 'Tacaño'],
                    datasets: [{
                        data: [this.tTotal1, this.tTotal2, this.tTotal3, this.tTotal4, this.tTotal5, this.tTotal6],
                        backgroundColor: [
                            this.primary,
                            this.success,
                            this.info,
                            this.warning,
                            this.danger,
                            this.secondary,
                        ]
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
        escenarioChart(cnTotal, ctTotal){
            var ctx = document.getElementById('chart').getContext('2d');
            if (window.grafica2) {
                window.grafica2.clear();
                window.grafica2.destroy();
            }
            window.grafica2= new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Costo Tecnológico', 'Costo de Negocio'],
                    datasets: [{
                        data: [cnTotal, ctTotal],
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

        isValid: function(v){
            if(v === undefined || isNaN(v) || v==="" || v<"1"){
                return false;
            }else{
                return true;
            }
        },

        validate: function(){ 
            switch (this.page) {
                case 1: //DATOS GENERALES VALIDACION
                    if (this.isValid(this.hLab) && this.isValid(this.cHorasEmpleado) && this.isValid(this.cantEquipos)){
                        this.error=false
                        this.page += 1
                    }else{
                        this.error=true //MUESTRA MENSAJE
                    }
                    break;
                case 2: //BACKUPS VALIDACION
                    if (this.isValid(this.chUltiBackup) && this.isValid(this.chRegeInfoTotal)){
                        this.error=false
                        this.page += 1
                    }else{
                        this.error=true
                    }
                    break;
                case 3: // RECUPERACION DE INFORMACION VALIDACIOND
                    if (this.isValid(this.chFormatear) && this.isValid(this.cFormatear) && this.isValid(this.cantEquiposParaleloFormatear) && this.isValid(this.chRestaurar) && this.isValid(this.cRestaurar) && this.isValid(this.cantEquiposParaleloRestaurar)) {
                        this.error = false
                        this.page += 1
                    } else {
                        this.error = true
                    }
                    break;
                case 4: //RESCATE VALIDACION
                    if (this.isValid(this.cRescate)) {
                        this.error = false
                        this.page += 1
                    } else {
                        this.error = true
                    }
                    break;
                case 5: //INFORMACION DE NEGOCIO VALIDACION
                    if (this.isValid(this.porcenEquiposInfectados) && this.isValid(this.cOportunidadVentas)  && this.isValid(this.cReputacion)&& this.isValid(this.cFiltradoInfo)) {
                        this.error = false
                        this.mostrar()
                        this.mostrarEscenario(1, 'Mejor escenario');
                    } else {
                        this.error = true
                    }
                    break;
              }
        },
        mostrarEscenario: function(nEscenario, nombre){
            this.nombreEscenario=nombre
            this.escenario=true
            this.mostrar_cn=false
            this.mostrar_ct=false
            var div=document.getElementById("card2");
            var div2=document.getElementById("card3");
            this.removeclass(div)
            this.removeclass(div2)

            switch(nEscenario){
                case 1:
                    div.classList.add("text-primary")
                    div2.classList.add("text-primary")
                    this.escenarioChart(this.ctPorcen1, this.cnPorcen1)
                    
                    break;

                case 2:
                    div.classList.add("text-success")
                    div2.classList.add("text-success")
                    this.escenarioChart(this.ctPorcen2, this.cnPorcen2)
                    break;

                case 3:
                    div.classList.add("text-info")
                    div2.classList.add("text-info")
                    this.escenarioChart(this.ctPorcen3, this.cnPorcen3)
                    break;
                    
                case 4:
                    div.classList.add("text-warning")
                    div2.classList.add("text-warning")
                    this.escenarioChart(this.ctPorcen4, this.cnPorcen4)
                    break; 

                case 5:
                    div.classList.add("text-danger")
                    div2.classList.add("text-danger")
                    this.escenarioChart(this.ctPorcen5, this.cnPorcen5)
                    break;

                case 6:
                    div.classList.add("text-secondary")
                    div2.classList.add("text-secondary")
                    this.escenarioChart(this.ctPorcen6, this.cnPorcen6)
                    break;  
            }
        },
        ocultaGrafico: function(){
            this.escenario=false
        },
        //ocultaCt: function(oculta){
          //  this.mostrar_ct=false;
        //},
        calculoSueltos: function(){
            this.cPromedio=this.chUltiBackup*this.cHorasEmpleado,
            this.cRegeInfo=this.cHorasEmpleado*this.chUltiBackup
        },
        costoTecnologico: function(){
            //CALCULOS FORMATEAR
            this.ctFormatear1=this.cantEquipos*this.cFormatear*0.2,
            this.ctFormatear2=this.cantEquipos*this.cFormatear*0.5,
            this.ctFormatear3=this.cantEquipos*this.cFormatear*0.8,
            this.ctFormatear4=this.cantEquipos*this.cFormatear*0.8,
            this.ctFormatear5=this.cantEquipos*this.cFormatear*1,
            this.ctFormatear6=this.cantEquipos*this.cFormatear*1,
            //CALCULOS RESTAURAR
            this.ctRestaurar1=this.cantEquipos*this.cRestaurar*0.2,
            this.ctRestaurar2=this.cantEquipos*this.cRestaurar*0.5,
            this.ctRestaurar3=this.cantEquipos*this.cRestaurar*0.8,
            this.ctRestaurar4=this.cantEquipos*this.cRestaurar*0.8,
            //CALCULOS REGENERAR
            this.ctRegenerar4=this.cantEquipos*this.cPromedio*0.8,
            this.ctRegenerar5=this.cantEquipos*this.chRegeInfoTotal*1*this.cHorasEmpleado,
            this.ctRegenerar6=this.cantEquipos*this.chRegeInfoTotal*1*this.cHorasEmpleado,
            //CALCULOS RESCATE
            this.ctRescate3=parseInt(this.cRescate),
            this.ctRescate5=parseInt(this.cRescate),
            //CALCULOS DE SUMA TOTAL
            this.ct1=this.ctFormatear1+this.ctRestaurar1,
            this.ct2=this.ctFormatear2+this.ctRestaurar2,
            this.ct3=this.ctFormatear3+this.ctRestaurar3+this.ctRescate3,
            this.ct4=this.ctFormatear4+this.ctRestaurar4+this.ctRegenerar4,
            this.ct5=this.ctFormatear5+this.ctRegenerar5+this.ctRescate5,
            this.ct6=this.ctFormatear6+this.ctRegenerar6
            
        },
        costoNegocio: function(){
            //CALCULOS FORMATEO
            if(((this.cantEquipos*0.2)/this.cantEquiposParaleloFormatear)>1){
                this.cnFormatear1=Math.ceil(((this.cantEquipos*0.2)/this.cantEquiposParaleloFormatear))*this.chFormatear
            }else{
                this.cnFormatear1=parseInt(this.chFormatear)
            }

            if(((this.cantEquipos*0.5)/this.cantEquiposParaleloFormatear)>1){
                this.cnFormatear2=Math.ceil(((this.cantEquipos*0.5)/this.cantEquiposParaleloFormatear))*this.chFormatear
            }else{
                this.cnFormatear2=parseInt(this.chFormatear)
            }

            if(((this.cantEquipos*0.8)/this.cantEquiposParaleloFormatear)>1){
                this.cnFormatear3=Math.ceil(((this.cantEquipos*0.8)/this.cantEquiposParaleloFormatear))*this.chFormatear
            }else{
                this.cnFormatear3=parseInt(this.chFormatear)
            }

            if(((this.cantEquipos*0.8)/this.cantEquiposParaleloFormatear)>1){
                this.cnFormatear4=Math.ceil(((this.cantEquipos*0.8)/this.cantEquiposParaleloFormatear))*this.chFormatear
            }else{
                this.cnFormatear4=parseInt(this.chFormatear)
            }

            if(((this.cantEquipos*1)/this.cantEquiposParaleloFormatear)>1){
                this.cnFormatear5=Math.ceil(((this.cantEquipos*1)/this.cantEquiposParaleloFormatear))*this.chFormatear
            }else{
                this.cnFormatear5=parseInt(this.chFormatear)
            }

            if(((this.cantEquipos*1)/this.cantEquiposParaleloFormatear)>1){
                this.cnFormatear6=Math.ceil(((this.cantEquipos*1)/this.cantEquiposParaleloFormatear))*this.chFormatear
            }else{
                this.cnFormatear6=parseInt(this.chFormatear)
            }
            //CALCULOS RESTAURAR
            if(((this.cantEquipos*0.2)/this.cantEquiposParaleloRestaurar)>1){
                this.cnRestaurar1=Math.ceil(((this.cantEquipos*0.2)/this.cantEquiposParaleloRestaurar))*this.chRestaurar
            }else{
                this.cnRestaurar1=parseInt(this.chRestaurar)
            }

            if(((this.cantEquipos*0.5)/this.cantEquiposParaleloRestaurar)>1){
                this.cnRestaurar2=Math.ceil(((this.cantEquipos*0.5)/this.cantEquiposParaleloRestaurar))*this.chRestaurar
            }else{
                this.cnRestaurar2=parseInt(this.chRestaurar)
            }

            if(((this.cantEquipos*0.8)/this.cantEquiposParaleloRestaurar)>1){
                this.cnRestaurar3=Math.ceil(((this.cantEquipos*0.8)/this.cantEquiposParaleloRestaurar))*this.chRestaurar
            }else{
                this.cnRestaurar3=parseInt(this.chRestaurar)
            }

            if(((this.cantEquipos*0.8)/this.cantEquiposParaleloRestaurar)>1){
                this.cnRestaurar4=Math.ceil(((this.cantEquipos*0.8)/this.cantEquiposParaleloRestaurar))*this.chRestaurar
            }else{
                this.cnRestaurar4=parseInt(this.chRestaurar)
            }
            //CALCULOS REGENERAR
            this.cnRegenerar4=parseInt(this.chUltiBackup),
            this.cnRegenerar5=parseInt(this.chRegeInfoTotal)
            this.cnRegenerar6=parseInt(this.chRegeInfoTotal)

            //CALCULOS TIEMPO EN HORAS PARA VOLVER A ESTADO ESTABLE
            this.cnTotal1=this.cnFormatear1+this.cnRestaurar1
            this.cnTotal2=this.cnFormatear2+this.cnRestaurar2
            this.cnTotal3=this.cnFormatear3+this.cnRestaurar3
            this.cnTotal4=this.cnFormatear4+this.cnRestaurar4+this.cnRegenerar4
            this.cnTotal5=this.cnFormatear5+this.cnRegenerar5
            this.cnTotal6=this.cnFormatear6+this.cnRegenerar6
            
            //CALCULO CANTIDAD DE DIAS PARA VOLVER A ESTADO ESTABLE
            this.cnEstable1=Math.ceil(this.cnTotal1/this.hLab)
            this.cnEstable2=Math.ceil(this.cnTotal2/this.hLab)
            this.cnEstable3=Math.ceil(this.cnTotal3/this.hLab)
            this.cnEstable4=Math.ceil(this.cnTotal4/this.hLab)
            this.cnEstable5=Math.ceil(this.cnTotal5/this.hLab)
            this.cnEstable6=Math.ceil(this.cnTotal6/this.hLab)

            //CALCULO EQUIPOS LISTOS POR DIA
            this.cnDisponibilidad1=(((this.cantEquipos*0.2)/this.cnEstable1)*100)/(this.cantEquipos*0.2)
            this.cnDisponibilidad2=(((this.cantEquipos*0.5)/this.cnEstable2)*100)/(this.cantEquipos*0.5)
            this.cnDisponibilidad3=(((this.cantEquipos*0.8)/this.cnEstable3)*100)/(this.cantEquipos*0.8)
            this.cnDisponibilidad4=(((this.cantEquipos*0.8)/this.cnEstable4)*100)/(this.cantEquipos*0.8)
            this.cnDisponibilidad5=(((this.cantEquipos*1)/this.cnEstable5)*100)/(this.cantEquipos*1)
            this.cnDisponibilidad6=(((this.cantEquipos*1)/this.cnEstable6)*100)/(this.cantEquipos*1)

            //CALCULO DIAS PARA CONTROLAR EL INCIDENTE
            this.cnControlar1=Math.ceil((this.cnEstable1*this.porcenEquiposInfectados)/100)
            this.cnControlar2=Math.ceil((this.cnEstable2*this.porcenEquiposInfectados)/100)
            this.cnControlar3=Math.ceil((this.cnEstable3*this.porcenEquiposInfectados)/100)
            this.cnControlar4=Math.ceil((this.cnEstable4*this.porcenEquiposInfectados)/100)
            this.cnControlar5=Math.ceil((this.cnEstable5*this.porcenEquiposInfectados)/100)
            this.cnControlar6=Math.ceil((this.cnEstable6*this.porcenEquiposInfectados)/100)
            //CALCULO COSTO DE IMPRODUCTIVIDAD
            this.cnImproductividad1=(this.cnControlar1*this.hLab*this.cHorasEmpleado)*0.2*this.cantEquipos
            this.cnImproductividad2=(this.cnControlar2*this.hLab*this.cHorasEmpleado)*0.5*this.cantEquipos
            this.cnImproductividad3=(this.cnControlar3*this.hLab*this.cHorasEmpleado)*0.8*this.cantEquipos
            this.cnImproductividad4=(this.cnControlar4*this.hLab*this.cHorasEmpleado)*0.8*this.cantEquipos
            this.cnImproductividad5=(this.cnControlar5*this.hLab*this.cHorasEmpleado)*1*this.cantEquipos
            this.cnImproductividad6=(this.cnControlar6*this.hLab*this.cHorasEmpleado)*1*this.cantEquipos
            //CALCULO COSTO DE OPORTUNIDAD
            this.cnOportunidad1=this.cnControlar1*this.cOportunidadVentas
            this.cnOportunidad2=this.cnControlar2*this.cOportunidadVentas
            this.cnOportunidad3=this.cnControlar3*this.cOportunidadVentas
            this.cnOportunidad4=this.cnControlar4*this.cOportunidadVentas
            this.cnOportunidad5=this.cnControlar5*this.cOportunidadVentas
            this.cnOportunidad6=this.cnControlar6*this.cOportunidadVentas
            //CALCULO COSTO DE NEGOCIO TOTAL
            this.cn1=this.cnImproductividad1+this.cnOportunidad1+parseInt(this.cReputacion)
            this.cn2=this.cnImproductividad2+this.cnOportunidad2+parseInt(this.cReputacion)
            this.cn3=this.cnImproductividad3+this.cnOportunidad3+parseInt(this.cReputacion)+parseInt(this.cFiltradoInfo)
            this.cn4=this.cnImproductividad4+this.cnOportunidad4+parseInt(this.cReputacion)+parseInt(this.cFiltradoInfo)
            this.cn5=this.cnImproductividad5+this.cnOportunidad5+parseInt(this.cReputacion)+parseInt(this.cFiltradoInfo)
            this.cn6=this.cnImproductividad6+this.cnOportunidad6+parseInt(this.cReputacion)+parseInt(this.cFiltradoInfo)

        },
        costoTotal: function(){
            this.tTotal1=Math.round((this.ct1+this.cn1)* 1000)/1000
            this.tTotal2=Math.round((this.ct2+this.cn2)* 1000)/1000
            this.tTotal3=Math.round((this.ct3+this.cn3)* 1000)/1000
            this.tTotal4=Math.round((this.ct4+this.cn4)* 1000)/1000
            this.tTotal5=Math.round((this.ct5+this.cn5)* 1000)/1000
            this.tTotal6=Math.round((this.ct6+this.cn6)* 1000)/1000
            //PORCENTAJES CT
            this.ctPorcen1=Math.round((this.ct1/this.tTotal1)*100)
            this.ctPorcen2=Math.round((this.ct2/this.tTotal2)*100)
            this.ctPorcen3=Math.round((this.ct3/this.tTotal3)*100)
            this.ctPorcen4=Math.round((this.ct4/this.tTotal4)*100)
            this.ctPorcen5=Math.round((this.ct5/this.tTotal5)*100)
            this.ctPorcen6=Math.round((this.ct6/this.tTotal6)*100)
            //PORCENTAJES CN
            this.cnPorcen1=Math.round((this.cn1/this.tTotal1)*100)
            this.cnPorcen2=Math.round((this.cn2/this.tTotal2)*100)
            this.cnPorcen3=Math.round((this.cn3/this.tTotal3)*100)
            this.cnPorcen4=Math.round((this.cn4/this.tTotal4)*100)
            this.cnPorcen5=Math.round((this.cn5/this.tTotal5)*100)
            this.cnPorcen6=Math.round((this.cn6/this.tTotal6)*100)

        }
    }
})

