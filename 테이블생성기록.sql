create table PUSER ( 
    u_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    u_id VARCHAR(20) UNIQUE NOT NULL,
    u_pw VARCHAR(100));


create table SCHEDULE (
    s_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    s_user INT,
    s_day INT,
    s_start DATE,
    s_end DATE,
    s_content VARCHAR(200),
    s_seme INT,
    s_able BOOL,
    FOREIGN KEY(s_user) REFERENCES PUSER(u_no) ON DELETE CASCADE
);

create table MEMO (
    m_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    m_user INT,
    m_date DATE,
    m_content VARCHAR(200),
    s_able BOOL default FALSE,
    FOREIGN KEY(m_user) REFERENCES PUSER(u_no) ON DELETE CASCADE
);

create table REFE ( 
    REF_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    REF_SCHE INT,
    REF_MEMO INT,
    REF_PEOPLE INT,
    FLAG INT NOT NULL,
    FOREIGN KEY(REF_MEMO) REFERENCES MEMO(m_no) ON DELETE CASCADE,
    FOREIGN KEY(REF_SCHE) REFERENCES SCHEDULE(s_no) ON DELETE CASCADE,
    FOREIGN KEY(REF_PEOPLE) REFERENCES PUSER(u_no) ON DELETE CASCADE
); # FLAG 0 SCHE 1 MEMO

## 이하 테스트
insert into PUSER(u_id, u_pw) values ('asdf', '1234');
insert into MEMO(m_user, m_DATE, m_content) values(1, now(), 'asdfqwer');
insert into PUSER(u_id, u_pw) values('qwer', '5678');
insert into REFE(REF_MEMO, REF_PEOPLE, FLAG) values(1, 2, 1);
select m_user, m_DATE, m_content from REFE JOIN MEMO ON REFE.REF_MEMO=MEMO.m_no where REF_PEOPLE=2;
