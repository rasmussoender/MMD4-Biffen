<script setup>

</script>
<template>
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
<section class="forside-entry-section">
  <div class="forside-entry-grid">
    <div class="forside-entry-card forside-entry-card--white-bg">
      <img src="../assets/img/cinemateket-entry.png" alt="Card 1">
      <hr>
      <h3>Cinemateket</h3>
      <p>Oplev store klassikere, sjældne filmperler og spændende events i Cinemateket i Biffen.</p>
    </div>
    <div class="forside-entry-card">
      <img src="../assets/img/filmklubben-entry.png" alt="Card 2">
      <hr>
      <h3>Filmklubber</h3>
      <p>Meld dig ind i en filmklub, og se udvalgte film til reduceret pris!</p>
    </div>
    <div class="forside-entry-card">
      <img src="../assets/img/events-entry.png" alt="Card 3">
      <hr>
      <h3>Events</h3>
      <p>Biffen arrangerer året igennem en lang række spændende events - altid med den gode film i centrum.</p>
    </div>
    <div class="forside-entry-card">
      <img src="../assets/img/gavekort-entry.png" alt="Card 4">
      <hr>
      <h3>Gavekort</h3>
      <p>Et gavekort til Biffen er mere end bare en gave – det er en oplevelse. Se også vores øvrige billetter.</p>
    </div>
    </div>
</section>
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

.forside-entry-section {
  padding: 0 120px;
  margin-bottom: 12rem;
}

.forside-entry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 83px;
}

.forside-entry-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
}

.forside-entry-card img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
  display: block;
  transition: transform 0.3s ease, box-shadow 0.6s ease;
  margin-bottom: 1rem;
}

.forside-entry-card:hover img {
  transform: scale(1.03);
  box-shadow: 0px 0px 20px 2px #4C90FF;
}

.forside-entry-card hr {
  position: relative;
  height: 2px;
  background-color: white;
  border: none;
  width: 100%;
  margin: 16px 0 8px;
  overflow: hidden;
}

.forside-entry-card hr::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #F63758;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease-in-out;
  z-index: 2;
}

.forside-entry-card:hover hr::after {
  transform: scaleX(1);
}

.forside-entry-card h3 {
  margin-top: 1rem;
  font-size: 34px;
  font-weight: 500;
}

.forside-entry-card p {
  margin: 0;
  font-size: 18px;
  font-weight: 300;
}

.forside-entry-card--white-bg img {
  object-fit: contain;
  background-color: white;
}

.forside-entry-card--white-bg:hover img {
  transform: scale(1.03);
  box-shadow: 0px 0px 20px 2px #4C90FF;
}
</style>