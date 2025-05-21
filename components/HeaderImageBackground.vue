<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
const isClosing = ref(false)
const contentVisible = ref(false)

function openMenu() {
  isMenuOpen.value = true
  setTimeout(() => {
    contentVisible.value = true
  }, 800)
}

function closeMenu() {
  contentVisible.value = false
  setTimeout(() => {
    isClosing.value = true
    setTimeout(() => {
      isMenuOpen.value = false
      isClosing.value = false
    }, 800)
  }, 400)
}
</script>

<template>
  <header class="siteHeader">
    <a href="/" class="logoWrapper">
      <img src="/public/img/biffenLogo.png" alt="Biffen Nordkraft Logo" class="siteLogo" />
    </a>
    <div class="headerRight">
      <nav class="mainNav underlineAnimationLinks">
        <a href="/film">Alle film</a>
        <a href="/kommende-film">Kommende film</a>
        <a href="/events">Events</a>
      </nav>
      <div class="burgerMenuWrapper">
        <i class="fas fa-bars burgerIcon" v-if="!isMenuOpen" @click="openMenu"></i>
      </div>
    </div>
  </header>

  <div class="menuCircleOverlay" :class="{ active: isMenuOpen, closing: isClosing }"></div>

  <!-- Motion baggrund med fade -->
  <div class="lavaLampBackground" v-show="isMenuOpen" :class="{ visible: contentVisible }">
    <div class="darkCenterOverlay"></div>
    <div class="blob blob1"></div>
    <div class="blob blob2"></div>
    <div class="blob blobAccent"></div>
    <div class="blob blobElectric"></div>
  </div>

  <div class="fullscreenMenu" v-if="isMenuOpen">

    <div class="fullscreenTopBar">
      <a href="/" class="logoWrapper fullscreenLogo">
        <img src="/public/img/biffenLogo.png" alt="Biffen Nordkraft Logo" class="siteLogo" />
      </a>
      <div class="closeIcon" @click="closeMenu">
        <i class="fas fa-times"></i>
      </div>
    </div>

    <div class="fullscreenContent" :class="{ visible: contentVisible }">
      <div class="fullscreenInner">
        <div class="menuLayout">
          <div class="menuColumn">
            <div class="menuItem"><span class="menuNumber">01</span><a href="/film" class="menuLink">Alle film</a></div>
            <div class="menuItem"><span class="menuNumber">02</span><a href="/kommende-film" class="menuLink">Kommende film</a></div>
            <div class="menuItem"><span class="menuNumber">03</span><a href="/events" class="menuLink">Events</a></div>
            <div class="menuItem"><span class="menuNumber">04</span><a href="/cinemateket" class="menuLink">Cinemateket</a></div>
          </div>
          <div class="menuColumn">
            <div class="menuItem"><span class="menuNumber">05</span><a href="/filmklubber" class="menuLink">Filmklubber</a></div>
            <div class="menuItem"><span class="menuNumber">06</span><a href="/gavekort" class="menuLink">Gavekort & øvrige billetter</a></div>
            <div class="menuItem"><span class="menuNumber">07</span><a href="/book" class="menuLink">Book en sal</a></div>
            <div class="menuItem"><span class="menuNumber">08</span><a href="/info" class="menuLink">Praktisk info</a></div>
          </div>
        </div>

        <div class="fullscreenFooter">
          <div class="footerInfo">
            <div class="footerItem">
              <i class="fas fa-phone"></i>
              <div class="footerText">
                <strong>Telefon</strong>
                <a href="tel:+4598169977">+45 98 16 99 77</a>
              </div>
            </div>
            <div class="footerItem">
              <i class="fas fa-envelope"></i>
              <div class="footerText">
                <strong>E-mail</strong>
                <a href="mailto:info@biffen.eu">info@biffen.eu</a>
              </div>
            </div>
            <div class="footerItem">
              <i class="fas fa-map-marker-alt"></i>
              <div class="footerText">
                <strong>Adresse</strong>
                <a href="https://maps.google.com/?q=Teglgaards Plads 1, 9000 Aalborg" target="_blank">
                  Biffen Nordkraft<br />
                  Teglgårds Plads 1, 9000 Aalborg
                </a>
              </div>
            </div>
          </div>
          <div class="footerSocials">
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.siteHeader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 5rem;
  height: 70px;
  border-radius: 0 0 30px 30px;
  z-index: 1001;
}

.logoWrapper {
  z-index: 1000;
}

.siteLogo {
  height: 50px;
}

.headerRight {
  display: flex;
  align-items: center;
}

.mainNav {
  display: flex;
  gap: 30px;
  margin-right: 30px;
  z-index: 10;
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
  display: flex;
  align-items: center;
}

.burgerIcon {
  font-size: 24px;
  color: white;
  cursor: pointer;
  padding: 8px;
  transition: transform 0.3s ease;
}

.menuCircleOverlay {
  position: fixed;
  top: 10px;
  right: 50px;
  width: 100px;
  height: 100px;
  background: #121212;
  border-radius: 50%;
  z-index: 9998;
  transform: scale(0);
  transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
  pointer-events: none;
}

.menuCircleOverlay.active {
  transform: scale(100);
}

.menuCircleOverlay.closing {
  transform: scale(0);
}

