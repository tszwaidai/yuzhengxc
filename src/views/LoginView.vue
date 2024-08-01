<template>
    <div class="login">
        <div class="login-bg">
            <img src="../assets/bg_pic.png"/>
        </div>
        <div class="login-box">
            <span>宁波市智慧渔政视频预警服务系统</span>
            <div>
                <img src="../assets/bg_login.png"/>
                <div class="login-form">
                    <form @submit.prevent="handleLogin">
                        <div class="input-icon">
                            <img src="../assets/icon_accout.png" class="icon"/>
                            <input type="text" v-model="username" placeholder="请输入用户名"  required/>
                        </div>
                        <div class="input-icon">
                            <img src="../assets/icon_pasword.png" class="icon"/>
                            <input type="password" v-model="password" placeholder="请输入密码" required/>
                        </div>
                        <button type="submit">登录</button>
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name : 'login',
    data() {
        return {
           username:'',
           password:'', 
        }
    },
    methods: {
        async handleLogin() {
            try {
                const response = await this.$axios.post('/user/login', {
                    username: this.username,
                    password: this.password
                });
                console.log(response.data.code);
                if (response.data.code == 200) {
                    // 登录成功 跳转主页
                    this.$router.push({ name: 'home' });
                } else {
                    alert("用户名或密码错误");
                }
            } catch (error) {
                console.log(error);
                
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import url(/src/assets/font/font.css);
@import url(/src/assets/font/font2.css);



.login {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    background-image: url('../assets/bg_bottom.png');
}
.login-bg {
    img {
        width: 525px;
        margin-top: 140px;
        margin-left: 100px;
    }
}
.login-box {
    span {
        font-size: 30px;
        margin-left: 910px;
        top: -530px;
        color: white;
        font-family: 'font2_style';
        position: relative;
        text-shadow: 0 0 10px white;
    }
    img {
        width: 400px;
        top: -520px;
        margin-left: 933px;
        position: relative;
    }
    .login-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        top: -760px;
        margin-left: 800px;
        .input-icon {
            position: relative;
            width: 300px;
            margin-bottom: 20px;
            .icon {
                position: absolute;
                left: -920px;
                top: 50%;
                transform: translateY(-50%);
                width: 20px;
                height: 20px;
            }
            input {
                width: 100%;
                height: 40px;
                padding: 5px 10px 5px 40px; /* 调整左内边距给图标留位置 */
                font-size: 16px;
                border: 1px solid #ccc;
                border-radius: 5px;
                background-color: #4c8cd0be; /* 设置为蓝色背景 */
                color: white; /* 设置文字颜色 */
                &::placeholder {
                    color: rgba(255, 255, 255, 0.665); /* 设置占位符文字颜色 */
                    font-weight: bold; /* 设置占位符文字加粗 */
                }
            }
        }
        button {
            width: 300px;
            height: 45px;
            font-size: 18px;
            font-weight: bold;
            color: white;
            background-color: #007BFF;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    }
}
</style>
