<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useHead } from '#app'

// Seo/meta
// Her definerer vi title, metadescripton og keywords til seo
useHead({
  title: 'Event',
  meta: [
    {
      name: 'description',
      content: 'Enkelt event hos biffen Nordkraft'
    },
    {
      name: 'keywords',
      content: 'event, oversigt, information, enkelt'
    }
  ]
})
// Variabel til at hente route for url.
const route = useRoute()
const eventSlug = route.params.event
// Opretter en variabel til at gemme data om det event, den starter i null, men skal senere fyldes med info
const singleEvent = ref(null)

// Bruger onMOunted, som gør at den venter på komponentet er færdig med at blive vist
onMounted(async () => {
  // Derefter henter vio data fra vores api
  const response = await fetch(`https://biffen.rasmus-pedersen.com/wp-json/wp/v2/event?slug=${eventSlug}&_embed`)
  // Retunerer svaret som json
  const eventData = await response.json()
  // Gemmer det første event fra resultatet ellers sættes værdien til null.
  singleEvent.value = eventData[0] || null
})
</script>


<template>
<main class="eventSingleMain">

<section
  class="eventHeroWrapper"
  v-if="singleEvent"
  :style="{
    background: `
      linear-gradient(to bottom, rgba(24, 31, 47, 0) 40%, #181F2F 100%),
      radial-gradient(circle at 80% center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.75) 100%),
      url(${singleEvent?.acf?.event_baggrundsbillede?.url})
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }"
>
  <HeaderImageBackground />
  <div class="eventHeroContent widthContainer">
      <div class="backButton underlineAnimationLinks">
      <NuxtLink to="/events" class="backbtn ">
        <i class="fa fa-arrow-left"></i> Tilbage
      </NuxtLink>
    </div>
      <img
        :src="singleEvent.acf.event_billede.url"
        :alt="singleEvent.title.rendered"
        class="eventPoster"
      />

      <div class="eventInfoBox">
        <h1>{{ singleEvent.title.rendered }}</h1>

        <div class="eventMetadata">
          <span>
            <i class="fa-solid fa-calendar-days"></i>
            {{ singleEvent.acf.dato }}
          </span>
          <span>
            <i class="fa-solid fa-location-dot"></i>
            {{ singleEvent.acf.event_adresse }}
          </span>
        </div>

        <p class="eventDescription" v-html="singleEvent.acf.event_beskrivelse"></p>

        <div class="buttons">
          <a
            v-if="singleEvent.acf.bilette_url"
            :href="singleEvent.acf.bilette_url"
            target="_blank"
            class="btn red"
          >Bestil billetter</a>
          <a
            v-if="singleEvent.acf.event_film_tmdb"
            :href="singleEvent.acf.event_film_tmdb"
            target="_blank"
            class="btn outline"
          >Læs mere</a>
        </div>
      </div>
    </div>
  </section>

</main>
<Footer />
</template>

<style scoped>
.eventSingleMain {
  padding: 0;
}

.eventHeroWrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  background-size: cover;
  background-position: center;
  border-radius: var(--radius-section);
  justify-content: center;
  align-items: center;
  border-radius: 0;
}

.eventHeroContent {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  justify-content: center;
  align-items: stretch;
  width: 100%;
    padding: var(--space-container);
}

.eventPoster {
  flex: 0 1 35%;
  height: auto;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: var(--radius-section);
  box-shadow: 0px 0px 20px 2px #4C90FF;
}

.eventInfoBox {
  flex: 1 1 55%;
  background: rgba(32, 47, 77, 0.85);
  padding: 50px;
  border-radius: var(--radius-section);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 300px;
}

.eventInfoBox h1 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.genreItem:not(:last-child)::after {
  content: '|';
  position: absolute;
  right: -0.5rem;
  color: white;
}

.eventMetadata {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.eventMetadata span {
  background: #181F2F;
  padding: 5px 8px;
  border-radius: var(--radius-button);
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.eventMetadata span i {
  color: var(--interactive-red);
}

.eventDescription {
  margin: 1rem 0;
}

.buttons {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.backButton {
  width: 100%;
  padding-top: 2rem;
}

.backbtn {
  padding: 0.6rem 0;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.95rem;
  color: white;
}

.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.95rem;
}

.btn.red {
  background-color: #ff3b5c;
  color: white;
}

.btn.outline {
  border: 1px solid white;
  color: white;
  background: transparent;
}



@media (min-width: 700px) {
  .eventInfoBox {
    max-width: 700px;
  }
}

@media (min-width: 100px) {
  .eventPoster {
    max-width: 400px;
  }
}

</style>

