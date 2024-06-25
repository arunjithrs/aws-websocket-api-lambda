import { ApiGatewayManagementApiClient, PostToConnectionCommand  } from "@aws-sdk/client-apigatewaymanagementapi";

const requests = {};

const ENDPOINT = 'https://1l2w9fkzea.execute-api.ap-south-1.amazonaws.com/production';
const client = new ApiGatewayManagementApiClient({ endpoint: ENDPOINT });

export const handler = async (event) => {
  const sendProgress = async (id, body) => {
   try {
      const command = new PostToConnectionCommand({
        'ConnectionId': id,
        'Data': Buffer.from(JSON.stringify(body)),
      });

      await client.send(command);
    } catch (err) {
      console.error(err);
    }
  }
  
  
  if(event.requestContext) {
    const connectionId = event.requestContext.connectionId;
    const routekey = event.requestContext.routeKey;
    let body = {};
    
    try {
      if(event.body) {
        body = JSON.parse(event.body);
      }
    } catch(e) {
      console.log(e);
    }
     
    switch(routekey) {
      case '$connect':
        break;
        
      case '$disconnect':
        delete requests[connectionId];
        break;
      
      case '$default':
        break;
        
      case 'setRequest':
        requests[connectionId] = body.requestId;
        await sendProgress(connectionId, { systemMessage: `${connectionId} has joined the chat` })
        break;
        
      case 'sendProgress':
        let key = Object.keys(requests).find(k=>requests[k]===body.requestId);
        await sendProgress(key, { privateMessage: `${connectionId}: ${body.message}` });
        break;
        
      default: 
        break;
    }
  }
  
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
