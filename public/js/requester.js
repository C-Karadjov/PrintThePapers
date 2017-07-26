/* globals $ */

const requester = (function() {
    return {
        getJSON(url, headers={}) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: url,
                    method: 'GET',
                    contentType: 'application/json',
                    headers: headers,
                })
                    .done(resolve)
                    .fail(reject);
            });
        },
        postJSON(url, body, headers={}) {
            return new Promise((resolve, reject)=>{
                $.ajax({
                    url: url,
                    method: 'POST',
                    contentType: 'application/json',
                    headers: headers,
                    data: JSON.stringify(body),
                })
                    .done(resolve)
                    .fail(reject);
            });
        },
    };
}());
