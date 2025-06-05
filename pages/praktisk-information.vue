<script setup>
import { onMounted } from 'vue'
import { useHead } from '#app'

// Seo/meta

//Use head er en composable funktion der giver os muligheden for at ændre metaddata så som description og keywords
useHead({
  title: 'Praktisk Information',
  meta: [
    {
      name: 'description',
      content: 'Praktisk information hos Biffen i Nordkraft'
    },
    {
      name: 'keywords',
      content: 'praktisk, info, information, praktisk information, aalborg, film, vintage, biograf, biffen'
    }
  ]
})

//onMounted er life cycle hook der kører koden, når vores vue komponenten er blevet renderet i doom, så vil alt kode i vores life cyclehook onmounted bliver kørt.

onMounted(()=>{
  const buttons = document.querySelectorAll(".buttons button");
  const accordions = document.querySelectorAll(".accordions");

  //En foreach som looper igennem all vores knapper og gemmer en index og tilføjer en eventlistner til dem. Derefter skjuler vi alle accordions sektioner. Herefter bruges den gemte index til at vise den rigtige accordion sektion. for eksempel hvis man trykker på button 1, så bliver accordion sektion 1 og hvis man trykker på button2 så vises accordion sektion 2 osv.
  
  //Alle buttons får tilføjet en inactive klasse, som bliver fjernet afhænging af hvilken en man trykker på.
  buttons.forEach(function(button, index){
    button.addEventListener("click",function(e){
      accordions.forEach(function(accordion){ // Her skjuler vi alle accordions
        accordion.classList.add("hide");
      });
      accordions[index].classList.remove("hide"); // Her vises vi accordions frem
      for(let i = 0; i<buttons.length; i++){
        buttons[i].classList.add("inactive");
      }
      button.classList.remove("inactive")
      button.classList.add("active")
    });
  });

const accordionsFull = document.querySelectorAll(".wrapper3 .accordion");

//en foreach som tilføjer en eventlistner til alle accordions. når man trykker på accordion, toggles klassen hide on and off på det sidste p tag i accordion. Samme sker med arrowicon bare med klassen rotate.
accordionsFull.forEach(function(accordion) {
  accordion.addEventListener("click", function () {
    const arrowIcon = accordion.querySelector("i");
    const answer = accordion.parentElement.querySelector("p:last-child");

    arrowIcon.classList.toggle("rotate");
    answer.classList.toggle("hide");
  });
});

})

</script>

<template>
  <Header />
  <main class="widthContainer">
    <section>
       <div class="info">
            <h2 class="overskrift-med-streg"><span>FAQ</span></h2>

      <p>Er du i tvivl om noget vedrørende vores biograf, billetter, forestillinger eller andet? Vi har samlet svar på de mest almindelige spørgsmål, så du hurtigt og nemt kan finde den information, du har brug for</p>
      <div>
        <p>Se vores udvalg af film!</p>
                    <div class="generalButtons">
              <router-link
                :to="`/film`"
                class="generalbtn btn-primary"
              >
                
                Se alle film
              </router-link>

            </div>
      </div>
      </div>

      <div class="tabs">
        <div class="buttons">
        <button class="active">Generelt</button>
        <button class="inactive">Billetter & Priser</button>
        <button class="inactive">Faciliteter</button>
        <button class="inactive">Program</button>
        </div>
      </div>
      <div class="accordions">

      <div class="wrapper3">
          <div class="accordion">
          <p>Hvor kan jeg købe billetter?</p>
          <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
        <p class="hide">Billetter kan købes online via Biffens hjemmeside eller ved fysisk fremmøde ved Biffens cafe.</p>
      </div>
          <div class="wrapper3">
          <div class="accordion">
          <p>Hvor meget koster billetter?</p>
          <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">-	Normalpris: 100 - 110 kr.
