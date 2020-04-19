<template>
  <div>
    
    <Swiper />

   

    
  

 
   
  </div>

</template>

<script>
export default {
  methods: {
    goPage(selectedCategory) {
      this.$store.dispatch('changeCategory', selectedCategory);
      this.$router.push('/product');
    },
  },

  components: {

      Swiper: () => import('@/components/front/Swiper'),

    
  
    
    


   
   
  },
};
</script>
