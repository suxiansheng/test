window.onload = function () {
    let regtel = /^1[3|4|5|6|7|8]\d{9}$/;
    let regduan = /^\d{4}$/;
    let regmm = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$/;
    let tel = document.querySelector("#tell");
    let duan = document.querySelector("#duan");
    let mm = document.querySelector("#mm");
    let qur = document.querySelector("#qur");
    regexp(tel, regtel);
    regexp(duan, regduan);
    regexp(mm, regmm);
    regexp(qur, regmm);

    function regexp(ele, reg) {
        ele.onblur = function () {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = "success";
                this.nextElementSibling.innerHTML = "<i class='error-ico'></i>恭喜您输入正确";
            } else {
                this.nextElementSibling.className = "error";
                this.nextElementSibling.innerHTML = "<i class='error-ico'></i>密码不少于6位数，请重新输入";
            }
        };
    };
};