<template>

  <div >
    
    
    <h1 class="display-4">Ransomware</h1>

      
    <h2 class="display-5">Datos Generales</h2>


    <form class="container" id="datosGenerales">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="hLab">Cantidad de horas laborales</label>
          <input type="number" class="form-control" id="hLab" placeholder="">
        </div>
        <div class="form-group col-md-6">
          <label for="cHoraEmpleado">Costo de la hora por empleado</label>
          <input type="number" class="form-control" id="cHoraEmpleado" placeholder="">
          </div>
      </div>
      
    

      <button type="submit" class="btn btn-primary">Sign in</button>
    </form>

    <h2 class="display-5 mt-5">Backups</h2>

    <form class="container" id="backups">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="porcenBackup">Porcentaje de informacion respaldada</label>
          <input type="number" class="form-control" id="porcenBackup" placeholder="">
        </div>
        <div class="form-group col-md-6">
          <label for="chRegeInfo">Horas p/usuario para generar informacion no respaldada</label>
          <input type="number" class="form-control" id="chRegeInfo" placeholder="">
          </div>
      </div>
      <div class="form-group">
        <label for="chUltiBackup">Cantidad de horas laborables desde el ultimo backup</label>
        <input type="number" class="form-control" id="chUltiBackup" placeholder="">

       

      </div>
      <div class="form-group ">
         <label for="chLabSinBackup">Cantidad de horas laborales por usuario/equipo para recuperar informacion de la organizacion sin respaldar</label>
        <input type="number" class="form-control" id="chLabSinBackup" placeholder="">
      </div>
    

      <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
  </div>
</template>

<script>

export default {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#datosGenerales{
  padding: 2%;
  border-style: solid;
}

#backups{
  padding: 2%;
  border-style: solid;
}
</style>
