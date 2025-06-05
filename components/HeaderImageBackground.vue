<script setup>
import { ref, onUnmounted, onMounted } from 'vue'

const isMenuOpen = ref(false)
const isClosing = ref(false)
const contentVisible = ref(false)
const isScrolled = ref(false)
const lastScrollY = ref(0)
const showHeader = ref(true)

function lockScroll() {
  const scrollY = window.scrollY
  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollY}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.overflow = 'hidden'
  document.body.dataset.scrollY = scrollY
}

function unlockScroll() {
  const scrollY = document.body.dataset.scrollY
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.overflow = ''
  window.scrollTo(0, parseInt(scrollY || '0'))
  delete document.body.dataset.scrollY
}

function openMenu() {
  isMenuOpen.value = true
  lockScroll()
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
      unlockScroll()
    }, 800)
  }, 400)
}

function handleScroll() {
  const currentScroll = window.scrollY
  isScrolled.value = currentScroll > 10
  showHeader.value = currentScroll < lastScrollY.value || currentScroll < 10
  lastScrollY.value = currentScroll
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  unlockScroll()
})
</script>

<template>
  <header class="siteHeader" :class="{ 'scrolled': isScrolled, 'hiddenHeader': !showHeader }">
    <div class="headerInner">
      <a href="/" class="logoWrapper headerLogo" v-show="!isMenuOpen">
        <img src="/public/img/biffenLogo.png" alt="Biffen Nordkraft Logo" class="siteLogo" />
      </a>
      <div class="headerRight" :class="{ hidden: isMenuOpen }">
        <nav class="mainNav underlineAnimationLinks">
          <a href="/film">Alle film</a>
          <a href="/kommende-film">Kommende film</a>
          <a href="/events">Events</a>
        </nav>
        <div class="burgerMenuWrapper">
          <i class="fas fa-bars burgerIcon" v-if="!isMenuOpen" @click="openMenu"></i>
        </div>
      </div>
    </div>
  </header>

  <div class="menuCircleOverlay" :class="{ active: isMenuOpen, closing: isClosing }"></div>
  <div class="lavaLampBackground" v-show="isMenuOpen" :class="{ visible: contentVisible }">
    <div class="darkCenterOverlay"></div>
    <div class="blob blob1"></div>
    <div class="blob blob2"></div>
    <div class="blob blobAccent"></div>
    <div class="blob blobElectric"></div>
  </div>

  <div class="fullscreenMenu" v-if="isMenuOpen">
    <div class="fullscreenTopBar">
      <div class="fullscreenInnerWrapper">
        <div class="fullscreenTopBarInner">
          <div class="fullscreenLeft">
            <a href="/" class="logoWrapper fullscreenLogo">
              <img src="/public/img/biffenLogo.png" alt="Biffen Nordkraft Logo" class="siteLogo" />
            </a>
          </div>
          <div class="fullscreenRight">
            <div class="closeIcon" @click="closeMenu">
              <i class="fas fa-times"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fullscreenContent" :class="{ visible: contentVisible }">
      <div class="fullscreenInner">
        <div class="menuLayout">
          <div class="menuColumn">
            <div class="menuItem"><span class="menuNumber">01</span><NuxtLink to="/film" class="menuLink">Alle film</NuxtLink></div>
            <div class="menuItem"><span class="menuNumber">02</span><NuxtLink to="/kommende-film" class="menuLink">Kommende film</NuxtLink></div>
            <div class="menuItem"><span class="menuNumber">03</span><NuxtLink to="/events" class="menuLink">Events</NuxtLink></div>
            <div class="menuItem"><span class="menuNumber">04</span><NuxtLink to="/cinemateket" class="menuLink">Cinemateket</NuxtLink></div>
          </div>
          <div class="menuColumn">
            <div class="menuItem"><span class="menuNumber">05</span><NuxtLink to="/filmklub" class="menuLink">Filmklubber</NuxtLink></div>
            <div class="menuItem"><span class="menuNumber">06</span><NuxtLink to="/gavekort-og-ovrige-billetter" class="menuLink">Gavekort & øvrige billetter</NuxtLink></div>
            <div class="menuItem"><span class="menuNumber">07</span><NuxtLink to="/book-en-sal" class="menuLink">Book en sal</NuxtLink></div>
            <div class="menuItem"><span class="menuNumber">08</span><NuxtLink to="/praktisk-information" class="menuLink">Praktisk info</NuxtLink></div>
          </div>
        </div>

        <div class="fullscreenFooter">
          <div class="fullscreenInnerWrapper">
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
  </div>
</template>


<style scoped>
.headerInner,
.fullscreenInnerWrapper {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

@media (min-width: 1500px) {
.headerInner,
.fullscreenInnerWrapper {
  max-width: 1500px;
  padding: var(--space-container);
}
}


.siteHeader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 5rem;
  height: 70px;
  border-radius: 0 0 30px 30px;
  z-index: 9999;
  transition: background-color 0.3s ease, border 0.3s ease, transform 0.4s ease;
  background-color: transparent;
  border: 2px solid transparent;
  opacity: 0.95;
}

.siteHeader.scrolled {
  background-color: var(--secondary-blue);
  border: 2px solid var(--secondary-blue);
  backdrop-filter: none;
}

.siteHeader.hiddenHeader {
  transform: translateY(-100%);
}

