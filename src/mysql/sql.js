const sql = {
    puppyList: `select * from my_puppy`,
    puppyInsert: `insert into my_puppy set ?`,
    puppyUpdate: `update my_puppy set ? where id=?`
};

export default sql;