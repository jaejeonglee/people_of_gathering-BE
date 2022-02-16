const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../schemas/user")
const bcrypt = require("bcrypt")
const Joi = require('joi')
const cors = require('cors')

const corsOptions = {
    origin: '*',
    // credentials: true
};

const router = express.Router();
router.use(cors(corsOptions));

//  회원 가입 양식
const registerSchema = Joi.object({
    userId: Joi
        .string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    userName: Joi
        .string()
        .required()
        .pattern(new RegExp(/^[a-zA-Z0-9가-힣]{2,8}$/)),//영문(대소문자) 한글 숫자 2~8자
    password: Joi
        .string()
        .required()
        .pattern(new RegExp(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/)),//영문(대소문자) + 최소 1개의 숫자 혹은 특수 문자 8~20자
    passwordConfirm: Joi
        .string()
        .required()
})

//회원가입
router.post("/signup", async (req, res) => {

    try {
        const { userId, userName, password, passwordConfirm } = await registerSchema.validateAsync(req.body)


        if (password.includes(userName)) {
            res.status(400).send({
                errorMessage: "사용자의 이름은 비밀번호에 사용할 수 없습니다."
            })
            return;
        }

        if (password !== passwordConfirm) {
            res.status(400).send({
                errorMessage: '비밀번호가 동일하지 않습니다.',
            })
            return;
        }

        const existId = await User.find({ userId })
        if (existId.length) {
            res.status(400).send({
                errorMessage: '이미 사용 중인 이메일입니다.'
            })
            return;
        }

        const existUsers = await User.find({ userName })
        if (existUsers.length) {
            res.status(400).send({
                errorMessage: '이미 사용 중인 이름입니다.'
            })
            return;
        }

        const hashed = await bcrypt.hash(password,10)
        const user = new User({ userId, userName, password: hashed })
        await user.save()
        console.log(user)
        res.status(201).send({ result: 'success' })

    } catch (err) {

        let whatError = err.details[0].message;
        console.log(whatError)

        if (whatError.includes('email')) {
            res.status(400).send({
                errorMessage: '이메일 형식을 확인해주세요.'
            })
        }
        if (whatError.includes('userName')) {
            res.status(400).send({
                errorMessage: '이름 형식을 확인해주세요.'
            })
        }
        if (whatError.includes('password')) {
            res.status(400).send({
                errorMessage: '비밀번호 형식을 확인해주세요.'
            })
        } 
    }
})


//로그인, 토큰생성
router.post("/login", async (req, res) => {
    const { userId, password } = req.body

    const user = await User.findOne({ userId })

    if (!user) {
        res.status(401).send({
            errorMessage: "존재하지 않는 이메일입니다."
        })
        return

    } else {
        const correctPassword = await bcrypt.compareSync(password, user.password)//hash 값과 req값을 비교해서 일치하면 true 출력 
        console.log(correctPassword)
        if (correctPassword) {
            const token = jwt.sign({ userId: user.userId }, 'peopleofgethering-secret');
    res.status(200).send({ token })
        } else {
            res.status(400).send({errorMessage: '비밀번호가 다릅니다.' })
        }
    }
  
})

//아이디(email) 중복 확인
router.post('/check/email', async (req, res) => {
    const { userId } = req.body
    console.log(req.body)

    const targetEmail = await User.find({ userId })
        if (targetEmail.length) {
            res.status(400).send({
                result: 'false'
            })
            return;
        } else {
            res.status(200).send({
                result: 'true'
            })
        }
})

//닉네임 중복 확인
router.post('/check/nickname', async (req, res) => {
    const { userName } = req.body
    console.log(req.body)

    const targetName = await User.find({ userName })
        if (targetName.length) {
            res.status(400).send({
                result: 'false'
            })
            return;
        } else {
            res.status(200).send({
                result: 'true'
            })
        }
})

module.exports = router;