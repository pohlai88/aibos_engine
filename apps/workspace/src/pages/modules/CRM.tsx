import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'lead' | 'prospect' | 'customer' | 'inactive';
  value: number;
  lastContact: string;
  source: string;
  assignedTo: string;
  tags: string[];
}

interface Deal {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  value: number;
  stage: 'lead' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedClose: string;
  assignedTo: string;
  lastActivity: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  customerId: string;
  customerName: string;
  role: string;
  isPrimary: boolean;
  lastContact: string;
}

const CRM: React.FC = () => {
  const { currentTenant } = useWorkspace();
  const [activeTab, setActiveTab] = useState<'customers' | 'deals' | 'contacts' | 'analytics'>('customers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Mock data - in real app this would come from API
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@acme.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Corporation',
      status: 'customer',
      value: 50000,
      lastContact: '2024-01-15',
      source: 'Website',
      assignedTo: 'Sarah Johnson',
      tags: ['enterprise', 'tech']
    },
    {
      id: '2',
      name: 'Maria Garcia',
      email: 'maria.garcia@techstart.com',
      phone: '+1 (555) 987-6543',
      company: 'TechStart Inc',
      status: 'prospect',
      value: 25000,
      lastContact: '2024-01-10',
      source: 'Referral',
      assignedTo: 'Mike Chen',
      tags: ['startup', 'saas']
    },
    {
      id: '3',
      name: 'David Wilson',
      email: 'david.wilson@globalcorp.com',
      phone: '+1 (555) 456-7890',
      company: 'Global Corp',
      status: 'lead',
      value: 75000,
      lastContact: '2024-01-08',
      source: 'Cold Call',
      assignedTo: 'Sarah Johnson',
      tags: ['enterprise', 'manufacturing']
    }
  ]);

  const [deals, setDeals] = useState<Deal[]>([
    {
      id: '1',
      title: 'Enterprise Software License',
      customerId: '1',
      customerName: 'Acme Corporation',
      value: 50000,
      stage: 'negotiation',
      probability: 75,
      expectedClose: '2024-02-15',
      assignedTo: 'Sarah Johnson',
      lastActivity: '2024-01-15'
    },
    {
      id: '2',
      title: 'SaaS Platform Subscription',
      customerId: '2',
      customerName: 'TechStart Inc',
      value: 25000,
      stage: 'proposal',
      probability: 50,
      expectedClose: '2024-02-28',
      assignedTo: 'Mike Chen',
      lastActivity: '2024-01-10'
    }
  ]);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@acme.com',
      phone: '+1 (555) 123-4567',
      customerId: '1',
      customerName: 'Acme Corporation',
      role: 'CTO',
      isPrimary: true,
      lastContact: '2024-01-15'
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@acme.com',
      phone: '+1 (555) 123-4568',
      customerId: '1',
      customerName: 'Acme Corporation',
      role: 'Procurement Manager',
      isPrimary: false,
      lastContact: '2024-01-12'
    }
  ]);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || customer.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'customer': return 'bg-success-100 text-success-700';
      case 'prospect': return 'bg-warning-100 text-warning-700';
      case 'lead': return 'bg-info-100 text-info-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'closed-won': return 'bg-success-100 text-success-700';
      case 'negotiation': return 'bg-warning-100 text-warning-700';
      case 'proposal': return 'bg-info-100 text-info-700';
      case 'lead': return 'bg-gray-100 text-gray-700';
      case 'closed-lost': return 'bg-error-100 text-error-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalValue = customers.reduce((sum, customer) => sum + customer.value, 0);
  const activeDeals = deals.filter(deal => deal.stage !== 'closed-lost' && deal.stage !== 'closed-won');
  const totalDealValue = activeDeals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Relationship Management</h1>
          <p className="text-gray-600 mt-2">
            Manage your customers, deals, and contacts in one place.
            {currentTenant && (
              <span className="block text-sm text-gray-500 mt-1">
                Workspace: {currentTenant.name}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
                                  <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-white text-xs">+</div>
          <span>Add Customer</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Users className="text-primary-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Deals</p>
              <p className="text-2xl font-bold text-gray-900">{activeDeals.length}</p>
            </div>
            <div className="p-3 bg-warning-100 rounded-lg">
              <Target className="text-warning-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <DollarSign className="text-success-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
              <p className="text-2xl font-bold text-gray-900">${totalDealValue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-info-100 rounded-lg">
              <TrendingUp className="text-info-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'customers', label: 'Customers', count: customers.length },
              { id: 'deals', label: 'Deals', count: deals.length },
              { id: 'contacts', label: 'Contacts', count: contacts.length },
              { id: 'analytics', label: 'Analytics', count: null }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-300 rounded flex items-center justify-center text-white text-xs">🔍</div>
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-gray-400 rounded flex items-center justify-center text-white text-xs">⚙️</div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="lead">Leads</option>
                <option value="prospect">Prospects</option>
                <option value="customer">Customers</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'customers' && (
            <div className="space-y-4">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">👥</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                        <p className="text-sm text-gray-500">{customer.company}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="flex items-center space-x-1 text-sm text-gray-500">
                            <div className="w-3 h-3 bg-gray-400 rounded flex items-center justify-center text-white text-xs">📧</div>
                            <span>{customer.email}</span>
                          </span>
                          <span className="flex items-center space-x-1 text-sm text-gray-500">
                            <div className="w-3 h-3 bg-gray-400 rounded flex items-center justify-center text-white text-xs">📞</div>
                            <span>{customer.phone}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${customer.value.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Value</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedCustomer(customer)}
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          <div className="w-4 h-4 bg-gray-400 rounded flex items-center justify-center text-white text-xs">👁️</div>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <div className="w-4 h-4 bg-gray-400 rounded flex items-center justify-center text-white text-xs">✏️</div>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <div className="w-4 h-4 bg-gray-400 rounded flex items-center justify-center text-white text-xs">⋯</div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>Assigned to: {customer.assignedTo}</span>
                      <span>Source: {customer.source}</span>
                      <span>Last contact: {customer.lastContact}</span>
                    </div>
                    <div className="flex space-x-1">
                      {customer.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'deals' && (
            <div className="space-y-4">
              {deals.map((deal) => (
                <div key={deal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{deal.title}</h3>
                      <p className="text-sm text-gray-500">{deal.customerName}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="flex items-center space-x-1 text-sm text-gray-500">
                          <div className="w-3 h-3 bg-gray-400 rounded flex items-center justify-center text-white text-xs">💰</div>
                          <span>${deal.value.toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1 text-sm text-gray-500">
                          <div className="w-3 h-3 bg-gray-400 rounded flex items-center justify-center text-white text-xs">🎯</div>
                          <span>{deal.probability}%</span>
                        </span>
                        <span className="flex items-center space-x-1 text-sm text-gray-500">
                          <div className="w-3 h-3 bg-gray-400 rounded flex items-center justify-center text-white text-xs">📅</div>
                          <span>{deal.expectedClose}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${deal.value.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Deal Value</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(deal.stage)}`}>
                        {deal.stage.replace('-', ' ').charAt(0).toUpperCase() + deal.stage.slice(1).replace('-', ' ')}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <div className="w-4 h-4 bg-gray-400 rounded flex items-center justify-center text-white text-xs">👁️</div>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <div className="w-4 h-4 bg-gray-400 rounded flex items-center justify-center text-white text-xs">✏️</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-info-100 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">👥</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                        <p className="text-sm text-gray-500">{contact.role} at {contact.customerName}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="flex items-center space-x-1 text-sm text-gray-500">
                            <div className="w-3 h-3 bg-gray-400 rounded flex items-center justify-center text-white text-xs">📧</div>
                            <span>{contact.email}</span>
                          </span>
                          <span className="flex items-center space-x-1 text-sm text-gray-500">
                            <div className="w-3 h-3 bg-gray-400 rounded flex items-center justify-center text-white text-xs">📞</div>
                            <span>{contact.phone}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {contact.isPrimary && (
                        <span className="px-2 py-1 bg-success-100 text-success-700 rounded text-xs font-medium">
                          Primary Contact
                        </span>
                      )}
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <div className="w-4 h-4 bg-gray-400 rounded flex items-center justify-center text-white text-xs">👁️</div>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <div className="w-4 h-4 bg-gray-400 rounded flex items-center justify-center text-white text-xs">✏️</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Status Distribution</h3>
                <div className="space-y-3">
                  {[
                    { status: 'Customers', count: customers.filter(c => c.status === 'customer').length, color: 'bg-success-500' },
                    { status: 'Prospects', count: customers.filter(c => c.status === 'prospect').length, color: 'bg-warning-500' },
                    { status: 'Leads', count: customers.filter(c => c.status === 'lead').length, color: 'bg-info-500' },
                    { status: 'Inactive', count: customers.filter(c => c.status === 'inactive').length, color: 'bg-gray-500' }
                  ].map((item) => (
                    <div key={item.status} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.status}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${(item.count / customers.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Pipeline</h3>
                <div className="space-y-3">
                  {[
                    { stage: 'Lead', count: deals.filter(d => d.stage === 'lead').length, value: deals.filter(d => d.stage === 'lead').reduce((sum, d) => sum + d.value, 0) },
                    { stage: 'Proposal', count: deals.filter(d => d.stage === 'proposal').length, value: deals.filter(d => d.stage === 'proposal').reduce((sum, d) => sum + d.value, 0) },
                    { stage: 'Negotiation', count: deals.filter(d => d.stage === 'negotiation').length, value: deals.filter(d => d.stage === 'negotiation').reduce((sum, d) => sum + d.value, 0) },
                    { stage: 'Closed Won', count: deals.filter(d => d.stage === 'closed-won').length, value: deals.filter(d => d.stage === 'closed-won').reduce((sum, d) => sum + d.value, 0) }
                  ].map((item) => (
                    <div key={item.stage} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.stage}</span>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{item.count} deals</p>
                        <p className="text-xs text-gray-500">${item.value.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CRM; 