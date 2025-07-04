
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Calendar, PieChart, BarChart3 } from "lucide-react";
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
      title: "Transaction added",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with improved animations */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <Link 
              to="/" 
              className="flex items-center text-blue-600 hover:text-blue-700 transition-all duration-300 hover:translate-x-[-4px] group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
              Back to Home
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <div className="relative mb-6">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=200&fit=crop&crop=center"
                alt="Financial dashboard"
                className="w-full h-48 object-cover rounded-2xl shadow-2xl mx-auto animate-scale-in"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-5xl font-bold mb-3 animate-fade-in">
                    Personal Finance Dashboard
                  </h1>
                  <p className="text-xl opacity-90 max-w-2xl animate-fade-in">
                    Track expenses, visualize patterns, and take control of your financial future
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Financial Summary with animations */}
        <div className="mb-8 animate-fade-in">
          <FinancialSummary transactions={transactions} />
        </div>

        {/* Main Content with improved animations */}
        <Tabs defaultValue="dashboard" className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 animate-fade-in">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-white/80 backdrop-blur-sm border shadow-lg">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300">
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300">
                <DollarSign className="w-4 h-4 mr-2" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300">
                <PieChart className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>
            
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </div>

          <TabsContent value="dashboard" className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <MonthlyChart transactions={transactions} />
              </div>
              
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <CategoryChart transactions={transactions} />
              </div>
            </div>
            
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 font-medium mb-2">Total Income</p>
                      <p className="text-3xl font-bold text-green-700">
                        ${transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                      </p>
                    </div>
                    <TrendingUp className="h-12 w-12 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-red-50 to-rose-100 border-red-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-600 font-medium mb-2">Total Expenses</p>
                      <p className="text-3xl font-bold text-red-700">
                        ${transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                      </p>
                    </div>
                    <TrendingDown className="h-12 w-12 text-red-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 font-medium mb-2">Transactions</p>
                      <p className="text-3xl font-bold text-blue-700">{transactions.length}</p>
                    </div>
                    <Calendar className="h-12 w-12 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  <CardTitle className="text-purple-800">Financial Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl border border-green-300 transform hover:scale-105 transition-all duration-300">
                      <h4 className="font-bold text-green-800 mb-3 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Highest Income
                      </h4>
                      <p className="text-3xl font-bold text-green-700">
                        ${Math.max(...transactions.filter(t => t.type === 'income').map(t => t.amount), 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-red-100 to-rose-200 rounded-xl border border-red-300 transform hover:scale-105 transition-all duration-300">
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
              <DialogTitle>Add New Transaction</DialogTitle>
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
              <DialogTitle>Edit Transaction</DialogTitle>
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
