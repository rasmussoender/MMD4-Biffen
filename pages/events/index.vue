<script setup>
import { ref, computed } from 'vue';
import { useHead, useFetch } from '#app';

// SEO/meta
useHead({
  title: 'Events',
  meta: [
    {
      name: 'description',
      content: 'Alle events hos biffen Nordkraft'
    },
    {
      name: 'keywords',
      content: 'events, event, oversigt, biffen, upcoming'
    }
  ]
});

const { data: categoryData } = await useFetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/event-kategori');
const { data: eventData } = await useFetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/event?_embed');

const categoryList = ref(categoryData.value || []);
const eventList = ref(eventData.value || []);

function getEventCategorySlug(eventItem) {
  const categoryId = eventItem['event-kategori']?.[0];
  const foundCategory = categoryList.value.find(cat => cat.id === categoryId);
  return foundCategory?.slug || 'unknown';
}

const sortedEvents = computed(() => {
  return [...eventList.value].sort((a, b) => {
    return new Date(a.acf?.dato) - new Date(b.acf?.dato);
  });
});
</script>


<template>
    <Header />
    <main class="widthContainer">
      <section class="introEvents">
        <img src="../../assets/img/IntroEventMobil.png" alt="" class="mobilbillede">
        <img src="../../assets/img/IntroEventDesktop.png" alt="" class="pcbillede">
        <div class="introWrapper">
        <h1 class="overskrift-med-streg"><span>Biffens events</span></h1>
        <p>Biffen arrangerer året igennem en lang række spændende events - altid med den gode film i centrum.</p>
        <p>Vi får bl.a. besøg af aktuelle skuespillere og instruktører til Q&A’s, hvor publikum får mulighed for at stille spørgsmål og få et unikt indblik i filmens tilblivelse. Vi afholder både nationale og internationale filmfestivaler som CPH:DOX, Don't Fear the Weird og Cinematekets Musikfilmfestival, som giver plads til både nye stemmer og etablerede navne.</p>
        </div>
    </section>

      <section class="upcomingEvents upcoming">
      <h2 class="overskrift-med-streg"><span>Kommende events</span></h2>
      <section>
        <NuxtLink
        v-for="event in sortedEvents"
        :key="event.id"
        :to="`/events/${getEventCategorySlug(event)}/${event.slug}`"
        class="eventCardLink"
        >
        <article>
            <div class="wrapper imageHoverEffect">
              <img class="eventImg" :src="event.acf?.event_billede?.url" :alt="event.title.rendered" />
              <div class="overlay"></div>
              <div class="calendar">
                <i class="fa-solid fa-calendar-days" id="calendarIcon"></i>
                <p>{{ event.acf?.dato }}</p>
              </div>
              <h4 v-html="event.title.rendered"></h4>
            </div>
          </article>
        </NuxtLink>
      </section>
    </section>

      <section class="events">
<h2 class="overskrift-med-streg"><span>Vores events</span></h2>

<section class="eventOverviewSection">
  <NuxtLink
    v-for="category in categoryList"
    :key="category.id"
    :to="`/events/${category.slug}`"
    class="entryCardRedline"
  >
    <img
      :src="category.acf?.event_taksonomi_billede?.url"
      :alt="category.name"
    />
    <hr />
    <h3>{{ category.name }}</h3>
    <p>{{ category.description.length > 100 ? category.description.slice(0, 100) + '...' : category.description }}</p>

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
.calendar p {
  font-size: 12px;
  font-weight: bold;
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


.headingNdLine {
  display: inline-block;
  margin-top: 40px;
  padding-bottom: 1rem;
  font-size: 20px;
}

.headingNdLine div {
  width: 75%;
  background-color: var(--interactive-red);
  height: 3px;
}

.events:last-of-type img {
  border-radius: 15px;
}

.events:nth-of-type(2) img {
  border-radius: 6px;
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
  column-gap: 2rem;
  row-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
  padding-bottom: var(--space-section);
}

.events section article img, .upcomingEvents section article img {
  width: 100%; 
  height: 300px; 
  object-fit: cover;
  border-radius: 15px;

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


}

.mobilbillede {
  display: none;
}

.pcbillede {
  display: block;
}

.upcomingEvents section {
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



.entryCardRedline {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  text-decoration: none;

  
}




.entryCardRedline img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
  display: block;
  transition: transform 0.3s ease, box-shadow 0.6s ease;
  margin-bottom: 1rem;
}

.entryCardRedline:hover img {
  transform: scale(1.03);
  box-shadow: 0px 0px 20px 2px #4C90FF;
}

.entryCardRedline hr {
  position: relative;
  height: 2px;
  background-color: white;
  border: none;
  width: 100%;
  margin: 16px 0 8px;
  overflow: hidden;
}

.entryCardRedline hr::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #F63758;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease-in-out;
  z-index: 2;
}

.entryCardRedline:hover hr::after {
  transform: scaleX(1);
}

.entryCardRedline h3 {
  margin-top: 1rem;
  font-size: 25px;
  font-weight: 500;
}

.entryCardRedline p {
  margin: 0;
  font-size: 18px;
  font-weight: 300;
}


@media (min-width: 1000px){
  main {
  padding: 0 var(--space-container);
}
}

@media(min-width: 100px) and (max-width: 1000px){
  .introEvents{
    grid-template-columns: unset;
  }
  .introEvents{
    display: block;
  }
  .introEvents img {
    justify-self: unset;
    width: 100%;
  }
  
}



</style>
