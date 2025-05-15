<script setup>

</script>
<template>
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
</template>
<style scoped>

</style>