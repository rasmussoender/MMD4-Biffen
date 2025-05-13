<script setup>
import { ref, onMounted, computed } from 'vue'

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

const sortedEvents = computed(() => {
  return [...eventList.value].sort((a, b) => {
    return new Date(a.acf?.dato) - new Date(b.acf?.dato)
  })
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
      <section class="introEvents">
        <img src="../assets/img/IntroEventMobil.png" alt="" class="mobilbillede">
        <img src="/assets/img/IntroEventDesktop.png" alt="" class="pcbillede">
        <div class="introWrapper">
        <div class="headingNdLine">
          <h1>Biffens event</h1>
        </div>
        <p>Biffen arrangerer året igennem en lang række spændende events - altid med den gode film i centrum.</p>
        <p>Vi får bl.a. besøg af aktuelle skuespillere og instruktører til Q&A’s, hvor publikum får mulighed for at stille spørgsmål og få et unikt indblik i filmens tilblivelse. Vi afholder både nationale og internationale filmfestivaler som CPH:DOX, Don't Fear the Weird og Cinematekets Musikfilmfestival, som giver plads til både nye stemmer og etablerede navne.</p>
        </div>
    </section>

      <section class="upcomingEvents upcoming">
      <div class="headingNdLine">
        <h1>Kommende events</h1>
      </div>
      <section>
        <NuxtLink
        v-for="event in sortedEvents"
        :key="event.id"
        :to="`/events/${getEventCategorySlug(event)}/${event.slug}`"
        class="eventCardLink"
        >
        <article>
            <div class="wrapper">
              <img class="eventImg" :src="event.acf?.event_billede?.url" :alt="event.title.rendered" />
              <div class="overlay"></div>
              <div class="calendar">
                <i class="fa-solid fa-calendar-days" id="calendarIcon"></i>
                <h6>{{ event.acf?.dato }}</h6>
              </div>
              <h4 v-html="event.title.rendered"></h4>
            </div>
            <!-- <p class="eventBeskrivelse" v-html="event.acf?.event_beskrivelse"></p> -->
          </article>
        </NuxtLink>
      </section>
    </section>

      <section class="events">
      <div class="headingNdLine">
        <h1>Vores events</h1>
      </div>

      <section>
        <NuxtLink
          v-for="category in categoryList"
          :key="category.id"
          :to="`/events/${category.slug}`"
          class="eventCardLink"
        >
          <article>
            <img
              :src="category.acf?.event_taksonomi_billede?.url"
              :alt="category.name"
              class="mobilbillede"
            />
            <img
              :src="category.acf?.event_taksonomi_billede?.url"
              :alt="category.name"
              class="pcbillede"
            />
            <div class="whiteLine">
              <div class="redLine"></div>
            </div>
            <h3>{{ category.name }}</h3>
            <p class="eventBeskrivelse">{{ category.description }}</p>
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
  overflow: hidden; 
  border-radius: var(--radius-card);
}


.upcoming > section article div h4 {
  position: absolute;
  bottom: 36px;
  left: 16px;
  z-index: 2;
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

.eventBeskrivelse {
  font-size: 15px;
  padding-top: 1rem;
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


.eventImg {
  transition: transform 0.5s ease;
  will-change: transform;
}

.wrapper:hover .eventImg {
  transform: scale(1.10);
}

.overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at bottom, rgba(24, 31, 47, 1), transparent 100%);
  z-index: 1;
  border-radius: var(--radius-card);

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
    transition: transform 0.5s ease;

}

.events section {
  overflow: hidden;

}
.events section article img:hover, .upcomingEvents section article img:hover {
  transform: scale(1.05);

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
  padding: 2rem;
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
