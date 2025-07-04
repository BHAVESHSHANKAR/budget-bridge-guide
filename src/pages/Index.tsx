
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import TransactionForm, { Transaction } from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyChart from '@/components/MonthlyChart';
import FinancialSummary from '@/components/FinancialSummary';
import { saveTransactions, loadTransactions, generateId } from '@/utils/storage';

const Index = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Personal Finance Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Track your expenses, visualize spending patterns, and take control of your finances
          </p>
        </div>

        {/* Financial Summary */}
        <div className="mb-8">
          <FinancialSummary transactions={transactions} />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              Add Transaction
            </Button>
          </div>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MonthlyChart transactions={transactions} />
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {transactions.length}
                    </div>
                    <div className="text-blue-800 font-medium">Total Transactions</div>
                  </div>
                  {transactions.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Income Transactions:</span>
                        <span className="font-medium text-green-600">
                          {transactions.filter(t => t.type === 'income').length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Expense Transactions:</span>
                        <span className="font-medium text-red-600">
                          {transactions.filter(t => t.type === 'expense').length}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <TransactionList 
              transactions={transactions}
              onEdit={handleEditClick}
              onDelete={handleDeleteTransaction}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <MonthlyChart transactions={transactions} />
            {transactions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Financial Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Highest Income</h4>
                      <p className="text-2xl font-bold text-green-600">
                        ${Math.max(...transactions.filter(t => t.type === 'income').map(t => t.amount), 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-red-800 mb-2">Highest Expense</h4>
                      <p className="text-2xl font-bold text-red-600">
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
          <DialogContent className="max-w-md">
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
          <DialogContent className="max-w-md">
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

export default Index;
