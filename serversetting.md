ubuntu - nginx - node - mariadb

1. nginx

# nginx 초기 설정
apt install -y nginx
vim /etc/nginx/site-available/api

``` # 설정파일 기본 세팅

server {
    listen 80;
    server_name conota.cf;

    location / {
        proxy_set_header X-Reel-IP $remote_addr;
        proxy_pass  http://127.0.0.1:8080/
    }
}

```

# avail - enabled 연결
ln -s /etc/nginx/site-available/api /etc/nginx/site-enabled/api
systemctl restart nginx

# 80번 방화벽 허용
ufw allow 80/tcp

2. node

apt install -y node npm

npm init
npm install -y express

``` # index.js 기본 세팅

var express = require('app');
var app = express();
var port = 8080;

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(port, ()=>{cosnole.log('listen')});

```

3. mairadb

# mairadb 설치
apt -y install mariadb-server

# mariadb 시간대 설정
mysql -u root -p
mysql # 비밀번호 입력

set global time_zone='Asia/Seoul'
set time_zone='Asia/Seoul'

# 설정 완료 확인
select @@global.time_zone, @@system_time_zone;
select NOW();

# Nodejs 연동
npm install --save mysql

========================
4. CORS해결은 직접 찾아서 하시고

5. 텀프


