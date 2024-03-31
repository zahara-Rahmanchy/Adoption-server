import express, {
  Application,
  NextFunction,
  Request,
  Response,
  request,
} from "express";
import cors from "cors";

import httpStatus from "http-status";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes";

const app: Application = express();

app.use(cors());

// parsers
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Pet Adoption System",
  });
});

app.use("/api", router);

app.use(globalErrorHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
