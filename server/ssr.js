const express = require("express");
const app = express();
const vueRender = require("vue-server-renderer");
const { resolve } = require("path");
app.use(express.static(resolve('./dist/client'), { index: false }))

const { createBundleRenderer } = vueRender;
const renderer = createBundleRenderer(resolve("./dist/server/vue-ssr-server-bundle.json"), {
    runInNewContext: false, // 推荐
    template: require('fs').readFileSync(resolve("./public/vue-ssr-template.html"), 'utf-8'), // （可选）页面模板
    clientManifest: require(resolve("./dist/client/vue-ssr-client-manifest.json")) // 客户端清单
})
app.get("*", async(req, res) => {
    console.log("as111")
    const context = {
        url: req.url,
        title: 'Vue SSR'
    }
    try {
        const html = await renderer.renderToString(context);
        res.send(html);

    } catch (e) {
        res.status(500).send('Internal Server Error')
    }

})

app.listen(4000);