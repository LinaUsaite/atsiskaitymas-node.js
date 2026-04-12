const { ZodError } = require("zod");

module.exports = (err, req, res, next) => {
  console.log("FULL ERROR:", err);
  console.log("ERROR CODE:", err.code);
  console.log("CONSTRAINT:", err.constraint_name || err.constraint);

  // 1.ZOD klaidos
  if (err instanceof ZodError) {
  return res.status(400).json({
    status: "fail",
    message: "Validation failed",
    errors: err.issues.map((issue) => {
      let field = issue.path.join(".") || "body";
      let message = issue.message;

      if (issue.code === "invalid_type" && issue.input === undefined) {
        message = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }

      if (issue.code === "unrecognized_keys") {
        field = "body";
        message = "Contains fields that are not allowed";
      }

      return {
        field,
        message,
      };
    }),
  });
}

  //2. POSTGRES dublicate klaida

  // "23505" code = already exist
  if (err.code === "23505") {
    const constraint = err.constraint_name || err.constraint;

    let field = "Field";

    if (constraint) {
      const parts = constraint.split("_");
      field = parts[1] || "Field";
    }

    const prettyField = field.charAt(0).toUpperCase() + field.slice(1);

    return res.status(400).json({
      status: "fail",
      message: `${prettyField} already exists`,
    });
  }

  //POSTGRES not exist klaida
  //"23503" code = related record not found
  if (err.code === "23503") {
    const constraint = err.constraint_name || err.constraint;

    let field = "Related record";

    if (constraint) {
      const parts = constraint.split("_");
     field = parts[1] || "Related record";
    }

    const prettyField = field.charAt(0).toUpperCase() + field.slice(1);

    return res.status(400).json({
      status: "fail",
      message: `${prettyField} not found`,
    });
  }

  //3. VISOS KITOS klaidos
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    status,
    message,
  });
};
