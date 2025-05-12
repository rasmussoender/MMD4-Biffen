<script setup>
import Header from '@/components/Header.vue';

</script>

<template>
  <Header />
  <main>
    <section class="udvalg">
      <article>
        <div class="udvalgCard">
          <img src="../assets/img/GavePakkeLogo.png" alt="" class="logo">
          <img src="../assets/img/GavepakkeIkon.png" alt="" class="iconthing">
          <img src="../assets/img/Gavepakke1.png" alt="">
        </div>
        <div class="btn">
          <button>Køb</button>
        </div>
      </article>
       <article>
        <div class="udvalgCard">
          <img src="../assets/img/GavePakkeLogo.png" alt="" class="logo">
          <img src="../assets/img/GavepakkeIkon.png" alt="" class="iconthing">
          <img src="../assets/img/Gavepakke2.png" alt="">
        </div>
        <div class="btn">
          <button>Køb</button>
        </div>
      </article>
       <article>
        <div class="udvalgCard">
          <img src="../assets/img/GavePakkeLogo.png" alt="" class="logo">
          <img src="../assets/img/GavepakkeIkon.png" alt="" class="iconthing">
           <img src="../assets/img/Gavepakke3.png" alt="">
        </div>
        <div class="btn">
          <button>Køb</button>
        </div>
      </article>
       <article>
        <div class="udvalgCard">
          <img src="../assets/img/GavePakkeLogo.png" alt="" class="logo">
          <img src="../assets/img/GavepakkeIkon.png" alt="" class="iconthing">
          <div class="gavepakke4img">
          <div class="textOverlay">
            <p>Overrask en du holder af</p>
            <div class="redline"></div>
            <p>- med en personlig gave leveret af Gavebuddet – hurtigt, nemt og uforglemmeligt.  </p>
          </div>
          <img src="../assets/img/Gavepakke4.png" alt="">
          <div class="overlay"></div>
          </div>
        </div>
        <div class="btn">
          <button>Køb</button>
        </div>
      </article>
    </section>
  </main>
  <Footer />

</template>


<style scoped>
main{
  padding: 0px 12px;
}

.udvalg{
  display: grid;
  justify-items: center;
  row-gap: 6rem;
}

.udvalgCard{
  background-color: white;
  box-shadow: 0px 0px 20px 2px #4C90FF;
  border-radius: 30px;
  padding: 56px 16px 16px 16px;
  position: relative;
  display: inline-block;

}
.udvalgCard img:last-of-type{
  border-radius: 30px;
}

.iconthing{
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.logo{
  position: absolute;
  top: 10px;
  left: 35px;
}

.btn{
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn button{
  color: white;
  border: none;
  background-color: var(--interactive-red);
  font-family: var(--font-headings);
  border-radius: 5px;
  padding: 12px 32px;
}

.gavepakke4img{
  position: relative;
}
.overlay{
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.69);
  top: 0px;
  border-radius: 30px;
}
.textOverlay{
  margin-top: 64px;
  padding: 0px 16px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
}
.redline{
  width: 40%;
  height: 2px;
  background-color: var(--interactive-red);
}
.textOverlay p:last-of-type{
  text-align: center;
  font-size: 14px;
  
}

@media (min-width: 1000px){
   main{
    padding: 0 var(--space-container);
  }
  .udvalg{
    grid-template-columns: repeat(3,1fr);
    justify-items: center;
    row-gap: 8rem;
  }
  .udvalg article:last-of-type{
    grid-column: 2;
  }
  
}

</style>

