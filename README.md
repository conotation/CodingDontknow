# 2-2 기말 프로젝트 (3人)

- 텀프로젝트 이름(미정) 제작(中)

## 테이블

```
create table PUSER ( 
    u_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    u_id VARCHAR(20) UNIQUE NOT NULL,
    u_pw VARCHAR(100),
    u_token VARCHAR(200),
    u_expired VARCHAR(30));
```

```
create table SCHEDULE (
    s_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    s_user VARCHAR(20),
    s_day INT, 
    s_start TIME,
    s_end TIME,
    s_title VARCHAR(30),
    s_content VARCHAR(200),
    s_seme INT,
    s_able BOOL
);
```

```
create table MEMO (
    m_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    m_user VARCHAR(20),
    m_date DATE,
    m_content VARCHAR(200),
    s_able BOOL default FALSE
);
```

```
create table REFE ( 
    REF_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    REF_SCHE INT,
    REF_MEMO INT,
    REF_PEOPLE VARCHAR(20),
    FLAG INT NOT NULL
); # FLAG 0 SCHE 1 MEMO
```