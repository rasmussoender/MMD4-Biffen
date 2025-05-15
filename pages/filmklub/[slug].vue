<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const klub = ref(null);
const route = useRoute();
const slug = route.params.slug;
const backdropImage = ref('');

onMounted(async () => {
  try {
    const res = await fetch(`https://biffen.rasmus-pedersen.com/wp-json/wp/v2/filmklub?slug=${slug}`);
    const data = await res.json();
    klub.value = data[0];

    // Brug SCF/ACF-baggrundsbillede
    const bg = klub.value?.acf?.['filmklub-billede']?.url;
    if (bg) backdropImage.value = bg;
  } catch (err) {
    console.error('Fejl ved hentning af filmklub:', err);
  }
});
</script>

<template>
  <main v-if="klub" class="movieDetailsPage">
    <section
      class="movieHeroWrapper"
      :style="{
        background: `
          linear-gradient(to bottom, rgba(24, 31, 47, 0) 40%, #181F2F 100%),
          radial-gradient(circle at 80% center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.75) 100%),
          url(${backdropImage})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }"
    >
      <HeaderImageBackground />

      <div class="backButton">
        <NuxtLink to="/filmklub" class="backbtn">
          <i class="fa fa-arrow-left"></i> Tilbage
        </NuxtLink>
      </div>

      <div class="hero">
        <div class="movieInfoBox">
          <h1 v-html="klub.title.rendered" />

          <p class="moviedescription" v-if="klub.acf['filmklub-gruppe1']">
            <strong>{{ klub.acf['filmklub-gruppe1']['filmklub-gruppe1-title'] }}:</strong><br>
            {{ klub.acf['filmklub-gruppe1']['filmklub-gruppe1-tekst'] }}
          </p>

          <p class="moviedescription" v-if="klub.acf['filmklub-gruppe2']">
            <strong>{{ klub.acf['filmklub-gruppe2']['filmklub-gruppe2-title'] }}:</strong><br>
            {{ klub.acf['filmklub-gruppe2']['filmklub-gruppe2-tekst'] }}
          </p>

          <p class="moviedescription" v-if="klub.acf['filmklub-gruppe3']">
            <strong>{{ klub.acf['filmklub-gruppe3']['filmklub-gruppe3-title'] }}:</strong><br>
            {{ klub.acf['filmklub-gruppe3']['filmklub-gruppe3-tekst'] }}
          </p>
        </div>
      </div>
    </section>
  </main>

  <div v-else>Indlæser filmklub...</div>
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

.moviePoster {
  flex: 0 1 35%;
  height: auto;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: var(--radius-section);
  box-shadow: 0px 0px 20px 2px #4C90FF;
}

.movieInfoBox {
  flex: 1 1 55%;
  background: rgba(32, 47, 77, 0.85);
  padding: 2rem;
  border-radius: var(--radius-section);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 300px;
}

.movieInfoBox h1 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.genreTags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 15px;
}

.genreItem {
  position: relative;
  padding: 0 0.5rem;
  font-weight: bold;
}

.genreItem:not(:last-child)::after {
  content: '|';
  position: absolute;
  right: -0.5rem;
  color: white;
}

.movieMetadata {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}



.moviedescription {
  margin: 1rem 0;
}


</style>
