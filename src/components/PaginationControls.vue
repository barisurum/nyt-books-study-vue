<template>
  <div class="cnt-pagination-controls">
    <div class="wrp-pagination-controls">
      <button v-for="number in countPaginationButtons"
        v-on:click="emitPaginationClicked"
        v-bind:disabled="isDisabled ? true : null"
        v-bind:aria-disabled="isDisabled ? true : null"
        v-bind:data-pagination-offset="number - 1"
        v-bind:data-pagination-number="number"
        v-bind:is-pagination-active="activePaginationNumber === number ? true : null"
        class="button-pagination"
        v-bind:key="number"
      >{{ number }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationControls',
  props: {
    numListItems: {
      type: Number,
      default: 0
    },
    paginationRange: {
      type: Number,
      default: 20
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      countPaginationButtons: 1,
      activePaginationNumber: 1
    }
  },
  methods: {
    emitPaginationClicked: function(event) {
      const elem = event.target;
      if (elem.hasAttribute('is-pagination-active') === false) {
        const offset = elem.getAttribute('data-pagination-offset');
        this.activePaginationNumber = elem.getAttribute('data-pagination-number');
        this.$emit('onPaginationClicked', offset * this.paginationRange);
      }
    }
  },
  watch: {
    numListItems: function() {
      if (this.activePaginationNumber === 1) {
        const offset = Math.floor(this.numListItems / this.paginationRange);
        this.countPaginationButtons = (offset === 0 ? 1 : offset);
      }
    }
  }
}
</script>

<style scoped>
  .cnt-pagination-controls {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 50, 255, 0.2);
  }
  .wrp-pagination-controls {
    display: flex;
    justify-content: space-between;
  }
  .button-pagination {
    outline: none;
    cursor: pointer;
    margin: 0 0.2rem;
    padding: 0.2rem 0.5rem;
    background-color: #efefef;
    border: 1px solid rgba(0, 50, 255, 0.5);
  }
  .button-pagination[is-pagination-active] {
    background-color: #fff;
    border: 1px solid rgb(0, 50, 255);
    cursor: default;
  }
  .button-pagination[disabled] {
    opacity: .5;
    cursor: default;
  }
</style>