-	Senior (65+): 85 kr.
-	Studerende: 85 kr.
-	Børn (u. 12 år): 80 kr.
-	Rabatkort med 5 klip: 400 kr. (80 kr. pr. film)
-	Reservations- og købsgebyr 5 kr.
-	Tillæg ved helaftensfilm og events.
</p>
        </div>

         <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan tilmelder jeg mig til en filmklub?</p>
         <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">-	Biffen har sine egne filmklubber, som man kan meldes ind og se udvalgte film til en reduceret film. Udover vores egne filmklubber kan du også se filmene fra Filmporten og Biografklub Danmark i Biffen.</p>
        </div>

         <div class="wrapper3">
          <div class="accordion">
          <p>Kan man parkere nær Biffen?</p>
          <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">-	Ja, du kan finde en oversigt over parkeringsmulighederne her:</p>
        </div>
       <div class="wrapper3">
          <div class="accordion">
          <p>Kan jeg reserve billetter?</p>
          <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">Du kan ikke reservere billetter online, men du kan ringe til billetsalget og bede om en reservation, tlf. 98169977. Billetsalget åbner 30 min. før dagens første visning. -	Hvis du køber dine billetter online, undgår du at stå i kø i Biffen. Skulle du blive forhindret, kan du altid få billetterne annulleret, så længe du ringer herind inden forestillingen går i gang.</p>
        </div>
        <div class="wrapper3">
          <div class="accordion">
          <p>Jeg kom til at købe billetter til en forkert dato/film.</p>
          <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">-	Vi kan ikke ændre billetterne, men vi kan annullere dem. Du får herved pengene retur og kan købe billetter til den rigtige dato/film. Du kan få billetterne annulleret ved at ringe til billetsalget på tlf. 98169977. Det er vigtigt, at du ringer, før filmens start. Ellers kan billetterne ikke refunderes.</p>
        </div>
      </div>
       <div class="accordions hide">
        <div class="wrapper3">
          <div class="accordion">
          <p>Hvor meget koster billetter?</p>
          <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">-	Normalpris: 100 - 110 kr.
