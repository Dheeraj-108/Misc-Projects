import { Router } from "express";
import { 
    generateShortUrl, 
    redirectToOriginalUrl, 
    getUrlAnalytics 
} from "../controllers/url.controllers.js";

const router = Router();

// router.get('/create', (req, res) => {
//     res.render('Home.ejs', {createdUrl: null});
// })
router.post("/", generateShortUrl);
router.get("/:id", redirectToOriginalUrl)
router.get("/analytics/:id", getUrlAnalytics)

export default router;