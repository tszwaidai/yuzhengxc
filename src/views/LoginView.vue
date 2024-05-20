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
                    <div class="input-icon">
                        <i class="fas fa-user"></i>
                        <input type="text" placeholder="请输入用户名" />
                    </div>
                    <div class="input-icon">
                        <i class="fas fa-unlock"></i>
                        <input type="password" placeholder="请输入密码" />
                    </div>
                    <button>登录</button>
                </div>
             </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
@import url(/src/assets/font/font.css);
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'); /* 导入FontAwesome */
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
        font-family: 'font_style';
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
            i {
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                color: rgb(255, 255, 255); /* 设置图标颜色 */
            }
            input {
                width: 100%;
                height: 40px;
                padding: 5px 10px 5px 30px; /* 调整左内边距给图标留位置 */
                font-size: 16px;
                border: 1px solid #ccc;
                border-radius: 5px;
                background-color: #4c8cd0; /* 设置为蓝色背景 */
                color: white; /* 设置文字颜色 */
                ::placeholder {
                    color: rgba(255, 255, 255, 0.7); /* 设置占位符文字颜色 */
                }
            }
        }
        button {
            width: 300px;
            height: 45px;
            font-size: 18px;
            color: white;
            background-color: #007BFF;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    }
}
</style>
