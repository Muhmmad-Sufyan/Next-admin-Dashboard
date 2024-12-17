const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const filePath = path.resolve(__dirname, '../../data/db.json');
  const data = JSON.parse(readFileSync(filePath, 'utf8'));

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }

  if (event.httpMethod === 'POST') {
    const newData = JSON.parse(event.body);
    data.push(newData);
    writeFileSync(filePath, JSON.stringify(data, null, 2));
    return {
      statusCode: 201,
      body: JSON.stringify(newData),
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method not allowed' }),
  };
};
