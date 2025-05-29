import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet"
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import client from "prom-client";

const register = new client.Registry();
client.collectDefaultMetrics({ register });

// metrics
const httpRequestsTotal = new client.Counter({
     name: "http_requests_total",
     help: "Total HTTP requests",
     labelNames: ["method", "route", "status"],
});
register.registerMetric(httpRequestsTotal);

// Histogram: HTTP request duration
const httpRequestDuration = new client.Histogram({
     name: "http_request_duration_seconds",
     help: "Duration of HTTP requests in seconds",
     labelNames: ["method", "route", "status"],
     buckets: [0.1, 0.5, 1, 1.5, 2, 5],
});
register.registerMetric(httpRequestDuration);

// Gauge: active requests count
const activeRequests = new client.Gauge({
     name: "active_requests",
     help: "Number of active HTTP requests",
});

register.registerMetric(activeRequests);

export default (app: Application) => {
     app.use(cors({
          origin: "*"
     }));
     app.use(cookieParser());
     app.use(helmet())
     app.use(morgan("dev"))
     app.use(express.json({
          limit: "100mb"
     }))
     app.use(express.urlencoded({
          extended: true
     }))
     app.use("/v0/public", express.static("cdn"));
     app.set("trust proxy", true);
     app.use(async (req: Request | any, res: Response, next: NextFunction) => {
          // get langouage of headers
          const lang = req.headers['accept-language'];
          req.lang = (lang === 'ar' || lang === 'en') ? lang : 'en';

          // ip address of users
          const clientIP = req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
          req.clientIP = clientIP;

          if (req.path === "/metrics") {
               return next();
          }
          activeRequests.inc();
          const end = httpRequestDuration.startTimer();

          res.on("finish", () => {
               activeRequests.dec();
               httpRequestsTotal
                    .labels(req.method, req.path, res.statusCode.toString())
                    .inc();
               end({
                    method: req.method,
                    route: req.path,
                    status: res.statusCode.toString(),
               });
          });
          next();
     });
}
