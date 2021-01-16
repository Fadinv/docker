<template>
  <div class="note-item">
    <div class="note-wrapper">

      <!--  STUCK NOTE VALUES    -->
      <div class="stuck-key-value">
        <span ref="initialKey">{{ note.key }}</span>: <span ref="initialValue">{{ note.value }}</span>

        <div :class="{'active-note': isEditNote}" class="stuck-input-key-value">
          <input :class="{'input-active': isEditNote}" ref="textKey" type="text">
          <span> : </span>
          <input :class="{'input-active': isEditNote}" ref="textValue" type="text">
        </div>
      </div>

      <!--  STUCK EDIT NOTE VALUES  -->
      <div class="stuck-edit-note-btns">
        <button class="edit-start-btn" v-if="!isEditNote" @click="startEditNote">редактировать</button>
        <button class="edit-complete-btn" v-if="isEditNote" @click="completeEditNote(note.idNote)">Сохранить</button>
        <button class="edit-stop-btn" v-if="isEditNote" @click="stopEditNote">Отменить</button>
      </div>

      <!--  BACK ACTION BUTTON  -->
      <button class="delete-note-btn" @click="$emit('confirmDelete', note)">X</button>

    </div>
  </div>
</template>

<script>
import {updateNoteMutation} from '@/api/graphqlMutations'

export default {
  emits: ['needRefreshNotes', 'confirmDelete'],
  props: ['note'],
  data: () => ({

    /* isEditName is true when we're editing note
    Значение в true, когда мы редактируем заметку */
    isEditNote: false,
  }),
  methods: {
    async completeEditNote() {
      const key = this.$refs.textKey.value
      const value = this.$refs.textValue.value
      if (key < 3 || value < 3) return
      if (key === this.note.key && value === this.note.value) return
      this.isEditNote = false
      const idNote = this.note.idNote

      await updateNoteMutation(idNote, key, value)
          .then(() => {
            this.$emit('needRefreshNotes')
          }).catch(e => {
            return e
          })
    },

    stopEditNote() {
      this.isEditNote = false
    },

    startEditNote() {
      const initialKey = this.$refs.initialKey.textContent
      const initialValue = this.$refs.initialValue.textContent
      this.$refs.textKey.value = initialKey
      this.$refs.textValue.value = initialValue
      this.isEditNote = true
      this.$refs.textKey.focus()
    },
  },
}
</script>

<style>
.note-item {
  position: relative;
  border: 1px solid black;
  margin-top: .5em;
  border-radius: .25em;
}

.note-wrapper {
  margin: .5em;
}

.stuck-key-value {
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
}

.stuck-input-key-value {
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  flex-direction: row;
  background: white;
}

.active-note {
  z-index: 1;
}

.stuck-input-key-value > input {
  width: 40%;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  padding: 0;
  border-radius: .15em;
  border: none;
  height: 100%;
}

.input-active {
  box-shadow: 0 0 0 1px black;
}

.stuck-input-key-value > input:focus,
.stuck-input-key-value > input:active {
  outline: none;
}

.stuck-input-key-value > * + * {
  margin-left: .25em;
}

.stuck-edit-note-btns {
  margin-top: .5em;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.stuck-edit-note-btns > button {
  cursor: pointer;
  font-size: .7rem;
  border: none;
  border-radius: .25em;
  padding: .25em .5em;
  color: white;
  font-family: 'Montserrat', sans-serif;
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

.stuck-edit-note-btns > * + * {
  margin-left: .5em;
}

.delete-note-btn {
  z-index: 1;
  font-size: 1rem;
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