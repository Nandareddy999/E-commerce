// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize Express app
const app = express();

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://mirroraccone:NduzVvb4dILJeZxl@test-cluster.wvpnfkn.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  // Send a simple message as the default page
  res.send("Welcome to the default page!");
});

// Define User model
const User = mongoose.model("User", {
  fname: String,
  lname: String,
  username: String,
  email: String,
  phone: String,
  password: String,
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
});

// Define Product model
const Product = mongoose.model("Product", {
  name: String,
  price: Number,
  categoryId: String,
  stock: Number,
  productDesc: String,
  imageSrc: String,
  quantity: Number, // Add this field for quantity
  images: [String] // Add this field for array of image URLs
});


// Route for user registration
app.post("/register", async (req, res) => {
  try {
    // Check if email is already registered
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    const newUser = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password matches
    if (user.password !== req.body.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If both email and password are correct, respond with success
    res.status(200).json({ message: "Login successful", user: { id: user.id, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Route for adding products
app.post("/add-products", async (req, res) => {
  try {
    const productsToAdd = req.body.products;

    // Check if products array is empty
    if (!productsToAdd || productsToAdd.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }

    // Create an array to store new product documents
    const newProducts = [];

    // Iterate through each product in the array
    for (const productData of productsToAdd) {
      const newProduct = new Product({
        name: productData.name,
        price: productData.price,
        categoryId: productData.categoryId,
        stock: productData.stock,
        productDesc: productData.productDesc,
        imageSrc: productData.imageSrc,
        quantity: productData.quantity, // Include quantity field
        images: productData.images // Include images array field
      });

      // Push the new product document to the array
      newProducts.push(newProduct);
    }

    // Insert all new product documents into the database
    await Product.insertMany(newProducts);

    res.status(201).json({ message: "Products added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/products", async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find(
      {},
      "_id name price categoryId stock productDesc imageSrc"
    );

    res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get product by ID route
app.get("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find product by ID in the database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/add-to-cart/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add product ID to user's cart with specified quantity
    user.cart.push({ product: productId, quantity }); // This line is updated

    // Alternatively, if you only want to push the product ID:
    // user.cart.push(productId);

    await user.save();

    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Remove from cart route
app.delete("/remove-from-cart/:userId/:productId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove product from user's cart
    user.cart = user.cart.filter(
      (cartItem) => cartItem.product.toString() !== productId
    ); // Corrected line

    await user.save();

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Get cart route
app.get("/cart/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find user by ID and populate cart with product details
    const user = await User.findById(userId).populate("cart");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get total price of products in user's cart route
app.get("/cart/total/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find user by ID and populate cart with product details
    const user = await User.findById(userId).populate({
      path: "cart",
      populate: { path: "product", select: "price" }, // Populate product details for each cart item
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate total price
    let totalPrice = 0;
    for (const cartItem of user.cart) {
      totalPrice += cartItem.product.price * cartItem.quantity;
    }

    res.status(200).json({ totalPrice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.delete("/cart/clear/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Clear the user's cart
    user.cart = [];

    await user.save();

    res.status(200).json({ message: "User's cart cleared successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Search suggestion route
app.get("/search/suggestions", async (req, res) => {
  try {
    const searchTerm = req.query.term; // Extract search term from query parameter

    // Check if search term is provided
    if (!searchTerm) {
      return res.status(200).json({ suggestions: [] }); // Return empty array
    }

    // Perform a case-insensitive search for products whose name contains the search term
    const products = await Product.find(
      { name: { $regex: searchTerm, $options: "i" } },
      "name _id category"
    );

    // Extract only the product names, IDs, and categories from the search results
    const suggestions = products.map((product) => ({
      name: product.name,
      _id: product._id,
      category: product.category
    }));

    res.status(200).json({ suggestions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get products by category route
app.get("/products/category/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Find products by category ID in the database
    const products = await Product.find({ categoryId });

    res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
