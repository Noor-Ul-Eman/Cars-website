import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import { useApi } from '../../hooks/useApi';
import { userService } from '../../api/services/user.service';
import Loader from '../../components/common/Loader';

/**
 * User Dashboard Page
 * Main dashboard for regular users
 */

const UserDashboard = () => {
    const { data: dashboardData, loading, execute } = useApi(userService.getDashboardData);

    useEffect(() => {
        // Uncomment when API is ready
        // execute();
    }, []);

    // Mock data for demonstration
    const stats = [
        { label: 'Active Orders', value: '5', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', color: 'bg-blue-500' },
        { label: 'Favorites', value: '12', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', color: 'bg-red-500' },
        { label: 'Total Spent', value: '$2,450', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-green-500' },
    ];

    const recentOrders = [
        { id: 'ORD-001', car: 'Tesla Model 3', date: '2024-02-10', status: 'Delivered', amount: '$45,000' },
        { id: 'ORD-002', car: 'BMW X5', date: '2024-02-08', status: 'In Transit', amount: '$65,000' },
        { id: 'ORD-003', car: 'Audi A4', date: '2024-02-05', status: 'Processing', amount: '$42,000' },
    ];

    const columns = [
        { header: 'Order ID', accessor: 'id' },
        { header: 'Car', accessor: 'car' },
        { header: 'Date', accessor: 'date' },
        {
            header: 'Status',
            accessor: 'status',
            render: (value) => {
                const colors = {
                    'Delivered': 'bg-green-100 text-green-800',
                    'In Transit': 'bg-blue-100 text-blue-800',
                    'Processing': 'bg-yellow-100 text-yellow-800',
                };
                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value]}`}>
                        {value}
                    </span>
                );
            }
        },
        { header: 'Amount', accessor: 'amount' },
    ];

    if (loading) {
        return (
            <DashboardLayout>
                <Loader />
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Welcome Section */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
                    <p className="text-gray-600 mt-1">Here's what's happening with your account today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Recent Orders */}
                <Card title="Recent Orders" subtitle="Your latest car orders">
                    <Table columns={columns} data={recentOrders} />
                </Card>

                {/* Quick Actions */}
                <Card title="Quick Actions">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all">
                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <div className="text-left">
                                <p className="font-medium text-gray-900">Browse Cars</p>
                                <p className="text-sm text-gray-600">Find your dream car</p>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all">
                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <div className="text-left">
                                <p className="font-medium text-gray-900">View All Orders</p>
                                <p className="text-sm text-gray-600">Track your purchases</p>
                            </div>
                        </button>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default UserDashboard;
