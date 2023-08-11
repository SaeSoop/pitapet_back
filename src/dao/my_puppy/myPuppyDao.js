export const puppy_profile = async (conn, params) => {
    const puppyList = `select * from MyPuppy`;

    //await conn.query(puppyList_query, params);
    const [puppy] = await conn.query(puppyList, params);

    return [puppy];
}

export const insert_puppy = async (conn, params) => {
    const puppyInsert = `INSERT INTO MyPuppy (dog_name, dog_birth, dog_family, dog_breed, dog_sex, dog_ability, dog_char,
        dog_game, dog_snack, dog_illness, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;


    //await conn.query(puppyList_query, params);
    const [newPuppy] = await conn.query(puppyInsert, params);

    return [newPuppy];
}

export const update_puppy = async (conn, params) => {
    const puppyUpdate =`update MyPuppy set ? where id=?`;

    //await conn.query(puppyList_query, params);
    const [newPuppy] = await conn.query(puppyUpdate, params);

    return [newPuppy];
}

// export const search_user = async (conn, params) => {
//     const searchUser =`SELECT * FROM User WHERE user_id = ?`;

//     // 미들웨어를 사용하여 토큰 검증
//     const verifyToken = (req, res, next) => {
//         const token = req.header('Authorization'); // 헤더에서 토큰 추출

//         if (!token) {
//             return res.status(401).json({ message: 'Access denied. No token provided.' });
//         }

//         try {
//         // JWT 토큰 검증
//             const decoded = jwt.verify(token, secretKey);

//         // 검증에 성공하면 req에 사용자 정보 추가
//             req.user = decoded;
//             next();
//         } catch (err) {
//             return res.status(403).json({ message: 'Invalid token.' });
//         }
//     }
// };

//     // 토큰 검증이 필요한 보호된 API 예시
//     app.get('/protected', verifyToken, async (req, res) => {
//     const currentUser = req.user;

//     try {
//         // 데이터베이스에서 사용자 추가 정보 조회
//         const userFromDB = await User.findOne({ userId: currentUser.userId });
//         if (!userFromDB) {
//         return res.status(404).json({ message: 'User not found.' });
//         }

//         res.json({ currentUser, additionalInfo: userFromDB });
//     } catch (error) {
//         res.status(500).json({ message: 'Error while fetching user information.' });
//     }});

//     //await conn.query(puppyList_query, params);
//     const [newPuppy] = await conn.query(puppyUpdate, params);

//     return [newPuppy];
// }
