const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../schemas/user")
const Joi = require("joi")

const router = express.Router();

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

        const user = new User({ userId, userName, password })
        await user.save()
        console.log(user)
        res.status(201).send({})

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

    const user = await User.findOne({ userId, password })

    if (!user) {
        res.status(401).send({
            errorMessage: "이메일과 비밀번호를 확인해주세요."
        })
        return
    }
    const token = jwt.sign({ userId: user.userId }, 'peopleofgethering-secret');
    res.status(200).send({ token })
})


module.exports = router;
