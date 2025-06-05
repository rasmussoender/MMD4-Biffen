<script setup>
import Header from '@/components/Header.vue';
import { useHead } from '#app'

// Seo/meta
// Her definerer vi title, metadescripton og keywords til seo
useHead({
  title: 'Book En Sal',
  meta: [
    {
      name: 'description',
      content: 'Book en sal hos Biffen i Nordkraft'
    },
    {
      name: 'keywords',
      content: 'book, sal, info, billetter, firma, fødselsdag, aalborg, film, biograf, biffen'
    }
  ]
})

</script>

<template>
  <Header />
  <main class="widthContainer">
    <section class="introEvents">
    <img src="../assets/img/ArrangementMobil.png" alt="" class="mobilbillede">
    <img src="../assets/img/ArrangementDesktop.png" alt="" class="pcbillede">
    <div class="introWrapper">
    <h1 class="overskrift-med-streg"><span>Dit arrangement</span></h1>

    <p>Både private og virksomheder kan leje biografsal og café til arrangementer og events.</p>
    <p>Digitalt udstyr til film, billeder og lyd af enhver art og i bedste kvalitet forefindes, ligesom caféen kan benyttes til afholdelse af forskellige typer arrangementer. Salen kan også benyttes til forelæsninger, debat eller andet.</p> <br>
    <p>Biffen tilbyder desuden samarbejder med virksomheder, der ønsker at benytte biografens hyggelige rammer til at kræse om medarbejdere, kunder og samarbejdspartnere.</p>
    <p>Kontakt Karin Fast, <span class="red">info@biffen.eu</span></p>
    </div>
  </section>

  <section class="introEvents">
    <div class="imgwrapper">
    <img src="../assets/img/SkoleMobil.png" alt="" class="mobilbillede">
    <img src="../assets/img/SkoleDesktop.png" alt="" class="pcbillede">
    </div>
    <div class="introWrapper column1">
    <h2 class="overskrift-med-streg"><span>Med skolen i biografen</span></h2>

    <p>Størstedelen af de nordjyske skoler booker hvert skoleår den lokale biograf som klasselokale, og ca. titusindvis af børn og unge går på udflugt ind i verdener, historiske perioder og konflikter, de kan spejle sig i og blive klogere på livet af at besøge. Intet rum i børns aktuelle virkelighed egner sig bedre hertil end netop biografens rum.</p> <br>
    <p>Med Skolen I Biografen er ikke blot en udflugt ind i filmens magiske univers. Det er også anledning til at præsentere tidens børn og unge for film og filmnationer, de ikke selv kunne drømme om at besøge. Med Skolen I Biografen tilrettelægges og administreres af UCN, Center for Undervisningsmaterialer i Aalborg.</p>
    <h3>Gymnasier og videregående uddannelser </h3>
    <p> skriv til Karin Fast, <span class="red">info@biffen.eu</span></p>
    </div>
  </section>

  <section class="birthday" id="birthdaySection">
    <article>
    <img src="../assets/img/BirthdayMobile.png" alt="" class="mobilbillede birthdayimg">
    <img src="../assets/img/BirthdayDesktop.png" alt="" class="pcbillede birthdayimg">
   <div class="notShow">
     <h2 class="overskrift-med-streg"><span>Børnefødselsdage</span></h2>
   </div>
    <div class="package">
      <p class="package-first-p">En fødselsdagspakke i Biffen koster kun 95 kr. pr. deltager og indeholder:</p>
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
      <p class="package-last-p">Minimum 10 deltagere</p>
    </div>
    </article>
    <article class="text">
   <div class="toShow">
<h2 class="overskrift-med-streg"><span>Børnefødselsdag</span></h2>
   </div>
    <p>Inviter venner eller hele klassen med til fødselsdagsfest i Biffen Nordkraft og fejr dagen i filmens magiske verden.</p> <br>
    <p>Inviter venner eller hele klassen med til fødselsdagsfest i Biffen Nordkraft og fejr dagen i filmens magiske verden. Glem alt om oprydning - Vi tager os af det praktiske, så du kan fokusere på at nyde dagen sammen med fødselaren.</p> <br>
    <p>Samme pris for voksne (der skal mindst en voksen med ind i salen). Som udgangspunkt vil det være med filmstart kl. 10 alle ugens dage.</p>
    <p>Book din næste børnefødselsdag i Biffen (gerne senest 14 dage før) på mail til <span class="red">stine@biffen.eu</span></p> <br>
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
  display: block ;
}
.toShow{
  display: none !important;
}

.package p {
  text-align: center;
}

.package-first-p {
  margin-bottom: 2rem;
}

.package-last-p {
  margin-top: 2rem;
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
  padding: 40px;
  border-radius: 20px;
  background-color: #273A5F;
  margin-top: 50px;
}
.birthday{
  background-color: var(--secondary-blue);
}

.birthday{
  padding: 50px;
}

.birthday img{
  border-radius: 20px;
}

.introWrapper h3 {
  margin-top: 2rem;
}

.introWrapper p {
  font-size: 18px;
}

main{
  padding: 0px 12px;
}
h1,h2,h3,h4,h5,h6{
  margin: 0px;
}
.introEvents{
  background-color: var(--secondary-blue);
  padding: 50px;
}

.introEvents img {
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

@media (max-width: 767px){
  .introEvents img, .birthday img {
    width: 100%;
  }

}

@media (min-width: 1200px){
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
    display: inline-block !important;
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

@media (min-width: 768px) and (max-width:1200px){
  main{
    padding: 0 var(--space-container);
  }
  .introEvents img, .birthdayimg{
    width: 100%;
  }
}


</style>
