<script setup>
import Header from '@/components/Header.vue';

</script>

<template>
  <Header />
    <main v-if="movie" class="movieDetailsPage">


<section class="movieHeroWrapper" :style="{
background: `
linear-gradient(to bottom, rgba(24, 31, 47, 0) 40%, #181F2F 100%),
radial-gradient(circle at 80% center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.75) 100%),
url(${backdropImage})
`,
backgroundSize: 'cover',
backgroundPosition: 'center'
}">
<HeaderImageBackground />

<div class="backButton">
  <NuxtLink to="/film" class="backbtn">
    <i class="fa fa-arrow-left"></i> Tilbage
  </NuxtLink>
</div>

  <div class="hero">
    <img :src="movie.acf.poster.url" :alt="movie.title.rendered" class="moviePoster" />

    <div class="movieInfoBox">
      <div class="genreTags">
        <span v-for="(g, index) in movie.acf.genre" :key="index" class="genreItem">
          {{ g.filmgenre }}
        </span>
      </div>

      <h1>{{ movie.title.rendered }}</h1>

      <div class="movieMetadata">
        <span id="ratingStyle">
        <i class="fa-solid fa-star"></i> {{ movie.rating.toFixed(1) }}/10</span>
        <span><i class="fa-solid fa-calendar-days"></i> {{ movie.acf.udgivelsesdato }}</span>
        <span><i class="fa-solid fa-clock"></i> {{ movie.acf.varighed }} t</span>
        <span v-if="movie.acf.age.length"><i class="fa-solid fa-user-shield"></i> {{ movie.acf.age[0].aldersgraense }}</span>
      </div>

      <p class="movieinstructor">Instruktør(ere): {{ movie.acf.movieinstructor.map(i => i.instructor).join(', ') }}</p>
      <p class="moviedescription">{{ movie.acf.description }}</p>
      <div class="buttons">
        <a :href="movie.acf.trailer" target="_blank" class="btn red"> <i class="fa-brands fa-youtube"></i> Se trailer</a>
        <a :href="movie.acf.tmdb" target="_blank" class="btn outline"> <i class="fa-solid fa-circle-info"></i> Læs mere</a>
      </div>
    </div>
  </div>
</section>
  </main>
  <Footer />

</template>

<style scoped>
.movieDetailsPage {
  padding: 0;
  margin: 0 auto;
  width: 100%;
}

.movieDetailsPage p {
  font-size: 15px;
}

.movieHeroWrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
  position: relative;
  background-size: cover;
  background-position: center;
  padding: var(--space-container);
  border-radius: var(--radius-section);
  justify-content: center;
  align-items: center;
  

}

.hero {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  justify-content: center;
  align-items: stretch;
  width: 100%;
}

.backButton {
  width: 100%;
  padding-top: 2rem;
}

.backbtn {
  padding: 0.6rem 0;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.95rem;
  color: white;
}

.btn {
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.95rem;
  color: white;
  border-radius: 5px;
}
</style>
