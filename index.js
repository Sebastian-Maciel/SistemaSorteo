require('./bd/connection');
const app = require('./servidor/server');
 
app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`);
}); 