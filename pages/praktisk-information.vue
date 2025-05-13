<script setup>

</script>

<template>
  <Header />
  <main>
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

      </div>
      </div>
    </section>
  </main>
  <Footer />

</template>
<style scoped>
.centerbtn{
  display: flex;
  justify-content: center;
}
.centerbtn button
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

.contact,.info{
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
</style>
