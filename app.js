const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()

const PORT = 5001;
const { db, admin } = require('./firebase')
const cors = require("cors");

// console.log(db)
app.use(cors());

app.use(express.json());


app.get("/", (req, res) => {
    res.send("CoreUI Server is live")
})

app.get('/order', async (req, res) => {
    const ordersRef = db.collection("marchant").doc("orders").collection("orders");

    try {
        const snapshot = await ordersRef.get();

        if (snapshot.empty) {
            return res.sendStatus(404);
        }


        const allOrders = [];


        snapshot.forEach(doc => {

            const orderData = doc.data();

            allOrders.push(orderData);
        });


        res.status(200).send(allOrders);
    } catch (error) {
        console.error("Error getting orders: ", error);
        res.status(500).send("Error getting orders");
    }
});

app.get('/merchants', async (req, res) => {
    const merchantsRef = db.collection("customers").doc("customer").collection("customer");

    try {
        const snapshot = await merchantsRef.get();

        if (snapshot.empty) {
            return res.sendStatus(404);
        }


        const allMerchants = [];


        snapshot.forEach(doc => {

            const merchantData = doc.data();
            allMerchants.push(merchantData);
        });

        res.status(200).send(allMerchants);
    } catch (error) {
        console.error("Error getting merchants: ", error);
        res.status(500).send("Error getting merchants");
    }
});


app.post("/orders", async (req, res) => {
    const orderData = req.body;

    const ordersRef = db.collection("marchant").doc("orders").collection("orders");

    try {
        await ordersRef.add(orderData);

        res.status(200).send(orderData);
    } catch (error) {
        console.error("Error adding order: ", error);
        res.status(500).send("Error adding order");
    }
});


app.post("/merchants", async (req, res) => {
    const merchantData = req.body;

    const merchantsRef = db.collection("customers").doc("customer").collection("customer");

    try {
        await merchantsRef.add(merchantData);

        res.status(200).send(merchantData);
    } catch (error) {
        console.error("Error adding merchant: ", error);
        res.status(500).send("Error adding merchant");
    }
});



app.listen(PORT, () => {
    console.log(`CoreUI Server is running on port- ${PORT}`);
});