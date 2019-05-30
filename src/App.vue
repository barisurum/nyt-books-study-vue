<template>
  <div id="app">
    <h1>The New York Times Best Selling Books Case Study</h1>
    <p>Select your book category for best selling books on that category.</p>
    <CategoryWidget
      v-bind:categories="categories"
      v-bind:isCategoriesLoading="isCategoriesLoading"
      v-bind:hasCategoriesLoaded="hasCategoriesLoaded"
      v-bind:hasCategoriesErrored="hasCategoriesErrored"
      @onCategoryChanged="getItemsByCategory"
    />
    <div class="content">
      <BookList
        v-visible-half="isShowBookDetails === false"
        v-bind:isClickable="isShowBookDetails === false"
        v-bind:listItems="listItems"
        v-bind:numListItems="numListItems"
        v-bind:isInitialState="isBookListInitialState"
        v-bind:isListItemsLoading="isListItemsLoading"
        v-bind:hasListItemsLoaded="hasListItemsLoaded"
        v-bind:hasListItemsErrored="hasListItemsErrored"
        v-bind:listItemsErrorMessage="listItemsErrorMessage"
        @onBookItemClicked="showBookDetails"
      />
      <BookDetails
        v-visible="isShowBookDetails === true"
        v-bind:bookDetailsData="bookDetailsData"
        @onBookDetailsClosed="closeBookDetails"
      />
      <PaginationControls
        v-bind:numListItems="numListItems"
        v-bind:paginationRange="paginationRange"
        v-bind:isDisabled="numListItems === 0"
        @onPaginationClicked="paginate"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'https://api.nytimes.com/svc/books/v3/'
axios.defaults.params = {}
axios.defaults.params['api-key'] = 'eCOuG5auSeRmK0dkGkJQVMiSbNL52EaA'

import CategoryWidget from './components/CategoryWidget.vue'
import BookList from './components/BookList.vue'
import BookDetails from './components/BookDetails.vue'
import PaginationControls from './components/PaginationControls.vue'

export default {
  name: 'app',
  components: {
    CategoryWidget,
    BookList,
    BookDetails,
    PaginationControls
  },
  data() {
    return {
      paginationRange: 20,
      categoryOptions: null,
      categories: [],
      isCategoriesLoading: false,
      hasCategoriesLoaded: false,
      hasCategoriesErrored: false,
      listItems: [],
      numListItems: 0,
      isBookListInitialState: true,
      isListItemsLoading: false,
      hasListItemsLoaded: false,
      hasListItemsErrored: false,
      listItemsErrorMessage: '',
      isShowBookDetails: false,
      bookDetailsData: {}
    }
  },
  methods: {
    unifyListResults: function(results) {
      return results.map((item) => {
        if (item.hasOwnProperty('book_details')) {
          item = {...item, ...item.book_details[0]};
        }
        return item;
      });
    },
    paginate: function(offset) {
      this.getItemsByCategory(this.categoryOptions, offset);
    },
    getCategories: function() {
      this.isCategoriesLoading = true;
      this.hasCategoriesLoaded = false;
      this.hasCategoriesErrored = false;

      axios.get('lists/names.json')
      .then((response) => {
        const {data} = response;
        this.categories = data.results;
        this.hasCategoriesLoaded = true;
      })
      .catch(() => {
        this.hasCategoriesErrored = true;
      })
      .finally(() => {
        this.isCategoriesLoading = false;
      })
    },
    getItemsByCategory: function(categoryOptions, offset) {
      this.categoryOptions = categoryOptions;

      const hasPublishedDate = categoryOptions.publishedDate !== '';
      const hasCategoryName = categoryOptions.encodedCategoryName !== '';

      this.isShowBookDetails = false;
      this.hasListItemsLoaded = false;
      this.hasListItemsErrored = false;
      this.numListItems = 0;
      this.listItems = [];

      if (!hasCategoryName) {
        this.isBookListInitialState = true;
      } else {
        this.isListItemsLoading = true;
        this.isBookListInitialState = false;

        let url = 'lists';
        let params = {
          offset
        };
        if (hasPublishedDate) {
          url += '/' + categoryOptions.publishedDate + '/' + categoryOptions.encodedCategoryName + '.json'
        } else {
          url += '.json';
          params['list'] = categoryOptions.encodedCategoryName;
        }

        axios.get(url, {params})
        .then((response) => {
          const {data} = response;

          const results = (hasPublishedDate ? data.results.books : data.results);
          this.listItems = this.unifyListResults(results);

          this.numListItems = data.num_results;
          this.hasListItemsLoaded = true;
        })
        .catch((error) => {
          this.hasListItemsErrored = true;
          if (error.response) {
            switch(error.response.status) {
              case 404:
                this.listItemsErrorMessage = error.response.data.errors[0];
                break;
              default:
                this.listItemsErrorMessage = 'There was an error loading books...';
                break;
            }
          }
        })
        .finally(() => {
          this.isListItemsLoading = false;
        })
      }
    },
    showBookDetails: function(index) {
      this.bookDetailsData = this.listItems[index];
      this.isShowBookDetails = true;
    },
    closeBookDetails: function() {
      this.isShowBookDetails = false;
    }
  },
  mounted() {
    this.getCategories()
  }
}
</script>

<style>
#app {
  width: 1080px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px 0;
  position: relative;
}
body {
  margin: 0;
  display: flex;
  justify-content: center;
  height: 100%;
}
h1, p {
  text-align: center;
}
p {
  line-height: 1.6rem;
}
h1, h2, h3, h4, h5, h6 {
  margin: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
</style>
