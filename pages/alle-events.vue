<script setup>
import { ref, onMounted } from 'vue'
import Footer from '~/components/Footer.vue'

const events = ref([])

onMounted(async () => {
  try {
    const response = await fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/event')
    const data = await response.json()
    events.value = data
  } catch (error) {
    console.error('Error fetching events:', error)
  }
})
</script>

<template>
  <Header />
  <main>
  <section class="introEvents">
    <img src="../assets/img/IntroEventMobil.png" alt="" class="mobilbillede">
    <img src="../assets/img/IntroEventDesktop.png" alt="" class="pcbillede">
    <div class="introWrapper">
    <div class="headingNdLine">
      <h1>Biffens event</h1>
      <div></div>
    </div>
    <p>Biffen arrangerer året igennem en lang række spændende events - altid med den gode film i centrum.</p>
    <p>Vi får bl.a. besøg af aktuelle skuespillere og instruktører til Q&A’s, hvor publikum får mulighed for at stille spørgsmål og få et unikt indblik i filmens tilblivelse. Vi afholder både nationale og internationale filmfestivaler som CPH:DOX, Don't Fear the Weird og Cinematekets Musikfilmfestival, som giver plads til både nye stemmer og etablerede navne.</p>
    <p>Derudover sætter vi en ære i at skabe den rette ramme omkring hver visning – hvad enten det er gennem introduktioner, debatarrangementer eller særlige temaaftener, der sætter filmen i perspektiv og inviterer til refleksion.</p>
    </div>
  </section>

  <section class="upcomingEvents upcoming">
    <div class="headingNdLine">
      <h1>Kommende events</h1>
      <div></div>
    </div>
    <section>
      <article>
        <div class="wrapper">
          <img src="../assets/img/BjorkDesktop.png" alt="">
          <div class="overlay"></div>
          <div class="calendar">
            <i class="fa-solid fa-calendar-days" id="calendarIcon"></i>
            <h6>27 apr. kl 19:00</h6>
          </div>
          <h4>OPERA I BIFFEN</h4>
        </div>
        <p>Oplev nogle af de største operaer på det store lærred når vi viser Opera i Biffen. Henover efteråret og foråret kan du få spektakulære operaoplevelser fra blandt andet Arena di Verona, Bayerische Staatsoper og Metropolitan.</p>
      </article>
      <article>
        <div class="wrapper">
          <img src="../assets/img/BjorkDesktop.png" alt="">
          <div class="overlay"></div>
          <div class="calendar">
            <i class="fa-solid fa-calendar-days" id="calendarIcon"></i>
            <h6>27 apr. kl 19:00</h6>
          </div>
          <h4>BJÖRK: CORNUCOPIA</h4>
        </div>
        <p>Oplev Björks mest spektakulære show nogensinde, når den længe ventede koncertfilm Cornucopia rammer biograferne! </p>
      </article>
      <article>
        <div class="wrapper">
          <img src="../assets/img/BjorkDesktop.png" alt="">
          <div class="overlay"></div>
          <div class="calendar">
            <i class="fa-solid fa-calendar-days" id="calendarIcon"></i>
            <h6>27 apr. kl 19:00</h6>
          </div>
          <h4>SØNNIKE</h4>
        </div>
        <p>Mød instruktør Jesper Quistgaard og hovedrolleindehaver Morten Agerholm Jensen til forpremieren, hvor de vil introducere det nye danske drama SØNNIKE. Vi ruller den røde løber ud og byder på et glas vin før filmen.</p>
      </article>
    </section>
  </section>

  <section class="events">
      <div class="headingNdLine">
        <h1>Vores events</h1>
        <div></div>
      </div>
    <section>
      <article>
        <img src="../assets/img/CinematicsMobil.png" alt="" class="mobilbillede">
        <img src="../assets/img/CinematicsDesktop.png" alt="" class="pcbillede">
        <div class="whiteLine">
          <div class="redLine"></div>
        </div>
        <h3>Cinemates</h3>
        <p>Biffen Cinemates er Biffens egen filmklub med fantastiske filmoplevelser. En mandag aften hver måned vises en udvalgt premierefilm</p>
      </article>
      <article>
        <img src="../assets/img/FranskefilmMobil.png" alt="" class="mobilbillede">
        <img src="../assets/img/FranskefilmDesktop.png" alt="" class="pcbillede">
        <div class="whiteLine">
          <div class="redLine"></div>
        </div>
        <h3>Franske Film Mandage</h3>
        <p>Oplev det bedste fra den franske filmscene!</p>
      </article>
      <article>

        <img src="../assets/img/OperaIBiffenMobil.png" alt="" class="mobilbillede">
        <img src="../assets/img/OperaIBiffenDesktop.png" alt="" class="pcbillede">

        <div class="whiteLine">
          <div class="redLine"></div>
        </div>
        <h3>Opera i Biffen</h3>
        <p>Oplev nogle af de største operaer på det store lærred når vi viser Opera i Biffen.</p>
      </article>
      <article>

        <img src="../assets/img/BiffenInternationalMobil.png" alt="" class="mobilbillede">
        <img src="../assets/img/BiffenInternationalDesktop.png" alt="" class="pcbillede">

        <div class="whiteLine">
          <div class="redLine"></div>
        </div>
        <h3>Biffen International</h3>
        <p>On selected days, you can watch premiere films with English subtitles at Biffen International</p>
      </article>
    </section>
  </section>
  </main>
  <Footer />

