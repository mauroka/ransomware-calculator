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
        scrollUp: function(){
            setTimeout(function(){
                var posicion= $("#content-wrapper").offset().top;
                $('body,html').animate({ scrollTop:posicion-10 },1000);
            }, 100);
        },
        onFormDataReady(userData){
            this.userData = userData;
        },
        onResultsGoBack(){
            this.userData = undefined
            this.scrollUp()
        },
        onUpdateReportProgress($event){
            this.reportProgress = $event
        },
    }
})



