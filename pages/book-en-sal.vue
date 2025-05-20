<script setup>
import Header from '@/components/Header.vue';

</script>

<template>
  <Header />
  <main>
    <section class="introEvents">
    <img src="../assets/img/ArrangementMobil.png" alt="" class="mobilbillede">
    <img src="../assets/img/ArrangementDesktop.png" alt="" class="pcbillede">
    <div class="introWrapper">
    <div class="headingNdLine">
      <h1>Dit arrangement</h1>
      <div></div>
    </div>
    <p>Både private og virksomheder kan leje biografsal og café til arrangementer og events.</p>
    <p>Digitalt udstyr til film, billeder og lyd af enhver art og i bedste kvalitet forefindes, ligesom caféen kan benyttes til afholdelse af forskellige typer arrangementer. Salen kan også benyttes til forelæsninger, debat eller andet.</p>
    <p>Biffen tilbyder desuden samarbejder med virksomheder, der ønsker at benytte biografens hyggelige rammer til at kræse om medarbejdere, kunder og samarbejdspartnere.</p>
    </div>
  </section>

  <section class="introEvents">
    <img src="../assets/img/IntroEventMobil.png" alt="" class="mobilbillede">
    <img src="../assets/img/SkoleDesktop.png" alt="" class="pcbillede">
    <div class="introWrapper">
    <div class="headingNdLine">
      <h1>Med skolen i biografen</h1>
      <div></div>
    </div>
    <p>Størstedelen af de nordjyske skoler booker hvert skoleår den lokale biograf som klasselokale, og ca. titusindvis af børn og unge går på udflugt ind i verdener, historiske perioder og konflikter, de kan spejle sig i og blive klogere på livet af at besøge. Intet rum i børns aktuelle virkelighed egner sig bedre hertil end netop biografens rum.</p>
    <p>Med Skolen I Biografen er ikke blot en udflugt ind i filmens magiske univers. Det er også anledning til at præsentere tidens børn og unge for film og filmnationer, de ikke selv kunne drømme om at besøge. Med Skolen I Biografen tilrettelægges og administreres af UCN, Center for Undervisningsmaterialer i Aalborg.</p>
    <h2>Gymnasier</h2>
    <p>og VIDEREGÅENDE UDDANNELSER - skriv til Karin Fast, info@biffen.eu</p>
    </div>
  </section>

  <section>
    <article>
    <img src="../assets/img/ArrangementMobil.png" alt="" class="mobilbillede">
    <img src="../assets/img/ArrangementDesktop.png" alt="" class="pcbillede">
    </article>
  </section>
  </main>
  <Footer />
</template>

<style scoped>
main{
  padding: 0px 12px;
}
h1,h2,h3,h4,h5,h6{
  margin: 0px;
}
.introEvents{
  background-color: var(--secondary-blue);
  padding: 20px 20px;
}

.introEvents img{
  border-radius: 20px;
}
.introEvents{
  margin-bottom: var(--space-section);
}

.introWrapper{
  padding-bottom: 20px;
}
.pcbillede{
  display: none;
}

.headingNdLine{
  display: inline-block;
  margin-top: 40px;
}

.headingNdLine div{
  width: 50%;
  background-color: var(--interactive-red);
  height: 3px;
}

.introEvents{
  margin-bottom: var(--space-section);
}

@media (min-width: 1000px){
  .mobilbillede{
    display: none;
  }
  .pcbillede{
    display: inline;
  }
}
</style>
