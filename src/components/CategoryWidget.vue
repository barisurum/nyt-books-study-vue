<template>
  <div class="cnt-category-widget">
    <div v-if="hasCategoriesLoaded && categories.length > 0" class="wrp-category-controls">
      <select v-on:change="emitCategoryChanged" id="select-book-category">
        <option value="">Select Category</option>
        <option v-bind:key="cat.list_name_encoded" v-for="cat in categories" v-bind:value="cat.list_name_encoded">{{ cat.list_name }}</option>
      </select>
      <label for="input-publish-date">Published Date: </label>
      <input v-on:input="emitCategoryChanged" id="input-publish-date" type="date">
    </div>
    <strong v-if="hasCategoriesLoaded && categories.length === 0">No categories found. Perhaps try again later.</strong>
    <strong v-if="hasCategoriesErrored">There was an error loading categories.</strong>
    <strong v-if="isCategoriesLoading">Loading Categories...</strong>
  </div>
</template>

<script>
export default {
  name: 'CategoryWidget',
  props: {
    categories: Array,
    isCategoriesLoading: Boolean,
    hasCategoriesLoaded: Boolean,
    hasCategoriesErrored: Boolean
  },
  methods: {
    emitCategoryChanged: function() {
      const categoryOptions = {
        encodedCategoryName: document.getElementById('select-book-category').value,
        publishedDate: document.getElementById('input-publish-date').value
      }
      this.$emit('onCategoryChanged', categoryOptions, 0);
    }
  }
}
</script>

<style scoped>
  .cnt-category-widget {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 50, 255, 0.2);
  }
  #select-book-category {
    margin: 0 2rem 0 0;
  }
</style>