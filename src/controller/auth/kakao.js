import SignInSocial from "../../utils/social.js";
import axios from "axios";

export const kakao = async (req, res) => {
    //테스트용
    // const headers = "JllevHXnq70IYbDAfEJP3DSBayils1gChtji8dNiCj10aAAAAYmbmuN2";

    const headers = req.headers["authorization"];
    const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${headers}`,
        }
    });

    //params
    const { data } = result;
    const email = data.kakao_account.email;

    //DB
    const [accessToken] = await SignInSocial('kakao', [email]);
    conn.release();

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

export default kakao;