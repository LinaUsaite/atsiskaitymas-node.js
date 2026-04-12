const app = require("./app");
require("dotenv").config();
const { sql, testConnection } = require("./db_Connection");



const port = process.env.PORT;


(async () => {
  try {
    await testConnection();
    //run server
    app.listen(port, () => {
      console.log("Server is ready and listening port " + port);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1); //with error
  }
})();

//kai vartotojas spaudžia ctrl+c kad uždaryti aplikaciją, ryšys su duomenų baze turi būti nutrauktas/uždarytas
process.on("SIGINT", async () => {
  console.log("Closing database connection");
  await sql.end(); //close database connection
  process.exit(0); //without error
});