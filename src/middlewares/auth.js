import { verify } from "../utils/authjwt.js";
import request from "request";
import dotenv from 'dotenv';
dotenv.config();

var client_id = process.env.NAVER_ID;
var client_secret = process.env.NAVER_SECRET;
var state = process.env.NAVER_STATE;
var redirectURI = encodeURI("http://localhost:3000/api/user/naver/callback");
var api_url = "";


export const authJWT = (req, res, next) => {
  //헤더 처리
  if (req.headers.authorization) {

    const token = req.headers.authorization.split('Bearer ')[1];

    //토큰 채굴
    const result = verify(token);

    if (result.ok) {
      req.id = result.user_id;
      next();
    } else {
      res.status(401).send({
        ok: false,
        message: result.message,
      });
    }
  } else {
    res.status(401).send({
      ok: false,
      message: " 로그인 수행이 필요합니다. "
    });
  }
};


//네이버로부터받은 code,state를 이용해서 접근 토큰 받아내기
export const naver_callback = (req, res, next) => {
  const code = req.query.code;
  const state = req.query.state;
  console.log('naver callback');
  console.log(code);
  console.log(state);
  api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
    + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;

  var options = {
    url: api_url,
    headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
  };

  request.get(options, function (error, response, body) {
    const data = JSON.parse(body);
    if(data.error){
      return res.status(401).json({
        ok:false,
        msg:'Authentication failed',
        data
      });
    }
    if (!error && response.statusCode == 200) {
      console.log(data);
      req.accessToken = data.access_token;
      next();

    } else {
      return res.status(401).json({
        ok:false,
        msg:'Authentication failed'
      });
    }
  });
}
