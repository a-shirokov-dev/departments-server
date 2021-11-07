
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 8000;
const departmentsApiRoutes = require("./src/modules/routes/departmentsRoutes");
const employeesApiRoutes = require("./src/modules/routes/employeesRoutes");
const url = "mongodb+srv://admin:intern-admin@cluster1.oueg2.mongodb.net/departments-db?retryWrites=true&w=majority"

const startServer = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });    

    app.use(cors());
    app.use(express.json());
    app.use("/", departmentsApiRoutes);
    app.use("/", employeesApiRoutes);

    app.listen(PORT, () => {
      console.log(`Departments server listening on port ${PORT}!`);
    });
  } catch (err) {console.error(err)}
}

startServer();
