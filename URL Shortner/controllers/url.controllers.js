import { nanoid } from "nanoid";
import { Url } from "../models/url.models.js";
import asyncHandler from '../utils/asyncHandler.util.js';

const generateShortUrl = asyncHandler(async (req, res) => {
    const { originalUrl } = req.body
    const newUrl = nanoid(8);

    const urlDoc = await Url.create({
        shortUrl : newUrl,
        longUrl: originalUrl,
    })

    console.log(`Your short url is: http://localhost:8080/url/${urlDoc.shortUrl}`);
    res.status(200).json({status: "success", createdUrl: urlDoc});
    // res.render('Home.ejs', { createdUrl: urlDoc });
})

const redirectToOriginalUrl = asyncHandler(async (req, res) => {
    const urlId = req.params.id;

    const extractedUrl = await Url.findOne({shortUrl: urlId});
    extractedUrl.clickCount.push(Date.now())
    await extractedUrl.save();

    res.status(300).redirect(extractedUrl.longUrl)
})

const getUrlAnalytics = asyncHandler(async (req, res) => {
    const urlId = req.params.id;
    const extractedUrl = await Url.findOne({shortUrl: urlId});

    console.log(`This url is visited: ${extractedUrl.clickCount.length} times`);
    res.status(200).json({status: "success", timesVisited: extractedUrl.clickCount.length})
})

export {
    generateShortUrl,
    redirectToOriginalUrl,
    getUrlAnalytics
}