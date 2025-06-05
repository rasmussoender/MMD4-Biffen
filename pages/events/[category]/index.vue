<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useHead } from '#app'

// Seo/meta
// Her definerer vi title, metadescripton og keywords til seo
useHead({
  title: 'Eventtype',
  meta: [
    {
      name: 'description',
      content: 'Alle events under eventtype hos biffen Nordkraft'
    },
    {
      name: 'keywords',
      content: 'events, event, eventtype, biffen, kommende'
    }
  ]
})

// // Variabel til at hente route for url.
const route = useRoute()
const currentCategorySlug = route.params.category

// Opretter to tomme reaktive arrays, som kan opdateres automatisk
// En til vores liste af alle events og en til eventkategorier
const eventsInCategory = ref([])
const categoryList = ref([])

// Bruger onMounted, så når den vises på siden vil den starte med at hente alle event kategorier fra WordPress
onMounted(async () => {
  const categoryResponse = await fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/event-kategori')
  // Den gemmer listen i categoryList
  categoryList.value = await categoryResponse.json()
// Finder den kategori, der passer med slug’en fra URL’en.
  const matchingCategory = categoryList.value.find(cat => cat.slug === currentCategorySlug)
  // Stopper hvis der ikke findes en matchende kategori
  if (!matchingCategory) return

  // Nu henter den alle events der hører til den matchende kategori
  const eventResponse = await fetch(`https://biffen.rasmus-pedersen.com/wp-json/wp/v2/event?event-kategori=${matchingCategory.id}&_embed`)
  eventsInCategory.value = await eventResponse.json()
})

</script>

<template>
  <main class="mainEvents">
    
<section
  class="eventHeroWrapper"
  v-if="categoryList.length"
  :style="{
    background: `
      linear-gradient(to bottom, rgba(24, 31, 47, 0) 40%, #181F2F 100%),
      radial-gradient(circle at 80% center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.75) 100%),
      url(${categoryList.find(cat => cat.slug === currentCategorySlug)?.acf?.event_taksonomi_baggrundsbillede?.url})
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }"
>
  <HeaderImageBackground />

<div class="widthContainer">
  <div class="eventInfoBox ">
    <div class="imageWrapper">
      <img
      :src="categoryList.find(cat => cat.slug === currentCategorySlug)?.acf?.event_taksonomi_billede?.url"
      :alt="categoryList.find(cat => cat.slug === currentCategorySlug)?.name"
      />
    </div>
    
    <div class="textContent">
      <h1>{{ categoryList.find(cat => cat.slug === currentCategorySlug)?.name }}</h1>
      <p class="moviedescription">
        {{ categoryList.find(cat => cat.slug === currentCategorySlug)?.description }}
      </p>
    </div>
  </div>
</div>
</section>



    <section class="upcomingEvents upcoming widthContainer">
      <h2 class="overskrift-med-streg"><span>Kommende events</span></h2>
      <section>
        <NuxtLink
          v-for="event in eventsInCategory"
          :key="event.id"
          :to="`/events/${currentCategorySlug}/${event.slug}`"
          class="eventCardLink"
        >
          <article>
            <div class="wrapper imageHoverEffect">
              <img :src="event.acf?.event_billede?.url" :alt="event.title.rendered" />
              <div class="overlay"></div>
              <div class="calendar">
                <i class="fa-solid fa-calendar-days" id="calendarIcon"></i>
                <h6>{{ event.acf?.dato }}</h6>
              </div>
              <h4 v-html="event.title.rendered"></h4>
            </div>
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
  margin: 0 auto;
  width: 100%;
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
  padding: var(--space-container);
padding-top: 4rem;
}
@media (min-width: 1500px) {
  .upcomingEvents {
  max-width: 1500px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0;
  padding-top: 4rem;
  }
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
  padding-bottom: 1rem;
  background-size: cover;
  background-position: center;
  border-radius: var(--radius-section);
  width: 100%;
}

.eventInfoBox {
  flex-direction: row-reverse;
  display: flex;
  gap: 50px;
  background: rgba(32, 47, 77, 0.85);
  padding: 50px;
  border-radius: var(--radius-section);
  width: 100%;
  box-sizing: border-box;
  margin-top: 5rem;
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

@media(min-width: 100px) and (max-width: 767px){
  .eventInfoBox{
    display: block;
  }
}

</style>

