const axios = require('axios')
const controller = {}

controller.getAll = async function (req, res){
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(function(response){
        res.status(200).json({
            message: 'Data dari Public API',
            data: response.data
        })
    })
    .catch(function (error){
        res.status(404).json({
            message: error.message
        })
    })
}

controller.post = async function (req, res) {
    try {
      const response = await axios({
        method: 'post',
        url : 'https://jsonplaceholder.typicode.com/posts',
        data : {
            title: 'foo',
            body: 'bar',
            userId: 1
          }
        });
        res.status(201).json({
            message: 'Insert Data dari Public API',
            data: response.data
        });
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  };  

  controller.put = async function (req, res) {
    try {
      const response = await axios({
        method: 'put',
        url : 'https://jsonplaceholder.typicode.com/posts/1',
        data : {
            id: 1,
            title: 'coba',
            body: 'di put',
            userId: 1
          }
        });
        res.status(201).json({
            message: 'Update Data dari Public API',
            data: response.data
        });
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  };  

  controller.delete = async function (req, res) {
    try {
      const response = await axios({
        method: 'delete',
        url : 'https://jsonplaceholder.typicode.com/posts/1',
        });
        res.status(200).json({
            message: 'Delete Data dari Public API',
            data: response.data
        });
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  }; 

module.exports = controller