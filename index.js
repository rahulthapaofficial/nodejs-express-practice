const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

let customers = [
  {
    id: 1,
    name: "Rahul Thapa",
    mobile_no: 9816491822,
  },
  {
    id: 2,
    name: "Apaht Luhar",
    mobile_no: 9843986469,
  },
];

app.get("/", (req, res) => {
  res.send(`Hello World`);
});

app.get("/api/customers", (req, res) => {
  res.send(customers);
});

app.post("/api/customers", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res
      .status(400)
      .send({ success: false, message: result.error.details[0].message });
  }
  const customer = {
    id: customers.length + 1,
    name: req.body.name,
  };
  customers.push(customer);
  res.send(customer);
});

app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find(
    (customer) => customer.id === parseInt(req.params.id)
  );
  if (!customer)
    res.status(404).send("The customer with given ID was not found");
  res.send(customer);
});

app.put("/api/customers/:id", (req, res) => {
  if (result.error) {
    return res
      .status(400)
      .send({ success: false, message: result.error.details[0].message });
  }

  const customer = customers.find(
    (customer) => customer.id === parseInt(req.params.id)
  );

  customer.name = req.body.name;
  res.send(customer);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(customer);
}
