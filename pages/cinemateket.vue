<script setup>
import { ref, onMounted } from 'vue';
const filmProgram = ref([]);

onMounted(async () => {
  try {
    const res = await fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie?cinemateket=16&per_page=100&_embed');
    const data = await res.json();
    filmProgram.value = data;
  } catch (error) {
    console.error('Fejl:', error);
    
  }
});
</script>
<template>
  <Header />
  <main>
        <div class="section-boks-1-container">
    <div class="section-boks-1">
      <div class="section-boks-1-content">
        <div class="section-boks-1-text">
          <h4 class="subtitle-boks-1">Hvad er</h4>
          <h2 class="overskrift-boks-1"><span>Cinemateket</span></h2>
          <p class="section-boks-1-bold">STORE KLASSIKERE, SJÆLDNE FILMPERLER, SPÆNDENDE EVENTS</p>
          <p class="section-boks-1-beskrivelse">CINEMATEKET I BIFFEN byder hver tirsdag og udvalgte dage på klassikere, kultfilm og sjældne perler fra filmhistorien – film du sjældent ser i danske biografer. Udvalgt i samarbejde med Cinemateket og vist i Biffen i Nordkraft, ofte med introduktion, mad eller musik. Se programmet her. OBS: Filmene vises uden danske undertekster, medmindre andet er angivet.</p>
            <p class="section-boks-1-beskrivelse">Entré: 100 kr. (evt. tillæg ved events/helaftensfilm)</p>
        </div>
        <div class="section-boks-1-img">
          <img src="/public/img/cinemateket.png" alt="">
        </div>
      </div>
    </div>
    </div>

<section>
      <h2 class="overskrift-med-streg"><span>Cinematekets Program</span></h2>

      <div class="film-program-container">
        <div
          v-if="filmProgram.length > 0"
          class="film-program"
          v-for="film in filmProgram"
          :key="film.id"
        >
          <div class="film-program-content">
            <div class="program-film-poster">
              <img
                :src="film.acf?.poster?.url || '../assets/img/placeholder.jpg'"
                :alt="film.acf?.title || film.title.rendered"
              />
            </div>
            <div class="film-program-detaljer">
              <div class="film-program-titel-og-info">
                <h3>{{ film.acf?.title || film.title.rendered }}</h3>
                <ul>
                  <li>
                    <i class="fas fa-clock"></i>{{ film.acf?.varighed || 'Ukendt tid' }}
                  </li>
                  <li>
                    <i class="fas fa-child-reaching"></i>{{ film.acf?.age?.[0]?.aldersgraense || 'Aldersmærke mangler' }}
                  </li>
                </ul>
              </div>

              <hr class="film-program-hr" />

              <div class="film-information-container">
                <div class="film-program-dato-beskrivelse">
                  <div class="film-program-dato">
                    <p>
                      <i class="fa-solid fa-calendar-days"></i>
                      {{ film.acf?.udgivelsesdato || 'Udgivelsesdato ukendt' }}
                    </p>
                  </div>
                  <div class="film-program-beskrivelse">
                    <p>{{ film.acf?.filmklub_film_beskrivelse || 'Beskrivelse mangler.' }}</p>
                  </div>
                </div>
                <div class="read-more-button-container">
                  <NuxtLink :to="`/film/${film.slug}`" class="read-more-btn">
                    Mere info
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else style="color: white; margin-top: 2rem;">
          Ingen film fundet i kategori 13.
        </div>
      </div>
    </section>

  </main>
  <Footer />

</template>


<style scoped>
.section-boks-1-container {
  margin-top: 8rem;
  margin-bottom: 12rem;
}

.section-boks-1 {
  background: #202F4D;
  padding: 50px;
  border-radius: 20px;
}

.section-boks-1-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 70px;
}

.section-boks-1-text,
.section-boks-1-img {
  flex: 1;
  max-width: 50%;
}

