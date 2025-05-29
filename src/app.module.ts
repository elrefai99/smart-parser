import { Application } from "express";

export default (app: Application) => {
     app.use("/api/pdf", require("./module/PDF/pdf.module").default);
     app.use("/api/docs", require("./module/DOCS/docs.module").default);
     app.use("/api/excel", require("./module/EXCEL/excel.module").default);
}
