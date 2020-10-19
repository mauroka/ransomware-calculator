Vue.component('organization-info-report-page', {
    props: ["user-data", "report-view-page"],
    template:
`

        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="card-title m-0 font-weight-bold text-primary">
                    Datos de la organización
                </h6>
            </div>
            <div class="card-body">
                <div v-show="reportViewPage === 1">
                    <table class="table table-striped table-bordered table-hover specific-scenario-details report-page">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col" colspan="2">Datos Generales</th>
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
                                <th scope="col" colspan="2">Copias de seguridad</th>
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
                                <th scope="col" colspan="2">Recuperación de equipos</th>
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
                </div>
                <div v-show="reportViewPage === 2">
                    <table class="table table-striped table-bordered table-hover specific-scenario-details report-page">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col" colspan="2">Rescate</th>
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
                                <th scope="col" colspan="2">Información de negocio</th>
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
        </div>

`
});