<script setup>
import { ref, onMounted } from 'vue'

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
  <div class="eventContainer">
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
  </div>
</template>

<style scoped>
.eventContainer {
  padding: 20px;
}

.eventCards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.eventCard {
  background: #fff;
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
}
</style>
