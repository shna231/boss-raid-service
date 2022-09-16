# Boss-Raid-Service

<br>
'서비스 설명 이미지 등' <br>
<br>

<img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">

<br>
보스 레이드 게임 백엔드 서비스 입니다. <br>
사용자는 참여를 위해 아이디를 발급받고, 레이드에 참여합니다. <br> 
<br>
단, 이미 레이드 중인 사용자가 있을 경우 참여할 수 없습니다. <br>
레이드는 사용자가 직접 종료하거나, 제한 시간이 지나면 종료됩니다. <br>
<br>

## 목차

---

[분석 및 설계](#분석-및-설계)
<br>
[테스트 방법](#테스트-방법)
<br>
[API 명세](#api-명세)
<br>
<br>

## 분석 및 설계

---

'erd 이미지 등'
<img src="./images/cupon_service_erd.png" alt="drawing" width="800"/>

<br>

### '분석 및 이슈 1'

'설명 1'
<br>

### '분석 및 이슈 2'

'설명 2'
<br>
<br>

## 테스트 방법

---

<br>

로컬 MySQL 설치

[MySQL Community Server Downloads](https://dev.mysql.com/downloads/mysql/)

<br>

.env 파일 설정

```

USERNAME=root

PASSWORD={your_password}

DATABASE=simple_board

HOST=localhost

```

<br>

실행

```shell

yarn

npm run start

```

<br>

<br>

## API 명세 (작성 예정)a

---

### 1. [POST] 게시글 생성 (예시)

사용자로부터 게시글 비밀번호를 비롯하여 제목, 내용을 입력받고 게시글을 생성합니다.

! 제약 조건

제목 : 20자리 이내

내용 : 200자리 이내

비밀번호 :

- 6자리 이상 15자리 미만

- 영소문자와 숫자, 숫자 1개 이상

<br>

Request URL : http://localhost:3000/api/board

Request Body 예시

```json
{
  "password": "abcde1",

  "title": "❤ title",

  "content": "come contents 😽"
}
```

<br>

결과

```json
{
  "statusCode": 201,

  "message": "게시글이 등록되었습니다."
}
```

<br>

에러 케이스 1. 제목 글자 수 초과

```json
{
  "statusCode": 400,

  "message": ["title must be shorter than or equal to 20 characters"],

  "error": "Bad Request"
}
```

<br>

에러 케이스 2. 내용 글자 수 초과

```json
{
  "statusCode": 400,

  "message": ["content must be shorter than or equal to 200 characters"],

  "error": "Bad Request"
}
```

에러 케이스 3. 비밀번호 글자 수

```json
{
  "statusCode": 400,

  "message": ["password must be longer than or equal to 6 characters"],

  "error": "Bad Request"
}
```

에러 케이스 4. 비밀번호 숫자 미포함

```json
{
  "statusCode": 400,

  "message": "비밀번호에는 최소 1자 이상의 숫자가 포함되어야 합니다."
}
```

<br>

<br>

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
