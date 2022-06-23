function handleForm(e){
    e.preventDefault()
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop)
    })

    let user_name = params.user_name
    console.log(user_name)
    
}