<template>
    <div class="d-login d-box-middle">
        <div style="width: 300px;">
            <el-form ref="loginForm"
                     :model="loginForm"
                     :rules="loginFormRules"
                     label-width="0px">
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <el-row>
                <el-button class="d-login-btn" type="primary" @click="doLogin">登录</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {login} from '../../services/sso'
    export default {
        data () {
            return {
                loginForm: {
                    userName: '',
                    password: ''
                },
                loginFormRules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { type: 'string', pattern: /^[A-Za-z]+[A-Za-z0-9_]*[A-Za-z0-9]*$/, message: '只能包含数字、字母、下划线,字母开头', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            doLogin () {
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        login({username: this.username, password: this.password}).then(res => {
                            let redirect = this.$route.query.redirect
                            if (redirect) {
                                window.location.href = redirect
                            } else {
                                this.$router.push('/auth')
                            }
                        }).catch(this.handleError)
                    }
                })

            }
        }
    }
</script>

<style>
    .d-login {
        width: 100%;
        height: 100%;
        background: url(../../assets/login_bg.jpeg) no-repeat center;
        background-size: 100% 100%;
    }

    .d-login-btn {
        width: 100%;
    }

    .d-login .el-form-item__error {
        font-weight: 700;
    }
</style>
