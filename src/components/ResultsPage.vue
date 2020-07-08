<template>
    <div>

        <div class="row">
            <div class="col-md-12 mb-3" style="text-align: right;">
                <button v-on:click="backToForm" type="button" class="btn btn-outline-primary"
                    role="button">Anterior</button> &nbsp;
            </div>
        </div>
        <div class="row ">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header py-3">
                        <h6 class="card-title m-0 font-weight-bold text-primary">
                            Resultados
                        </h6>
                    </div>
                    <div class="card-body offset-lg-2 col-lg-8 col-md-12">
                        <div class="card-body">
                            <div class="chart-pie-demo">
                                <canvas id="globalchart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--CARD ESCENARIOS-->
        <transition name="slide-fade">
            <div class="col-lg-12" key="page6">
                <!--CARD ESCENARIOS-->
                <div>
                    <div class="row">
                        <div class="col-12">
                            <div class="alert alert-warning" role="alert">
                                Haga clic en los siguientes indicadores para ver su detalle.
                            </div>
                        </div>
                    </div>
                    <div class="row ">
                        <ScenarioCard label="Mejor escenario" :value="tTotal1" colorClass="primary"></ScenarioCard>
                        <ScenarioCard label="Optimista" :value="tTotal2" colorClass="success"></ScenarioCard>
                        <ScenarioCard label="Medio" :value="tTotal3" colorClass="info"></ScenarioCard>
                        <ScenarioCard label="Pesimista" :value="tTotal4" colorClass="warning"></ScenarioCard>
                        <ScenarioCard label="Desastroso" :value="tTotal5" colorClass="danger"></ScenarioCard>
                        <ScenarioCard label="Tacaño" :value="tTotal6" colorClass="secondary"></ScenarioCard>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import ScenarioCard from '@/components/ScenarioCard.vue'
export default {
    name: 'ResultsPage',
    components:{
        ScenarioCard
    },
    methods: {
        backToForm: function(){
            this.$emit("backToForm")
        }
    },
    data: function () {
        return {
            tTotal1: 0,
            tTotal2: 0,
            tTotal3: 0,
            tTotal4: 0,
            tTotal5: 0,
            tTotal6: 0,
        }
    }
}
</script>