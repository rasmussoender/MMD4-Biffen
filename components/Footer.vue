  <script setup>
  </script>

<template>
<footer>
  <div class="footerContentWrapper">
    <div class="footerLeft">
          <a class="logoWrapper" href="/">
      <img src="/public/img/biffenLogo.png" alt="Biffen Nordkraft Logo" class="footerLogo" />
    </a>

      <div class="footerContact">
        <div class="footerItem">
          <i class="fa-solid fa-location-dot"></i>
          <div>
            <p class="footerLabel">Adresse</p>
            <p id="biffenNavn">Biffen Nordkraft</p>
            <a href="https://maps.google.com/?q=Teglgårds Plads 1, 9000 Aalborg" target="_blank">Teglgårds Plads 1, 9000 Aalborg</a>
          </div>
        </div>

        <div class="footerItem">
          <i class="fa-solid fa-phone"></i>
          <div>
            <p class="footerLabel">Telefon</p>
            <a href="tel:+4598169977">+45 98 16 99 77</a>
          </div>
        </div>

        <div class="footerItem">
          <i class="fa-solid fa-envelope"></i>
          <div>
            <p class="footerLabel">E-mail</p>
            <a href="mailto:info@biffen.eu">info@biffen.eu</a>
          </div>
        </div>
      </div>
    </div>

    <div class="footerLinks">
      <div class="footerColumn underlineAnimationLinks">
        <h4>Biografen</h4>
        <a href="/film">Alle film</a>
        <a href="/cinemateket">Cinemateket</a>
        <a href="/alle-filmklubber">Filmklubber</a>
        <a href="/events">Events</a>
      </div>

      <div class="footerColumn underlineAnimationLinks">
        <h4>Praktisk</h4>
        <a href="/praktisk-information">Praktisk information</a>
        <a href="/book-en-sal">Skoler/virksomheder</a>
      </div>

      <div class="footerColumn underlineAnimationLinks">
        <h4>Gavekort</h4>
        <a href="/gavekort-og-ovrige-billetter">Gavekort / Øvrige billetter</a>
        <a href="/gavekort-og-ovrige-billetter">Børnefødselsdag</a>
        <a href="/gavekort-og-ovrige-billetter">Firmabilletter</a>
      </div>
    </div>
  </div>

  <hr class="footerDivider" />

  <div class="footerBottom">
    <p>© 2025 Biffen Nordkraft. Alle rettigheder forbeholdes.</p>
    <div class="footerSocials">
      <a href="https://www.facebook.com/BiffenNordkraft"><i class="fa-brands fa-facebook-f"></i></a>
      <a href="https://www.linkedin.com/company/biffen-nordkraft/?originalSubdomain=dk"><i class="fa-brands fa-linkedin-in"></i></a>
      <a href="https://www.instagram.com/biffennordkraft/"><i class="fa-brands fa-instagram"></i></a>
    </div>
  </div>
</footer>

</template>


<style scoped>
a {
    font-size: 15px;

}


.footerLabel, h4 {
    font-size: 20px;
}


footer {
  border-radius: 50px 50px 0 0;
  background-color: var(--secondary-blue);
  color: white;
  padding: var(--space-container);
  margin-top: var(--space-section);
  padding-bottom: 2rem;
}

.footerContentWrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
}

.footerLeft {
  flex: 1 1 300px;
}

.footerLogo {
  max-width: 160px;
  margin-bottom: 1rem;
}

.footerContact {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.footerItem {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

#biffenNavn {
    font-size: 15px;
    font-weight: bold;
}

.footerItem i {
  color: var(--interactive-red);
  font-size: 1.2rem;
  margin-top: 4px;
}

.footerLabel {
  font-weight: 700;
  margin: 0;
}

.footerItem a {
  color: white;
  text-decoration: underline;
}

.footerLinks {
  display: flex;
  flex: 2;
  justify-content: space-around;
  gap: 4rem;
}

.footerColumn {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footerColumn h4 {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.footerColumn a {
  color: white;
  text-decoration: none;
}



.footerDivider {
  border: none;
  border-top: 2px solid var(--color-body);
  margin: 2rem 0 1rem;
}

.footerBottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  font-size: 0.85rem;
}

.footerSocials {
  display: flex;
  align-items: center; 
}
.footerSocials a {
  background-color: var(--interactive-red);
  color: white;
  width: 2.5rem; 
  height: 2.5rem;        
  border-radius: 6px;
  margin-left: 0.5rem;
  display: flex;       
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
}


.footerSocials a:hover {
  background-color: #e11d48;
}

@media (max-width: 800px) {
  .footerContentWrapper {
    flex-direction: column;
    gap: 2rem;
  }

  .footerLinks {
    flex-direction: column;
    gap: 2rem;
  }

  .footerBottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .footerBottom p {
    align-self: center;
  }

  .footerSocials {
    width: 100%;
    justify-content: center;
    gap: 0.5rem;
    flex-direction: row; 
  }

  .footerSocials a {
    margin-left: 0;
  }
}


</style>
