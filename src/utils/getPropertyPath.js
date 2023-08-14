import multer from "multer";
import path from "path";

export const getPropertyPath = async (req, res) => {

    var path = req.file.path;

    //역슬래시를 슬래시로 변경해주기
    path = path.replace(/\\/g, "/");
    console.log(req.file.path);
    console.log(path);

    return path;
};

export default getPropertyPath;