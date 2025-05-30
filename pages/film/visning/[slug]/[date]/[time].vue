<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useHead } from '#app'

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
      content: 'sædereservation, film, biograf, biffen, sæder, bestil'
    }
  ]
})

import ledigIcon from '@/assets/img/ledig.svg?raw'
import valgtIcon from '@/assets/img/dit-valg.svg?raw'
import optagetIcon from '@/assets/img/optaget.svg?raw'
import hoverIcon from '@/assets/img/hover-seat.svg?raw'

const { slug, date, time } = useRoute().params
const visning = ref(null)

const selectedSeats = ref([])
const hoverPreviewSeats = ref([])

const prices = {
  normal: 100,
  senior: 85,
  student: 85,
}

const ticketCounts = ref({ normal: 0, senior: 0, student: 0 })

const seats = ref(
  Array.from({ length: 6 }, (_, row) => {
    const cols = row === 2 ? 13 : 14
    return Array.from({ length: cols }, (_, col) => ({
      id: `${row}-${col}`,
      taken: false,
      selected: false
    }))
  })
)

const totalTicketsSelected = computed(() =>
  ticketCounts.value.normal + ticketCounts.value.senior + ticketCounts.value.student
)

function resetSelectedSeats() {
  seats.value.forEach(row => {
    row.forEach(seat => seat.selected = false)
  })
  selectedSeats.value = []
}

function updateTicketCount(type, delta) {
  const newCount = Math.max(ticketCounts.value[type] + delta, 0)
  if (ticketCounts.value[type] !== newCount) {
    ticketCounts.value[type] = newCount
    resetSelectedSeats()
  }
}

function getSeatIcon(seat) {
  if (seat.taken) return optagetIcon
  if (seat.selected) return valgtIcon
  if (hoverPreviewSeats.value.includes(seat.id)) return hoverIcon
  return ledigIcon
}

function toggleSeat() {
  const count = totalTicketsSelected.value
  if (count === 0 || hoverPreviewSeats.value.length !== count) return

  const ids = hoverPreviewSeats.value.map(id => id.split('-').map(Number))
  const rowIndex = ids[0][0]
  const startIndex = ids[0][1]
  const endIndex = ids[ids.length - 1][1]
  const row = seats.value[rowIndex]

  // Forhindre tom plads før
  const before = startIndex - 1
  if (
    before >= 0 &&
    !row[before].taken &&
    !row[before].selected &&
    (before === 0 || row[before - 1]?.taken)
  ) {
    alert('Du kan ikke efterlade et enkelt tomt sæde i starten af rækken.')
    return
  }

  // Forhindre tom plads efter
  const after = endIndex + 1
  if (
    after < row.length &&
    !row[after].taken &&
    !row[after].selected &&
    (after === row.length - 1 || row[after + 1]?.taken)
  ) {
    alert('Du kan ikke efterlade et enkelt tomt sæde i slutningen af rækken.')
    return
  }

  const valid = ids.every(([r, i]) => {
    const s = seats.value[r]?.[i]
    return s && !s.taken && !s.selected
  })

  if (!valid) return

  resetSelectedSeats()
  ids.forEach(([r, i]) => {
    const s = seats.value[r][i]
    s.selected = true
    selectedSeats.value.push(s.id)
  })
}

function handleSeatHover(rowIndex, seatIndex) {
  const row = seats.value[rowIndex]
  const count = totalTicketsSelected.value
  let preview = []

  if (count === 0) {
    hoverPreviewSeats.value = []
    return
  }

  const rowLength = row.length

  // Fremad (højre)
  if (seatIndex + count <= rowLength) {
    const group = row.slice(seatIndex, seatIndex + count)
    if (group.every(s => !s.taken && !s.selected)) {
      preview = group.map(s => s.id)
    }
  }

  // Bagud (venstre)
  if (preview.length < count && seatIndex - count + 1 >= 0) {
    const group = row.slice(seatIndex - count + 1, seatIndex + 1)
    if (group.every(s => !s.taken && !s.selected)) {
      preview = group.map(s => s.id)
    }
  }

  hoverPreviewSeats.value = preview
}

function clearHoverPreview() {
  hoverPreviewSeats.value = []
}

const billetOversigt = computed(() => {
  const typer = []
  if (ticketCounts.value.normal > 0)
    typer.push(`${ticketCounts.value.normal} x normal billet`)
  if (ticketCounts.value.senior > 0)
    typer.push(`${ticketCounts.value.senior} x Senior +65 billet`)
  if (ticketCounts.value.student > 0)
    typer.push(`${ticketCounts.value.student} x Studerende`)
  return typer.length > 0 ? typer.join(', ') : 'Vælg billetter'
})

const total = computed(() =>
  ticketCounts.value.normal * prices.normal +
  ticketCounts.value.senior * prices.senior +
  ticketCounts.value.student * prices.student
)

const sluttidspunkt = computed(() => {
  if (!visning.value?.time || !visning.value?.duration) return ''
  const [startHour, startMinute] = visning.value.time.split(':').map(Number)
  let hours = 0, minutes = 0
  if (visning.value.duration.includes(':')) {
    [hours, minutes] = visning.value.duration.split(':').map(Number)
  } else {
    const floatDuration = parseFloat(visning.value.duration.replace(',', '.'))
    hours = Math.floor(floatDuration)
    minutes = Math.round((floatDuration - hours) * 60)
  }
  const totalMinutes = hours * 60 + minutes + 20
  const endDate = new Date()
  endDate.setHours(startHour)
  endDate.setMinutes(startMinute + totalMinutes)
  const endHours = String(endDate.getHours()).padStart(2, '0')
  const endMinutes = String(endDate.getMinutes()).padStart(2, '0')
  return `${endHours}:${endMinutes}`
})

onMounted(async () => {
  try {
    const res = await fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie?per_page=100')
    const movies = await res.json()
    const movie = movies.find(m => m.slug === slug)
    const session = movie?.acf?.spilletider?.filmvisning?.find(s =>
      s.filmdato.replaceAll('/', '-') === date
    )
    const timeSlot = session?.spilletid?.find(t =>
      t.spilletidspunkt.replace(':', '-') === time
    )
    if (movie && session && timeSlot) {
      visning.value = {
        title: movie.title.rendered,
        date: session.filmdato,
        time: timeSlot.spilletidspunkt,
        posterUrl: movie.acf.poster.url,
        sal: timeSlot.sal,
        duration: movie.acf.varighed,
        age: movie.acf.age?.[0]?.aldersgraense
      }
    }
  } catch (e) {
    console.error('Fejl ved hentning:', e)
  }
})
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
            <p>{{ visning.time }} – {{ sluttidspunkt }}</p>
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
      <div v-if="rowIndex === 2" class="seat-spacer"></div>
      <div
        class="seat"
        v-for="(seat, seatIndex) in row"
        :key="seat.id"
        :class="{ taken: seat.taken, selected: seat.selected }"
        @mouseenter="handleSeatHover(rowIndex, seatIndex)"
        @mouseleave="clearHoverPreview"
        @click="toggleSeat(seat, rowIndex, seatIndex)"
        v-html="getSeatIcon(seat)"
      ></div>
    </div>

    <div class="seat-legend">
      <div class="legend-item">
        <div class="seat-icon" v-html="getSeatIcon({ taken: false, selected: false })"></div>
        <span>Ledige sæder</span>
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
    <strong>Pris i alt: {{ total }} kr</strong>
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
