const app = new Vue({
    el:'#app',
    data:{
        verResultados:false,
    },
    
    methods:{
        onFormDataReady(userData){
            this.verResultados = true;
            this.$refs["results-page"].update_scenarios(userData)
        },
        onResultsGoBack(){
            this.verResultados = false;
        },
    }
})



