const searchComp = Vue.component("search-component", {
  // DELIMITERS
  delimiters: ["{[", "]}"],

  // TEMPLATE
  template: `
  <div>
    <div>
        <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        name="username"
        v-model="search_string"
      />
    </div>
  </div>
  `,

  // DATA
  data: function () {
    return {
      search_string: "",
    };
  },
});

// DASHBOARD COMPONENT - component with all categories, products and buttons
const dashboardComp = Vue.component("dashboard-component", {
  // DELIMITERS
  delimiters: ["{[", "]}"],

  // TEMPLATE
  template: `
  <div id="card_list">
    <div>
      <div>SmallBasket</div>
        <div>
          <div>Summary</div>
          <div>Logout</div>
        </div>
      </div>
    </div>
    <div v-for="category in categories :key="category.category_id" class="col-md-3 mb-4">
      <div v-for="product in category" :key="product.product_id" class="col-md-3 mb-4">
        <div class="card h-100 product-card">
            <div class="card-body">
                <button type="button" class="close" aria-label="Close" @click="closeProductCard(product)">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="card-title">{[ product.name ]}</h5>
                <p class="card-text">Price: {[ product.price ]} {[ product.unit ]}</p>
                <button class="btn btn-primary" @click="editProduct(product)">Edit Product</button>
                <button class="btn btn-primary" @click="deleteProduct(product)">Edit Product</button>
            </div>
        </div>
      </div>
      <button class="btn btn-primary" @click="addProduct(category)">Add Product</button>
    </div>
    <div id="pop-up-category" class="pop-up">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Category name</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          name="username"
          v-model="category_name"
        />
      </div>
      <button @click=addCategory() class="btn btn-primary">Add</button>
    </div>
  </div>
  `,

  // DATA
  data: function () {
    return {
      categories: [],
      category_name: "",
    };
  },

  // MOUNTED - API call
  mounted() {
    const category_crud_url = "http://" + window.location.host + "/product";
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

  // METHODS
  methods: {
    editProduct: function (product) {},
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
