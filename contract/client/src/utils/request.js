import axios from 'axios'

class Storage {
    static getItem(key) {
        return localStorage.getItem(key)
    }

    static setItem(key, value) {
        return localStorage.setItem(key, value)
    }

    static removeItem(key) {
        return localStorage.removeItem(key)
    }
}

class Request {
    constructor(config = {}) {
        this.prefix = config.prefix || '/api'
        this.req = axios.create({})
    }

    request = (url, method, data) => {
        const urlPath = this.prefix + url
        const token = Storage.getItem('authToken')
        // TODO: check expiry
        if (token) {
            this.req.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        let prom
        if (data) {
            prom = this.req[method](urlPath, data)
        } else {
            prom = this.req[method](urlPath)
        }
        return new Promise((res, rej) => {
            prom.then(resp => {
                res(resp.data)
            }).catch(err => {
                rej(err.response)
            })
        })
    }

    get = (url) => {
        return this.request(url, 'get')
    }

    put = (url, data) => {
        return this.request(url, 'put', data)
    }

    patch = (url, data) => {
        return this.request(url, 'patch', data)
    }

    delete = (url) => {
        return this.request(url, 'delete')
    }

    post = (url, data) => {
        return this.request(url, 'post', data)
    }
}

export class AuthService {
    static login = (username, password) => {
        const userToLogin = {
            username: username,
            password: password
        }
        return api.post('/login', userToLogin)
            .then(resp => {
                Storage.setItem('authToken', resp.token)
                return resp
            })
    }

    static signup = (username, password) => {
        const userToRegister = {
            username: username,
            password: password
        }
        return api.post('/registration', userToRegister)
    }

    static logout = () => {
        return new Promise((res, rej) => {
            Storage.removeItem('authToken')
            res(true)
        })
    }

    static checkToken(token) {

    }

    static isAuthenticated = () => !!Storage.getItem('authToken')
}

const api = new Request()
api.login = AuthService.login
api.signup = AuthService.signup
api.logout = AuthService.logout

export default api