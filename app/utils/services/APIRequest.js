import request from '../api/request';
import httpMethods from '../api/httpMethods';
import Config from 'react-native-config';

function getQueryString(params) {
    return Object
        .keys(params)
        .map(k => {
            if (Array.isArray(params[k])) {
                return params[k]
                    .map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
                    .join('&')
            }

            return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
        })
        .join('&')
}

class APIRequest {
    getUrl() {
        throw new Error('Override getUrl method and get url');
    }
    getMethod() {
        throw new Error('Override getMethod method and get Method');
    }
    getBody() {
        return {};
    }
    getParams() {
        return {};
    }
    async makeRequest(inputs, { LOADING, SUCCESS, FAILED }, dispatch = () => { }) {
        try {
            const method = this.getMethod();
            let body;
            if (
                [httpMethods.POST, httpMethods.PATCH, httpMethods.PUT].includes(method)
            ) {
                body = this.getBody(inputs);
            }
            let params = this.getParams(inputs);
            dispatch({ type: LOADING, inputs });
            const queryString = getQueryString(this.getParams());
            let response = await request((Config.API_URL + this.getUrl(inputs) + queryString), { body, method });
            dispatch({ type: SUCCESS, payload: response, inputs });
            return response;
        } catch (error) {
            console.log("Error", JSON.stringify(error))
            dispatch({ type: FAILED, error, inputs });
        }
    }
}

export default APIRequest;
