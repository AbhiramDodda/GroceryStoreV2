// DASHBOARD COMPONENT - component with all categories, products and buttons
const dashboardComp = Vue.component("dashboard-component", {
  // DELIMITERS
  delimiters: ["{[", "]}"],

  // TEMPLATE
  template: `
  <div id="card_list">
    <div>
      <input type="text" class"form-control" v-model="search_string" />
      <button @click=search() class="btn btn-primary">Search</button>
    </div>
    <div v-for="(products, category) in this.categories" class="col-md-3 mb-4">
      <h5>{[ category.substr(12) ]}</h5>
      <div v-for="product in products" class="col-md-3 mb-4">
          <h5 class="card-title">{[ product.name ]}</h5>
          <p class="card-text">Price: {[ product.price ]} {[ product.unit ]}</p>
          <button class="btn btn-primary" @click="editProduct(product)">Edit Product</button>
          <button class="btn btn-primary" @click="deleteProduct(product)">Edit Product</button>
      </div>
      <button class="btn btn-primary" @click="editCategory(category.substr(0, 10))">Edit Category</button>
      <button class="btn btn-primary" @click="deleteCategory(category.substr(0, 10))">Edit Category</button>
      <button class="btn btn-primary" @click="addProduct(category.substr(0, 10))">Add Product</button>
    </div>
    <button @click=addCategory() class="btn btn-primary">Add Category</button>
    <div id="pop-up-category" class="pop-up" v-if="display_add_cat_form">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Category name</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="category_name"
        />
      </div>
      <button @click=addNewCategory() class="btn btn-primary">Add</button>
    </div>
  </div>
  `,

  // DATA
  data: function () {
    return {
      categories: {},
      category_name: "",
      display_add_cat_form: false,
    };
  },

  // MOUNTED - API call
  mounted() {
    const category_crud_url = "http://" + window.location.host + "/category";
    fetch(category_crud_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.categories = data["data"];
      });
    console.log(this.categories);
  },

  // METHODS
  methods: {
    editProduct: function (product) {},
    addCategory: function () {
      this.display_add_cat_form = true;
    },
    editCategoryDisplay: function (cat) {},
    editCategory: function (cat_id) {
      const category_crud_url = "http://" + window.location.host + "/category";
      fetch(category_crud_url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_id: cat_id,
          category_name: this.category_name,
        }),
      });
    },
    reloadComponenet: function () {
      fetch(category_crud_url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.categories = data["data"];
        });
    },
    addNewCategory: function () {
      const category_crud_url = "http://" + window.location.host + "/category";
      this.display_add_cat_form = false;
      fetch(category_crud_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_name: this.category_name,
        }),
      }).then((response) => {
        if (response.ok) {
          this.forceUpdate();
        }
      });
      this.reloadComponenet();
    },
  },
});

// Routers
const routes = [
  {
    path: "/",
    component: dashboardComp,
  },
];

// Router
const router = new VueRouter({
  routes: routes,
});

// App
const app = new Vue({
  delimiters: ["{[", "]}"],
  el: "#app",
  router: router,
  data: {
    message: "Vue loaded",
  },
});
