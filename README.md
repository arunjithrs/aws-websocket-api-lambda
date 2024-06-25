## Setup Instructions

### 1. Create an AWS API Gateway
- **API Name:** Specify your desired API name.
- **Route Selection Expression:** Use `request.body.action` to select routes based on the request body's action field.
- **Routes:** Add the following routes:
  - `$connect`
  - `$disconnect`
  - `$default`
  - Custom Routes:
    - `setRequest`
    - `sendProgress`

### 2. Create a Lambda Function in Node.js
- **Function Setup:** Implement the Lambda function using Node.js.
- **Integration:** Use the same Lambda function for all integrations within the API Gateway.

### 3. Attach Permission Policy for Lambda
- **Policy Name:** `AmazonAPIGatewayInvokeFullAccess`
- **Configuration:** Ensure the Lambda function has the `AmazonAPIGatewayInvokeFullAccess` policy attached to perform actions through the API Gateway.

### Testing the API Gateway with WebSocket
- **Testing Tool:** Use [WebSocket King](https://websocketking.com/) to test the API Gateway.
- **WebSocket URL:** The URL is available from your API Gateway setup.
- **Testing Scenarios:**
  1. **Joining the Chat**
     - **Payload:** `{"action": "setRequest", "requestId": "test"}`
  2. **Sending Progress**
     - **Payload:** `{"action": "sendProgress", "requestId": "test1", "message": "50%"}`

