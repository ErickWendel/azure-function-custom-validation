const axios = require('axios')
const qs = require('querystring')

module.exports = async function (context, req) {
    const method = req.method.toLowerCase()
    const env = process.env.AZURE_FUNCTIONS_ENVIRONMENT

    const protocol = env === "Development" ? "http" : "https"

    const baseURL = `${protocol}://${process.env.WEBSITE_HOSTNAME}/api`
    const params = req.params.functionName.split('/')
    const functionName = params[0]
    if (!functionName) {
        return context.res = {
            status: 400,
            body: {
                error: 'You might choose an URL'
            }
        }
    }

    const query = qs.stringify(req.query)
    const url = `${baseURL}/${params}?${query}`
    try {
        const request = `
        URL: ${url},
        Query: ${query},
        Body: ${JSON.stringify(req.body)}
        `
        /*
        //some validation here
        */
        console.log('somebody was here!', request)
        const functionResponse = await axios({
            method,
            url,
            data: req.body,
            headers: req.headers,
        })

        return context.res = {
            body: functionResponse.data,
            headers: functionResponse.headers
        } 
    } catch (error) {
        const {
            response
        } = error
        
        console.error('something happened!', error.message)
        if (!response) {
            return context.res = {
                status: 500,
                body: error.message
            }
            
        }
        return context.res = {
            status: response.status,
            headers: response.headers,
            body: {
                error: response.statusText,
                url,
            },
        }
        
    }

}