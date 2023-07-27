import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./src/router/index.js";

//const myPuppyRoute = require('./router/my_puppy'); //my-puppy 라우트를 추가
import myPuppyRoute from './src/router/my_puppy.js'


const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174" ], // 접근 권한을 부여하는 도메인들의 배열
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.use('/', function(req, res){
//   res.send('root');
// });

app.use('/', router);

app.use(express.json({
    limit : '50mb'
}));

const SERVER_HOST = process.env.SERVER_HOST;
const port = 3000;

app.listen(port, '0.0.0.0', () => {
    console.log(`✅ Server running at http://localhost:${port} 🚀`);
});

app.use('/my-puppy', myPuppyRoute);    // 라우트를 추가하고 기본 경로로 /my-puppy 사용

export default app;