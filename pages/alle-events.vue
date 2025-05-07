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
        <img src="../assets/img/CinematicsMobil.png" alt="">
        <div></div>
        <h3>Cinemates</h3>
        <p>Biffen Cinemates er Biffens egen filmklub med fantastiske filmoplevelser. En mandag aften hver måned vises en udvalgt premierefilm</p>
      </article>
      <article>
        <img src="../assets/img/CinematicsMobil.png" alt="">
        <div></div>
        <h3>Cinemates</h3>
        <p>Biffen Cinemates er Biffens egen filmklub med fantastiske filmoplevelser. En mandag aften hver måned vises en udvalgt premierefilm</p>
      </article>
      <article>
        <img src="../assets/img/CinematicsMobil.png" alt="">
        <div></div>
        <h3>Cinemates</h3>
        <p>Biffen Cinemates er Biffens egen filmklub med fantastiske filmoplevelser. En mandag aften hver måned vises en udvalgt premierefilm</p>
      </article>
      <article>
        <img src="../assets/img/CinematicsMobil.png" alt="">
        <div></div>
        <h3>Cinemates</h3>
        <p>Biffen Cinemates er Biffens egen filmklub med fantastiske filmoplevelser. En mandag aften hver måned vises en udvalgt premierefilm</p>
      </article>
    </section>
  </section>
  </main>
  <Footer />

</template>

<style scoped>
h1,h2,h3,h4,h5,h6,p{
  margin: 0px;
}
.introEvents{
  background-color: var(--secondary-blue);
  padding: 20px 20px;
}

.introEvents img{
  border-radius: 15px;
}
main{
  padding: 0px 12px;
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
  row-gap: 75px;
}
</style>
<!-- .eventContainer {
  padding: 20px;
}

.eventCards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.eventCard {
  background: black;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.eventImage {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.eventDetails {
  margin-top: 15px;
}

.eventDetails h3 {
  margin: 5px 0;
} -->






 <!-- <div class="eventContainer">
      <h1>Kommende Events</h1>
      <div v-if="events.length === 0">Indlæser events...</div>
      <div v-else class="eventCards">
        <div v-for="event in events" :key="event.id" class="eventCard">
          <router-link :to="`/event/${event.slug}`">
            <img :src="event.acf.event_billede.url" :alt="event.title.rendered" class="eventImage" />
            <div class="eventDetails">
              <h2>{{ event.title.rendered }}</h2>
              <h3>{{ event.acf.subtitle }}</h3>
              <p>{{ event.acf.dato }}</p>
              <p>{{ event.acf.event_beskrivelse }}</p>
              <a :href="event.acf.ticket_link" target="_blank" rel="noopener">Køb billet(er)</a>
            </div>
          </router-link>
        </div>
      </div>
    </div> -->