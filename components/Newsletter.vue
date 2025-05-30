<script setup>
const emailInput = ref(null)
const thankYouMsg = ref(null)

const handleSendClick = () => {
  const email = emailInput.value?.value.trim()

  if (email) {
    thankYouMsg.value.style.display = "block"
    emailInput.value.value = ""
  }
}
</script>



<template>
      <div class="nyhedsbrev-wrapper">
        <div class="icon-wrapper">
          <span class="material-symbols-outlined">mail</span>
        </div>
        
        <div class="nyhedsbrev-card">
          <h2 class="nyhedsbrev-overskrift">Nyhedsbrev</h2>
          <p class="nyhedsbrev-underoverskrift">Sidste nyt om film og events</p>
          
          <div class="nyhedsbrev-form">
            <input
            ref="emailInput"
            type="email"
            placeholder="Indtast mail her..."
            id="email-input"
            />
            <button @click="handleSendClick">Send</button>
          </div>
          
          <p ref="thankYouMsg" id="thank-you" class="nyhedsbrev-tak">
            Tak for din tilmelding - det betyder noget for os!
          </p>
        </div>
      </div>

</template>


<style scoped>

.nyhedsbrev-wrapper {

  position: relative;
  max-width: 700px;
  margin: 120px auto 0;
  margin-top: var(--space-section);
}

.nyhedsbrev-card {
  background-color: #1d2a4a;
  border-radius: 40px;
  padding: 80px 40px 60px;
  text-align: center;
  color: white;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
}

.nyhedsbrev-overskrift {
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 10px;
}

.nyhedsbrev-underoverskrift {
  font-size: 1.25rem;
  color: #cbd2e0;
  margin-bottom: 4rem
}

.nyhedsbrev-form {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.nyhedsbrev-form input {
  padding: 20px;
  border-radius: 16px;
  border: none;
  width: 400px;
  font-size: 1rem;
}

.nyhedsbrev-form button {
  padding: 20px 30px;
  border: none;
  border-radius: 16px;
  background-color: #ff3b5c;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.nyhedsbrev-form button:hover {
  background-color: #e03250;
}

.nyhedsbrev-tak {
  font-size: 1.1rem;
  color: #ffffff;
  display: none;
}

.icon-wrapper {
  position: absolute;
  top: -54px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1d2a4a;
  border: 3px solid #4a90e2;
  border-radius: 50%;
  width: 108px;
  height: 108px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 2;
}

.icon-wrapper .material-symbols-outlined {
  font-size: 48px;
  line-height: 1;
}


/* Mobile: max-width 768px */
@media (max-width: 768px) {

  .nyhedsbrev-wrapper {
    margin: 8rem 0;
  }
  .nyhedsbrev-form input {
    width: 100%;
    max-width: 100%;
  }



}



</style>