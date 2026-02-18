import { useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import { useApi } from '../../hooks/useApi';
import { sellerService } from '../../api/services/seller.service';
import Loader from '../../components/common/Loader';

/**
 * Seller Dashboard Page
 * Main dashboard for sellers
 */

const SellerDashboard = () => {
    const { data: dashboardData, loading, execute } = useApi(sellerService.getDashboardData);

    useEffect(() => {
        // Uncomment when API is ready
        // execute();
    }, []);

    // Mock data for demonstration
    const stats = [
        { label: 'Total Sales', value: '$125,430', change: '+12.5%', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-green-500', positive: true },
        { label: 'Active Listings', value: '24', change: '+3', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', color: 'bg-blue-500', positive: true },
        { label: 'Pending Orders', value: '8', change: '-2', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', color: 'bg-yellow-500', positive: false },
        { label: 'Total Revenue', value: '$456,890', change: '+18.2%', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', color: 'bg-purple-500', positive: true },
    ];

    const recentProducts = [
        { id: 'CAR-001', name: 'Tesla Model 3', price: '$45,000', stock: 'In Stock', views: '1,234' },
        { id: 'CAR-002', name: 'BMW X5', price: '$65,000', stock: 'Low Stock', views: '987' },
        { id: 'CAR-003', name: 'Audi A4', price: '$42,000', stock: 'Out of Stock', views: '2,156' },
    ];

    const columns = [
        { header: 'Product ID', accessor: 'id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Price', accessor: 'price' },
        {
            header: 'Stock',
            accessor: 'stock',
            render: (value) => {
                const colors = {
                    'In Stock': 'bg-green-100 text-green-800',
                    'Low Stock': 'bg-yellow-100 text-yellow-800',
                    'Out of Stock': 'bg-red-100 text-red-800',
                };
                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value]}`}>
                        {value}
                    </span>
                );
            }
        },
        { header: 'Views', accessor: 'views' },
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
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
                        <p className="text-gray-600 mt-1">Manage your inventory and track sales performance.</p>
                    </div>
                    <Button variant="primary">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Product
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                    <p className={`text-sm mt-1 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                                        {stat.change} from last month
                                    </p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                    </svg>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Recent Products */}
                <Card
                    title="Recent Products"
                    subtitle="Your latest car listings"
                    headerAction={
                        <Button variant="outline" size="sm">View All</Button>
                    }
                >
                    <Table columns={columns} data={recentProducts} />
                </Card>

                {/* Sales Chart Placeholder */}
                <Card title="Sales Overview" subtitle="Monthly sales performance">
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="text-center">
                            <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <p className="text-gray-600 mt-2">Sales chart will be displayed here</p>
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default SellerDashboard;
