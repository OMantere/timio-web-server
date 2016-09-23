import * as actionTypes from 'actions/actionTypes'

const baseUrl = 'http://localhost:3000';

export function fetchUserData() {
    const request = GETRequest(baseUrl + '/api/user');
    return FSA(actionTypes.FETCH_DATA, request);
}

export function signOut() {
    const request = DELETERequest(baseUrl + '/users/sign_out');
    return FSA(actionTypes.SIGN_OUT, request);
}



function FSA(type, payload, meta) {
    return { type, payload, meta };
}

function GETRequest(url) {
    return JSONResponse(fetch(new Request (url, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        method: 'GET'
    })));
}

function DELETERequest(url) {
    return JSONResponse(fetch(new Request (url, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        method: 'DELETE'
    })));
}

function POSTRequest(url, data, raw) {
    return JSONResponse(fetch(new Request (url, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        method: 'POST',
        body: raw ? data : JSON.stringify(data)
    })));
}

function PUTRequest(url, data, raw) {
    return JSONResponse(fetch(new Request (url, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        method: 'PUT',
        body: raw ? data : JSON.stringify(data)
    })));
}

function JSONResponse(requestPromise) {
    return new Promise(resolve => {
        requestPromise.then(response => {
            response.text().then(raw => {
                let json = {};
                // Catch JSON parsing errors
                try { json = JSON.parse(raw); } catch(e) { /**/ }
                resolve({data: json, status: response.status});
            });
        });
    });
}