</template>

<style scoped>

#calendarIcon{
  color: var(--interactive-red);
}

.calendar{
  background: rgba(24, 31, 47, 0.8); 
  padding: 6px;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  top: 8px;
  left: 16px;
}

.wrapper{
  position: relative;
}
.upcoming>section article div h4{
  position: absolute;
  bottom: 36px;
  left: 16px;
}

.pcbillede{
  display: none;
}

/* Mobile styling */
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
main{
  padding: 0px 12px;
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

.events:last-of-type img{
  border-radius: 15px;
}

.events:nth-of-type(2) img{
  border-radius: 6px;
}

.wrapper img{
  position: relative;
}

.overlay{
  background: radial-gradient(
  50% 50% at 50% 50%, 
  rgba(24, 31, 47, 0) 0%, 
  rgba(24, 31, 47, 0.7) 100%);
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
}


.events section, .upcomingEvents section{
  display: grid;
  row-gap: 60px;
}




.whiteLine{
  height: 1px;
  background-color: white;
  position: relative;
  margin: 16px 0px;
}

.redLine{
  width: 0%;
}



/* Desktop styling */

@media (min-width: 1000px){
  .events section{
    grid-template-columns: repeat(3,1fr);
    column-gap: 8rem;
    row-gap: 6rem;
  
  }
  .events section article{
    display: flex;
    flex-direction: column;
  }

  .events:last-of-type section article:hover{
    cursor: pointer;
  .redLine{
  transition: 500ms ease;
  position: absolute;
  width: 50%;
  height: 1px;
  background-color: var(--interactive-red);
  }
}

  .mobilbillede{
    display: none;
  }
  .pcbillede{
    display: block;
  }

 
  main{
    padding: 0 var(--space-container);
  }

  .upcomingEvents section{
    grid-template-columns: repeat(3,1fr);
    column-gap: 6rem;
    row-gap: 6rem;
  }
  .upcomingEvents section article{
    display: flex;
    flex-direction: column;
  }
  .upcomingEvents section article:hover{
    cursor: pointer;
  }

  .upcomingEvents section article img{
    width: 100%;
    display: block;
  }

  .introEvents{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    align-items: center;
    padding: 40px 100px;
  }
  .introEvents .introWrapper{
    grid-template-columns: 1;
    grid-row: 1;
    justify-self: end;
  }
  .introEvents img{
    justify-self: end;
    grid-column: 2;
  }

}
</style>