.headerRight.hidden {
  display: none;
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

.headerLogo {
  display: block;
}

.fullscreenMenu .headerLogo {
  display: none;
}

.burgerIcon {
  font-size: 24px;
  color: white;
  cursor: pointer;
  padding: 8px;
  transition: color 0.5s;
}

.burgerIcon:hover {
  color: var(--interactive-red);
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

.blob1 {
  background: #1F2E4B;
  top: -15%;
  left: -25%;
  opacity: 0.25;
  animation: floatBlob1 55s infinite;
}

.blob2 {
  background: #2C4B81;
  top: 20%;
  left: 70%;
  opacity: 0.3;
  animation: floatBlob2 50s infinite;
}

.blobAccent {
  background: linear-gradient(45deg, #365FA5, #4C90FF);
  top: 75%;
  left: -10%;
  opacity: 0.12;
  animation: floatAccent 45s infinite;
}

.blobElectric {
  background: #4C90FF;
  top: 30%;
  left: 80%;
  opacity: 0.18;
  animation: floatElectric 60s infinite;
  z-index: 2;
}

@keyframes floatBlob1 {
  0%   { transform: translate(10px, -10px) scale(1); }
  25%  { transform: translate(200px, -220px) scale(1.4); }
  50%  { transform: translate(-180px, 200px) scale(1.6); }
  75%  { transform: translate(140px, 100px) scale(1.3); }
  100% { transform: translate(20px, -15px) scale(1.05); }
}

@keyframes floatBlob2 {
  0%   { transform: translate(-15px, 5px) scale(1); }
  25%  { transform: translate(-180px, 180px) scale(1.5); }
  50%  { transform: translate(160px, 100px) scale(1.3); }
  75%  { transform: translate(-150px, -160px) scale(1.4); }
  100% { transform: translate(-10px, 10px) scale(1.1); }
}

@keyframes floatAccent {
  0%   { transform: translate(10px, 10px) scale(1); }
  25%  { transform: translate(160px, 160px) scale(1.5); }
  50%  { transform: translate(-140px, -100px) scale(1.2); }
  75%  { transform: translate(80px, 50px) scale(1.4); }
  100% { transform: translate(15px, 5px) scale(1.05); }
}

@keyframes floatElectric {
  0%   { transform: translate(-10px, -10px) scale(1) rotate(0deg); }
  25%  { transform: translate(-120px, -60px) scale(1.3) rotate(10deg); }
  50%  { transform: translate(-200px, 60px) scale(1.5) rotate(-5deg); }
  75%  { transform: translate(-100px, -100px) scale(1.2) rotate(8deg); }
  100% { transform: translate(-20px, -5px) scale(1.05) rotate(2deg); }
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

.fullscreenTopBarInner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.fullscreenLeft {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.fullscreenRight {
  flex: 1;
  display: flex;
  justify-content: flex-end;
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
  transition: color 0.5s;
}

.closeIcon:hover {
  color: var(--interactive-red);
}
.fullscreenContent {
  flex-grow: 1;
  overflow: hidden;
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
  min-height: 100%;
  overflow: hidden;
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
  font-weight: 200;
}


.menuNumber {
  color: #517BEA;
  font-size: 30px;
  margin-right: 2rem;
  width: 40px;
  text-align: right;
  font-weight: 200;
}

.menuLink {
  font-size: 40px;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 200;
  transition: color 0.5s;
}
.menuLink:hover {
  color: var(--interactive-red);
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
  color: #F63758;
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
  background-color: #F63758;
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
  background-color: #F63758;
}

/* MEDIA QUERIES */
@media (max-width: 767px) {
  .siteHeader {
    padding: 3rem 20px;
  }

  .mainNav {
    display: none;
  }

  .burgerMenuWrapper {
    border-left: none;
  }

  .closeIcon {
    padding-right: 0;
  }

  .fullscreenTopBar {
    padding: 1rem 20px;
  }

  .fullscreenInner {
    padding: 4rem 20px;
    justify-content: flex-start;
  }

  .menuLayout {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    margin-bottom: 0;
    flex-grow: 0;
  }

  .menuColumn {
    width: 100%;
    flex-direction: column;
    gap: 2rem;
  }

  .menuItem {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    width: 100%;
  }

  .menuLink {
    font-size: 26px;
    padding-right: 3.5rem;
    flex: 1;
  }

  .menuNumber {
    position: absolute;
    right: 0;
    font-size: 18px;
    color: #517BEA;
    margin-right: 0;
  }

  .fullscreenFooter {
    display: none;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .siteHeader {
    padding: 3rem 50px;
  }

  .burgerMenuWrapper {
    border-left: none;
  }

  .mainNav {
    display: none;
  }

  .closeIcon {
    padding-right: 0;
  }

  .fullscreenTopBar {
    padding: 1rem 50px;
  }

  .fullscreenInner {
    padding: 4rem 50px;
    justify-content: flex-start;
  }

  .menuLayout {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    margin-bottom: 0;
    flex-grow: 0;
  }

  .menuColumn {
    width: 100%;
    flex-direction: column;
    gap: 2rem;
  }

  .menuItem {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    width: 100%;
  }

  .menuLink {
    font-size: 28px;
    padding-right: 4rem;
    flex: 1;
  }

  .menuNumber {
    position: absolute;
    right: 0;
    font-size: 18px;
    color: #517BEA;
    margin-right: 0;
  }

  .fullscreenFooter {
    display: none;
  }
}

@media (max-height: 800px) {
  .menuLayout {
    gap: 1.5rem;
  }

  .menuColumn {
    gap: 1.5rem;
  }

  .menuItem {
    gap: 1rem;
  }

  .menuLink {
    font-size: 22px;
  }

  .menuNumber {
    font-size: 16px;
    width: 30px;
  }

  .fullscreenTopBar {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .footerSocials a {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
}

@media (min-width: 1025px) and (max-height: 800px) {
  .menuLink {
    font-size: 28px;
  }

  .menuNumber {
    font-size: 20px;
    width: 35px;
  }

  .menuColumn {
    gap: 2rem;
  }

  .menuLayout {
    gap: 12rem;
}
}


</style>
