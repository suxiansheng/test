var yhm = document.getElementById('yhm');
var mmk = document.getElementById('mmk');
yhm.onfocus = function () {
    if (this.value === '邮箱/用户名/手机号') {
        this.value = '';
    }
    this.style.color = '#777';
}
yhm.onblur = function () {
    if (this.value === '') {
        this.value = '邮箱/用户名/手机号';
    }
    this.style.color = '#ccc';
}
mmk.onfocus = function () {
    if (this.value === '请输入密码') {
        this.value = '';
    }
    this.style.color = '#777';
    this.setAttribute("type", "password");
}
mmk.onblur = function () {
    if (this.value === '') {
        this.value = '请输入密码';
        this.setAttribute("type", "text");
        this.style.color = '#ccc';
    }
}