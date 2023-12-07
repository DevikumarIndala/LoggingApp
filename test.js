

function approveLeaveRequest( empId, managerId, reqId){
    if(!empId) return "404 empId missing"
    if(!managerId) return "404 managerId missing"
    if(!reqId) return "404 reqId missing";

    const empDetails = getEmployee(empId);
    if(!empDetails) return "404 Employee Id missing"
    const managerDetails = getManager(managerId);
    if(!managerDetails) return "404 Mannager Id missing"

    if(empDetails.leaveBalance >0){
        empDetails.leaveBalance--;
        save(empDetails)
        return "201"
    }
    else if(error){
        return "XXX  leaves not enough"
    }else{
        return "500  leaves not enough"
        HTTPS
    }

}

function approveLeaveRequest2( empId, managerId, reqId){
    try{

        
    const empDetails = getEmployee(empId);
        if(empDetails.leaveBalance >0){
            empDetails.leaveBalance--;
            save(empDetails)
            return "201"
        }
    }catch(error){
        return "XXX error"
    }

}



// const express = require('express');
// const app = express();

// // Route handling
// app.get('/', (req, res) => {
//   res.send('Welcome to the homepage!');
// });

// // Common HTTP status codes and messages
// const errors = [
//   { code: 400, message: 'Error 400: Bad Request' },
//   { code: 401, message: 'Error 401: Unauthorized' },
//   { code: 402, message: 'Error 402: Payment Required' },
//   { code: 403, message: 'Error 403: Forbidden' },
//   { code: 404, message: 'Error 404: Page Not Found' },
//   { code: 405, message: 'Error 405: Method Not Allowed' },
//   { code: 406, message: 'Error 406: Not Acceptable' },
//   { code: 407, message: 'Error 407: Proxy Authentication Required' },
//   { code: 408, message: 'Error 408: Request Timeout' },
//   { code: 409, message: 'Error 409: Conflict' },
//   { code: 410, message: 'Error 410: Gone' },
//   { code: 411, message: 'Error 411: Length Required' },
//   { code: 412, message: 'Error 412: Precondition Failed' },
//   { code: 413, message: 'Error 413: Payload Too Large' },
//   { code: 414, message: 'Error 414: URI Too Long' },
//   { code: 415, message: 'Error 415: Unsupported Media Type' },
//   { code: 416, message: 'Error 416: Range Not Satisfiable' },
//   { code: 417, message: 'Error 417: Expectation Failed' },
//   { code: 418, message: "Error 418: I'm a teapot" },
//   { code: 421, message: 'Error 421: Misdirected Request' },
//   { code: 422, message: 'Error 422: Unprocessable Entity' },
//   { code: 423, message: 'Error 423: Locked' },
//   { code: 424, message: 'Error 424: Failed Dependency' },
//   { code: 425, message: 'Error 425: Too Early' },
//   { code: 426, message: 'Error 426: Upgrade Required' },
//   { code: 428, message: 'Error 428: Precondition Required' },
//   { code: 429, message: 'Error 429: Too Many Requests' },
//   { code: 431, message: 'Error 431: Request Header Fields Too Large' },
//   { code: 451, message: 'Error 451: Unavailable For Legal Reasons' },
//   { code: 500, message: 'Error 500: Internal Server Error' },
//   { code: 501, message: 'Error 501: Not Implemented' },
//   { code: 502, message: 'Error 502: Bad Gateway' },
//   { code: 503, message: 'Error 503: Service Unavailable' },
//   { code: 504, message: 'Error 504: Gateway Timeout' },
//   { code: 505, message: 'Error 505: HTTP Version Not Supported' },
//   { code: 506, message: 'Error 506: Variant Also Negotiates' },
//   { code: 507, message: 'Error 507: Insufficient Storage' },
//   { code: 508, message: 'Error 508: Loop Detected' },
//   { code: 510, message: 'Error 510: Not Extended' },
//   { code: 511, message: 'Error 511: Network Authentication Required' },
//   { code: 599, message: 'Error 599: Network Connect Timeout Error' }
// ];

// // Creating routes dynamically for each error
// errors.forEach(error => {
//   app.get(`/errorcode/${error.code}`, (req, res) => {
//     res.status(error.code).send(error.message);
//   });
// });


// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
