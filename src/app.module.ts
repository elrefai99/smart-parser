import { Application } from "express";

export default (app: Application) => {
     app.use("/api/pdf", require("./module/PDF/pdf.module").default);
}
