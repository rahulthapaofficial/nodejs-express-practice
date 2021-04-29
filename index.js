const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

let customers = [];

app.get("/", (req, res) => {
  res.send(`Hello World`);
});

app.get("/api/customers", (req, res) => {
  res.send(customers);
});

app.post("/api/customers", (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });
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
    return res.status(404).send("The customer with given ID was not found");
  res.send(customer);
});

app.put("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer)
    return res.status(404).send("The Customer with the given ID was not found");

  const { error } = validateCustomer(req.body);
  if (error) {
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });
  }

  customer.name = req.body.name;
  res.send(customer);
});

app.delete("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer)
    return res.status(404).send("The customer with given ID was not found");

  const index = customers.indexOf(customer);
  customers.splice(index, 1);

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
  return schema.validate(customer);
}