.lavaLampBackground {
  position: fixed;
  inset: 0;
  background-color: #181F2F;
  z-index: 9998;
  overflow: hidden;
  filter: blur(55px);
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  pointer-events: none;
  box-shadow: inset 0 0 300px rgba(24, 31, 47, 0.6);
}

.lavaLampBackground.visible {
  opacity: 1;
}

.darkCenterOverlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: radial-gradient(
    circle at center,
    rgba(24, 31, 47, 0.75) 0%,
    rgba(24, 31, 47, 0.5) 40%,
    rgba(24, 31, 47, 0.2) 70%,
    transparent 100%
  );
  pointer-events: none;
}

.blob {
  position: absolute;
  width: 65vw;
  height: 65vw;
  border-radius: 50%;
  mix-blend-mode: lighten;
  z-index: 2;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

/* Mørkeblå blob */
.blob1 {
  background: #1F2E4B;
  top: -15%;
  left: -25%;
  opacity: 0.25;
  animation: floatBlob1 55s infinite;
}

/* Mellemblå blob */
.blob2 {
  background: #2C4B81;
  top: 20%;
  left: 70%;
  opacity: 0.3;
  animation: floatBlob2 50s infinite;
}

/* Gradient accentblob */
.blobAccent {
  background: linear-gradient(45deg, #365FA5, #4C90FF);
  top: 75%;
  left: -10%;
  opacity: 0.12;
  animation: floatAccent 45s infinite;
}

/* Lys elektrisk blå blob – én synlig blob med ekstra liv */
.blobElectric {
  background: #4C90FF;
  top: 30%;
  left: 80%;
  opacity: 0.18;
  animation: floatElectric 60s infinite;
  z-index: 2;
}

/* === Animationer === */
@keyframes floatBlob1 {
  0%   { transform: translate(0, 0) scale(1); }
  25%  { transform: translate(200px, -220px) scale(1.4); }
  50%  { transform: translate(-180px, 200px) scale(1.6); }
  75%  { transform: translate(140px, 100px) scale(1.3); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes floatBlob2 {
  0%   { transform: translate(0, 0) scale(1); }
  25%  { transform: translate(-180px, 180px) scale(1.5); }
  50%  { transform: translate(160px, 100px) scale(1.3); }
  75%  { transform: translate(-150px, -160px) scale(1.4); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes floatAccent {
  0%   { transform: translate(0, 0) scale(1); }
  25%  { transform: translate(160px, 160px) scale(1.5); }
  50%  { transform: translate(-140px, -100px) scale(1.2); }
  75%  { transform: translate(80px, 50px) scale(1.4); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes floatElectric {
  0%   { transform: translate(0, 0) scale(1); }
  25%  { transform: translate(-120px, -60px) scale(1.3); }
  50%  { transform: translate(-200px, 60px) scale(1.5); }
  75%  { transform: translate(-100px, -100px) scale(1.2); }
  100% { transform: translate(0, 0) scale(1); }
}



.fullscreenMenu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  color: white;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

.fullscreenTopBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.12rem 5rem;
  width: 100%;
}

.fullscreenLogo {
  z-index: 10000;
}

.closeIcon {
  font-size: 30px;
  color: white;
  cursor: pointer;
  z-index: 10000;
  padding-right: 1.50rem;
}

.fullscreenContent {
  flex-grow: 1;
  overflow-y: auto;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.fullscreenContent.visible {
  opacity: 1;
  pointer-events: auto;
}

.fullscreenInner {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 5rem;
  box-sizing: border-box;
}

.menuLayout {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16rem;
  width: 100%;
  margin-bottom: 2rem;
}

.menuColumn {
  display: flex;
  flex-direction: column;
  gap: 49px;
}

.menuItem {
  display: flex;
  align-items: center;
}

.menuNumber {
  color: #517BEA;
  font-size: 30px;
  margin-right: 2rem;
  width: 40px;
  text-align: right;
  font-weight: 600;
}

.menuLink {
  font-size: 40px;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.fullscreenFooter {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
  margin-top: auto;
  padding-bottom: 3rem;
}

.footerInfo {
  display: flex;
  gap: 4rem;
  flex-wrap: wrap;
}

.footerItem {
  display: flex;
  gap: 1rem;
  color: white;
  font-size: 14px;
  align-items: flex-start;
}

.footerItem i {
  color: #ff4c64;
  font-size: 20px;
}

.footerText {
  display: flex;
  flex-direction: column;
  line-height: 1.4;
}

.footerText strong {
  font-weight: 600;
  display: block;
  margin-bottom: 10px;
}

.footerText a {
  color: white;
  text-decoration: underline;
}

.footerSocials {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.footerSocials a {
  background-color: #ff4c64;
  color: white;
  font-size: 20px;
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.footerSocials a:hover {
  background-color: #ff6b7d;
}

/* Responsiv */
@media (max-height: 800px) {
  .menuLink {
    font-size: 28px;
  }

  .menuNumber {
    font-size: 22px;
  }

  .fullscreenTopBar {
    padding: 1rem 2rem;
  }

  .fullscreenInner {
    padding: 0 2rem;
  }

  .menuLayout {
    gap: 8rem;
    margin-bottom: 2rem;
  }

  .fullscreenFooter {
    gap: 1.5rem;
  }
}



</style>
