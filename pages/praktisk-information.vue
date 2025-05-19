<script setup>
import { onMounted, ref } from 'vue'
onMounted(()=>{

  const buttons = document.querySelectorAll(".buttons button");
  const accordions = document.querySelectorAll(".accordions");
  buttons.forEach(function(button, index){
    button.addEventListener("click",function(e){
      accordions.forEach(function(accordion){
        accordion.classList.add("hide");
      });
      accordions[index].classList.remove("hide")
    });
  });

  const arrows = document.querySelectorAll(".accordion .fa-angle-right");
  arrows.forEach(function(arrow){
    arrow.addEventListener("click",function(e){
      console.log(e)
      arrow.classList.toggle("rotate");
      arrow.parentElement.parentElement.parentElement.lastElementChild.classList.toggle("hide")
    })
  })
})

</script>

<template>
  <Header />
  <main>
    <section>
       <div class="info">
      <div class="headingNdLine">
      <h1>FAQ</h1>
      <div></div>
      </div>
      <p>Er du i tvivl om noget vedrørende vores biograf, billetter, forestillinger eller andet? Vi har samlet svar på de mest almindelige spørgsmål, så du hurtigt og nemt kan finde den information, du har brug for</p>
      <div>
        <p>Se vores udvalg af film!</p>
        <button>Se alle film </button>
      </div>
      </div>

      <div class="tabs">
        <div class="buttons">
        <button>Mest stillet</button>
        <button>Billetter & Priser</button>
        <button>Faciliteter</button>
        <button>Program</button>
        <button>Mad & Drikke</button>
        </div>
      </div>
      <div class="accordions">

      <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?12312</p>
          <div class="click"><i class="fa-solid fa-angle-right"></i></div>
        </div>
        <p class="hide">hej</p>
      </div>
          <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">hej</p>
        </div>

         <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>

         <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">hej</p>
        </div>
       <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">hej</p>
        </div>
        <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">hej</p>
        </div>
      </div>
       <div class="accordions hide">
        <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?1+1-!!</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
          <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">hej</p>
        </div>
       <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">hej</p>
        </div>
        <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
      </div>
       <div class="accordions hide">
        <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter??!?!??!?!</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
          <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
         <p class="hide">hej</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
       <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
        <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">hej</p>
        </div>
      </div>
       <div class="accordions hide">
        <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter??!?!</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">hej</p>
        </div>
          <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">hej</p>
        </div>
       <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">hej</p>
        </div>
        <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">hej</p>
        </div>
      </div>
       <div class="accordions hide">
        <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter??????????+</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
          <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
         <p class="hide">hej</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
         <p class="hide">hej</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
       <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
        <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">hej</p>
        </div>
      </div>
       <div class="accordions hide">
        <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter???</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">hej</p>
        </div>
          <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
         <p class="hide">hej</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">hej</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">hej</p>
        </div>
       <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
           <p class="hide">hej</p>
        </div>
        <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
      </div>
       <div class="accordions hide">
        <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter??</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
          <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
         <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
         <p class="hide">hej</p>
        </div>
       <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
        <div class="wrapper3">
          <div class="accordion">
          <p>Hvordan bestiller man billetter?</p>
          <div><i class="fa-solid fa-angle-right"></i></div>
        </div>
          <p class="hide">hej</p>
        </div>
      </div>
            
    </section>
    <section>
        <div class="contact">
        <div class="wrapper">
        <div class="firstname">
          <div>
            <label for="fname">Fornavn<span>*</span></label>
          </div>
          <div>
            <input type="text" name="fname" id="fname" placeholder="Skriv dit fornavn">
          </div>
        </div>

        <div class="lastname">
          <div>
            <label for="fname">Efternavn<span>*</span></label>
          </div>
          <div>
            <input type="text" name="fname" id="fname" placeholder="Skriv dit efternavn">
          </div>
        </div>
        </div>
        <div class="email">
          <div>
          <label for="email">E-mail<span>*</span></label>
          </div>
          <div>
            <input type="email" name="email" id="email" placeholder="Skriv din email">
          </div>
        </div>
          <div class="phone">
          <div>
          <label for="phone">Telefon<span>*</span></label>
          </div>
          <div>
            <input type="tel" name="phone" id="phone" placeholder="Skriv dit telefon nummer">
          </div>
        </div>
        <div class="message">
          <div>
            <label for="message">Besked<span>*</span></label>
          </div>
          <div>
            <textarea id="message" rows="9" placeholder="Skriv din besked"></textarea>
          </div>
        </div>

        <div class="centerbtn">
          <button>
            Send besked
          </button>
        </div>
      </div>

      <div class="info">
      <div class="headingNdLine">
      <h1>Kontakt os</h1>
      <div></div>
      </div>
      <p>Har du spørgsmål? Du er altid velkommen til at kontakte os via vores formular, telefon eller e-mail.</p>
      
      <div class="wrapper2">
        <div>
          <div class="phoneinfo">
            <i class="fa-solid fa-phone"></i>
            <p>Telefon</p>
          </div>
          <p>+45 98 16 99 77</p>
        </div>
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
      <div class="headingNdLine">
      <h1>Find os</h1>
      <div></div>
      </div>
      <p>Vil du finde vej til os? Brug kortet ved siden af for at se, hvor vi holder til. Du er altid velkommen til at kontakte os via formularen, telefon eller e-mail, hvis du har spørgsmål.</p>
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
  gap: 24px;
}
.tabs i{
  font-size: 32px;
}

.buttons{
  overflow: hidden;
  display: flex;
  justify-content: center;
  gap: 10px;
}
.buttons button{
  padding: 0px 6px;
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
}
button
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
  padding: 25px 25px;
  margin-bottom: 60px;
}

main{
  padding: 0px 12px;
}


.headingNdLine div{
  width: 50%;
  background-color: var(--interactive-red);
  height: 3px;
}

.headingNdLine{
  display: inline-block;
  margin-top: 40px;
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
    padding: 25px 128px;
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
</style>
