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
    <section class="upcomingEvents upcoming">
      <div class="headingNdLine">
        <h1>{{ currentCategorySlug }}</h1>
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
            <p v-html="event.acf?.event_beskrivelse"></p>
          </article>
        </NuxtLink>
      </section>
    </section>
  </main>
  <Footer />
</template>


<style scoped>
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

.pcbillede {
  display: none;
}

/* Mobile styling */
h1, h2, h3, h4, h5, h6 {
  margin: 0px;
}

.introEvents {
  background-color: var(--secondary-blue);
  padding: 20px 20px;
  margin-top: var(--space-section);
}

.introEvents img {
  border-radius: 20px;
}

.introEvents {
  margin-bottom: var(--space-section);
}

.introWrapper {
  padding-bottom: 20px;
}

main {
  padding: 0px 12px;
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

.events:last-of-type img {
  border-radius: 15px;
}

.events:nth-of-type(2) img {
  border-radius: 6px;
}

.wrapper img {
  position: relative;
}

.overlay {
  background: radial-gradient(
    50% 50% at 50% 50%, 
    rgba(24, 31, 47, 0) 0%, 
    rgba(24, 31, 47, 0.7) 100%);
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
}

/* EVENTS GRID LAYOUT */
.events section, .upcomingEvents section {
  display: grid;
  row-gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
}

.events section article img, .upcomingEvents section article img {
  width: 100%; 
  height: 300px; 
  object-fit: cover;
  border-radius: 15px;
}

.events section article {
  position: relative;
}

.events section article .redLine {
  position: absolute;
  bottom: 0; 
  left: 0;
  width: 0%; 
  height: 2px;
  background-color: var(--interactive-red);
  transition: width 500ms ease;
}

.events section article:hover .redLine {
  width: 100%; 
}

/* Desktop styling */
@media (min-width: 1000px) {
  .events section {
    grid-template-columns: repeat(3, 1fr); 
    column-gap: 2rem;
    row-gap: 2rem;
  }

  .events section article {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .events section article img {
    width: 100%;
    height: 400px; 
    object-fit: cover;
    border-radius: 15px;
  }


  .events section article:hover {
    cursor: pointer;
  }

  .redLine {
    transition: width 500ms ease;
    position: absolute;
    width: 0%; 
    height: 1px;
    background-color: var(--interactive-red);
    bottom: 0;
  }

  .events section article:hover .redLine {
    width: 100%; 
  }
}

.mobilbillede {
  display: none;
}

.pcbillede {
  display: block;
}

main {
  padding: 0 var(--space-container);
}

.upcomingEvents section {
  grid-template-columns: repeat(3, 1fr);
  column-gap: 2rem;
  row-gap: 2rem;
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
  display: block;
}

.introEvents {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  padding: 40px 100px;
}

.introEvents .introWrapper {
  grid-template-columns: 1;
  grid-row: 1;
  justify-self: end;
}

.introEvents img {
  justify-self: end;
  grid-column: 2;
}

.whiteLine {
  height: 1px;
  background-color: white;
  position: relative;
  margin: 16px 0px;
}

.redLine {
  width: 0%;
}



</style>

