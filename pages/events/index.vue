<script setup>
import { ref, onMounted } from 'vue'

const categoryList = ref([])
const eventList = ref([])

onMounted(async () => {
  const [categoryResponse, eventResponse] = await Promise.all([
    fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/event-kategori'),
    fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/event?_embed')
  ])
  categoryList.value = await categoryResponse.json()
  eventList.value = await eventResponse.json()
})

function getEventCategorySlug(eventItem) {
  const categoryId = eventItem['event-kategori']?.[0]
  const foundCategory = categoryList.value.find(cat => cat.id === categoryId)
  return foundCategory?.slug || 'unknown'
}
</script>

<template>
    <Header />
    <main>
        <div>
            <h1>Alle events</h1>
            
            <h2>Kategorier</h2>
            <ul>
                <li v-for="category in categoryList" :key="category.id">
                    <NuxtLink :to="`/events/${category.slug}`">{{ category.name }}</NuxtLink>
                </li>
            </ul>
            
            <h2>events</h2>
            <ul>
                <li v-for="event in eventList" :key="event.id">
                    <NuxtLink :to="`/events/${getEventCategorySlug(event)}/${event.slug}`">{{ event.title.rendered }}</NuxtLink>
                </li>
            </ul>
        </div>
    </main>
  <Footer />

</template>

<style scoped>
</style>
