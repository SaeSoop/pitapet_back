import SignInSocial from "../../utils/social.js";
import axios from "axios";
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


//네이버로부터 토큰을 발급받은 후 DB에 저장
export const naver_token = async (req, res) => {
    //테스트용
    // const headers = "AAAAOFLL4xSpTGbRI0S34g3aKtkx5aRqgwA5N-w7TfgEfs7g-UfBNDidYgUPCqjE7JYmjDTRYv0_QYqaAdqoK1m3-4o";

    const headers = req.accessToken;
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
            AccessToken: accessToken,
        });
    }
};