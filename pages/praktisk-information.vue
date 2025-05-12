<script setup>

</script>

<template>
  <Header />
  <main>
    <section>
      <div class="kontakt">
        <div>
          <div class="navn">
            <div><label for="fnavn">Fornavn<span>*</span></label></div>
            <div><input type="text" name="fornavn" id="fnavn"></div>
          </div>
          <div class="efternavn">
           <div> <label for="enavn">Efternavn<span>*</span></label></div>
            <div><input type="text" name="efternavn" id="enavn"></div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer />

</template>

<style scoped>
.kontakt{
  background-color: var(--secondary-blue);
  padding: 25px 25px;
}
.kontakt div:first-of-type{
  display: flex;
  justify-content: space-between;
}
main{
  padding: 0px 12px;
}

</style>
