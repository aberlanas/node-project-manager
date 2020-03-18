export default class Http {

    getRequest = (data, url, method) => {
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

    static post = async (data, url) => {
        const request = this.getRequest(data, url, 'POST');
        const res = await fetch(request);
        const data = res.json();
        return data;
    };
}
