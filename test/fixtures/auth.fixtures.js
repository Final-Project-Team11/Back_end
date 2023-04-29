exports.checkIdResultSchema = {
    userId: 'sparta',
    userName: '이범규',
    password: '$2b$10$u9aMl.83FJ4meLsr9uSFXu.moaB1iVOWItmXKOyAmpP1kQIjdDPdC',
    companyId: 'sparta',
    teamId: 1,
    remainDay: 15,
    salaryDay: null,
    rank: null,
    authLevel: 1,
    joinDay: null,
    job: 'CEO',
    birthDay: null,
    phoneNum: null,
    profileImg: null,
    createdAt: "2023-04-24T15:24:46.000Z",
    updatedAt: "2023-04-24T15:24:46.000Z"
}

exports.UsercheckIdResultSchema = {
    userId: 'test1',
    userName: 'testman',
    password: 'aaaa1111AA',
    companyId: 'sparta',
    teamId: 2,
    remainDay: 15,
    salaryDay: 25,
    rank: "팀원",
    authLevel: 3,
    joinDay: "2023-04-24T15:24:46.000Z",
    job: 'BE',
    birthDay: "1900-01-01T00:00:00.000Z",
    phoneNum: '010-1234-1333',
    profileImg: 'https://meer2.s3.ap-northeast-2.amazonaws.com/53770cd4-5c2a-4b22-8d1f-e84149c35861_sesame.png',
    createdAt: "2023-04-24T15:24:46.000Z",
    updatedAt: "2023-04-24T15:24:46.000Z"
}

exports.TokenResultSchema = {
    token : "test token"
}

exports.UserTokenResultSchema = {
    token : "test user token"
}

exports.AdminAuthinvalidData = {
    companyId: "sparta",
    password: 1234,
};
exports.AdminAuthvalidData = {
    companyId: "sparta",
    password: "1234aaaa!!",
};

exports.UserAuthinvalidData = {
    companyId: "sparta",
    userId : "test1",
    password: 1234,
};
exports.UserAuthvalidData = {
    companyId: "sparta",
    userId : "test1",
    password: "1234aaaa!!",
};

exports.ModifyinvalidData = {
    password: 1234,
};
exports.ModifyvalidData = {
    password: "1234aaaa!!",
};