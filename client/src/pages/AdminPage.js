import React from 'react';
import AdminDashboard from '../components/AdminDashboard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminPage = () => {
    return (
        <div>
            <Header />
            <main>
                <h2>Admin Panel</h2>
                <AdminDashboard />
            </main>
            <Footer />
        </div>
    );
};

export default AdminPage;
