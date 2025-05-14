<script setup>
import Header from '@/components/Header.vue';

</script>

<template>
  <Header />
  <main>
    <section>
    <div class="section-boks-1-container">
    <div class="section-boks-1">
      <div class="section-boks-1-content">
        <div class="section-boks-1-text">
          <h2 class="overskrift-boks-1"><span>Biffen</span></h2>
          <p class="section-boks-1-beskrivelse">Biffen Nordkraft er Aalborgs eneste uafhængige biograf. Vi har specialiseret os i små som store filmperler, som ikke altid finder vej til de traditionelle biografer. I vores 3 sale vises der både nye premierefilm og historiske klassikere. Derudover afholder vi filmfestivaler (f.eks. CPH DOX) og arrangerer oplæg og interviews med instruktører og skuespillere m. fl. - altid med den gode film i centrum.</p>
        </div>
        <div class="section-boks-1-billede">
          <img src="../assets/img/filmklubber-boks-billede.jpg" alt="">
        </div>
      </div>
    </div>
    </div>
  </section>

  </main>
  <Footer />

</template>

<style scoped>
.section-boks-1-container {
  padding-left: 120px;
  padding-right: 120px;
  margin-top: 8rem;
  margin-bottom: 8rem;
}

.section-boks-1 {
  background: #202F4D;
  padding: 50px;
  border-radius: 20px;
}

.section-boks-1-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 70px;
}

.section-boks-1-text,
.section-boks-1-billede {
  flex: 1;
  max-width: 50%;
}

.section-boks-1-billede img {
  width: 100%;
  height: 500px;
  border-radius: 20px;
  object-fit: cover;
}

.overskrift-boks-1 {
  font-size: 55px;
  font-weight: 700;
  margin-bottom: 1rem;
}

.overskrift-boks-1 span {
  position: relative;
  display: inline-block;
}

.overskrift-boks-1 span::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 50%;
  height: 4px;
  background-color: #F63758;
}

.section-boks-1-beskrivelse {
  font-size: 18px;
  line-height: 175%;
  margin-top: 40px;
}

</style>
