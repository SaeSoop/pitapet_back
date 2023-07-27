import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./src/router/index.js";

//const myPuppyRoute = require('./router/my_puppy'); //my-puppy 라우트를 추가


const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174" ], // 접근 권한을 부여하는 도메인들의 배열
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.use(express.json({
    limit : '50mb'
}));

const SERVER_HOST = process.env.SERVER_HOST;

app.listen(SERVER_HOST, '0.0.0.0', () => {
    console.log(`✅ Server running at http://localhost:${SERVER_HOST} 🚀`);
  });


export default app;