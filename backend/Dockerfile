FROM node:14

#앱 디렉토리 생성
WORKDIR /app

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./

RUN npm install --save
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

# 앱 소스 추가
COPY . .

EXPOSE 8080

# Node 가 mongoDB 컨테이너가 초기화되기전에 접속하려는 시도때문에 생기는 문제 해결.
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /

RUN ["chmod", "+x", "/wait-for-it.sh"]

CMD [ "npm", "start" ]