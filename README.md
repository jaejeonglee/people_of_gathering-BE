#๐ฅ๏ธ 5๊ธฐ ๋ฏธ๋ ํ๋ก์ ํธ 1์กฐ(BE)
       
+ ํ๋ช : ๋ชจ์์ ๋ฏผ์กฑ (momin)      
+ ์ฃผ์  : ๋ชจ์์ ํ๊ณ ์ ํ๋ ์ฌ๋๋ค ๋ชจ์ด๋ 
+ ์ ์๊ธฐ๊ฐ: 22.02.11 ~ 22.02.17
+ ์๋น์ค ๊ธฐ๋ฅ: ๋ค์ํ ๋ชจ์์ ๋ง๋ค๊ณ  ์ฐธ์ฌํ๊ธฐ๋ฅผ ํ  ์ ์์ต๋๋ค. 
+ ์ฐธ์ฌ์ธ์์ด ๋ค ์ฐจ๋ฉด ์๊น์ด ๋ฐ๋๋ฉด์ ๋ ์ด์ ์ฐธ์ฌ์ธ์์ ๋ชจ์งํ์ง ์์ต๋๋ค. ๋ชจ์ง ๋ง๊ฐ์ผ์ด ์ง๋๋ฉด ์๊น์ด ๋ฐ๋๋ฉด์ ์ฐธ์ฌ๋ถ๊ฐํฉ๋๋ค.  
+ BE ์ฐธ์ฌ์ธ์ 
+  [์ด์ฌ์  git ๋ฐ๋ก๊ฐ๊ธฐ](https://github.com/jaejeonglee)
+  [์ด๊ธฐ๊ณค git ๋ฐ๋ก๊ฐ๊ธฐ](https://github.com/LeeKiGon)
+  [์ค๊ฒฝ์ git ๋ฐ๋ก๊ฐ๊ธฐ](https://github.com/KyungEunO)
       
       
       
## ๐GitHub Repogitory      
      
- FrontEnd => [ FrontEndRepo ๋ฐ๋ก๊ฐ๊ธฐ ](https://github.com/borobong2/FE_momin )

- BackEnd => [ BackEndRepo ๋ฐ๋ก๊ฐ๊ธฐ ](https://github.com/jaejeonglee/people_of_gathering-BE)    

      
      
##๐  ํ๋ก์ ํธ ํ์ ํ์ด๋ธ      

* ์์์๋ฃ ์ ํ์์๊ฒ ๊ณต์  ํ ์ฆ์ Push & Merge
* ์๋ก์ ์ฝ๋ ๊ณต์ ๋ฅผ ์ํด Push ์  ํญ์ Pull 
      
- 09 : 00 ์ฒดํฌ์ธ / ๊ณต์  ๋ฐ ์์ ์ฌํญ์ ๋ํ ํ์
- 09 : 30 BackEnd ์์ํํฉ๊ณผ ์ค๋์ ๋ชฉํ ๊ณต์ 
- 12 : 00 ์ ์ฌ ์์ฌ
- 13 : 00 BackEnd ์ค์  ์งํ์ํฉ ๊ณต์ 
- 18 : 00 ์ ๋ ์์ฌ
- 19 : 00 BackEnd ์คํ ์งํ์ํฉ ๊ณต์ 
- 23 : 00 BackEnd ์ ๋ ์งํ์ํฉ ๊ณต์ 
- 23 : 00 ~ ์์ ๋กญ๊ฒ ์์ ๋ฐ ํด์     

##๐ฒ์ฌ์ฉ๊ธฐ์       
 Backend
๊ฐ๋ฐ์ธ์ด : Node.js
์นํ๋ ์์ํฌ : Express
์ํธํ : jsonwebtoken
MongoDB ๋ฐ์ดํฐ ๋ชจ๋ธ๋ง : Mongoose
Request Resource ์ ํ : Cors
DB
MongoDB           
                  
##โ [API ์ค๊ณ](https://www.notion.so/b9b3652faef14f26937b8fd8c8725736)       
      
#### User API      

|๊ธฐ๋ฅ|method|url|request|response|
|:--------:|:------------:|:--------------:|:---------------:|:---------------:|
|๋ก๊ทธ์ธ|```POST```|/user/login|```{ userId: String,password: String }```|```{ token:token, user: { token : String, userId : string, userName: string }}```|
|ํ์๊ฐ์|```POST```|/user/signup|```{ userId: String,userName:String, password: String, passwordConfirm: String }```|```์์```|
    
#### Main Page API       

|๊ธฐ๋ฅ|method|url|request|response|
|:--------:|:------------:|:--------------:|:---------------:|:---------------:|
|๋ฉ์ธํ์ด์ง|```GET```|/post|```์์```|```[ { userId: String, title: String,userName: String, createDate: String, deadLine: String, category: String, curMembers: Array, maxMembers: Number,contents: String},...]```|
|์นดํ๊ณ ๋ฆฌ๋ณ ๊ฒ์|```GET```|/post?category=|```์์```|```[ { userId: String, title: String,userName: String, createDate: String, deadLine: String, category: String, curMembers: Array, maxMembers: Number,contents: String},...]```|

#### Post API       

|๊ธฐ๋ฅ|method|url|request|response|
|:--------:|:------------:|:--------------:|:---------------:|:---------------:|
|๊ฒ์๊ธ ์์ฑ|```POST```|/post|```{ userId: String, title: String,userName: String, createDate: String, deadLine: String, category: String, curMembers: Array, maxMembers: Number,contents: String}```|```์์```|
|๊ฒ์๊ธ ์์ |```PATCH```|/post/modify/:postId|```{ userId: String, title: String,userName: String, createDate: String, deadLine: String, category: String, curMembers: Array, maxMembers: Number,contents: String}```|```?```|
|๊ฒ์๊ธ ์ญ์ |```DELETE```|/post/delete/:postId|```์์```|```์์```|
|๊ฒ์๊ธ ๋ชฉ๋ก|```GET```|/post/:postId|```์์```|```{ userId: String, title: String,userName: String, createDate: String, deadLine: String, category: String, curMembers: Array, maxMembers: Number,contents: String}```|
        
#### Comment API       
         
|๊ธฐ๋ฅ|method|url|request|response|
|:--------:|:------------:|:--------------:|:---------------:|:---------------:|
|๋๊ธ ์์ฑ|```POST```|/comment/:postId|```{ userId: String, userName: String, comment: String }```|```์์```|
|๋๊ธ ์์ |```PATCH```|/comment/:commentId|```{ userId: String, userName: String, comment: String }```|```์์```|
|๋๊ธ ์ญ์ |```DELETE```|/comment/modify/:commentId|```์์```|```์์```|
|๋๊ธ ์กฐํ|```GET```|/comment/:postId|```์์```|```[ { commentId: Number, postId: String, userId: String, userName: String, comment: String },]```|

#### Join API       

|๊ธฐ๋ฅ|method|url|request|response|
|:--------:|:------------:|:--------------:|:---------------:|:---------------:|
|์ฐธ์ฌํ๊ธฐ|```POST```|/post/join/:postId|```{ userName: String }```|```์์```|
|์ฐธ์ฌ์ทจ์|```PATCH```|/post/join/:postId|```{ userName: String }```|```์์```|

