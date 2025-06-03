<script setup>
import { useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { useHead } from '#app'

// Importer svg ikoner for sæder
import ledigIcon from '@/assets/img/ledig.svg?raw'
import valgtIcon from '@/assets/img/dit-valg.svg?raw'
import optagetIcon from '@/assets/img/optaget.svg?raw'

// Seo/meta
useHead({
  title: 'Filmvisning',
  meta: [
    {
      name: 'description',
      content: 'Reserver sæde hos biffen Nordkraft'
    },
    {
      name: 'keywords',
      content: 'Reservation, sæde, film, alle, aalborg, biograftur, biffen'
    }
  ]
})

// Hent filmdata fra API
onMounted(async () => {
  const res = await fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie?per_page=100')
  const movies = await res.json()
  const movie = movies.find(m => m.slug === slug)
  const valgtVisning = movie?.acf?.spilletider?.filmvisning.find(v => v.filmdato.replaceAll('/', '-') === date)
  const valgtSpilletid = valgtVisning?.spilletid.find(spilletid => spilletid.spilletidspunkt.replace(':', '-') === time)
  if (movie && valgtVisning && valgtSpilletid) visning.value = {
    title: movie.title.rendered,
    date: valgtVisning.filmdato,
    time: valgtSpilletid.spilletidspunkt,
    posterUrl: movie.acf.poster.url,
    duration: movie.acf.varighed,
    age: movie.acf.age?.[0]?.aldersgraense
  }
})

//  Henter parametre for url
const { slug, date, time } = useRoute().params

// Reaktive variabler til filmvisning og billetantal
const visning = ref(null)
const ticketCounts = ref({ normal: 0, senior: 0, student: 0 })

// Definerer billetpriserne
const prices = { normal: 100, senior: 85, student: 85 }

// Lav en liste med 6 kolonner sæder, og 14 i hver række og sæt dem til at være ledige og ikke valgt som default
const columns = 6
const rows = 14
const seats = ref(
  Array.from({ length: columns }, (_, column) =>
    Array.from({ length: rows }, (_, row) => ({
      id: `${column}-${row}`,
      taken: false,
      selected: false
    }))
  )
)
//  antal billetter valgt i alt
const totalSelected = computed(() =>
  Object.values(ticketCounts.value).reduce((totalCount, currentCount) => totalCount + currentCount, 0)
)

// Tekstoversigt over valgte billetter i bunden
const billetOversigt = computed(() =>
  Object.entries(ticketCounts.value)
    .filter(([, antal]) => antal > 0)
    .map(([ticketType, antal]) => `${antal} x ${ticketType === 'student' ? 'studerende' : ticketType}`)
    .join(', ') || 'Vælg billetter'
)

// Regner samlet pris for valgte billetter
const totalPrice = computed(() =>
  Object.entries(ticketCounts.value)
    .reduce((samletPris, [ticketType, antal]) => samletPris + antal * prices[ticketType], 0)
)

// Opdater billetantal og nulstil valgte sæder når man vælger nye sæder
function updateTicketCount(type, changeAmount) {
  ticketCounts.value[type] = Math.max(0, ticketCounts.value[type] + changeAmount)
  seats.value.flat().forEach(s => s.selected = false)
}

// Returner korrekt sæde svg afhængig af status
function getSeatIcon(seat) {
  return seat.taken ? optagetIcon : seat.selected ? valgtIcon : ledigIcon
}

function toggleSeat(seat) {

  // Rydder tidligere valgte sæde
  seats.value.flat().forEach(s => s.selected = false)

   // Vælg så mange ledige sæder som nødvendigt (Afhænigt af valgt antal), startende fra det valgte sæde
  const flatSeats = seats.value.flat()
  const startIndex = flatSeats.findIndex(s => s.id === seat.id)

  let count = 0
  for (let i = startIndex; i < flatSeats.length && count < totalSelected.value; i++) {
    if (!flatSeats[i].taken) {
      flatSeats[i].selected = true
      count++
    }
  }
}
</script>
<template>
  <Header />
  <main class="booking-wrapper widthContainer">
    <div v-if="visning" class="booking-container">
      <div class="movie-info">
        <img :src="visning.posterUrl" :alt="visning.title" class="poster" />
        <h1>{{ visning.title }}</h1>

        <div class="film-program-titel-og-info">
          <ul>
            <li><i class="fas fa-clock"></i>{{ visning.duration }} t</li>
            <li><i class="fas fa-child-reaching"></i>{{ visning.age }}</li>
          </ul>
          <div class="show-info-bar">
            <p>Sal A</p>
            <p>{{ visning.date }}</p>
            <p>{{ visning.time }}</p>
          </div>
        </div>

        <div class="ticket-types">
          <div v-for="(price, type) in prices" :key="type" class="ticket-type">
            <div class="ticket-info">
              <strong>{{ type === 'normal' ? 'Normal billettype' : type === 'senior' ? 'Senior +65' : 'Studerende' }}</strong>
              <span>{{ price }} kr.</span>
            </div>
            <div class="counter">
              <button class="decrement" @click="updateTicketCount(type, -1)">-</button>
              <span>{{ ticketCounts[type] }}</span>
              <button class="increment" @click="updateTicketCount(type, 1)">+</button>
            </div>
          </div>
        </div>
      </div>

      <div class="seat-scale-wrapper">
  <div class="seat-map">
    <div class="screen">Lærred</div>
    <div v-for="(row, rowIndex) in seats" :key="rowIndex" class="seat-row">
      <span>{{ rowIndex + 1 }}</span>
      <div
      class="seat"
      v-for="seat in row"
      :key="seat.id"
      :class="{ taken: seat.taken, selected: seat.selected }"
      @click="toggleSeat(seat)"
      v-html="getSeatIcon(seat)"
      ></div>

    </div>

    <div class="seat-legend">
      <div class="legend-item">
        <div class="seat-icon" v-html="getSeatIcon({ taken: false, selected: false })"></div>
        <span>Ledige</span>
      </div>
      <div class="legend-item">
        <div class="seat-icon" v-html="getSeatIcon({ taken: false, selected: true })"></div>
        <span>Dit valg</span>
      </div>
      <div class="legend-item">
        <div class="seat-icon" v-html="getSeatIcon({ taken: true, selected: false })"></div>
        <span>Optaget</span>
      </div>
    </div>
  </div>
</div>
    </div>

    <div class="summary-bar">
  <div class="summary-left">
    <strong>{{ billetOversigt }}</strong>
  </div>
  <div class="summary-right">
    <strong>Pris i alt: {{ totalPrice }} kr</strong>
    <button class="buy-button">Køb billet(er)</button>
  </div>
</div>

  </main>
  <Footer />
</template>

<style scoped>
.booking-wrapper {
  color: white;
  min-height: 100vh;
}

.booking-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
  justify-content: center;
  flex-direction: row;
}