.section-boks-1-img img {
  width: 100%;
  height: 100%;
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

.subtitle-boks-1 {
  font-size: 26px;
  font-weight: 200;
  line-height: 150%;
}

.section-boks-1-beskrivelse {
  font-size: 18px;
  line-height: 175%;
  margin-top: 1rem;
}

.section-boks-1-bold {
  font-weight: bold;

}

.overskrift-med-streg {
  font-size: 55px;
  font-weight: 700;
  margin-bottom: 1rem;
  max-width: 100%;
}

.overskrift-med-streg span {
  position: relative;
  display: inline-block;
}

.overskrift-med-streg span::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 50%;
  height: 4px;
  background-color: #F63758;
}




.film-program-container {

  margin-bottom: 3rem;
}

.film-program-container-mobile {
  display: none;
}

.film-program {
  background: #202F4D;
  padding: 50px;
  border-radius: 20px;
  margin-top: 4rem;
}

.film-program-content {
  display: flex;
  gap: 4rem;
  align-items: stretch;
  padding-bottom: 6rem;
  height: 100%;
}

.film-program-content:last-child {
  padding-bottom: 0;
}

.program-film-poster {
  display: flex;
  align-items: stretch;
}

.program-film-poster img {
  width: 100%;
  max-width: 300px;
  border-radius: 20px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
  height: 100%;
  object-fit: cover;
}

.film-program-detaljer {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.film-program-titel-og-info {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.film-program-titel-og-info h3 {
  font-size: 36px;
  color: white;
  font-weight: 700;
}

.film-program-titel-og-info ul {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.film-program-titel-og-info li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #131C31;
  color: white;
}

.film-program-titel-og-info i {
  color: #F63758;
}

.film-program-hr {
  border: none;
  height: 1px;
  background-color: white;
  margin-top: 12px;
  margin-bottom: 1.75rem;
}

.film-information-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.film-program-dato-beskrivelse {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.film-program-beskrivelse {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.film-program-beskrivelse p {
  font-size: 18px;
  color: white;
  line-height: 1.75;
}

.film-program-dato {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #131C31;
  color: white;
  width: fit-content;
}

.film-program-dato p {
  font-size: 16px;
}

.film-program-dato i {
  color: #F63758;
  margin-right: 0.5rem;
}

.read-more-button-container {
  margin-top: auto;
}

.read-more-btn {
  background: var(--interactive-red);
  color: white;
  padding: 15px 25px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: var(--radius-button);
  cursor: pointer;
  display: inline-flex; 
  gap: 10px;
  width: auto;
  transition: background 0.3s;
  text-decoration: none;
  align-items: center;   
}

.read-more-btn:hover {
  background: #e11d48;
}


@media (max-width: 768px) {
.film-program-container {
  display: none;
}

.film-program-container-mobile {
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 4rem;
}

.film-program-mobile {
  padding: 30px;
  border-radius: 20px;
  margin-top: 4rem;
  background: #202F4D;
}

.film-program-content-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  padding-bottom: 2rem;
}

.program-film-poster-mobile img {
  width: 100%;
  max-width: 200px;
  border-radius: 20px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
  display: block;
  margin: 0 auto;
}

.film-program-detaljer-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.film-program-titel-og-info-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.film-program-titel-og-info-mobile h3 {
  font-size: 28px;
  color: white;
  font-weight: 700;
  margin: 0;
}

.film-program-titel-og-info-mobile ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;  
  justify-content: center;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.film-program-titel-og-info-mobile li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #131C31;
  color: white;
  margin-bottom: 0.7rem;
}

.film-program-titel-og-info-mobile i {
  color: #F63758;
}

.film-program-hr-mobile {
  width: 100%;
  height: 1px;
  background-color: white;
  border: none;
  margin-top: 2rem;
  margin-bottom: 6rem;
}

.film-program-content-mobile:last-of-type .film-program-hr-mobile {
  margin-bottom: 0;
}
}
</style>
