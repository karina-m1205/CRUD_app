const http = require('http');
const url = require('url');

const {
  handleCreate,
  handleRead,
  handleUpdate,
  handleUpdateKey,
  handleDelete,
} = require('./methods');

const server = http.createServer((req, res) => {
  const parsedURL = url.parse(req.url, true); // превращает url в объект  

  const resource = parsedURL.pathname;
  const method = req.method;

  if (resource.startsWith('/movies') && method === 'GET') {
    handleRead(req, res, resource);
  } else if (resource === '/movies' && method === 'POST') {
    handleCreate(req, res);
  } else if (resource.startsWith('/movies') && method === 'PUT') {
    handleUpdate(req, res, resource);
  }  else if (resource.startsWith('/movies') && method === 'PATCH') {
    handleUpdateKey(req, res, resource);
  }else if (resource.startsWith('/movies') && method === 'DELETE') {
    handleDelete(req, res, resource);
  } else {
    res.writeHead(404, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not found !!!' }));
  }
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server is runing on http://localhost:${PORT}`);
});
