<script setup>
import Header from '@/components/Header.vue';
import { useHead } from '#app'

// Seo/meta
// Her definerer vi title, metadescripton og keywords til seo
useHead({
  title: 'Gavekort & Øvrige billetter',
  meta: [
    {
      name: 'description',
      content: 'Køb gavekort og øvrige billetter hos Biffen i Nordkraft'
    },
    {
      name: 'keywords',
      content: 'gavekort, info, billetter, firma, aalborg, film, biograf, biffen'
    }
  ]
})

</script>

<template>
  <Header />
  <main class="widthContainer">
    <h1 class="overskrift-med-streg"><span>Vores udvalg</span></h1>
    <section class="udvalg">

      <article>
        <div class="udvalgCard">
          <img src="/public/img/GavepakkeLogo.png" alt="" class="logo">
          <img src="../assets/img/GavepakkeIkon.png" alt="" class="iconthing">
          <img src="../assets/img/Gavepakke1.png" alt="">
        </div>
        <div class="btn">
          <button>Køb</button>
        </div>
      </article>
       <article>
        <div class="udvalgCard">
          <img src="/public/img/GavepakkeLogo.png" alt="" class="logo">
          <img src="../assets/img/GavepakkeIkon.png" alt="" class="iconthing">
          <img src="../assets/img/Gavepakke2.png" alt="">
        </div>
        <div class="btn">
          <button>Køb</button>
        </div>
      </article>
       <article>
        <div class="udvalgCard">
          <img src="/public/img/GavepakkeLogo.png" alt="" class="logo">
          <img src="../assets/img/GavepakkeIkon.png" alt="" class="iconthing">
           <img src="../assets/img/Gavepakke3.png" alt="">
        </div>
        <div class="btn">
          <button>Køb</button>
        </div>
      </article>
       <article>
        <div class="udvalgCard">
          <img src="/public/img/GavepakkeLogo.png" alt="" class="logo">
          <img src="../assets/img/GavepakkeIkon.png" alt="" class="iconthing">
          <div class="gavepakke4img">
          <div class="textOverlay">
            <p>Overrask en du holder af</p>
            <div class="redline"></div>
            <p>- med en personlig gave leveret af Gavebuddet – hurtigt, nemt og uforglemmeligt.  </p>
          </div>
          <img src="../assets/img/Gavepakke4.png" alt="">
          <div class="overlay"></div>
          </div>
        </div>
        <div class="btn">
          <button>Køb</button>
        </div>
      </article>
    </section>
     <section class="introEvents" id="firmaSection">
    <img src="../assets/img/FirmabilleterMobil.png" alt="" class="mobilbillede">
    <img src="../assets/img/FirmabilleterDesktop.png" alt="" class="pcbillede">
    <div class="introWrapper">
<h2 class="overskrift-med-streg"><span>Firmabilletter</span></h2>
    <p>Med vores firmaordning kan du nemt og billigt glæde dine medarbejdere og forretningsforbindelser med store filmoplevelser. </p>
    <p>En firmabillet koster 76 kr. inkl. moms (min. 10 stk.) og kan indløses til alle ordinære forestillinger i Biffen Nordkraft. Der opkræves tillæg for forlænget spilletid og events. Tilkøb af lækkerier fra caféen er muligt. Kontakt os for at høre mere om mulighederne og evt. tilbud. Det ønskede antal billetter fremsendes til din firmaadresse sammen med en faktura. I forbindelse med køb af firmabilletter skal virksomhedens CVR-nr. oplyses. </p>
    <p>Firmabilletter kan bestilles hos Karin Fast på <span class="red">info@biffen.eu</span> eller tlf. <span class="red">31909977</span> hverdage kl. 9-13.</p>
    </div>
  </section>
  </main>
  <Footer />

</template>


<style scoped>
.udvalg .headingNdLine{
  grid-column: 1 / -1;
  grid-row: 1;
  justify-self: start;
}

.introEvents{
  margin-top: var(--space-section);
}
.red{
  color: var(--interactive-red);
}
.pcbillede{
    display: none;
  }

h1,h2,h3,h4,h5,h6{
  margin: 0px;
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

.udvalg{
  display: grid;
  justify-items: center;
  row-gap: 6rem;
  padding-top: 2rem;
}

.udvalgCard{
  background-color: white;
  box-shadow: 0px 0px 20px 2px #4C90FF;
  border-radius: 30px;
  padding: 56px 16px 16px 16px;
  position: relative;
  display: inline-block;

}
.udvalgCard img:last-of-type{
  border-radius: 30px;
}

.iconthing{
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.logo{
  position: absolute;
  top: 10px;
  left: 35px;
}

.btn{
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn button{
  color: white;
  border: none;
  background-color: var(--interactive-red);
  font-family: var(--font-headings);
  border-radius: 5px;
  padding: 12px 32px;
}

.gavepakke4img{
  position: relative;
}
.overlay{
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.69);
  top: 0px;
  border-radius: 30px;
}
.textOverlay{
  margin-top: 64px;
  padding: 0px 16px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
}
.redline{
  width: 40%;
  height: 2px;
  background-color: var(--interactive-red);
}
.textOverlay p:last-of-type{
  text-align: center;
  font-size: 14px;
  
}
.introEvents img{
  width: 100%;
}

@media (min-width: 768px) and (max-width:1275px){
  .udvalg{
     grid-template-columns: repeat(2,1fr);
  }
}




@media (min-width: 1275px){
   main{
    padding: 0 var(--space-container);
    box-sizing: border-box;
  }
  .introEvents img{
    width: auto;
  }
  .udvalg{
    grid-template-columns: repeat(3,1fr);
    max-width: 2000px;
    width: 100%;
    justify-items: center;
    row-gap: 8rem;
  }
  .udvalg article:last-of-type{
    grid-column: 2;
  }
  .mobilbillede{
    display: none;
  }
  .pcbillede{
    display: block;
  }

    .introEvents{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    align-items: center;
    padding: 2rem;
    gap: 2rem;
  }
  .introEvents .introWrapper{
    grid-row: 1;
    justify-self: end;
  }
  .introEvents img{
    justify-self: end;
    grid-column: 2;
  }


  
}

</style>

