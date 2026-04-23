import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    itemName: "",
    description: "",
    type: "",
    location: "",
    contactInfo: ""
  });
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch items
  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add or Update item
  const addOrUpdateItem = async () => {
    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/items/${editId}`,
          form,
          { headers: { Authorization: token } }
        );
        setEditId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/items",
          form,
          { headers: { Authorization: token } }
        );
      }

      // Reset form
      setForm({
        itemName: "",
        description: "",
        type: "",
        location: "",
        contactInfo: ""
      });

      fetchItems();
    } catch (err) {
      alert("Error saving item");
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`, {
      headers: { Authorization: token }
    });
    fetchItems();
  };

  // Edit item
  const editItem = (item) => {
    setForm({
      itemName: item.itemName,
      description: item.description,
      type: item.type,
      location: item.location,
      contactInfo: item.contactInfo || ""
    });
    setEditId(item._id);
  };

  // Search
  const searchItem = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/items/search?name=${search}`
    );
    setItems(res.data);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand">Lost & Found</span>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </nav>

      <div className="container mt-4">

        {/* Add / Update Form */}
        <div className="card p-3 mb-4 shadow">
          <h5>{editId ? "Update Item" : "Add Item"}</h5>

          <input
            className="form-control mb-2"
            placeholder="Item Name"
            value={form.itemName}
            onChange={(e) => setForm({ ...form, itemName: e.target.value })}
          />

          <input
            className="form-control mb-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            className="form-control mb-2"
            placeholder="Type (Lost/Found)"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />

          <input
            className="form-control mb-2"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          {/* ✅ CONTACT INFO (ADDED) */}
          <input
            className="form-control mb-2"
            placeholder="Contact Info"
            value={form.contactInfo}
            onChange={(e) => setForm({ ...form, contactInfo: e.target.value })}
          />

          <button className="btn btn-primary" onClick={addOrUpdateItem}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* Search */}
        <div className="input-group mb-4">
          <input
            className="form-control"
            placeholder="Search items..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-outline-primary" onClick={searchItem}>
            Search
          </button>
        </div>

        {/* Items Grid */}
        <div className="row">
          {items.map((i) => (
            <div className="col-md-4 mb-3" key={i._id}>
              <div className="card shadow-sm p-3 h-100">
                <h5>{i.itemName}</h5>
                <p>{i.description}</p>

                <p>
                  <span className="badge bg-info text-dark">{i.type}</span>{" "}
                  <span className="badge bg-secondary">{i.location}</span>
                </p>

                <p><b>Contact:</b> {i.contactInfo}</p>

                <div className="d-flex justify-content-between mt-auto">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => editItem(i)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteItem(i._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;