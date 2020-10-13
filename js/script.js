const app = new Vue({
    el:'#app',
    store: store,
    data:{
        userData: undefined,
        modalShow: true
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



