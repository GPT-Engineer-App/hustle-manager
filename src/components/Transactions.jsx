import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);

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
    closeModal();
  };

  const handleEdit = (id) => {
    const transaction = transactions.find(transaction => transaction.id === id);
    setForm(transaction);
    setIsEditing(true);
    setCurrentId(id);
    openModal();
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Transactions</h1>
      <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded mb-4">Add Transaction</button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {isEditing ? 'Update Transaction' : 'Add Transaction'}
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="mt-4">
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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