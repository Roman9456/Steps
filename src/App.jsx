import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [form, setForm] = useState({
    date: '',
    dist: 0,
    array: [],
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (parseInt(form.dist, 10) === 0) {
      return;
    }
    
    let exists = false;
    for (let i = 0; i < form.array.length; i++) {
      const element = form.array[i];
      if (element.date === form.date) {
        element.dist += parseInt(form.dist, 10);
        exists = true;
        break;
      }
    }

    if (!exists) {
      form.array.push({ date: form.date, dist: form.dist });
    }

    form.date = '';
    form.dist = 0;

    setForm(prevForm => ({ ...prevForm }));
  };

  const handleFormChange = ({ target }) => {
    let { name, value } = target;
    if (name === 'dist') {
      value = parseInt(value, 10);
    }
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const deleteItem = (evt) => {
    for (let i = 0; i < form.array.length; i++) {
      if (form.array[i].date === evt.target.dataset.id) {
        form.array.splice(i, 1);
      }
    }

    setForm(prevForm => ({ ...prevForm }));
  }

  return (
    <Container className='mt-5'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Выберите дату</Form.Label>
          <Form.Control 
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleFormChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Введите расстояние (в км)</Form.Label>
          <Form.Control 
            type="number"
            id="dist"
            name="dist"
            value={form.dist}
            onChange={handleFormChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Добавить
        </Button>
      </Form>
      <Table striped bordered hover className='mt-5'>
        <thead>
          <tr>
            <th className="text-center">Дата</th>
            <th className="text-center">Пройдено, км</th>
            <th className="text-center">Действия</th>
          </tr>
        </thead>
        <tbody>
          {form.array.map((elem, i) =>
            <tr key={i}>
              <td className="text-center align-middle">{elem.date}</td>
              <td className="text-center align-middle">{elem.dist}</td>
              <td className="text-center">
                <Button type="button" variant="outline-danger" data-id={elem.date} onClick={deleteItem}>Удалить</Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  )
}

export default App
