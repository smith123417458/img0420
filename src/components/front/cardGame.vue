<template>
 <div id="app">

 
   <div class="text"><h1>{{ state }}</h1>     </div>
   <div class="cards" :class="{gather: gather}">

    <div class="card" v-for="(card,index) in cards" :key="index" :data-order="card.id" 
    :class="{open: card.open}" @click="openCard(card)">

      <div class="face back"></div>
        <div class="face front">{{ getSymbol(card.label) }}</div> 
     </div>
    </div>

 <div class="modal fade p-0" id="couponModal" tabindex="-1" role="dialog">
   <div class="modal-dialog modal-dialog-centered d-flex justify-content-center" role="document">
     <div class="modal-bg"></div>
     <div class="modal-content bg-transparent border-0 text-center">
       <div class="modal-body" style="margin-top: 5rem">
         <div class="mb-md-5 pb-md-5 pb-4">
           <h3 class="mb-3 text-dark">恭喜您獲得</h3>
           <h3 class="mb-3 model-text text-dark">八折優惠碼</h3>
           <h4><span class="badge text-dark badge-success px-5 py-2">17458</span></h4>
         </div>
         <div class="text-center">
           <router-link class="btn btn-danger mr-5" to="/product"
            data-dismiss="modal">馬上租車去</router-link>
           <button class="btn btn-secondary" @click.prevent="hideCard()"
            data-dismiss="modal">己複製優惠碼 </button>
         </div>
       </div>
     </div>
   </div>
 </div>











</div>

</template>

<script>

export default {
  data() {
    return {
       gather: true,
      state: "點按牌面開始遊戲",
    symbols: [
      {label: "黑桃",symbol: "♠"},
      {label: "紅心",symbol: "♥"},
      {label: "梅花" ,symbol: "♣"},
     
    ],
    cards: [
      {
        id: 1,label: "黑桃",open: true
      },
      {
        id: 2,label: "紅心", open: true
      },
      {
        id: 3,label: "梅花", open: true
      },
     
    ],
    
    question: null,
    mode: "",
    count: 0,
    };
  },


   methods: {
    shuffle(){
     let newOrder=[1,2,3].sort((a,b)=>Math.random()>0.5?1:-1)
     this.cards.forEach((card,cid)=>card.id=newOrder[cid])
    },

    turnAll(state){
      this.cards.forEach((card)=>card.open=state)
    },

    getSymbol(label) {
      let result= this.symbols.find(s=>s.label==label)
       return result.symbol
      //  console.log(result.symbol)
    },

    startGame(){
      this.mode=""
      this.question = this.symbols[parseInt(Math.random()*3)]
      this.turnAll(false)
      this.gather=true
        this.state="準備開始"

      setTimeout(()=>{
        this.gather=false
        this.state="你的任務是.."
      },1000)

      setTimeout(()=>{
        this.turnAll(true)
        this.state="找到 "+this.question.label+this.question.symbol+ "!"
      },2000)

      setTimeout(()=>{
        this.turnAll(false)
        this.state="請準備.."
      },4000)

      this.count=0

      setTimeout(()=>{
        let startShuffle = ()=>{
          this.shuffle()
          if (this.count++<2){
            setTimeout(startShuffle,900)
          }else{
            this.state="請找出 "+this.question.label+this.question.symbol
            this.mode="answer"
          }
        }
        startShuffle()
      },6000)
    },
    getCard(label){
      return this.cards.find(card=>card.label==label)
    },

   hideCard(){
      $('#couponModal').modal('hide');
   },

    openCard(card){
      if (this.mode=="answer"){
        card.open=!card.open
        if (card.label==this.question.label){
           $('#couponModal').modal('show');
          this.state=" 你的優惠碼是17458!!!"
          this.state="You get the "+this.question.label+this.question.symbol+"!!! "
                    
        }else{
         
          setTimeout(()=>{
            this.getCard(this.question.label).open=true 
          },1000)
        }
        setTimeout(()=>{this.startGame()},3000)
      }else{
        this.startGame()
      }    
    }
  }
}
</script>

<style lang="scss" scoped>

#app {
  background-color: #102438;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.text{
   position: absolute;
  top:9%;
  
}

@media (max-width:800px) {
  h1{
    font-size: 26px;
   
  }
}

.cards {
  width: 100%;
  height: 40vh;
  cursor: pointer;
}
.cards .card {
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  width: 15vw;
  height: 21vw;
  position: absolute;
 transform: rotate(0deg);
  transition: left 0.5s, top 0.5s, transform 1s;
 transform-style: preserve-3d;
  top: 35%;
}
.cards .card .face {
backface-visibility: hidden;
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 5px;
  overflow: hidden;
}
.cards .card .face.front {

 transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  color: black;
 
}
.cards .card .face.back {
  box-sizing: border-box;
  padding: 3%;
}
.cards .card .face.back:before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  border: solid 3px rgb(255, 174, 0);
  box-sizing: border-box;
  background-color: white;
  background-image: linear-gradient(-60deg, transparent 40%,blue 40%,blue 60%, transparent 60%), 
  linear-gradient(60deg, transparent 40%,blue 40%,blue 60%, transparent 60%);
  background-size: 8px 8px;
}
.cards .card.open {
 transform: rotate(0deg) rotateY(180deg);
}
.cards .card[data-order="1"] {
  left: calc(25% - 7.5vw);
}
.cards .card[data-order="2"] {
  left: calc(55% - 7.5vw);
}
.cards .card[data-order="3"] {
  left: calc(85% - 7.5vw);
}

.cards .card:hover {
  top: 30%;
}
.cards.gather .card {
  top: 20%;
  left: calc(50% - 7.5vw);
  transform: rotate(360deg);
}
.cards.gather:hover .card[data-order="1"] {
 transform: rotate(367deg);
}
.cards.gather:hover .card[data-order="2"] {
transform: rotate(371deg);
}
.cards.gather:hover .card[data-order="3"] {
 transform: rotate(379deg);
}

.modal-bg {
  position: absolute;
  height: 512px;
  width: 512px;
  background: url(https://i.imgur.com/xIJadJc.png ) center center no-repeat;
 
}

@media (max-width: 767px){
.modal-bg{
    width: 320px;
    height: 320px;
    background: url(https://i.imgur.com/vt5x1Kk.png)center center no-repeat;
  }}


@media (max-width: 767px) {
  .model-text {
    font-size: 1.25rem;
  }

}

</style>