import Http from "../Helpers/Http";
import Cookies from 'js-cookie';

export function getStoredToken() {
    return Cookies.get('jwt-token');
}

export async function getAuth() {
    const res = await Http.post(
        { token: getStoredToken() },
        '/api/users/profile'
    );
    return res;
}

export async function getTokenAuth() {
    
    const res = await Http.get(
        '/api/users/profile'
    );
    console.log("GetTokenAuth",res);
    return res;
}


export function saveToken(token) {
    Cookies.set('jwt-token', token);
}

export function removeToken(){
    Cookies.remove('jwt-token');
}

/**
 * Tener esto separado ayuda a hacer cambios mucho mas rápidos.
 * Ej: Ahora no queremos que se almacene en Cookies sino que lo queremos tener en el LocalStorage
 */