<template>
  <!-- Page Wrapper -->
  <div id="wrapper">
    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div class="sidebar-brand-icon">
          <font-awesome-icon :icon="['fas', 'chess-rook']" size="2x" />
        </div>
        <div class="sidebar-brand-text mx-3">SA-MATE</div>
      </a>
      <!-- Divider -->
      <hr class="sidebar-divider my-0">
      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
        <a class="nav-link" href="index.html">
          <font-awesome-icon :icon="['fas', 'money-check-alt']" size="1x" style="font-size: 14px;" pull="left" transform="down-2" />
          &nbsp;
          <span>Calculador de costos de Ransomware</span>
        </a>
      </li>
    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">
            <div class="topbar-divider d-none d-sm-block"></div>
            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
              <a class="nav-link" href="https://github.com/mauroka/ransomware-calculator" target="_blank" role="button">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">Visitar Repositorio</span>
              </a>
            </li>
          </ul>
        </nav>
        <!-- End of Topbar -->
        <!-- Begin Page Content -->
        <div class="container-fluid" id="content">
          <!-- Page Heading -->
          <div class="align-items-center justify-content-between mb-4">
            <h1 class="h3 text-gray-800"><font-awesome-icon :icon="['fas', 'money-check-alt']" size="1x" /> Calculador de costos de Ransomware</h1>
            <p class="text-gray-800">Conozca los costos directos e indirectos en los que incurriría su organización en
              el caso de una infección por Ransomware.</p>
            <div class="alert alert-warning" role="alert">
              <b>Precaución:</b> Todos los valores monetarios deben ser ingresados en la misma moneda.
            </div>
            <Form v-show="!showResults" v-on:formDataReady="formDataReady"></Form>
            <ResultsPage v-show="showResults" v-on:backToForm="hideResults"></ResultsPage>
          </div>
        </div>

        <!-- End of Main Content -->
        <!-- Footer -->
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>SA-MATE - Phishing and Ransomware in terms of money</span>
            </div>
          </div>
        </footer>
        <!-- End of Footer -->
      </div>
      <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->
  </div>
  <!-- built files will be auto injected -->

</template>

<script>
  //import HelloWorld from './components/HelloWorld.vue'

  import Vue from 'vue'
  import '@fortawesome/fontawesome-free/css/all.css'
  import '@fortawesome/fontawesome-free/js/all.js'
  import '@/assets/css/sb-admin-2.min.css';
  import '@/assets/css/styles.css';
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faMoneyCheckAlt, faChessRook } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import Form from '@/components/Form.vue'
  import ResultsPage from '@/components/ResultsPage.vue'

  library.add(faMoneyCheckAlt)
  library.add(faChessRook)
  Vue.component('font-awesome-icon', FontAwesomeIcon)

  Vue.config.productionTip = false

  export default {
    name: 'App',
    components: {
      //HelloWorld
      Form,
      ResultsPage
    },
    data: function(){
      return {
        showResults: false,
      }
    },
    methods:{
      formDataReady: function(data){
        console.log("DATA received:" +JSON.stringify(data))
        console.log(data.cOportunidadVentas)
        this.showResults = true;
      },
      hideResults: function(){
        this.showResults = false
      }
    }
  }
</script>