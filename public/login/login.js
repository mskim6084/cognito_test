function handleForm(e){
    e.preventDefault()
    let username = document.getElementById("username").value
    const password = document.getElementById("password").value

    //Checking for empty username or password
    if (username === null || password === null || username.length < 1 || password.length < 1){ 

        let errormsg = document.getElementById('errormsg')
        if (errormsg === null){

            const login_form = document.getElementById('login_form')
            const alertDiv = document.createElement('div')
            errormsg = document.createElement('span')
            errormsg.setAttribute('id','errormsg')

            alertDiv.classList.add("alert")
            errormsg.classList.add('msg')

            if(username === null || username.length<1){
                errormsg.innerHTML = "Username cannot be empty."
            }
            else{
                errormsg.innerHTML = "Password cannot be empty."
            }

            alertDiv.appendChild(errormsg)

            login_form.insertAdjacentElement('beforebegin', alertDiv)
        }
        else{
            if(username === null || username.length<1){
                errormsg.innerHTML = "Username cannot be empty."
            }
            else{
                errormsg.innerHTML = "Password cannot be empty."
            }
        }
        return
    }

    username = username.trim();
    username = username.replace(/\s/g,'');
    username = username.toLowerCase();
    document.getElementById("username").value = username
    document.getElementById("login_form").submit()
}