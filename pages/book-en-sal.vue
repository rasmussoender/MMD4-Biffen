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
    <p>Kontakt Karin Fast, <span class="red">info@biffen.eu</span></p>
    </div>
  </section>

  <section class="introEvents">
    <div class="imgwrapper">
    <img src="../assets/img/IntroEventMobil.png" alt="" class="mobilbillede">
    <img src="../assets/img/SkoleDesktop.png" alt="" class="pcbillede">
    </div>
    <div class="introWrapper column1">
    <div class="headingNdLine">
      <h1>Med skolen i biografen</h1>
      <div></div>
    </div>
    <p>Størstedelen af de nordjyske skoler booker hvert skoleår den lokale biograf som klasselokale, og ca. titusindvis af børn og unge går på udflugt ind i verdener, historiske perioder og konflikter, de kan spejle sig i og blive klogere på livet af at besøge. Intet rum i børns aktuelle virkelighed egner sig bedre hertil end netop biografens rum.</p>
    <p>Med Skolen I Biografen er ikke blot en udflugt ind i filmens magiske univers. Det er også anledning til at præsentere tidens børn og unge for film og filmnationer, de ikke selv kunne drømme om at besøge. Med Skolen I Biografen tilrettelægges og administreres af UCN, Center for Undervisningsmaterialer i Aalborg.</p>
    <h2>Gymnasier</h2>
    <p>og VIDEREGÅENDE UDDANNELSER - skriv til Karin Fast, <span class="red">info@biffen.eu</span></p>
    </div>
  </section>

  <section class="birthday">
    <article>
    <img src="../assets/img/BirthdayMobile.png" alt="" class="mobilbillede">
    <img src="../assets/img/BirthdayDesktop.png" alt="" class="pcbillede">
    <div class="headingNdLine notShow">
      <h1>Børnefødselsdag</h1>
      <div></div>
    </div>
    <div class="package">
      <p>En fødselsdagspakke i Biffen koster kun 95 kr. pr. deltager og indeholder:</p>
      <div class="packageWrapper">
        <div>
        <img src="../assets/img/Billetikon.png" alt="">
        <h5>1 billet til den valgte film</h5>
        </div>
        <div>
        <img src="../assets/img/Billetikon.png" alt="">
        <h5>1 billet til den valgte film</h5>
        </div>
          <div>
        <img src="../assets/img/Billetikon.png" alt="">
        <h5>1 billet til den valgte film</h5>
        </div>
      </div>
      <p>Minimum 10 deltagere</p>
    </div>
    </article>
    <article class="text">
    <div class="headingNdLine toShow">
    <h1>Børnefødselsdag</h1>
    <div></div>
    </div>
    <p>Inviter venner eller hele klassen med til fødselsdagsfest i Biffen Nordkraft og fejr dagen i filmens magiske verden.</p>
    <p>Inviter venner eller hele klassen med til fødselsdagsfest i Biffen Nordkraft og fejr dagen i filmens magiske verden. Glem alt om oprydning - Vi tager os af det praktiske, så du kan fokusere på at nyde dagen sammen med fødselaren.</p>
    <p>Samme pris for voksne (der skal mindst en voksen med ind i salen). Som udgangspunkt vil det være med filmstart kl. 10 alle ugens dage.</p>
    <p>Book din næste børnefødselsdag i Biffen (gerne senest 14 dage før) på mail til <span class="red">stine@biffen.eu</span></p>
    <p>Meget kan lade sig gøre - så tøv ikke med at kontakte os for at høre om andre muligheder.</p>
    <p>Vi glæder os til at fejre dagen med jer!</p>
    </article>
  </section>
  </main>
  <Footer />
</template>

<style scoped>

.red{
  color: var(--interactive-red);
}

.notShow{
  display: block;
}
.toShow{
  display: none;
}

.package p {
  text-align: center;
}
.packageWrapper{
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.packageWrapper div{
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}
.package{
  padding: 36px 10px;
  border-radius: 20px;
  background-color: #273A5F;
}
.birthday{
  background-color: var(--secondary-blue);
}

.birthday{
  padding: 20px 20px;
}

.birthday img{
  border-radius: 20px;
}


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
  main{
    padding: 0 var(--space-container);
  }
  .mobilbillede{
    display: none;
  }
  .pcbillede{
    display: inline;
  }

   .toShow{
    display: inline-block;
  }
  .notShow{
    display: none;
  }

   .introEvents,.birthday{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 70px;
  }

  .introEvents:nth-of-type(2){
    flex-direction: row-reverse;
  }
 

  

 .package{
  width: 508px;
 }
 
  .column1{
    grid-column: 1;
    grid-row: 1;
  }
  .imgwrapper{
    justify-self: end;
  }
}
</style>
