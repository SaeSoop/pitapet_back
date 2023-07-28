import SignInSocial from "../../utils/social.js";
import axios from "axios";
import request from "request";
import dotenv from 'dotenv';
dotenv.config();

var client_id = process.env.NAVER_ID;
var client_secret = process.env.NAVER_SECRET;
var state = process.env.NAVER_STATE;
var redirectURI = encodeURI("http://localhost:3000/api/user/naver/callback");
var api_url = "";


//네이버로부터 code,state 알아내기
export const naver_login = async (req, res) => {
    api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end("<a href='" + api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
}

//네이버로부터받은 code,state를 이용해서 접근 토큰 받아내기
export const naver_callback = async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
        + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;

    var options = {
        url: api_url,
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
    };

    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
}

//네이버로부터 토큰을 발급받은 후 DB에 저장
export const naver_token = async (req, res) => {
    //테스트용
    const headers = "AAAAODyfZuzjRS1XRf8zI17FatzsLIFu4OD5qkIMFxtbti5QHthgwgofkFFZmRKGKboDQgUli8WGnFCoHbQCe_rMXaY";

    // const headers = req.headers["authorization"];
    const result = await axios.get("https://openapi.naver.com/v1/nid/me", {
        headers: {
            Authorization: `Bearer ${headers}`,
        }
    });

    //params
    const { data } = result;
    const email = data.response.email;
    const name = data.response.nickname;
    const sex = data.response.gender == 'F' ? 1 : 0;
    const pnumber = '0' + data.response.mobile_e164.slice(3, 13);
    const birth = data.response.birthyear + data.response.birthday.slice(0, 2) + data.response.birthday.slice(3, 5);
    const params = [email, 'naver', pnumber, name, sex, birth];

    //DB
    const [accessToken] = await SignInSocial('naver', params);

    if (accessToken.length < 7) {
        res.status(404).send({
            ok: false,
            msg: 'Already exists',
            join: accessToken,
        })
    } else {
        res.status(200).send({
            ok: true,
            accessToken: accessToken,
        });
    }
    


};