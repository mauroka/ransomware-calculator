const app = new Vue({
    el:'#content-wrapper',
    store: store,
    data:{
        userData: undefined,
        modalShow: true,
        reportProgress: 0,
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
        onUpdateReportProgress($event){
            this.reportProgress = $event
        },
    }
})



