<template>
  <div class="contacts-box">

    <div class="contacts-list">
      <div class="action-menu">

        <!--   ADD CONTACT PANEL     -->
        <AddContactPanel @needReload="reload"/>

        <!--   BACK ACTION BUTTON     -->
        <button class="back-action-btn" @click="backAction">&#10226;</button>

      </div>

      <!--   OUR CONTACTS   -->
      <ContactItem
          @confirmDelete="confirmDelete"
          v-for="contact of contacts"
          v-bind:key="contact.id"
          v-bind:contact="contact"
          v-bind:prevDeletedContact="prevDeletedContact"
      />
    </div>

    <!--  CONFIRM MENU  -->
    <div v-if="isConfirmDeleteContact"
         class="confirm">

      <!--   CONTAINER CONFIRM MENU   -->
      <div class="confirm-container">
        Подтвердите удаление
        <button class="confirm-complete-btn" @click="deleteClick(confirmDeleteContact)">Удалить</button>
        <button class="confirm-cancel-btn" @click="cancel">Отмена</button>
      </div>

      <!--  BACK DROP   -->
      <div @click="cancel" class="back-drop">

      </div>
    </div>

  </div>
</template>

<script>
import ContactItem from '@/components/ContactItem'
import AddContactPanel from '@/components/AddContactPanel'
import {getContactsQuery} from '@/api/graphqlQueries'
import {createContactMutation, createNoteMutation, deleteContactMutation} from '@/api/graphqlMutations'

export default {
  name: 'Home',
  components: {
    ContactItem, AddContactPanel,
  },
  data: () => ({

    /* there is keeps ours contacts there
    Сюда записываем наши контакты */
    contacts: [],

    /* it keeps previous deleted contact
    Сюда записываем предыдущий удаленный контакт */
    prevDeletedContact: null,

    /* visible confirm menu
    видимость меню подтверждения */
    isConfirmDeleteContact: false,

    /* it keeps contact we want to delete
    Сюда записываем контакт, который мы хотим удалить */
    confirmDeleteContact: null,
  }),
  async mounted() {
    /* fetch when page has opened */
    await getContactsQuery()
        .then(response => response.json())
        .then(result => {
          this.contacts = result.data.getContacts
        })
  },
  methods: {

    confirmDelete(contact) {
      this.isConfirmDeleteContact = true
      this.confirmDeleteContact = contact
    },

    cancel() {
      this.isConfirmDeleteContact = false
    },

    async deleteClick(contact) {
      console.log(this.isConfirmDeleteContact)
      this.prevDeletedContact = contact
      await deleteContactMutation(contact.id)
          .then(() => {
            this.reload()
            this.confirmDeleteContact = null
            this.isConfirmDeleteContact = false
          })
    },

    async backAction() {
      if (this.prevDeletedContact === null) return
      const prevValue = this.prevDeletedContact
      this.prevDeletedContact = null
      await createContactMutation(prevValue.contactName)
          .then(response => response.json())
          .then(async result => {
            this.$emit('needReload')
            for (const note of prevValue.notes) {
              await createNoteMutation(
                  result.data.createContact.id,
                  note.key,
                  note.value,
              )
            }
          })
          .then(async () => {
            await getContactsQuery()
                .then(response => response.json())
                .then(result => {
                  this.contacts = result.data.getContacts
                })
          })
    },

    async reload() {
      await getContactsQuery()
          .then(response => response.json())
          .then(result => {
            this.contacts = result.data.getContacts
          })
    },
  },
}
</script>

<style scoped>

.contacts-box {
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: rgba(20, 20, 23, .94);
}

.contacts-list {
  position: relative;
  width: 100%;
  padding-top: 3em;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.action-menu {
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.back-action-btn {
  font-size: 1.5rem;
  left: 60%;
  top: 1.5em;
  color: white;
  background: #264653;
  border-radius: 50%;
  width: 2em;
  height: 2em;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all .3s ease-out;
}

.back-action-btn:hover {
  background: #2a9d8f;
}

.confirm {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}

.back-drop {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(0, 0, 0, .5);
}

.confirm-container {
  z-index: 2;
  color: black;
  border-radius: .5em;
  background: white;
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
}

.confirm-container > * {
  margin-top: .5em;
}

.confirm-container > button {
  cursor: pointer;
  font-size: .7rem;
  border: none;
  border-radius: .25em;
  padding: .25em .5em;
  color: white;
  font-family: 'Montserrat', sans-serif;
}

.confirm-complete-btn {
  background: #264653;
}

.confirm-cancel-btn {
  background: #9d0208;
}
</style>
