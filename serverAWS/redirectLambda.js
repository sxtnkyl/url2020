const AWS = require("aws-sdk");
//construct a service interface object
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const baseUrl = process.env.BASEURL;
let data;

exports.handler = async (event, context, callback) => {
  console.log("hi! im the redirect!", event);
  //enable lambda proxy integration in API Gateway to get access to event obj
  const { shortUrl } = event.pathParameters;
  const short = baseUrl + shortUrl;
  let params = {
    Key: {
      shortUrl: short,
    },
    TableName: "urlShortener",
  };

  try {
    data = await dynamoDB.get(params).promise();
  } catch (err) {
    console.log("catch error:", err);
  }
  console.log(data);
  const response = {
    statusCode: 308,
    headers: {
      Location: data.Item.longUrl,
    },
  };
  //https://stackoverflow.com/questions/31633912/how-to-wait-for-async-actions-inside-aws-lambda
  return callback(null, response);
};
