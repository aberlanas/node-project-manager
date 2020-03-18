export default class Http {

    static getRequest = (data, url, method) => {
        const init = {
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };
        const request = new Request(url, init);
        return request;
    }

    static post = async (body, url) => {
        const request = this.getRequest(body, url, 'POST');
        const res = await fetch(request);
        const data = res.json();
        return data;
    };
}
