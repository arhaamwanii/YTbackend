class ApiResponse{
    constructor(statusCode , data , message = "Success"){
        this.statusCode == statusCode 
        this.data = data
        this.message = message 
        this.success = statusCode < 400
    }
}

export {ApiResponse}

// api servers have status code

// 100-199 : informational Response
// 200-299 :  successful response 
// 300-399 : redirection message
// 400-499 : client error response
// 500-599 : server error response
