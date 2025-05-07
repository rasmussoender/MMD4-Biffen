  <script setup>
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'
  
  const route = useRoute()
  const slug = route.params.slug
  const event = ref(null)
  
  onMounted(async () => {
    try {
      const { data } = await useFetch(`https://biffen.rasmus-pedersen.com/wp-json/wp/v2/event?slug=${slug}`)
      event.value = data.value[0]
    } catch (error) {
      console.error('Fejl ved hentning af event:', error)
    }
  })
  </script>

<template>
    <Header />
  <main>
    <div v-if="event">
      <img :src="event.acf.event_billede.url" :alt="event.title.rendered" />
      <h1>{{ event.title.rendered }}</h1>
      <h2>{{ event.acf.subtitle }}</h2>
      <p>{{ event.acf.dato }}</p>
      <p>{{ event.acf.event_beskrivelse }}</p>
      <a :href="event.acf.ticket_link" target="_blank" rel="noopener">Køb billet(er)</a>
    </div>
    <div v-else>Loading event details...</div>
  </main>

  <Footer />

</template>
   
  
<style scoped>

</style>

  