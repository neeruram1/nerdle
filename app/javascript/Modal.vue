<script>
export default {
  props: {
    show: Boolean,
    gameStatus: '',
    word: ''
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">NERDLE</slot>
          </div>

          <div class="modal-body">
            <slot name="body">You {{ gameStatus }}! The word of the day is {{ word }}</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              
              <button
                class="modal-default-button"
                @click="$emit('close')"
              >OK</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
