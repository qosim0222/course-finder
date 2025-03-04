import { Router } from "express";
import userRoute from "./user.routes.js";
import commentRoute from "./comment.routes.js";
import filialRoute from "./filial.routes.js";
import likedRoute from "./liked.routes.js";
import oquvmarkazRoute from "./oquvMarkaz.routes.js";
import regionRoute from "./region.routes.js";
import yozilishRoute from "./yozilish.routes.js";
import yonalishRoute from "./yonalish.routes.js";
import resursCategoryRoute from "./resursCategory.routes.js";
import resursRoute from "./resurs.routes.js";
import sohaFanRoutes from "./sohaFan.routes.js";
import uploadRoute from "./upload.routes.js";

const mainRoute = Router();

mainRoute.use("/user", userRoute)
mainRoute.use("/comment", commentRoute)
mainRoute.use("/filial", filialRoute)
mainRoute.use("/liked", likedRoute)
mainRoute.use("/oquv-markaz", oquvmarkazRoute)
mainRoute.use("/region", regionRoute)
mainRoute.use('/yozilish', yozilishRoute)
mainRoute.use('/yonalish', yonalishRoute)
mainRoute.use('/resurs-category', resursCategoryRoute)
mainRoute.use('/resurs', resursRoute)
mainRoute.use('/sohafan', sohaFanRoutes)
mainRoute.use('/upload', uploadRoute)

export default mainRoute;
