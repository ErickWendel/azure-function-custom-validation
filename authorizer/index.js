const axios = require('axios')
module.exports = async function (context, req) {
    const method = req.method.toLowerCase()
    const baseURl = `http://${process.env.WEBSITE_HOSTNAME}/api`
    try {
        /*
        //some validation here
        */
        console.log('somebody was here!', req)
        const functionResponse = await axios[method](`${baseURl}/${req.params.functionName}`, {
            headers: req.headers
        })
        context.res = {
            body: functionResponse.data,
            headers: functionResponse.headers
        }

    } catch (error) {
        console.error('**internal error!', error)
        context.res = {
            status: 500
        }
    }

};