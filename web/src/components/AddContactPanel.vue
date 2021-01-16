<template>
  <div class="add-contact-panel">

    <!--  CONTACT NAME AND HIS INPUT  -->
    <span>Создать новый контакт</span>
    <input @input="blockScope" id="contactName" type="text">

    <span class="description">
      <div class="info-icon">i</div>
      мин.3 / макс. 25 символов</span>

    <button @click="click">Создать контакт</button>
  </div>
</template>

<script>
import {createContactMutation} from '@/api/graphqlMutations'

export default {
  methods: {
    blockScope(e) {
      if (e.target.value.length > 25) {
        e.target.value = e.target.value.slice(0, 25)
      }
    },
    async click() {
      const name = document.getElementById('contactName')
      if (name.value.length < 3) return

      await createContactMutation(name.value)
          .then(() => {
            this.$emit('needReload')
          }).catch(e => {
            return e
          })

      name.value = ''
    },
  },
}
</script>

<style scoped>
.add-contact-panel {
  display: flex;
  flex-direction: column;
}

.add-contact-panel > * + * {
  margin-top: .5em;
}

.description {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-weight: 400;
  font-size: .7rem;
}

input {
  padding: .5em;
  font-size: 1rem;
  border: 1px solid black;
  font-family: 'Montserrat', sans-serif;
  border-radius: .5em;
  background: white;
}

input:focus {
  outline: none;
}

button {
  font-size: 1rem;
  padding: .5em 1em;
  background: #264653;
  color: white;
  border-radius: .5em;
  cursor: pointer;
  border: none;
  transition: all .3s ease-out;
}

button:focus {
  outline: none;
}

button:hover {
  box-shadow: 0 0 0 .1em #2a9d8f;
  background: #23404B;
}

.info-icon {
  width: 1em;
  height: 1em;
  color: white;
  background: #23404B;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: .25em;
}
</style>