<template>
  <div v-if="loaded" class="about">

    <!--  BACK ROUTER BUTTON  -->
    <router-link to="/">&#8629; Вернуться</router-link>

    <!--  NAME AND INPUT FOR NAME  -->
    <div class="edit-box" :class="{act: isEditName}">
      <span class="text-name" ref="textName">
        {{ this.contact.contactName }}
      </span>

      <input ref="textAreaName"
             type="text"
             @input="blockScope"
             class="inputTextName"
             :class="{active: isEditName}">
    </div>

    <!--  STUCK BUTTONS FOR CHANGE NAME  -->
    <div class="stuck-editor-buttons">
      <button class="edit-start-btn" v-if="!isEditName" @click="startEditName">Редактировать</button>
      <button class="edit-complete-btn" v-if="isEditName" @click="completeEditName">Сохранить</button>
      <button class="edit-stop-btn" v-if="isEditName" @click="stopEditName">Отменить</button>
    </div>

    <!--  PANEL FOR ADD NOTES  -->
    <div class="new-notes-box">
      <span>Добавить информацию</span>
      <span>Поле 1</span>
      <input ref="key" type="text">
      <span>Поле 2</span>
      <input ref="value" type="text">

      <button @click="addNote">Добавить</button>
    </div>

    <!--  STUCK OUR NOTES  -->
    <div class="notes-stuck">

      <!--   BACK ACTION BUTTON   -->
      <button class="back-action-about-btn" @click="backAction">&#10226;</button>

      <!--   OUR NOTES   -->
      <NoteItem
          @confirmDelete="confirmDelete"
          @needRefreshNotes="refreshNotes"
          v-for="note of this.contact.notes"
          v-bind:note="note"
          v-bind:key="note.idNote"
      />
    </div>

    <!--  CONFIRM MENU -->
    <div v-if="isConfirm" class="confirm">

      <!--   CONTAINER CONFIRM MENU   -->
      <div class="confirm-container">
        Подтвердите удаление
        <button class="confirm-complete-btn" @click="deleteNote(howNoteDelete)">Удалить</button>
        <button class="confirm-cancel-btn" @click="cancel">Отмена</button>
      </div>

      <!--  BACK DROP   -->
      <div @click="cancel" class="back-drop">

      </div>
    </div>
  </div>
</template>

<script>
import NoteItem from '@/components/NoteItem'
import {getContactQuery} from '@/api/graphqlQueries'
import {createNoteMutation, deleteNoteMutation, updateContactMutation} from '@/api/graphqlMutations'

