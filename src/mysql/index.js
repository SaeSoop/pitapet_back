import mysql from "mysql";
import sql from "./sql.js";

// //Pool을 생성한다.
// const pool = mysql.createPool({
//     connectionLimit : 10,
//     host            : 'localhost',
//     port            : 3306,
//     user            : 'dev01',
//     password        : '1234',
//     database        : 'profiles'
// });

const pool = {
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    port: `${process.env.DB_PORT}`,
    password: `${process.env.DB_PWD}`,
    database: `${process.env.DB_NAME}`,
};

/*쿼리문을 실행하고 결과를 반환하는 함수*/
/*
    pool이 생성되고 나면 pool의 내장함수인 query를 사용해 쿼리를 실행할 수 있다.

    pool.query(queryString, values, callback)
*/

const query = async(alias, values) => {

    console.log('values : ', values);

    return new Promise((resolve, reject) => pool.query(sql[alias], values, (error,
    results) => {
        if(error){
            console.log(error);
            reject({
                error
            });
        } else resolve(results);
    }));
}

export default query;