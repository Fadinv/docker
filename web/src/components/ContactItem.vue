<template>
  <div class="contact-box">
    <span class="name">{{ contact.contactName }}</span>
    <div
        @click="openContact(contact.id)"
        class="info"
    >Контактная информация
    </div>

    <div v-on:click="confirmDelete"
         class="delete-btn">
      X
    </div>
  </div>
</template>

<script>

export default {
  props: ['contact'],
  emits: ['confirmDelete'],
  methods: {
    openContact(id) {
      this.$router.push('/about/' + id)
    },

    confirmDelete() {
      this.$emit('confirmDelete', (this.contact))
    },
  },
}
</script>

<style scoped>
.contact-box {
  position: relative;
  margin-top: 1em;
  padding: .5em 1em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 70%;
  border-radius: .5em;
  box-shadow: 0 0 0.05em 0.05em black;
}

.info {
  text-transform: lowercase;
  text-decoration: underline;
  cursor: pointer;
}

.delete-btn {
  position: absolute;
  left: calc(100% - 1.75em);
  border-radius: .5em;
  top: .25em;
  width: 1.5em;
  height: 1.5em;
  background: #E76F51;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all .3s ease;
}
</style>