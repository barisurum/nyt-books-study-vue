<template>
  <div class="cnt-books-list">
    <ul v-if="hasListItemsLoaded && numListItems > 0">
      <li v-bind:key="index" v-on:click="emitBookItemClicked(index, $event)" class="li-book-item" v-for="(item, index) in listItems">
        <div class="wrp-book-info">
          <h4 class="heading-book-title">
            {{ item.title }}
          </h4>
          <h5 class="heading-book-author"> {{ item.contributor }}</h5>
        </div>
        <strong class="text-book-price">{{ item.price }}$</strong>
      </li>
    </ul>
    <strong v-if="isInitialState">No category selected. Select a category to display book list.</strong>
    <strong v-if="hasListItemsLoaded && numListItems === 0">No books found in the category selected. Try another category for results.</strong>
    <strong v-if="hasListItemsErrored">{{ listItemsErrorMessage }}</strong>
    <strong v-if="isListItemsLoading">Loading Books...</strong>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  props: {
    isClickable: {
      type: Boolean,
      default: true
    },
    listItems: {
      type: Array,
      default: function() {
        return [];
      }
    },
    numListItems: {
      type: Number,
      default: 0
    },
    isInitialState: {
      type: Boolean,
      default: true
    },
    isListItemsLoading: {
      type: Boolean,
      default: false
    },
    hasListItemsLoaded: {
      type: Boolean,
      default: false
    },
    hasListItemsErrored: {
      type: Boolean,
      default: false
    },
    listItemsErrorMessage: {
      type: String,
      default: ''
    }
  },
  methods: {
    emitBookItemClicked: function(index) {
      if (this.isClickable) {
        this.$emit('onBookItemClicked', index);
      }
    }
  },
}
</script>

<style scoped>
  .cnt-books-list {
    margin: 1rem 0;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 1s;
    position: relative;
  }
  .cnt-books-list ul {
    width: 60%;
  }
  .li-book-item {
    cursor: pointer;
    padding: 1rem;
    margin: 0 0 0.4rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid rgba(0, 50, 255, 0.2);
  }
  .li-book-item:hover {
    background-color: rgba(0, 50, 255, 0.1);
  }
  .wrp-book-info {
    width: 80%;
  }
</style>