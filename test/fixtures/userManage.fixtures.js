exports.managerUser = {
    userId: 'myelin23',
    authLevel: 1,
    teamName: 'Team',
    companyId: 1,
};


exports.user = {
    userId: 'myelin23',
    authLevel: 3,
    teamName: 'Team',
    companyId: 1,
};

exports.teamsList = [{ teamId: 1, name: '개발팀' }, { teamId: 2, name: '운영팀' }]

exports.userUpdateData = {
    team: "개발팀",
    authLevel: 3,
    rank: "사원",
    job: "개발자"
}

exports.invalidUserUpdateData = {
    team: "개발팀",
    rank: "사원",
    job: "개발자"
}

exports.usersListData = [
    {
        userId: "test1",
        userName: "최다현",
        rank: "팀장",
        joinDay: "2023/05/01",
        job: "백엔드",
        team: "개발팀",
        authLevel: "관리자",
        salaryDay: 20
    },
    {
        userId: "test2",
        userName: "박찬우",
        rank: "사원",
        joinDay: "2023/05/01",
        job: "BE",
        team: "개발팀",
        authLevel: "직원",
        salaryDay: 20
    },
    {
        userId: "test3",
        userName: "송철환",
        rank: "사원",
        joinDay: "2023/05/01",
        job: "BE",
        team: "개발팀",
        authLevel: "직원",
        salaryDay: 20
    }
]
exports.createUserData = {
    team: "개발팀",
    authLevel: 1,
    rank: "사원",
    userName: "홍길동",
    userId: "testUserId",
    joinDay: "2023/05/01",
    job: "BE",
    salaryDay: 23
}

exports.invalidCreateUserData = {
    authLevel: 1,
    rank: "사원",
    userName: "홍길동",
    userId: "testUserId",
    joinDay: "2023/05/01",
    job: "BE",
    salaryDay: 23
}
exports.searchUsersListData = [
    {
        userId: "test1",
        userName: "김가가",
        rank: "팀장",
        joinDay: "2023/05/01",
        job: "백엔드",
        team: "개발팀"
    },
    {
        userId: "test2",
        userName: "김나나",
        rank: "사원",
        joinDay: "2023/05/01",
        job: "BE",
        team: "개발팀"
    },
    {
        userId: "test3",
        userName: "김다다",
        rank: "사원",
        joinDay: "2023/05/01",
        job: "BE",
        team: "개발팀",
    }
]