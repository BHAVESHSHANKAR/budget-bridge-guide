
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Calendar, PieChart, BarChart3, Plus, Activity, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import TransactionForm, { Transaction } from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyChart from '@/components/MonthlyChart';
import FinancialSummary from '@/components/FinancialSummary';
import CategoryChart from '@/components/CategoryChart';
import { saveTransactions, loadTransactions, generateId } from '@/utils/storage';

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();
  const { toast } = useToast();

  // Load transactions on component mount
  useEffect(() => {
    const loadedTransactions = loadTransactions();
    setTransactions(loadedTransactions);
  }, []);

  // Save transactions whenever they change
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const handleAddTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: generateId()
    };
    
    setTransactions(prev => [...prev, newTransaction]);
    setShowAddForm(false);
    
    toast({
      title: "Transaction added successfully",
      description: `${transactionData.type === 'income' ? 'Income' : 'Expense'} of $${transactionData.amount.toFixed(2)} has been recorded.`,
    });
  };

  const handleEditTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    if (!editingTransaction) return;
    
    const updatedTransaction: Transaction = {
      ...transactionData,
      id: editingTransaction.id
    };
    
    setTransactions(prev => 
      prev.map(t => t.id === editingTransaction.id ? updatedTransaction : t)
    );
    setEditingTransaction(undefined);
    
    toast({
      title: "Transaction updated",
      description: "Your transaction has been successfully updated.",
    });
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Transaction deleted",
      description: "The transaction has been removed from your records.",
      variant: "destructive",
    });
  };

  const handleEditClick = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  // Calculate key metrics
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Professional Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center text-gray-600 hover:text-blue-600 transition-all duration-300 hover:translate-x-[-2px] group"
              >
                <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Finance Dashboard</h1>
                <p className="text-sm text-gray-500">Professional Edition</p>
              </div>
            </div>

            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Hero Section with Key Metrics */}
        <div className="mb-8 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Your Financial Overview</h2>
            <p className="text-lg text-gray-600">Track expenses, visualize patterns, and make informed decisions</p>
          </div>
          
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 font-semibold mb-2 text-sm uppercase tracking-wide">Total Income</p>
                    <p className="text-3xl font-bold text-green-700">${totalIncome.toFixed(2)}</p>
                  </div>
                  <div className="p-3 bg-green-500 rounded-2xl shadow-lg">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-red-50 to-rose-100 border-red-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-600 font-semibold mb-2 text-sm uppercase tracking-wide">Total Expenses</p>
                    <p className="text-3xl font-bold text-red-700">${totalExpenses.toFixed(2)}</p>
                  </div>
                  <div className="p-3 bg-red-500 rounded-2xl shadow-lg">
                    <TrendingDown className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`bg-gradient-to-br ${netBalance >= 0 ? 'from-blue-50 to-indigo-100 border-blue-200' : 'from-orange-50 to-red-100 border-orange-200'} hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'} font-semibold mb-2 text-sm uppercase tracking-wide`}>Net Balance</p>
                    <p className={`text-3xl font-bold ${netBalance >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>${Math.abs(netBalance).toFixed(2)}</p>
                    {netBalance < 0 && <span className="text-sm text-orange-600 font-medium">Deficit</span>}
                  </div>
                  <div className={`p-3 ${netBalance >= 0 ? 'bg-blue-500' : 'bg-orange-500'} rounded-2xl shadow-lg`}>
                    <Activity className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Financial Summary */}
        <div className="mb-8 animate-fade-in">
          <FinancialSummary transactions={transactions} />
        </div>

        {/* Professional Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 animate-fade-in">
            <TabsList className="grid w-full max-w-lg grid-cols-3 bg-white/80 backdrop-blur-sm border shadow-lg h-12">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white transition-all duration-300 font-medium">
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white transition-all duration-300 font-medium">
                <DollarSign className="w-4 h-4 mr-2" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white transition-all duration-300 font-medium">
                <PieChart className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <MonthlyChart transactions={transactions} />
              </div>
              
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <CategoryChart transactions={transactions} />
              </div>
            </div>
            
            {/* Recent Transactions Preview */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-blue-500" />
                    Recent Activity
                  </div>
                  <Button variant="outline" size="sm" className="hover:bg-blue-50">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                          {transaction.type === 'income' ? 
                            <TrendingUp className="h-4 w-4 text-green-600" /> : 
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description || 'No description'}</p>
                          <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6 animate-fade-in">
            <div className="transform hover:scale-[1.01] transition-transform duration-300">
              <TransactionList 
                transactions={transactions}
                onEdit={handleEditClick}
                onDelete={handleDeleteTransaction}
              />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <MonthlyChart transactions={transactions} />
              </div>
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <CategoryChart transactions={transactions} />
              </div>
            </div>
            
            {transactions.length > 0 && (
              <Card className="bg-gradient-to-br from-purple-50 to-indigo-100 border-purple-200 animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-purple-800 flex items-center">
                    <Activity className="h-5 w-5 mr-3" />
                    Financial Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl border border-green-300 transform hover:scale-105 transition-all duration-300">
                      <h4 className="font-bold text-green-800 mb-3 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Highest Income
                      </h4>
                      <p className="text-3xl font-bold text-green-700">
                        ${Math.max(...transactions.filter(t => t.type === 'income').map(t => t.amount), 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-red-100 to-rose-200 rounded-2xl border border-red-300 transform hover:scale-105 transition-all duration-300">
                      <h4 className="font-bold text-red-800 mb-3 flex items-center">
                        <TrendingDown className="w-5 h-5 mr-2" />
                        Highest Expense
                      </h4>
                      <p className="text-3xl font-bold text-red-700">
                        ${Math.max(...transactions.filter(t => t.type === 'expense').map(t => t.amount), 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Add Transaction Dialog */}
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent className="max-w-md animate-scale-in">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Add New Transaction</DialogTitle>
            </DialogHeader>
            <TransactionForm
              onSubmit={handleAddTransaction}
              onCancel={() => setShowAddForm(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Transaction Dialog */}
        <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(undefined)}>
          <DialogContent className="max-w-md animate-scale-in">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Edit Transaction</DialogTitle>
            </DialogHeader>
            {editingTransaction && (
              <TransactionForm
                onSubmit={handleEditTransaction}
                editingTransaction={editingTransaction}
                onCancel={() => setEditingTransaction(undefined)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;
