<script setup>
import { ref, onMounted } from 'vue'
import Footer from '~/components/Footer.vue'

const events = ref([])

onMounted(async () => {
  try {
    const response = await fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/event')
    const data = await response.json()
    events.value = data
  } catch (error) {
    console.error('Error fetching events:', error)
  }
})
</script>

<template>
  <Header />
  <main>
  <section class="introEvents">
    <div class="introWrapper">
    <div class="headingNdLine">
      <h1>Biffens event</h1>
      <div></div>
    </div>
    <p>Biffen arrangerer året igennem en lang række spændende events - altid med den gode film i centrum.</p>
    <p>Vi får bl.a. besøg af aktuelle skuespillere og instruktører til Q&A’s, hvor publikum får mulighed for at stille spørgsmål og få et unikt indblik i filmens tilblivelse. Vi afholder både nationale og internationale filmfestivaler som CPH:DOX, Don't Fear the Weird og Cinematekets Musikfilmfestival, som giver plads til både nye stemmer og etablerede navne.</p>
    <p>Derudover sætter vi en ære i at skabe den rette ramme omkring hver visning – hvad enten det er gennem introduktioner, debatarrangementer eller særlige temaaftener, der sætter filmen i perspektiv og inviterer til refleksion.</p>
    </div>
    <img src="../assets/img/IntroEventMobil.png" alt="">
  </section>

  <section class="events">
    <div class="headingNdLine">
      <h1>Vores events</h1>
      <div></div>
    </div>
    <section>
      <article>
        <picture>
          <source srcset="../assets/img/CinematicsMobil.png" media="(max-width:999px)">
          <source srcset="../assets/img/CinematicsDesktop.png" media="(min-width:1000px)">
          <img src="../assets/img/CinematicsMobil.png" alt="">
        </picture>
        <div class="whiteLine">
          <div class="redLine"></div>
        </div>
        <h3>Cinemates</h3>
        <p>Biffen Cinemates er Biffens egen filmklub med fantastiske filmoplevelser. En mandag aften hver måned vises en udvalgt premierefilm</p>
      </article>
      <article>
        <picture>
          <source srcset="../assets/img/FranskefilmMobil.png" media="(max-width:999px)">
          <source srcset="../assets/img/FranskefilmDesktop.png" media="(min-width:1000px)">
          <img src="../assets/img/FranskefilmMobil.png" alt="">
        </picture>
        <div class="whiteLine">
          <div class="redLine"></div>
        </div>
        <h3>Franske Film Mandage</h3>
        <p>Oplev det bedste fra den franske filmscene!</p>
      </article>
      <article>
        <picture>
          <source srcset="../assets/img/OperaIBiffenMobil.png" media="(max-width:999px)">
          <source srcset="../assets/img/OperaIBiffenDesktop.png" media="(min-width:1000px)">
          <img src="../assets/img/OperaIBiffenMobil.png" alt="">
        </picture>
        <div class="whiteLine">
          <div class="redLine"></div>
        </div>
        <h3>Opera i Biffen</h3>
        <p>Oplev nogle af de største operaer på det store lærred når vi viser Opera i Biffen.</p>
      </article>
      <article>
        <img src="../assets/img/BiffenInternationalMobil.png" alt="">
        <div class="whiteLine">
          <div class="redLine"></div>
        </div>
        <h3>Biffen International</h3>
        <p>On selected days, you can watch premiere films with English subtitles at Biffen International</p>
      </article>
    </section>
  </section>
  </main>
  <Footer />

</template>

<style scoped>

/* Mobile styling */
h1,h2,h3,h4,h5,h6{
  margin: 0px;
}
.introEvents{
  background-color: var(--secondary-blue);
  padding: 20px 20px;
}

.introEvents img{
  border-radius: 15px;
}
.introEvents{
  margin-bottom: var(--space-section);
}

.introWrapper{
  padding-bottom: 20px;
}
main{
  padding: 0px 12px;
}

.headingNdLine{
  margin: 40px 0px;
}

.headingNdLine div{
  width: 30%;
  background-color: var(--interactive-red);
  height: 3px;
}

.events img{
  border-radius: 15px;
}
.events section{
  display: grid;
  row-gap: 60px;
}

.whiteLine{
  width: 100%;
  height: 1px;
  background-color: white;
  position: relative;
  margin: 16px 0px;
}
.redLine{
  position: absolute;
  width: 30%;
  height: 1px;
  background-color: var(--interactive-red)
}


/* Desktop styling */

@media (min-width: 1000px){
  .events section{
    grid-template-columns: repeat(3,1fr);
    column-gap: 3rem;
    row-gap: 3rem;
  }
  main{
    padding: 0 var(--space-container);
  }
}
</style>
