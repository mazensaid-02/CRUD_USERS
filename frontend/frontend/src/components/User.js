import { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";

function Users() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/users")
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                const res = await axios.put(`http://localhost:5000/api/users/${editingId}`, form);
                setUsers(users.map(u => (u._id === editingId ? res.data : u)));
                setEditingId(null);
            } else {
                const res = await axios.post("http://localhost:5000/api/users", form);
                setUsers([...users, res.data]);
            }
            setForm({ name: "", email: "", password: "" });
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    const handleEdit = (user) => {
        setForm({ name: user.name, email: user.email, password: "" });
        setEditingId(user._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            setUsers(users.filter(u => u._id !== id));
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <div className="users-container">
            <h2>Users Management</h2>
            <form className="user-form" onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button type="submit">{editingId ? "Update User" : "Add User"}</button>
            </form>

            <ul className="user-list">
                {users.map((u) => (
                    <li key={u._id} className="user-item">
                        <span>{u.name} - {u.email}</span>
                        <div className="user-actions">
                            <button className="edit-btn" onClick={() => handleEdit(u)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDelete(u._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;
