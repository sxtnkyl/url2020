const AWS = require("aws-sdk");
//construct a service interface object
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const validUrl = require("valid-url");
const hash = require("hash.js");
const baseUrl = process.env.BASEURL;

const urlHasher = (url) => {
  let hashedUrl = hash.sha256().update(url).digest("hex");
  let shortenedHashedUrl = hashedUrl.slice(0, 3) + hashedUrl.slice(-3);
  return shortenedHashedUrl;
};

let data;
//TODO: handle POST
//https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property

//CRUD ops examples
//https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-document-client.html

exports.handler = async (event, context, callback) => {
  //event arg holds body req
  const { longUrl } = event;

  //check from source
  if (!validUrl.isUri(baseUrl)) {
    let response = {
      statusCode: 401,
      body: "Invalid Source",
    };
    callback(null, JSON.stringify(response));
  }
  //TODO: check db size: limit to 10 items

  //is sent longUrl valid?
  if (
    validUrl.isUri(longUrl) ||
    validUrl.isHttpUri(longUrl) ||
    validUrl.isHttpsUri(longUrl)
  ) {
    //update looks for params, makes new if not found
    try {
      let path = urlHasher(longUrl);
      let shortUrl = baseUrl + path;
      let params = {
        Key: {
          shortUrl: shortUrl,
        },
        UpdateExpression: "SET #P = :path, #L = :longUrl",
        ExpressionAttributeNames: {
          "#P": "path",
          "#L": "longUrl",
        },
        ExpressionAttributeValues: {
          ":path": path,
          ":longUrl": longUrl,
        },
        TableName: "urlShortener",
        ReturnValues: "ALL_NEW",
      };

      let checked = await dynamoDB.update(params).promise();
      callback(null, checked.Attributes);
      // }
    } catch (error) {
      let dbError = {
        statusCode: 401,
        body: "DB error",
      };
      callback(null, dbError);
    }
  }
  //longUrl didn't pass validUrl
  else {
    let invalidLongUrlRes = {
      statusCode: 401,
      body: "Invalid Long Url",
    };
    callback(null, invalidLongUrlRes);
  }
};
