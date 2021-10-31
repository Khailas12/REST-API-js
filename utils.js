// retrieves data from the client on the server
function getReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            // chunk splits x into either a fixed number of groups, or into a variable number of groups with a fixed number of maximum elements
            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', () => {
                resolve(body);  // send back the data
            });
        }
        catch (error) {
            reject(error);
        }
    });
}

module.exports = { getReqData };