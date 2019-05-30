<template>
  <div class="cnt-book-details">
    <span v-on:click="emitBookDetailsClosed" class="span-close">X</span>
    <div class="cnt-book-details-header">
      <h1>{{ bookDetailsData.title }}</h1>
      <p><b>{{ bookDetailsData.contributor }}, Published Date: {{ bookDetailsData.published_date }}, Publisher: {{ bookDetailsData.publisher }}</b></p>
      <p>{{ bookDetailsData.description }}</p>
    </div>
    <h1>{{ bookDetailsData.price }}$</h1>
    <a class="link_amazon" v-bind:href="bookDetailsData.amazon_product_url" target="_blank">Find on Amazon</a>
  </div>
</template>

<script>
export default {
  name: 'BookDetails',
  props: {
    bookDetailsData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    emitBookDetailsClosed: function() {
      this.$emit('onBookDetailsClosed');
    }
  },
}
</script>

<style scoped>
  .cnt-book-details {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 960px;
    margin: auto;
    padding: 2rem 1rem;
    border: 1px solid rgba(0, 50, 255, 0.2);
    height: 400px;
    transition: opacity 0.5s;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
  }
  .cnt-book-details-header h1 {
    margin: 0 0 2rem 0;
  }
  .link_amazon {
    margin: 4rem 0;
    outline: none;
    background-color: #febd69;
    text-decoration: none;
    color: #111;
    border-radius: 10px;
    padding: 1rem 3rem;
  }
  .span-close {
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0;
    font-size: 2rem;
    line-height: 2rem;
    color: crimson;
  }
</style>