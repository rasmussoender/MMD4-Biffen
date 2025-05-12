<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const currentCategorySlug = route.params.category

const eventsInCategory = ref([])
const categoryList = ref([])

onMounted(async () => {
  const categoryResponse = await fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/event-kategori')
  categoryList.value = await categoryResponse.json()

  const matchingCategory = categoryList.value.find(cat => cat.slug === currentCategorySlug)
  if (!matchingCategory) return

  const eventResponse = await fetch(`https://biffen.rasmus-pedersen.com/wp-json/wp/v2/event?event-kategori=${matchingCategory.id}&_embed`)
  eventsInCategory.value = await eventResponse.json()
})
</script>

<template>
<Header />
<main>

    <div>
        <h1>Kategori {{ currentCategorySlug }}</h1>
        
        <ul>
            <li v-for="eventItem in eventsInCategory" :key="eventItem.id">
                <NuxtLink :to="`/events/${currentCategorySlug}/${eventItem.slug}`">{{ eventItem.title.rendered }}</NuxtLink>
            </li>
        </ul>
    </div>
</main>
  <Footer />

</template>

<style scoped>
</style>

