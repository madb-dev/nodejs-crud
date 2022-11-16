const app = require('./src/routes')

const port = process.env.PORT || 8082;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})