-	Senior (65+): 85 kr.
-	Studerende: 85 kr.
-	Børn (u. 12 år): 80 kr.
-	Rabatkort med 5 klip: 400 kr. (80 kr. pr. film)
-	Reservations- og købsgebyr 5 kr.
-	Tillæg ved helaftensfilm og events.
</p>
        </div>
          <div class="wrapper3">
          <div class="accordion">
          <p>Hvorfor kan jeg kun købe 2 billetter på bagerste række?</p>
         <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">Bagerste række består af sofasæder (dobbeltsæder). De kan derfor kun købes to af gangen. Ønsker du flere sæder, kan du lave flere særskilte køb.</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Kan jeg købe billet online med biografklub Danmark?</p>
         <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">Ja, Biografklub Danmark vælges som billettype. Undervejs i billetkøbet bliver du bedt om at indtaste kuponnumre.</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Kan jeg indløse gavepakker ved jer?</p>
          <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">Du kan indløse mange men ikke alle af de gavepakker som kan købes i supermarkeder, hos boghandlere eller på tankstationer mv. Vi tager bl.a. imod GoDream, Smartbox, biotur fra COOP, biotur fra Salling. Sørg altid for på forhånd at læse vilkår i din gavepakke grundigt igennem, og vær sikker på, at du på forhånd har aktiveret billetterne på nettet i de tilfælde, hvor dette er påkrævet. Vær også opmærksom på, at denne type gavebilletter kun er gyldige til ordinære filmforestillinger - altså ikke til forpremierer, gallapremierer eller andre særarrangementer.</p>
        </div>
       <div class="wrapper3">
          <div class="accordion">
          <p>Mine biokuponer er udløbet – kan de forlænges?</p>
        <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">Vi modtager mange forskellige biokuponer i Biffen. Nogle gavepakker kan forlænges. Kontakt udbyderen for at høre om mulighederne. Er du i tvivl om, hvor dine biokuponer er fra, kan du sende en mail til info@biffen.eu - så hjælper vi dig på vej. </p>
        </div>
        <div class="wrapper3">
          <div class="accordion">
          <p>Kan jeg købe billet online med filmporten rabat?</p>
        <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">Ja. Filmporten rabat vælges som billettype. Din kupon afleveres ved ankomst til Biffen.</p>
        </div>
      </div>
       <div class="accordions hide">
        <div class="wrapper3">
          <div class="accordion">
          <p>Kan man booke en sal hos Biffen?</p>
          <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">Biffen har 3 moderne sale med plads til henholdsvis 87, 52 og 52 gæster. Vi arrangerer lukkede forestillinger for skoler, virksomheder og andre. For mere info kan vi kontaktes på info@biffen.eu</p>
        </div>
          <div class="wrapper3">
          <div class="accordion">
          <p>Hvor meget koster det at booke en sal?</p>
          <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">Billetprisen er kr. 55 pr. billet (formiddag, filmstart kl. 9) ved film fra det aktuelle repertoire, dog er der en minimumspris på kr. 800,- pr. forestilling. Eftermiddag/aften afhænger prisen af tidspunkt og film. For mere info kan vi kontaktes på info@biffen.eu</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Er der mulighed for at købe snacks, mad og drikkevarer i Biffen?</p>
         <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
         <p class="hide">Ja, vi tilbyder lidt af hvert i biffens cafe. Der kan købes øl, snacks, mad og drikkevarer.</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Er det muligt at bringe sin egen mad, snacks eller drikkevarer med?</p>
          <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">Nej, det tillader vi ikke. Hvis man vil have noget med at spise eller drikke med i biffen, skal det købes fra biffens cafe.</p>
        </div>
       <div class="wrapper3">
          <div class="accordion">
          <p>Skal man se en film for at være i biffen?</p>
          <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">Man skal ikke se film i biffen for at være der. Man kan også bare komme i biffens cafe for at få en kop kaffe med en ven og sidde lidt og snakke.</p>
        </div>
        <div class="wrapper3">
          <div class="accordion">
          <p>Er der Wi-Fi i biografen?</p>
          <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">Ja, vi tilbyder gratis Wi-Fi til kunder, som besøger Biffen for at se film eller bare være i Biffens Cafe.</p>
        </div>
      </div>
       <div class="accordions hide">
        <div class="wrapper3">
          <div class="accordion">
          <p>Jeg kan ikke se nogle film i programmet?</p>
          <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">Almindelige filmvisninger programlægges en uge ad gangen. Vi laver filmprogram hver mandag som gælder den kommende torsdag til onsdag. Særvisninger programlægges længere frem. Vi kan desværre ikke programlægge længere frem, da vi hver uge får nye film og andre er nødt til at gå ud af programmet</p>
        </div>
          <div class="wrapper3">
          <div class="accordion">
          <p>Hvornår slutter filmen?</p>
          <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">Under fakta på filmens underside kan du se filmens længde. Ved normale forestillinger er der ca. 15 minutters reklamer og trailers, som du skal lægge til filmens længde for at kende sluttidspunktet.</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Hvor længe går filmen?</p>
          <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">Den enkelte films levetid i Biffen er baseret på publikums efterspørgsel. Derfor laves der normalt kun program for én uge ad gangen (dog kan forsalget ved særligt store premierer, festivaler eller events starte flere uger før visning). Biffens ugeprogram bliver typisk færdiggjort og offentliggjort mandag ved frokosttid og gælder fra førstkommende torsdag (som typisk er premieredagen) til og med onsdagen efter.</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Hvorfor spiller filmen kun om formiddagen/eftermiddagen/aften?</p>
         <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">Filmene har som regel aftenvisninger i premiereugen. Derefter flytter de som regel ned til formiddage og/eller eftermiddage. Afhængig af filmens popularitet, kan den have flere visninger dagligt. Filmprogrammet laves hver mandag og gælder den kommende torsdag (premieredag) til onsdag. Filmtiderne ændrer sig uge for uge, så hold øje med programmet for at finde et filmtidspunkt, der passer i din kalender :)</p>
        </div>
       <div class="wrapper3">
          <div class="accordion">
          <p>Hvor finder jeg programmet for ugen?</p>
         <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">Du kan finde vores program ved under siden Alle film. Her kan du få overblikket over de film, som spiller i denne uge. Programoversigten kan også ses fysisk ved Biffen.</p>
        </div>
        <div class="wrapper3">
          <div class="accordion">
          <p>Hvad gør jeg, hvis jeg ikke kan finde den film, jeg vil se?</p>
         <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">De film vi vælger at vise hos biffens, er på baggrunds af filmens efterspørgsel, men også dens popularitet. Hvis der er en film, som du synes skal være med i de næste programmer, så kontakt os omkring, og det kan være den kommer på afhængig af filmens efterspørgsel og popularitet.</p>
        </div>
      </div>
    </section>
    <section>
      <div class="contact">
  <div class="wrapper">
    <div class="form-group firstname">
      <label for="fname">Fornavn<span>*</span></label>
      <input type="text" name="fname" id="fname" placeholder="Skriv dit fornavn">
    </div>

    <div class="form-group lastname">
      <label for="lname">Efternavn<span>*</span></label>
      <input type="text" name="lname" id="lname" placeholder="Skriv dit efternavn">
    </div>
  </div>

  <div class="form-group email">
    <label for="email">E-mail<span>*</span></label>
    <input type="email" name="email" id="email" placeholder="Skriv din email">
  </div>

  <div class="form-group phone">
    <label for="phone">Telefon<span>*</span></label>
    <input type="tel" name="phone" id="phone" placeholder="Skriv dit telefon nummer">
  </div>

  <div class="form-group message">
    <label for="message">Besked<span>*</span></label>
    <textarea id="message" rows="9" placeholder="Skriv din besked"></textarea>
  </div>

  <div class="centerbtn">
    <button>Send besked</button>
  </div>
