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
  <main class="mainEvents">
    
    <section
    class="eventHeroWrapper"
    v-if="categoryList.length"
    :style="{ backgroundImage: `url(${categoryList.find(cat => cat.slug === currentCategorySlug)?.acf?.event_taksonomi_baggrundsbillede?.url})` }"
    >
    
    <div class="eventInfoBox">

    <div class="textContent">
      <h1>{{ categoryList.find(cat => cat.slug === currentCategorySlug)?.name }}</h1>
      <p class="moviedescription">
        {{ categoryList.find(cat => cat.slug === currentCategorySlug)?.description }}
      </p>
    </div>

    <div class="imageWrapper">
      <img
        :src="categoryList.find(cat => cat.slug === currentCategorySlug)?.acf?.event_taksonomi_billede?.url"
        :alt="categoryList.find(cat => cat.slug === currentCategorySlug)?.name"
      />
    </div>
  </div>
</section>



    <section class="upcomingEvents upcoming">
      <div class="headingNdLine">
        <h2>Kommende events</h2>
      </div>
      <section>
        <NuxtLink
          v-for="event in eventsInCategory"
          :key="event.id"
          :to="`/events/${currentCategorySlug}/${event.slug}`"
          class="eventCardLink"
        >
          <article>
            <div class="wrapper">
              <img :src="event.acf?.event_billede?.url" :alt="event.title.rendered" />
              <div class="overlay"></div>
              <div class="calendar">
                <i class="fa-solid fa-calendar-days" id="calendarIcon"></i>
                <h6>{{ event.acf?.dato }}</h6>
              </div>
              <h4 v-html="event.title.rendered"></h4>
            </div>
            <!-- <p v-html="event.acf?.event_beskrivelse"></p> -->
          </article>
        </NuxtLink>
      </section>
    </section>
  </main>
  <Footer />
</template>


<style scoped>
.mainEvents {
  padding: 0;
}

a {
  text-decoration: none;
  color: white;
}

#calendarIcon {
  color: var(--interactive-red);
}

.calendar {
  background: rgba(24, 31, 47, 0.8); 
  padding: 6px;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  top: 8px;
  left: 16px;
}

.wrapper {
  position: relative;
}

.upcoming > section article div h4 {
  position: absolute;
  bottom: 36px;
  left: 16px;
}

.wrapper img {
  position: relative;
}

.overlay {
  background: radial-gradient(50% 50% at 50% 50%, rgba(24, 31, 47, 0) 0%, rgba(24, 31, 47, 0.7) 100%);
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.upcomingEvents {
  padding: var(--space-section);
  padding-top: 0;
}

.upcomingEvents section {
  display: grid;
  row-gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  column-gap: 2rem;
}

.upcomingEvents section article {
  display: flex;
  flex-direction: column;
}

.upcomingEvents section article:hover {
  cursor: pointer;
}

.upcomingEvents section article img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 15px;
  display: block;
}

/* Hero sektion for kategoriside */
.eventHeroWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-container);
  background-size: cover;
  background-position: center;
  border-radius: var(--radius-section);
  margin-bottom: 3rem;
  width: 100%;
}

.eventInfoBox {
  display: flex;
  gap: 1rem;
  background: rgba(32, 47, 77, 0.85);
  padding: 2rem;
  border-radius: var(--radius-section);
  width: 100%;
  box-sizing: border-box;
  margin-top: 2rem;
}

.eventInfoBox .textContent {
  flex: 1;
  color: white;
}

.eventInfoBox .imageWrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.eventInfoBox .imageWrapper img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-section);
  object-fit: cover;
  max-height: 400px;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

.headingNdLine {
  display: inline-block;
  margin-top: 40px;
  padding-bottom: 1rem;
}

.headingNdLine div {
  width: 50%;
  background-color: var(--interactive-red);
  height: 3px;
}

/* Desktop styling */
@media (min-width: 1000px) {
  .upcomingEvents section {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2rem;
    row-gap: 2rem;
  }

  .upcomingEvents section article img {
    height: 400px;
  }

  .upcomingEvents section article:hover {
    cursor: pointer;
  }
}

@media (min-width: 1200px) {
  .eventHeroWrapper {
    max-width: 100%;
  }
}

@media (min-width: 700px) {
  .eventInfoBox {
    max-width: 100%;
  }
}



</style>

