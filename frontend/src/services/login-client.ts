
const awsExports = {
    "REGION": 'us-east-1',
    "USER_POOL_ID": import.meta.env.VITE_USER_POOL_ID,
    "USER_POOL_CLIENT_ID": import.meta.env.VITE_USER_POOL_CLIENT_ID
};

export default awsExports;