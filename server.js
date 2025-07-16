const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Dummy data
let employees = [
  { id: 1, name: 'Zaahir Abrahams', position: 'Sales representitive', department: 'Sales' },
  { id: 2, name: 'Ismaeel Booley', position: 'Cashier', department: 'FrontDesk' }
];
let managers = [
  { id: 1, name: 'Arzu Joseph', position: 'Hr manager', department: 'Management' },
  { id: 2, name: 'Aayesha Majiet', position: 'Inventory Manager', department: 'Inventory' }
];

// GET all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// GET a specific employee by ID
app.get('/employees/:id', (req, res) => {
  const employee = employees.find(e => e.id === parseInt(req.params.id));
  if (!employee) return res.status(404).send('Employee not found');
  res.json(employee);
});

// GET all managers
app.get('/managers', (req, res) => {
  res.json(managers);
});

// GET a specific manager by ID
app.get('/managers/:id', (req, res) => {
  const manager = managers.find(m => m.id === parseInt(req.params.id));
  if (!manager) return res.status(404).send('Manager not found');
  res.json(manager);
});

// POST - Create a new employee
app.post('/employees', (req, res) => {
  if (!req.body.name || !req.body.position || !req.body.department) {
    return res.status(400).send('Name, position, and department are required');
  }
  const employee = {
    id: employees.length + 1,
    name: req.body.name,
    position: req.body.position,
    department: req.body.department
  };
  employees.push(employee);
  res.status(201).json(employee);
});

// POST - Create a new manager
app.post('/managers', (req, res) => {
  if (!req.body.name || !req.body.position || !req.body.department) {
    return res.status(400).send('Name, position, and department are required');
  }
  const manager = {
    id: managers.length + 1,
    name: req.body.name,
    position: req.body.position,
    department: req.body.department
  };
  managers.push(manager);
  res.status(201).json(manager);
});

// PATCH - Update an employee
app.patch('/employees/:id', (req, res) => {
  const employee = employees.find(e => e.id === parseInt(req.params.id));
  if (!employee) return res.status(404).send('Employee not found');
  if (req.body.name) employee.name = req.body.name;
  if (req.body.position) employee.position = req.body.position;
  if (req.body.department) employee.department = req.body.department;
  res.json(employee);
});

// PATCH - Update a manager
app.patch('/managers/:id', (req, res) => {
  const manager = managers.find(m => m.id === parseInt(req.params.id));
  if (!manager) return res.status(404).send('Manager not found');
  if (req.body.name) manager.name = req.body.name;
  if (req.body.position) manager.position = req.body.position;
  if (req.body.department) manager.department = req.body.department;
  res.json(manager);
});

// DELETE - Remove an employee
app.delete('/employees/:id', (req, res) => {
  const employeeIndex = employees.findIndex(e => e.id === parseInt(req.params.id));
  if (employeeIndex === -1) return res.status(404).send('Employee not found');
  const deletedEmployee = employees.splice(employeeIndex, 1);
  res.json(deletedEmployee[0]);
});

// DELETE - Remove a manager
app.delete('/managers/:id', (req, res) => {
  const managerIndex = managers.findIndex(m => m.id === parseInt(req.params.id));
  if (managerIndex === -1) return res.status(404).send('Manager not found');
  const deletedManager = managers.splice(managerIndex, 1);
  res.json(deletedManager[0]);
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});