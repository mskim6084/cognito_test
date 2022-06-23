function handleForm(e){
    e.preventDefault()
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop)
    })

    let user_name = params.user_name
    console.log(user_name)
    let user_data = document.createElement('input')
    user_data.setAttribute('name','username')
    user_data.setAttribute('value',user_name)
    user_data.setAttribute('type', 'hidden')


    let form = document.getElementById('verifyForm')
    form.appendChild(user_data)
    form.submit()
}