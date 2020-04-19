<template>
  <div id="app">
    
    <loading :active.sync="isLoading" :is-full-page="true">
       <template slot="default">
         <img src="@/assets/img/r01.png" width="50px"> 
      </template>
      <template slot="after">
        <img src="@/assets/img/loading.gif">
      </template>
      
      </loading> 
    <router-view />
  </div>
</template>


<script>
export default {
  computed: {
   
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  /**
            全域註冊 Event bus 
    1. Sweet alert 事件，參數為 icon (成功或失敗)、title (顯示的文字訊息)
    2. goTop 事件，滾動至網頁頂部(避免轉換頁面時，畫面跑掉)，並藉由 Navbar.vue 的 watch 監聽在每次切換路由時滾動至頂部
   */
  created() {
    // Sweet alert 成功或失敗
    this.$bus.$on('sweet-alert', (params) => {
      this.$swal.fire({
        position: 'top-end',
        ...params,
        showConfirmButton: false,
        timer: 2000,
        allowOutsideClick: false,
      });
    });

    // Sweet alert 傳達訊息
    this.$bus.$on('sweet-alert-info', (params) => {
      this.$swal.fire({
        ...params,
        showCloseButton: false,
        confirmButtonText: '已複製',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-dark btn-lg',
        },
      });
    });

    // goTop
    this.$bus.$on('goTop', () => {
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: $('html,body').offset().top,
          },
          1000,
        );
    });
  },
};
</script>
