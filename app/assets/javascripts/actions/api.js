import * as actionTypes from 'actions/actionTypes'

export function fetchUserData() {
    const request = GETRequest('http://localhost:3000/api/user');
    return {
        type: actionTypes.FETCH_DATA,
        payload: request
    }
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
