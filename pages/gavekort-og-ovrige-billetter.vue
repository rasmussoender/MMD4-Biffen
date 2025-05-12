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
          <img src="../assets/img/Gavepakke1Mobil.png" alt="">
        </div>
        <div class="btn">
          <button>Køb</button>
        </div>
      </article>
       <article>
        <div class="udvalgCard">
          <img src="../assets/img/GavePakkeLogo.png" alt="" class="logo">
          <img src="../assets/img/GavepakkeIkon.png" alt="" class="iconthing">
          <img src="../assets/img/Gavepakke1Mobil.png" alt="">
        </div>
        <div class="btn">
          <button>Køb</button>
        </div>
      </article>
       <article>
        <div class="udvalgCard">
          <img src="../assets/img/GavePakkeLogo.png" alt="" class="logo">
          <img src="../assets/img/GavepakkeIkon.png" alt="" class="iconthing">
          <img src="../assets/img/Gavepakke1Mobil.png" alt="">
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
  row-gap: 6rem;
}

.udvalgCard{
  background-color: white;
  box-shadow: 0px 0px 20px 2px #4C90FF;
  border-radius: 30px;
  padding: 56px 0px 16px 0px;
  position: relative;
}
.udvalgCard img:last-of-type{
  border-radius: 30px;
  display: block;
  margin: auto;
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

</style>

