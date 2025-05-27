<script setup>
import { useHead } from '#app'

useHead({
  title: 'Kommende Film',
  meta: [
    {
      name: 'description',
      content: 'Biffens kommende film'
    },
    {
      name: 'keywords',
      content: 'biograf, kommende, film, vintage, aalborg, biograftur'
    }
  ]
})

</script>

<template>
  <Header />
  <main>
    <div class="movieContainer">
          <h1 class="overskrift-med-streg"><span>Nyheder på vej</span></h1>

      <div class="buttonContainer">
        <button class="calenderButton">
          <i class="fa-solid fa-calendar-days"></i> Kalender
        </button>
        <button class="filterButton">
          <i class="fa fa-filter"></i> Filter
        </button>
      </div>

      <KommendeFilm />

    </div>
  </main>
  <Footer />
</template>

<style scoped>


.movieContainer {
  padding: 40px 20px;
}

.buttonContainer {
  display: flex;
  justify-content: right; 
  gap: 20px;
  margin-bottom: 20px;
}

.filterButton,
.calenderButton {
  background: var(--interactive-red);
  color: white;
  width: 90px; 
  height: 90px; 
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: var(--radius-button); 
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.3s ease;
  text-align: center; 
}

.filterButton i,
.calenderButton i {
  font-size: 1.5; 
}

.filterButton:hover,
.calenderButton:hover {
  background: #e11d48;
}




</style>