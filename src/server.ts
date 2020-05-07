import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
const cors = require('cors');
import createGraphs from './createChart';

const app:express.Application = express();
app.set('view engine', 'pug');
app.set('views', path.join(path.dirname(__dirname),'MyViews'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/build', express.static(path.join(path.dirname(__dirname), 'build')));
app.use('/',express.static(path.join(path.dirname(__dirname), 'public')));

app.post('/returnGraphImages', (req:express.Request, res:express.Response) => {
    var x:string = JSON.stringify(req.body.x);
    var y:string = JSON.stringify(req.body.y);
    var result:Chart[] = createGraphs(x, y);
    res.send(result);
});

app.get('/getGraphs', (req:express.Request, res:express.Response) => {
    var x:string = req.query.x as string;
    var y:string = req.query.y as string;
    console.log(req.query);
    res.render('test', {title:'Summa',x:x, y:y}); 
    //x:JSON.stringify(x), y:JSON.stringify(y)});
});


app.listen(4000, () => console.log("App started at port 4000"));