export default {
  name: 'Home',
  components: {
    NoteItem,
  },
  data: () => ({
    /* contact is rendered */
    contact: {
      type: Object,
    },

    /* visible confirm menu
    видимость меню подтверждения */
    isConfirm: false,

    /* function mounted set that value, when we have got notes
    component is visible when loaded is true
    mounted устанавливает это значение в true, когда мы получили данные с сервера
    Компонент рендериться, только с загруженными данными с сервера */
    loaded: false,

    /* value when we're editing name
    значение, которое мы используем в качестве начального, когда мы редактируем имя */
    initialName: '',

    /* isEditName is true when we're editing name
    Значение в true, когда мы редактируем имя */
    isEditName: false,

    /* it keeps previous deleted contact
    Значение хранит предыдущую удаленную заметку */
    prevDeletedNote: null,

    /* it keeps contact we want to delete
    Значение хранит заметку, которую мы будем удалять */
    howNoteDelete: null,
  }),
  methods: {
    cancel() {
      this.isConfirm = false
    },

    confirmDelete(note) {
      this.howNoteDelete = note
      this.isConfirm = true
    },

    blockScope(e) {
      if (e.target.value.length > 25) {
        e.target.value = e.target.value.slice(0, 25)
      }
    },

    async backAction() {
      if (this.prevDeletedNote === null) return

      await createNoteMutation(
          +this.$route.params.id,
          this.prevDeletedNote.key,
          this.prevDeletedNote.value,
      )
          .then(response => response.json())
          .then(data => {
            this.prevDeletedNote = null
            this.contact.notes.push(data.data.createNote)
          })
    },

    async refreshNotes() {
      await getContactQuery(+this.$route.params.id)
          .then(response => response.json())
          .then(result => {
            this.contact = result.data.getContact
            this.loaded = true
          }).catch(e => {
            return e
          })
    },

    async completeEditName() {
      const editor = this.$refs.textAreaName
      this.initialName = editor.value
      const name = this.$refs.textName
      name.textContent = this.initialName

      await updateContactMutation(+this.$route.params.id, this.initialName)
          .then(() => {
            this.isEditName = false
          })
    },
    stopEditName() {
      this.isEditName = false
    },

    startEditName() {
      this.isEditName = true
      const name = this.$refs.textName
      this.initialName = name.textContent
      setTimeout(() => {
        const editor = this.$refs.textAreaName
        editor.value = this.initialName
        editor.focus()
      }, 0)
    },

    async addNote() {
      const key = this.$refs.key
      if (key.value.length < 3) return
      const value = this.$refs.value
      if (value.value.length < 3) return

      await createNoteMutation(+this.$route.params.id, key.value, value.value)
          .then(response => response.json())
          .then(data => {
            this.contact.notes.push(data.data.createNote)
            key.value = ''
            value.value = ''
          })
    },

    async deleteNote(note) {
      this.prevDeletedNote = note
      await deleteNoteMutation(note.idNote)
          .then(async () => {
            await getContactQuery(+this.$route.params.id)
                .then(response => response.json())
                .then(result => {
                  this.contact = result.data.getContact
                  this.loaded = true
                })
          }).then(() => {
            this.isConfirm = false
          })
    },
  },

  async mounted() {
    await getContactQuery(+this.$route.params.id)
        .then(response => response.json())
        .then(result => {
          this.contact = result.data.getContact
          this.loaded = true
        }).catch(e => {
          return e
        })
  },
}
</script>

<style>
.about {
  width: 70%;
  padding-top: 3em;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
}

.edit-box {
  position: relative;
  background: white;
  padding: .5em;
  margin-top: .5em;
  width: 100%;
}

.act {
  box-shadow: 0 0 0 2px #23404B;
}

.text-name {
  font-size: 1rem;
  font-weight: 400;
}

.inputTextName {
  position: absolute;
  font-size: 1rem;
  left: 0;
  top: 0;
  border: none;
  width: 100%;
  height: 100%;
  padding: .5em;
  z-index: -1;
  font-family: 'Montserrat', sans-serif;
}

.inputTextName:focus {
  outline: none;
}

.active {
  z-index: 1;
}

.stuck-editor-buttons {
  margin-top: .5em;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.stuck-editor-buttons > * + * {
  margin-left: .5em;
}

.stuck-editor-buttons > button {
  cursor: pointer;
  font-size: .7rem;
  border: none;
  border-radius: .25em;
  padding: .25em .5em;
  color: white;
  font-family: 'Montserrat', sans-serif;
}

.stuck-editor-buttons > button:focus {
  outline: none;
}

.edit-start-btn {
  background: #264653;
}

.edit-complete-btn {
  background: #264653;
}

.edit-stop-btn {
  background: #9d0208;
}

.new-notes-box {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.new-notes-box > * + * {
  margin-top: .5em;
}

.new-notes-box > input {
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  border-radius: .5em;
  padding: .5em;
  border: none;
  box-shadow: 0 0 0 1px black;
  transition: all .3s ease-out;
}

.new-notes-box > input:focus,
.new-notes-box > input:active {
  outline: none;
  box-shadow: 0 0 0 2px black;
}

.new-notes-box > button {
  cursor: pointer;
  font-size: .7rem;
  border: none;
  border-radius: .25em;
  padding: .25em .5em;
  color: white;
  font-family: 'Montserrat', sans-serif;
  background: #264653;
}

.new-notes-box > button:focus {
  outline: none;
}

.notes-stuck {
  position: relative;
  width: 100%;
  margin-top: 1em;
}

.back-action-about-btn {
  position: relative;
  font-size: 1rem;
  left: calc(100% - 2em);
  top: 0;
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

.back-action-about-btn:hover {
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