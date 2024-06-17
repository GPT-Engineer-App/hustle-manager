import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const initialTransactions = [
  { id: 1, date: '2023-10-01', amount: 200, type: 'Income', category: 'Nike' },
  { id: 2, date: '2023-10-02', amount: 150, type: 'Expense', category: 'Adidas' },
  { id: 3, date: '2023-10-03', amount: 300, type: 'Income', category: 'Puma' },
];

function Transactions() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [form, setForm] = useState({ date: '', amount: '', type: '', category: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setTransactions(transactions.map(transaction => 
        transaction.id === currentId ? { ...transaction, ...form } : transaction
      ));
      setIsEditing(false);
      setCurrentId(null);
    } else {
      setTransactions([...transactions, { ...form, id: transactions.length + 1 }]);
    }
    setForm({ date: '', amount: '', type: '', category: '' });
  };

  const handleEdit = (id) => {
    const transaction = transactions.find(transaction => transaction.id === id);
    setForm(transaction);
    setIsEditing(true);
    setCurrentId(id);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Transactions</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-bold mb-1">Date</label>
          <input 
            type="date" 
            name="date" 
            value={form.date} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" 
            required 
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-bold mb-1">Amount</label>
          <input 
            type="number" 
            name="amount" 
            value={form.amount} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" 
            required 
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-bold mb-1">Type</label>
          <select 
            name="type" 
            value={form.type} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" 
            required
          >
            <option value="">Select Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-bold mb-1">Category</label>
          <select 
            name="category" 
            value={form.category} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" 
            required
          >
            <option value="">Select Category</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {isEditing ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </form>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="border border-gray-300 p-2">{transaction.date}</td>
              <td className="border border-gray-300 p-2">{transaction.amount}</td>
              <td className="border border-gray-300 p-2">{transaction.type}</td>
              <td className="border border-gray-300 p-2">{transaction.category}</td>
              <td className="border border-gray-300 p-2">
                <button 
                  onClick={() => handleEdit(transaction.id)} 
                  className="text-blue-500 mr-2"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => handleDelete(transaction.id)} 
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;