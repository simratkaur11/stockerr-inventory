// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../utils/axiosInstance'; // use your axios with token
// import { useAuth } from '../context/AuthContext';

// function Dashboard() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

// useEffect(() => {
//   if (!user) {
//     navigate('/login'); // 🔐 redirect to login if not logged in
//   }
// }, [user, navigate]);

//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({ name: '', price: '', stock: '' });

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await axios.get('/products');
//         setProducts(data);
//       } catch (err) {
//         console.error('Failed to load products', err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post('/products', form);
//       setProducts([...products, data]);
//       setForm({ name: '', price: '', stock: '' });
//     } catch (err) {
//       alert('Failed to add product');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/products/${id}`);
//       setProducts(products.filter((p) => p._id !== id));
//     } catch (err) {
//       alert('Failed to delete');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>

//       <form onSubmit={handleAdd} className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="border p-2 flex-1"
//           required
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//           className="border p-2 w-24"
//         />
//         <input
//           type="number"
//           placeholder="Stock"
//           value={form.stock}
//           onChange={(e) => setForm({ ...form, stock: e.target.value })}
//           className="border p-2 w-24"
//         />
//         <button className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
//       </form>

//       <ul>
//         {products.map((product) => (
//           <li key={product._id} className="border-b py-2 flex justify-between items-center">
//             <span>{product.name} — ₹{product.price} — Stock: {product.stock}</span>
//             <button onClick={() => handleDelete(product._id)} className="text-red-500">Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Dashboard;




import { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { Container, Form, Button, Row, Col, Table, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Dashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', stock: '' });
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/products');
        setProducts(data);
      } catch (err) {
        toast.error('Failed to load products');
      }
    };
    fetchProducts();
  }, [user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/products', form);
      setProducts([...products, data]);
      toast.success('Product added!');
      setForm({ name: '', price: '', stock: '' });
    } catch (err) {
      toast.error('Failed to add product');
    }
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/products/${productToDelete._id}`);
      setProducts(products.filter((p) => p._id !== productToDelete._id));
      toast.success('Product deleted!');
      setShowConfirm(false);
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const startEdit = (product) => {
  setIsEditing(true);
  setCurrentProduct(product);
  setForm({ name: product.name, price: product.price, stock: product.stock });
};

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.put(`/products/${currentProduct._id}`, form);
    const updatedList = products.map((p) => (p._id === data._id ? data : p));
    setProducts(updatedList);
    setIsEditing(false);
    setForm({ name: '', price: '', stock: '' });
    toast.success('Product updated!');
  } catch (err) {
    toast.error('Failed to update product');
  }
};

  return (
    <div
  style={{
    backgroundColor: '#eaeef3ff', // Bootstrap's lightest gray
    minHeight: '100vh',
    paddingTop: '2rem',
  }}
>
  <Container className="bg-white p-4 rounded shadow-sm">
    
      <h2 className="mb-4">Welcome, {user?.name}</h2>

      <Form onSubmit={isEditing ? handleUpdate :handleAdd}>
        <Row className="align-items-end">
          <Col md={4}>
            <Form.Group controlId="name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. iPhone"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="price">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button type="submit" className="w-100 mt-2">
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="mt-4 text-muted">
  Total Products: <strong>{products.length}</strong> | Total Stock:{' '}
  <strong>{products.reduce((acc, p) => acc + Number(p.stock || 0), 0)}</strong>
</div>

      <h4 className="mt-5">All Products</h4>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">No products yet.</td>
            </tr>
          )}
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              {/* <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => confirmDelete(product)}
                >
                  Delete
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => startEdit(product)}
                  className="me-2"
                  >
                 Edit
                </Button>
              </td> */}
              <td>
  <Button
    variant="warning"
    size="sm"
    onClick={() => startEdit(product)}
    className="me-2"
  >
    Edit
  </Button>
  <Button
    variant="danger"
    size="sm"
    onClick={() => confirmDelete(product)}
  >
    Delete
  </Button>
</td>

            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{productToDelete?.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
}

export default Dashboard;
