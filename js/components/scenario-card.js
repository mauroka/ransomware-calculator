
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
    <div class="col-lg-4 col-md-6 mb-4 btn-escenario">
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