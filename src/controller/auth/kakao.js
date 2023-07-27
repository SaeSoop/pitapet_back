import SignInSocial from "../../utils/social.js";
import axios from "axios";

export const kakao = async (req, res) => {
    //테스트용
    const headers = "CeIy0ki8IWkb5RDCzhtp4hdjey3c4-OPGsLAUV5pCinJYAAAAYmVpudT";

    // const headers = req.headers["authorization"];
    const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${headers}`,
        }
    });
    const { data } = result;
    const email = data.kakao_account.email;

    const [accessToken] = await SignInSocial('kakao',[email]);

    res.status(200).send({
        ok: true,
        accessToken: accessToken,
    });


};

export default kakao;