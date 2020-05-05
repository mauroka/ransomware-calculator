const app = new Vue({
    el:'#app',
    data:{
        page: 1,
        
      //DATOS GENERALES
        hLab:undefined,
        cHorasEmpleado:undefined,
        cantEquipos:undefined,

    
  //BACKUPS
        porcenBackup:undefined,
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
    ctPorcen6:undefined
   
    
    
        
    },

    methods:{
        mostrar: function(){
            this.calculoSueltos(),
            this.escenario(),
            this.costoTecnologico(),
            this.costoNegocio(),
            this.costoTotal()
  

        },
        calculoSueltos: function(){
            this.cPromedio=this.chRegeInfo*this.cHorasEmpleado,
            this.cRegeInfo=this.cHorasEmpleado*this.chUltiBackup
            
            
            
           
        },

        escenario: function(){

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
            this.cnRegenerar4=parseInt(this.chRegeInfo),
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
            this.cn1=this.cnImproductividad1+this.cnOportunidad1
            this.cn2=this.cnImproductividad2+this.cnOportunidad2
            this.cn3=this.cnImproductividad3+this.cnOportunidad3
            this.cn4=this.cnImproductividad4+this.cnOportunidad4
            this.cn5=this.cnImproductividad5+this.cnOportunidad5
            this.cn6=this.cnImproductividad6+this.cnOportunidad6
            



            

            
        },
        costoTotal: function(){
            this.tTotal1=this.ct1+this.cn1
            this.tTotal2=this.ct2+this.cn2
            this.tTotal3=this.ct3+this.cn3
            this.tTotal4=this.ct4+this.cn4
            this.tTotal5=this.ct5+this.cn5
            this.tTotal6=this.ct6+this.cn6
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