# Custom Authorizer - Azure Function

This is an example to create (or to simulate) a custom authorizer. Each request might request the authorizer function before any other request, to handle some validations or internal logs

## Running

```
npm i -g azure-functions-core-tools@core

npm run restore

npm start
```

Go to [http://localhost:7071/api/test/private-api](http://localhost:7071/api/test/private-api)

Note: If you want to publish this application, at [proxies.json](proxies.json#L9) replace the "backendUri" to your authorizer published. Ex: `"backendUri": https://myapp.azurewebsites.net/api/authorizer`