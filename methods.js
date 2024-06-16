let data = []; // сюда добавляем данные

const handleCreate = (req, res) => {
  let body = '';

  req.on('data', (chunk) => { // "data" - это событие, с помощью req.on - устанавливаем событию "data" колбэк функцию. когда все данные получены,срабатывает событие end.
    body += chunk.toString();
  });

  req.on('end', () => { // "end" -событие. 
    const item = JSON.parse(body);
    data.push(item);
    res.writeHead(201, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'You have successfully add movies' }));
  });
};

const handleRead = (req, res, requestURL) => {
  const id = requestURL.split('/')[2];
  res.writeHead(200, { 'Content-type': 'application/json' });
  if (data[id]) {
    res.end(JSON.stringify(data[id]));
  } else {
    res.end(JSON.stringify(data));
  }
};

const handleUpdate = (req, res, requestURL) => {
  const id = requestURL.split('/')[2];

  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString(); // byte to string conversion
  });

  req.on('end', () => {
    const updatedData = JSON.parse(body);
    let flag = false;
    if (data[id]) {
      data[id] = updatedData;
      flag = true;
    }

    if (flag) {
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(updatedData));
    } else {
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ message: 'Kneres' }));
    }
  });
};

const handleUpdateKey = (req, res, requestURL) => {
  const id = requestURL.split('/')[2];

  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString(); // byte to string conversion
  });

  req.on('end', () => {
    const updatedData = JSON.parse(body);
    let flag = false;
    if (data[id]) {
      for (let key of Object.keys(updatedData)) {
        data[id][key] = updatedData[key];
      }
      flag = true;
    }

    if (flag) {
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(updatedData));
    } else {
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ message: 'Kneres' }));
    }
  });
};


const handleDelete = (req, res, requestURL) => {
  const id = requestURL.split('/')[2];
  if (data[id]) {
    data.splice(id, 1);
    res.end(JSON.stringify(data[id]));
  } else {
    data = [];
    res.end(JSON.stringify(data));
  }
};

module.exports = {
  handleCreate,
  handleRead,
  handleUpdate,
  handleUpdateKey,
  handleDelete,
};