</div>


      <div class="info">
        <h2 class="overskrift-med-streg"><span>Kontakt os</span></h2>

      <p>Har du spørgsmål? Du er altid velkommen til at kontakte os via vores formular, telefon eller e-mail.</p>
      <br>
      <div class="wrapper2">
        <div>
          <div class="phoneinfo">
            <i class="fa-solid fa-phone"></i>
            <p>Telefon</p>
          </div>
          <p>+45 98 16 99 77</p>
        </div>
        <br>
        <div>
          <div class="emailinfo">
            <i class="fa-solid fa-envelope"></i>
            <p>E-mail</p>
          </div>
          <p>info@biffen.eu</p>
        </div>
      </div>
      </div>
    </section>

    <section>
       <div class="info">
        <h2 class="overskrift-med-streg"><span>Find os</span></h2>
      <p>Vil du finde vej til os? Brug kortet ved siden af for at se, hvor vi holder til. Du er altid velkommen til at kontakte os via formularen, telefon eller e-mail, hvis du har spørgsmål.</p> <br>
      <div class="wrapper2">
        <div>
          <div class="phoneinfo">
            <i class="fa-solid fa-location-dot"></i>
            <p>Adresse</p>
          </div>
          <p>Biffen Nordkraft Teglgårds Plads 1, 9000 Aalborg</p>
        </div>
      </div>
      </div>

      <div class="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4340.601994573049!2d9.930255076832756!3d57.04638757359037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4649328a079ff57f%3A0xada0085706926fec!2sBiffen!5e0!3m2!1sda!2sdk!4v1747210243096!5m2!1sda!2sdk" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </section>
    <Newsletter />
  </main>
  <Footer />

</template>


<style scoped>
.hide{
  display: none !important;
}

.tabs{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-bottom: 1rem;

}
.tabs i{
  font-size: 32px;

}

label {
  margin-top: 1rem; /* Giver afstand over label */
  display: inline-block;
}

.buttons{
  overflow: hidden;
  display: flex;
  justify-content: center;
  gap: 10px;

}
.buttons button{
  padding: 10px 10px;
      cursor: pointer;

}
iframe{
  width: 100%;
  border-radius: 20px;
}
.emailinfo, .phoneinfo{
  display: flex;
  align-items: center;
  gap: 8px;
}
.emailinfo i, .phoneinfo i{
  color: var(--interactive-red);
}

.centerbtn{
  display: flex;
  justify-content: start;
  margin-top: 1rem;
}
.info button,.active, .centerbtn button
{
  color: white;
  background-color: var(--interactive-red);
  box-sizing: border-box;
  border-radius: 5px;
  border: solid;
  border-color: var(--interactive-red);
  padding: 8px;
}

label span{
  color: #F63758;
}

textarea{
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  border: solid;
  border-color: white;
  resize: none;
}
.wrapper{
  display: flex;
  gap: 1rem;
}

input{
  border-radius: 5px;
  border: solid;
  border-color: white;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

.firstname, .lastname{
  display: flex;
  flex-direction: column;
}

.wrapper3{
  border-radius: 5px;
  background-color: var(--secondary-blue);
  box-sizing: border-box;
  padding: 4px 16px;
}

.accordion{
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.accordion div{
  background-color: var(--interactive-red);
  padding: 4px 14px;
  border-radius: 6px;
}
.accordion div i {
  font-size: 25px;
}
.accordions{
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.contact,.info,.map{
  background-color: var(--secondary-blue);
  padding: 50px;
  margin-bottom: 60px;
}

main{
  padding: 0px 12px;
}

@media (min-width: 1000px){
   main{
    padding: 0 var(--space-container);
  }

  section:nth-last-of-type(2){
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    grid-template-rows: auto;
    gap: 2rem;
  }

  section:last-of-type, section:first-of-type{
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    grid-row: auto 1fr;
    gap: 2rem;
  }

  h1,h2,h3,h4,h5,h6,p{
    margin: 0px;
  }
  .contact{
    padding: 50px;
  }

  .tabs{
    grid-column: 1/3;
    grid-row: 1;
  }

  .tabs i {
    display: none;
  }

  .wrapper3{
    padding: 16px 16px;
  }

  .buttons{
    width: 100%;
    overflow: visible;
  }

  .buttons button{
    padding: 10px 16px;
  }
}

.fa-angle-right{
  transition: 250ms;
}

.rotate{
  rotate: 90deg;
}

.inactive{
  background-color: var(--color-body);
  border-color: var(--interactive-red) !important;
  border-radius: 5px;
  color: white;
  box-sizing: border-box;
  border: solid;
}

.info,.contact,.map{
  border-radius: 20px;
}

.accordion p:first-of-type{
  font-weight: bolder;
}

.info {
  padding: 50px;
}
</style>
