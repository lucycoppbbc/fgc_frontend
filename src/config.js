const dev = {
    s3: {
      REGION: "eu-west-1",
      BUCKET: "fgc-backend-dev-attachmentsbucket-f2aqktb1imjv"
    },
    apiGateway: {
      REGION: "eu-west-1",
      URL: "https://f7vav1dral.execute-api.eu-west-1.amazonaws.com/dev"
    },
    cognito: {
      REGION: "eu-west-1",
      USER_POOL_ID: "eu-west-1_4UCPCf9dj",
      APP_CLIENT_ID: "4gu9pt2h1h6s0ptnhsbe34vgq8",
      IDENTITY_POOL_ID: "eu-west-1:19bfd1ee-2f41-481b-a701-e28ea4b3121e"
    }
  };
  
  const prod = {
    s3: {
      REGION: "eu-west-1",
      BUCKET: "YOUR_PROD_S3_UPLOADS_BUCKET_NAME"
    },
    apiGateway: {
      REGION: "eu-west-1",
      URL: "YOUR_PROD_API_GATEWAY_URL"
    },
    cognito: {
      REGION: "eu-west-1",
      USER_POOL_ID: "YOUR_PROD_COGNITO_USER_POOL_ID",
      APP_CLIENT_ID: "YOUR_PROD_COGNITO_APP_CLIENT_ID",
      IDENTITY_POOL_ID: "YOUR_PROD_IDENTITY_POOL_ID"
    }
  };
  
  // Default to dev if not set
  const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;
  
  export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
  };
  