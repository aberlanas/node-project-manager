const HOST = "http://localhost:3000"

// Credentials: 'include' nos permite reenviar automaticamente 
// la cookie httponly de manera segura entre cliente-servidor

export default class Http {
    static getRequest = (data, url, method) => {
        const init = {
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        }
        return new Request(`${HOST}${url}`, init)
    }

    static post = async (body, url) => {
        const request = this.getRequest(body, url, "POST")
        const res = await fetch(request)
        if (res.status !== 200){
            return ({message:"DB Problem: No puedes pasar!"});
        }
        return await res.json()
    }


    static postPDF = async (body, url) => {
        const request = this.getRequest(body, url, "POST")
        const res = await fetch(request)
        if (res.status !== 200){
            return ({message:"DB Problem: No puedes pasar!"});
        }
        return await res.blob();
    }

    static put = async (body, url) => {
        const request = this.getRequest(body, url, "PUT")
        const res = await fetch(request)
        return await res.json()
    }

    static get = async url => {
        const res = await fetch(`${HOST}${url}`, {
            
            credentials: "include",
        })
        return await res.json()
    }

    static delete = async url => {
        const res = await fetch(`${HOST}${url}`, {
            
            credentials: "include",
            method: "DELETE"
        })
        return await res.json()
    }
}
