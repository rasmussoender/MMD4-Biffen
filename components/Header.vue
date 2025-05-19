<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>


<template>
  <header class="siteHeader">
    <a class="logoWrapper" href="/">
      <img src="/public/img/biffenLogo.png" alt="Biffen Nordkraft Logo" class="siteLogo" />
    </a>

    <div class="headerRight">
      <nav class="mainNav underlineAnimationLinks">
        <a href="/film">Alle film</a>
        <a href="/kommende-film">Kommende film</a>
        <a href="/events">Events</a>
      </nav>

      <div class="burgerMenuWrapper">
        <i
          :class="['fas', isMenuOpen ? 'fa-times' : 'fa-bars', 'burgerIcon']"
          @click="toggleMenu"
        ></i>
      </div>
    </div>
  </header>

  <div class="menuOverlay" :class="{ menuOverlayOpen: isMenuOpen }"></div>
</template>

  
<style scoped>
.siteHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--secondary-blue);
  padding: 3rem 5rem;
  height: 70px;
  border-radius: 0 0 30px 30px;
}

.siteLogo {
  height: 50px;
}

.logoWrapper {
  z-index: 1000;
}

.headerRight {
  display: flex;
  align-items: center;
}

.mainNav {
  display: flex;
  gap: 30px;
  margin-right: 30px;
}

.mainNav a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.burgerMenuWrapper {
  border-left: 1px solid white;
  padding-left: 30px;
  z-index: 1000;
}

.burgerIcon {
  font-size: 24px;
  color: white;
  cursor: pointer;
  padding: 8px;
}

.menuOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-body);
  display: none;
  z-index: 999;
}

.menuOverlay.menuOverlayOpen {
  display: block;
}

@media (max-width: 900px) {
  .mainNav {
    display: none;
  }
}

@media (max-width: 900px) {
  .burgerMenuWrapper {
    border-left: none;
    padding-left: 0;
  }
}


.siteHeader.menuOpen .burgerMenuWrapper {
  border-left: none;
  padding-left: 0;
}


</style>
