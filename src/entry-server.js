import createApp from './app';

export default context => {
    return new Promise((resolve, reject) => {

        const { app, router, store } = createApp();

        router.push(context.url)

        router.onReady(() => {

            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                reject({ code: 404 })
            }
            Promise.all(matchedComponents.map(({asyncData}) => {

                if (asyncData) {
                    return asyncData({
                        store,
                        router: router.currentRoute
                    })
                }
            })).then(() => {
                context.state = store.state
                resolve(app);
            }).catch(err => {
                console.log("出错11", err)
            })
        }, err => {
            console.log("出错", err)
        })
    })
}