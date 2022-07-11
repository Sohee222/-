
    const btn = document.getElementById("btn");
    const id = document.getElementById("userid");
    const pw = document.getElementById("userpw");
    const pw1 = document.getElementById("userpw1");
    const name = document.getElementById("username");
    const email = document.getElementById("usermail");

    btn.addEventListener('click', function(e){
        if(id.value === ''){
            alert('아이디를 입력하세요.');
            id.focus();
            return false;
        }

        if(pw.value !== pw1.value){
            alert('암호가 일치하지 않습니다.');
            pw.focus();
            return false;                 
        }

        // 백엔드 연동 되었다고 가정.
    alert('회원가입 되었습니다.');
        window.location.href="main1.html";
});


<link href="./css/join1.css" rel="stylesheet"/>