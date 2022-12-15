const userUrl='http://localhost:3000/users'
let signUpBtn=document.getElementById('sign-up-btn')
let signInBtn=document.getElementById('sign-in-btn')

signUpBtn.addEventListener('click', signUp)
signInBtn.addEventListener('click', signIn)

// Sign up
function signUp(e){
    e.preventDefault()
    let nameInp=document.getElementById('name-up').value
    let emailInp=document.getElementById('email-up').value
    let phoneInp=document.getElementById('phone-up').value
    let passInp=document.getElementById('password-up').value

    if(nameInp.length<3 || nameInp==""){
        alert('Enter a valid Name!')
        return
    }else if(emailInp.indexOf('@')==-1){
        alert('Enter a valid Email ID!')
        return
    }else if(phoneInp.length<10 || isNaN(phoneInp)){
        alert("Enter a valid Phone No!")
        return
    }else if(passInp.length<5){
        alert("Enter a Strong Password!")
        return
    }else{
        document.getElementById('name-up').value=""
        document.getElementById('email-up').value=""
        document.getElementById('phone-up').value=""
        document.getElementById('password-up').value=""

        axios({
                method : 'post',
                url : userUrl,
                data: {
                    name: nameInp,
                    email: emailInp,
                    phone: phoneInp,
                    password: passInp
                }
        }).then(response=>{
            if(response.data[1]==false){
                alert("You already have an account with us! Please Login...")
            }
            else{
                alert("Sign Up Successful!")
            }
        }).catch(err=>err)
    }
}
