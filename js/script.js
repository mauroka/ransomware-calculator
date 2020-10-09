const app = new Vue({
    el:'#app',
    data:{
        userData: undefined
    },
    computed: {
        userDataReady: function(){
            return this.userData != undefined;
        }
    },
    methods:{
        onFormDataReady(userData){
            this.userData = userData;
        },
        onResultsGoBack(){
            this.userData = undefined
        },
    }
})



