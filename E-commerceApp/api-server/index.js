const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/images', express.static('images'));

const url = 'mongodb://localhost:27017'; // URL de connexion à MongoDB
const dbName = 'TP4DB'; // Nom de votre base de données
const productsCollectionName = 'products'; // Nom de votre collection de produits
const cartCollectionName = 'cart'; // Nom de la collection du panier

let db, productsCollection, cartCollection, usersCollection;

MongoClient.connect(url)
  .then(client => {
    console.log('Connecté à la base de données MongoDB');
    db = client.db(dbName);
    productsCollection = db.collection(productsCollectionName);
    cartCollection = db.collection(cartCollectionName);
    usersCollection = db.collection('users');
  })
  .catch(error => {
    console.error("Erreur de connexion à la base de données MongoDB:", error);
  });



//Endpoint pour ajouter un produit
app.post("/api/products", (req, res) => {
  const product = req.body;
  db.collection('products').insertOne(product)
    .then(result => {
      res.status(201).send();
    })
    .catch(error => {
      console.error('Error adding product:', error);
      res.status(500).send('Internal Server Error');
});
});

//Endpoint pour supprimer un produit
app.delete("/api/products/:_id", async (req, res) => {
  try {
    const productId = req.params._id;
    const result = await productsCollection.deleteOne({ _id: new ObjectId(productId) });
    if (result.deletedCount === 0) {
      return res.status(404).send('Product not found');
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product', error);
    res.status(500).send('Internal Server Error');
  }
});


////Endpoint pour supprimer un utilisateur
app.delete("/api/users/:_id", async (req, res) => {
  try {
    const userId = req.params._id;
    const result = await usersCollection.deleteOne({ _id: new ObjectId(userId) });
    if (result.deletedCount === 0) {
      return res.status(404).send('User not found');
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/api/products", (req, res) => {
  productsCollection.find({}).toArray()
    .then(products => {
      if (req.query.filter) {
        products = products.filter(product => product.category === req.query.filter);
      }
      res.send(products);
    })
    .catch(error => console.error(error));
});

app.get("/api/products/search", (req, res) => {
  const title = req.query.title.toLowerCase();
  productsCollection.find({ productTitle: { $regex: title, $options: 'i' } }).toArray()
    .then(filteredProducts => {
      res.json(filteredProducts);
    })
    .catch(error => console.error(error));
});



app.get("/api/cart", (req, res) => {
  cartCollection.find({}).toArray()
    .then(cartItems => {
      res.send(cartItems);
    })
    .catch(error => console.error(error));
});

// Route pour ajouter ou augmenter la quantité d'un produit dans le panier
app.post("/api/cart/add", (req, res) => {
  const { itemProduct, quantity } = req.body;
  cartCollection.updateOne(
    { "itemProduct._id": itemProduct._id },
    { $set: { itemProduct }, $inc: { quantity: 1 } },
    { upsert: true }
  )
    .then(() => {
      res.status(201).send("Produit ajouté au panier ou quantité augmentée.");
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout du produit au panier :", error);
      res.status(500).send("Erreur lors de l'ajout du produit au panier.");
    });
});

//Route pour diminuer la quantité d'un produit dans le panier
app.post("/api/cart/decrease", (req, res) => {
  const { itemProduct } = req.body;
  cartCollection.findOneAndUpdate(
    { "itemProduct._id": itemProduct._id },
    { $set: { itemProduct }, $inc: { quantity: -1 } },
    { returnDocument: 'after' }
  )
    .then(result => {
      if (result.value && result.value.quantity <=0) {
        cartCollection.deleteOne({ "itemProduct._id": _id });
      }
      res.status(201).send("Quantité diminuée.");
    })
    .catch(error => {
      console.error("Erreur lors de la diminution de la quantité :", error);
      res.status(500).send("Erreur lors de la diminution de la quantité.");
    });
});

// Route pour supprimer un produit du panier
app.post("/api/cart/remove", (req, res) => {
  const { productID } = req.body;
  cartCollection.deleteOne({ "itemProduct._id": productID })
    .then(() => {
      res.status(201).send("Produit retiré du panier.");
    })
    .catch(error => {
      console.error("Erreur lors de la suppression du produit du panier :", error);
      res.status(500).send("Erreur lors de la suppression du produit du panier.");
    });
});

// Route pour vider le panier
app.post("/api/cart/clear", (req, res) => {
  cartCollection.deleteMany({})
    .then(() => {
      res.status(200).send("Panier vidé avec succès.");
    })
    .catch(error => {
      console.error("Erreur lors du vidage du panier :", error);
      res.status(500).send("Erreur lors du vidage du panier.");
    });
});

app.post("/api/register", (req, res) => {
  const userData = req.body;
  usersCollection.insertOne(userData)
    .then(result => {
      res.status(200).send({
        user: userData
      });
    })
    .catch(error => console.error(error));
});



app.post("/api/signin", (req, res) => {
  const { email, password } = req.body;
  // Recherchez l'utilisateur dans la collection des utilisateurs avec les informations d'identification fournies
  usersCollection.findOne({ email: email, password: password })
    .then(user => {
      if (user) {
        // L'utilisateur est trouvé, renvoyer l'utilisateur connecté
        res.status(200).json(user);
      } else {
        // L'utilisateur n'est pas trouvé ou les informations d'identification sont incorrectes
        res.status(401).send("Email ou mot de passe incorrect.");
      }
    })
    .catch(error => {
      console.error("Erreur lors de la connexion de l'utilisateur :", error);
      res.status(500).send("Erreur lors de la connexion de l'utilisateur.");
    });
});

// Route pour récupérer un produit par son ID
app.get("/api/products/:productId", (req, res) => {
  const productId = req.params.productId;
  productsCollection.findOne({ _id: ObjectId(productId) })
  .then(product => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Produit non trouvé." });
      }
    })
    .catch(error => {
      console.error("Erreur lors de la récupération du produit:", error);
      res.status(500).json({ error: "Erreur lors de la récupération du produit." });
    });
});

// Route pour récupérer les utilisateurs ayant le rôle "client"
app.get("/api/users/clients", (req, res) => {
  usersCollection.find({ role: 'client' }).toArray()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs." });
    });
});

// Route pour supprimer un client
app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  usersCollection.deleteOne({ _id: new ObjectId(userId) }) // Utilisation de `_id` et conversion en ObjectId
    .then(() => {
      res.status(200).send("Utilisateur supprimé avec succès.");
    })
    .catch(error => {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      res.status(500).send("Erreur lors de la suppression de l'utilisateur.");
    });
});

// Route pour récupérer l'ID de l'utilisateur connecté
app.get("/api/current-user-id", (req, res) => {
  if (req.user) {
    const userId = req.user._id;
    res.status(200).json({ userId });
  } else {
    res.status(401).json({ error: "Utilisateur non authentifié." });
  }
});


const port = 3000;

app.listen(port, () => console.log(`API Server listening on port ${port}`));
