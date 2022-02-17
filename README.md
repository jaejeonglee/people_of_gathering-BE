#🖥️ 5기 미니 프로젝트 1조(BE)
       
+ 팀명 : 모임의 민족 (momin)      
+ 주제 : 모임을 하고자 하는 사람들 모이는 
+ 제작기간: 22.02.11 ~ 22.02.17
+ 서비스 기능: 다양한 모임을 만들고 참여하기를 할 수 있습니다. 
+ 참여인원이 다 차면 색깔이 바뀌면서 더 이상 참여인원을 모집하지 않습니다. 모집 마감일이 지나면 색깔이 바뀌면서 참여불가합니다.  
+ BE 참여인원 
+  [이재정 git 바로가기](https://github.com/jaejeonglee)
+  [이기곤 git 바로가기](https://github.com/LeeKiGon)
+  [오경은 git 바로가기](https://github.com/KyungEunO)
       
       
       
## 🗂GitHub Repogitory      
      
- FrontEnd => [ FrontEndRepo 바로가기 ](https://github.com/borobong2/FE_momin )

- BackEnd => [ BackEndRepo 바로가기 ](https://github.com/jaejeonglee/people_of_gathering-BE)    

      
      
##🛠 프로젝트 타임 테이블      

* 작업완료 시 팀원에게 공유 후 즉시 Push & Merge
* 서로의 코드 공유를 위해 Push 전 항상 Pull 
      
- 09 : 00 체크인 / 공유 및 수정사항에 대한 회의
- 09 : 30 BackEnd 작업현황과 오늘의 목표 공유
- 12 : 00 점심 식사
- 13 : 00 BackEnd 오전 진행상황 공유
- 18 : 00 저녁 식사
- 19 : 00 BackEnd 오후 진행상황 공유
- 23 : 00 BackEnd 저녁 진행상황 공유
- 23 : 00 ~ 자유롭게 작업 및 휴식     

##🎲사용기술      
 Backend
개발언어 : Node.js
웹프레임워크 : Express
암호화 : jsonwebtoken
MongoDB 데이터 모델링 : Mongoose
Request Resource 제한 : Cors
DB
MongoDB           
                  
##⚙ [API 설계](https://www.notion.so/b9b3652faef14f26937b8fd8c8725736)       
      
#### User API      

|기능|method|url|request|response|
|:--------:|:------------:|:--------------:|:---------------:|:---------------:|
|로그인|```POST```|/user/login|```{ userId: String,password: String }```|```{ token:token, user: { token : String, userId : string, userName: string }}```|
|회원가입|```POST```|/user/signup|```{ userId: String,userName:String, password: String, passwordConfirm: String }```|```없음```|
    
#### Main Page API       

|기능|method|url|request|response|
|:--------:|:------------:|:--------------:|:---------------:|:---------------:|
|메인페이지|```GET```|/post|```없음```|```[ { userId: String, title: String,userName: String, createDate: String, deadLine: String, category: String, curMembers: Array, maxMembers: Number,contents: String},...]```|
|카테고리별 검색|```GET```|/post?category=|```없음```|```[ { userId: String, title: String,userName: String, createDate: String, deadLine: String, category: String, curMembers: Array, maxMembers: Number,contents: String},...]```|

#### Post API       

|기능|method|url|request|response|
|:--------:|:------------:|:--------------:|:---------------:|:---------------:|
|게시글 작성|```POST```|/post|```{ userId: String, title: String,userName: String, createDate: String, deadLine: String, category: String, curMembers: Array, maxMembers: Number,contents: String}```|```없음```|
|게시글 수정|```PATCH```|/post/modify/:postId|```{ userId: String, title: String,userName: String, createDate: String, deadLine: String, category: String, curMembers: Array, maxMembers: Number,contents: String}```|```?```|
|게시글 삭제|```DELETE```|/post/delete/:postId|```없음```|```없음```|
|게시글 목록|```GET```|/post/:postId|```없음```|```{ userId: String, title: String,userName: String, createDate: String, deadLine: String, category: String, curMembers: Array, maxMembers: Number,contents: String}```|
        
#### Comment API       
         
|기능|method|url|request|response|
|:--------:|:------------:|:--------------:|:---------------:|:---------------:|
|댓글 작성|```POST```|/comment/:postId|```{ userId: String, userName: String, comment: String }```|```없음```|
|댓글 수정|```PATCH```|/comment/:commentId|```{ userId: String, userName: String, comment: String }```|```없음```|
|댓글 삭제|```DELETE```|/comment/modify/:commentId|```없음```|```없음```|
|댓글 조회|```GET```|/comment/:postId|```없음```|```[ { commentId: Number, postId: String, userId: String, userName: String, comment: String },]```|

#### Join API       

|기능|method|url|request|response|
|:--------:|:------------:|:--------------:|:---------------:|:---------------:|
|참여하기|```POST```|/post/join/:postId|```{ userName: String }```|```없음```|
|참여취소|```PATCH```|/post/join/:postId|```{ userName: String }```|```없음```|

