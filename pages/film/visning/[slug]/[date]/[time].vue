<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const { slug, date, time } = useRoute().params;
const visning = ref(null);
const selectedSeats = ref([]);
const prices = {
  normal: 100,
  senior: 85,
  student: 85,
};
const ticketCounts = ref({ normal: 0, senior: 0, student: 0 });

const seats = ref(
  Array.from({ length: 6 }, (_, row) =>
    Array.from({ length: 14 }, (_, col) => ({
      id: `${row}-${col}`,
      taken: false,
      selected: false
    }))
  )
);

function toggleSeat(seat) {
  if (!seat.taken) {
    seat.selected = !seat.selected;
    if (seat.selected) selectedSeats.value.push(seat.id);
    else selectedSeats.value = selectedSeats.value.filter(id => id !== seat.id);
  }
}

const total = computed(() =>
  ticketCounts.value.normal * prices.normal +
  ticketCounts.value.senior * prices.senior +
  ticketCounts.value.student * prices.student
);

onMounted(async () => {
  try {
    const res = await fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie?per_page=100');
    const movies = await res.json();

    const movie = movies.find(m => m.slug === slug);
    const session = movie?.acf?.spilletider?.filmvisning?.find(s =>
      s.filmdato.replaceAll('/', '-') === date
    );
    const timeSlot = session?.spilletid?.find(t =>
      t.spilletidspunkt.replace(':', '-') === time
    );

    if (movie && session && timeSlot) {
      visning.value = {
        title: movie.title.rendered,
        date: session.filmdato,
        time: timeSlot.spilletidspunkt,
        posterUrl: movie.acf.poster.url,
        sal: timeSlot.sal,
        duration: movie.acf.varighed,
        age: movie.acf.age?.[0]?.aldersgraense
      };
    }
  } catch (e) {
    console.error('Fejl ved hentning:', e);
  }
});
</script>

<template>
  <Header />
  <main class="booking-wrapper">
    <div v-if="visning" class="booking-container">
      <div class="movie-info">
        <img :src="visning.posterUrl" :alt="visning.title" class="poster" />
        <h1>{{ visning.title }}</h1>

        <div class="badges">
          <div class="badge">
            <i class="fa-solid fa-clock"></i>
            {{ visning.duration }}
          </div>
          <div class="badge">
            <i class="fa-solid fa-child-reaching"></i>
            {{ visning.age }} år+
          </div>
        </div>

        <div class="show-info">
          <span>Sal {{ visning.sal }}</span>
          <span>{{ visning.date }}</span>
          <span>{{ visning.time }}</span>
        </div>

        <div class="ticket-types">
          <div v-for="(price, type) in prices" :key="type" class="ticket-type">
            <label>{{ type === 'normal' ? 'Normal billettype' : type === 'senior' ? 'Senior +65' : 'Studerende' }}</label>
            <span>{{ price }} kr.</span>
            <div class="counter">
              <button @click="ticketCounts[type] = Math.max(ticketCounts[type] - 1, 0)">-</button>
              <span>{{ ticketCounts[type] }}</span>
              <button @click="ticketCounts[type]++">+</button>
            </div>
          </div>
        </div>
      </div>

      <div class="seat-map">
        <div class="screen">Lærred</div>
        <div v-for="(row, rowIndex) in seats" :key="rowIndex" class="seat-row">
          <span>{{ rowIndex + 1 }}</span>
          <div class="seat" v-for="seat in row" :key="seat.id"
            :class="{ taken: seat.taken, selected: seat.selected }"
            @click="toggleSeat(seat)"
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

    <div class="summary">
      <p>{{ ticketCounts.normal }} x normal billet, {{ ticketCounts.senior }} x Senior +65 billet, {{ ticketCounts.student }} x Studerende</p>
      <p>Pris i alt: {{ total }} kr</p>
      <button class="buy-button">Køb billet(er)</button>
    </div>
  </main>
  <Footer />
</template>

<script>
import ledigIcon from '@/assets/img/ledig.svg?raw';
import valgtIcon from '@/assets/img/dit-valg.svg?raw';
import optagetIcon from '@/assets/img/optaget.svg?raw';

export function getSeatIcon(seat) {
  if (seat.taken) return optagetIcon;
  if (seat.selected) return valgtIcon;
  return ledigIcon;
}
</script>

<style scoped>
.booking-wrapper {
  padding: 2rem;
  color: white;
  min-height: 100vh;
}
.booking-container {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  justify-content: space-between;
}
.movie-info {
  flex: 1;
  min-width: 280px;
  background: #162138;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.poster {
  width: 100%;
  max-width: 200px;
  border-radius: 12px;
  margin-bottom: 1rem;
}
.badges {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}
.badge {
  background: #1e2b4a;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}
.show-info {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  border-top: 1px solid #2e3d59;
  border-bottom: 1px solid #2e3d59;
  padding: 0.5rem 0;
}
.ticket-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background: #1a2740;
  padding: 0.8rem 1rem;
  border-radius: 10px;
}
.ticket-type label {
  flex: 1;
  font-weight: 600;
}
.counter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.counter button {
  background: #ff3b6b;
  border: none;
  color: white;
  font-weight: bold;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
}
.seat-map {
  flex: 2;
  min-width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.screen {
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #1f2a3f;
  color: #fff;
  border-radius: 4px;
  width: 100%;
  max-width: 600px;
}
.seat-row {
  display: flex;
  align-items: center;
  margin: 0.3rem 0;
  gap: 0.5rem;
}
.seat-row span {
  width: 1.5rem;
  margin-right: 0.5rem;
}
.seat {
  margin: 0.1rem;
  cursor: pointer;
  transition: transform 0.2s;
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
}
.legend-item .seat-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 0.5rem;
}
.summary {
  text-align: center;
  margin-top: 2rem;
}
.buy-button {
  padding: 1rem 2rem;
  background: #ff3b6b;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
}
</style>