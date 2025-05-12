<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const eventSlug = route.params.event
const categorySlug = route.params.category

const singleEvent = ref(null)

onMounted(async () => {
  const response = await fetch(`https://biffen.rasmus-pedersen.com/wp-json/wp/v2/event?slug=${eventSlug}&_embed`)
  const eventData = await response.json()
  singleEvent.value = eventData[0] || null
})
</script>

<template>
<Header />
<main>
    <div v-if="singleEvent">
        <h1>{{ singleEvent.title.rendered }}</h1>
        <div v-html="singleEvent.content.rendered"></div>
        
        <p><strong>Dato:</strong> {{ singleEvent.acf?.dato }}</p>
        <p><strong>Undertekst:</strong> {{ singleEvent.acf?.subtitle }}</p>
        
        <img
        v-if="singleEvent.acf?.event_billede?.url"
        :src="singleEvent.acf.event_billede.url"
        :alt="singleEvent.title.rendered"
        />
    </div>
</main>
  <Footer />
</template>

<style scoped>
</style>

