<script setup>
import { ref, onMounted } from 'vue';
import { useHead } from '#app'

// Seo/meta
useHead({
  title: 'Filmklubber',
  meta: [
    {
      name: 'description',
      content: 'filmklubber hos biffen Nordkraft'
    },
    {
      name: 'keywords',
      content: 'filmklub, biffen, film, klub, alle'
    }
  ]
})

const filmklubber = ref([]);

onMounted(async () => {
  try {
    const res = await fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/filmklub?per_page=100');
    const data = await res.json();
    filmklubber.value = data;
  } catch (err) {
    console.error('Fejl ved hentning af filmklubber:', err);
  }
});
</script>

<template>
   <Header />
   <main class="widthContainer">

     <section>
       <!-- Sektion 1 med tekst og billede -->
       <div class="section-boks-1-container">
         <div class="section-boks-1">
           <div class="section-boks-1-content">
             <div class="section-boks-1-text">
                <h2 class="overskrift-med-streg"><span>Filmklubber</span></h2>
               <div class="section-boks-1-beskrivelse">
                 <p>
                   Meld dig ind i én filmklub, og se udvalgte film til reduceret pris!
                  </p>
                  <br>
                  <p>
                    Udover Biffens egne filmklubber, 'De Smukke og Særlige' og 'SeniorBifffen', kan du også se filmene fra 'Filmporten' og 'Biografklub Danmark' i Biffen. 
                  </p>
                  <br>
                  <p>
                    Du kan læse mere om de filmklubber  vi tilbyder nedenunder og find den filmklub dig passer dig og dine filmbehov bedst!
                  </p>
                </div>
              </div>
              <div class="section-boks-1-billede">
                <img src="../../assets/img/filmklubber-boks-billede.jpg" alt="">
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Entry kort -->
      <section class="forside-entry-section">
        <div class="forside-entry-grid">
          <router-link
          v-for="klub in filmklubber"
          :key="klub.id"
          :to="`/filmklub/${klub.slug}`"
          class="forside-entry-card"
          >
          <img
          :src="klub.acf?.['filmklub-billede']?.url || '../assets/img/placeholder.jpg'"
          :alt="klub.title.rendered"
          />
          <hr />
          <h3 v-html="klub.title.rendered"></h3>
          <p>{{ klub.acf?.['filmklub-teaser-tekst'] || '' }}</p>
        </router-link>
      </div>
    </section>
  </main>

   <Footer />

  </template>
  

<style scoped>


.section-boks-1 {
  background: #202F4D;
  padding: 2rem;
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
  margin-bottom: var(--space-section);
  padding-top: var(--space-section);
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
  text-decoration: none;
  color: inherit;
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
  margin-top: 10px;
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


/* Mobile: max-width 768px */
@media (max-width: 768px) {
    .forside-entry-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }



  .section-boks-1 {
    padding: var(--space-container);
  }
  .section-boks-1-content {
    flex-direction: column;
    gap: 40px;
  }
  .section-boks-1-text,
  .section-boks-1-billede {
    max-width: 100%;
  }

  .section-boks-1-beskrivelse {
    margin-top: 0;
  }


  


}
</style>