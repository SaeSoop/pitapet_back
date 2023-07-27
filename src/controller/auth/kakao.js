import signInKakao from"../../utils/kakao.js";

export const kakao = async (req, res) => {
    const headers = req.headers["authorization"];
    
    //테스트용
    // const headers = "CeIy0ki8IWkb5RDCzhtp4hdjey3c4-OPGsLAUV5pCinJYAAAAYmVpudT";
    const [accessToken] = await signInKakao(headers);
    
    if(accessToken){
        res.status(200).send({
            ok: true,
            accessToken: accessToken,
        });
    }else{
        res.status(404).json({
            ok: false,
            msg: ' This E-mail is already taken.'
        });
    }

};

export default kakao;