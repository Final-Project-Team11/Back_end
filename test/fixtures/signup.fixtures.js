exports.SignupinvalidData = {
    companyName: "testcompany",
    address: "서울시 어쩌고",
    ceoName: "testman",
    companyNum: "1234567899",
    ceoNum: "01012345678",
    companyId: "test1",
    password: "1234aaaa",
};
exports.SignupvalidData = {
    companyName: "testcompany",
    address: "서울시 어쩌고",
    ceoName: "testman",
    companyNum: "1234567899",
    ceoNum: "01012345678",
    companyId: "test1",
    password: "1234aaaa!!",
};
exports.CheckIDinvalidData = {
    companyId: "test1!!",
};
exports.CheckIDvalidData = {
    companyId: "test1",
};
exports.SignupInsertSchema = {
    companyName: "testcompany",
    address: "서울시 어쩌고",
    ceoName: "testman",
    companyNum: "1234567899",
    ceoNum: "01012345678",
    teamName: "CEO",
    companyId: "test1",
    userId: "test1",
    userName: "testman",
    password: "1234aaaa!!",
    remainDay: 15,
    authLevel: 1,
    job: "CEO",
}

exports.CheckCompanyInsertSchema = {
    companyName: "testcompany"
}

exports.CheckCompanyIdInsertSchema = {
    companyId: "test1"
}

exports.checkCompanyErrorResultSchema = [
    {
        companyId: "test1",
        companyName: "testcompany",
        ceoNum: "01012345678",
        address: "서울시 어쩌고",
        ceoName: "testman",
        ceoNum: "01012345678",
        createdAt: "2023-04-28T06:34:45.000Z",
        updatedAt: "2023-04-28T06:34:45.000Z"
    }
]
