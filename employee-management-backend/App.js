const express =  require('express');
const cors = require('cors');
const app = express();
const db= require('./Services/util/connectDb');
const fetchData = require('./Services/fetchData');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to your API!');
});

app.get('/api/fetchdata', async (req, res) => {
    try {
        const items = await fetchData.getEmployees();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/fetchdata/:id/id', async (req, res) => {
    try {
      const employee = req.params.id;
      const employeeId = await fetchData.getEmployeeIdByEmployeeId(employee);
      if (employeeId) {
        res.json({ employeeId });
      } else {
        res.status(404).json({ error: 'Employee not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.post('/api/adddata', async (req, res) => {
    try {
        const newItem = await fetchData.addEmployee(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/updatedata/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
      const updatedItem = await fetchData.updateEmployee(itemId, req.body);
      if (!updatedItem) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.delete('/api/deletedata/:id', async (req, res) => {
    try {
      const employeeId = req.params.id;
      const deletedEmployee = await fetchData.deleteEmployee(employeeId);
      if (!deletedEmployee) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
