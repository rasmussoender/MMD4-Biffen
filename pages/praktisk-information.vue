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
            <label for="fname">Fornavn</label>
          </div>
          <div>
            <input type="text" name="fname" id="fname">
          </div>
        </div>

        <div class="lastname">
          <div>
            <label for="fname">Efternavn</label>
          </div>
          <div>
            <input type="text" name="fname" id="fname">
          </div>
        </div>
        </div>
        <div class="email">
          <div>
          <label for="email">E-mail</label>
          </div>
          <div>
            <input type="email" name="email" id="email">
          </div>
        </div>
          <div class="phone">
          <div>
          <label for="phone">Telefon</label>
          </div>
          <div>
            <input type="tel" name="phone" id="phone">
          </div>
        </div>
        <div class="message">
          <div>
            <label for="message">Besked</label>
          </div>
          <div>
            <textarea id="message" rows="9"></textarea>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer />

</template>
<style scoped>
textarea{
  width: 100%;
  resize: none;
}
.wrapper{
  display: flex;

  gap: 1rem;
}

input{
  width: 100%;
  box-sizing: border-box;
}

.firstname, .lastname{
  display: flex;
  flex-direction: column;
}

.contact{
  background-color: var(--secondary-blue);
  padding: 25px 25px;

}

main{
  padding: 0px 12px;
}
</style>