.movie-info {
  flex: 1;
  min-width: 280px;
  background: #202F4D;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.poster {
  width: 100%;
  max-width: 200px;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0px 0px 20px 2px #4C90FF;
}

.movie-info h1 {
  font-size: 24px;
  margin-bottom: 1rem;
}

.film-program-titel-og-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.film-program-titel-og-info ul {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.film-program-titel-og-info li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #131C31;
  color: white;
}

.film-program-titel-og-info i {
  color: #F63758;
}

.show-info-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 0.5rem;
  column-gap: 1.5rem;
  padding: 1rem;
  font-size: 18px;
  font-weight: 700;
  color: white;
  border-top: 1px solid #ffffff40;
  border-bottom: 1px solid #ffffff40;
  width: 100%;
  text-align: center;
}

.show-info-bar p {
  margin: 0;
  white-space: nowrap;
  flex: 1 1 auto;
  text-align: center;
}

.ticket-types {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.ticket-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0;
  border-bottom: 1px solid #fff;
}

.ticket-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  text-align: left;
}

.ticket-info strong {
  font-weight: 700;
  font-size: 18px;
}

.ticket-info span {
  font-size: 16px;
  color: #fff;
}

.counter {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.counter button {
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

.counter .decrement {
  background: #131C31;
}

.counter .increment {
  background: #F63758;
}

.seat-scale-wrapper {
  flex: 2;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0;
  margin-bottom: 0;
}

.seat-map {
  min-width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  max-width: 100%;
}

@media (max-width: 1400px) {
  .seat-map {
    transform: scale(0.9);
  }
}

@media (max-width: 1200px) {
  .seat-map {
    transform: scale(0.8);
  }
}

@media (max-width: 1024px) {
  .booking-container {
    gap: 2rem;
  }

  .seat-scale-wrapper {
    margin-top: 4rem;
    margin-bottom: 0;
    transform-origin: center top;
  }
  
  .seat-map {
    transform: scale(0.75);
    margin: 0;
    transform-origin: center top;
  }
  
  .screen {
    margin-bottom: 2rem;
  }
  
  .seat-legend {
    margin-top: 1rem;
  }
}

@media (max-width: 1252px) {
  .movie-info {
    max-width: 600px;
  }
}

@media (max-width: 900px) {
  .seat-scale-wrapper {
    margin-top: 4rem;
  }
  
  .seat-map {
    transform: scale(0.65);
    transform-origin: center top;
    margin: 0;
  }
  
  .screen {
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 768px) {


  .booking-container {
    flex-direction: column;
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;
    gap: 1rem;
  }

  .movie-info {
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;
    margin-top: 2rem;
  }

  .seat-scale-wrapper {
    padding: 0 20px;
    box-sizing: border-box;
    margin-top: 4rem;
    margin-bottom: 0;
    transform-origin: center top;
  }

  .seat-map {
    transform: scale(0.55);
    margin: 0;
    align-self: center;
    transform-origin: center top;
  }

  .screen {
    font-size: 0.9rem;
    padding: 0.4rem;
    margin-bottom: 1rem;
    margin-top: 0;
  }

  .seat-legend {
    flex-wrap: wrap;
    justify-content: center;
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }

  .summary-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem 1rem;
  }

  .summary-right {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .summary-bar .buy-button {
    width: 100%;
    text-align: center;
    padding: 1rem;
    font-size: 1.1rem;
  }

  .ticket-type {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }

  .ticket-info {
    width: 100%;
  }

  .counter {
    width: 100%;
    margin-top: 1rem;
  }
}

@media (max-width: 600px) {
  .seat-scale-wrapper {
    padding: 0 10px;
    margin-top: 4rem;
    margin-bottom: 0;
  }
  
  .seat-map {
    transform: scale(0.45);
    transform-origin: center top;
    margin: 0;
  }
  
  .screen {
    margin-bottom: 0.8rem;
  }
  
  .seat-legend {
    margin-top: 0.3rem;
  }
}

@media (max-width: 480px) {

  
  .booking-container {
    gap: 0.5rem;
  }
  
  .seat-scale-wrapper {
    padding: 0 5px;
    margin-top: 4rem;
    margin-bottom: 0;
  }
  
  .seat-map {
    transform: scale(0.4);
    transform-origin: center top;
    margin: 0;
  }
  
  .screen {
    margin-bottom: 0.6rem;
  }
  
  .seat-legend {
    margin-top: 0.2rem;
  }
}

@media (max-width: 375px) {

  .seat-scale-wrapper {
    padding: 0;
    margin: 0;
    margin-top: 4rem;
  }
  
  .seat-map {
    transform: scale(0.35);
    transform-origin: center top;
    margin: 0;
  }
  
  .screen {
    margin-bottom: 0.5rem;
  }
  
  .seat-legend {
    margin-top: 0.1rem;
  }
}

.screen {
  margin-bottom: 4rem;
  padding: 0.5rem;
  background: #202F4D;
  color: #fff;
  border-radius: 4px;
  width: 100%;
  max-width: 600px;
    box-shadow: 0px 0px 20px 2px #4C90FF;

}

.seat-row {
  display: flex;
  align-items: center;
  margin: 0.75rem 0;
  gap: 1rem;
}

.seat-row span {
  width: 1.5rem;
  margin-right: 0.5rem;
}

.seat-spacer {
  width: 32px;
  height: 32px;
  margin: 0.1rem;
}

.seat {
  margin: 0.1rem;
  cursor: pointer;
  transition: transform 0.2s;
  width: 32px;
  height: 32px;
}

.seat.selected {
  transform: scale(1.1);
}

.seat-legend {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.legend-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.9rem;
  color: #ccc;
  margin-top: 1rem;
}

.legend-item .seat-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 0.5rem;
}

.summary-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #202F4D;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.4);
}

.summary-left {
  font-size: 1rem;
}

.summary-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 1rem;
}

.summary-bar .buy-button {
  margin: 0;
  padding: 0.8rem 1.6rem;
  background: #F63758;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  width: fit-content;
}
</style>
