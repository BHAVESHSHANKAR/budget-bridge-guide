
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Transaction } from './TransactionForm';
import { Edit, Trash2, Calendar, DollarSign } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionList = ({ transactions, onEdit, onDelete }: TransactionListProps) => {
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (transactions.length === 0) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <img 
            src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=300&h=300&fit=crop&crop=center"
            alt="No transactions"
            className="w-32 h-32 object-cover rounded-full mb-6 opacity-70"
          />
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold text-muted-foreground">No transactions yet</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Start tracking your finances by adding your first transaction. Click the "Add Transaction" button to get started.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 mr-3 text-blue-500" />
            Recent Transactions
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {transactions.length} total
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedTransactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 border rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in bg-white shadow-sm"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <Badge 
                  variant={transaction.type === 'income' ? 'default' : 'secondary'}
                  className={`${
                    transaction.type === 'income' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700' 
                      : 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700'
                  } transition-all duration-300 font-semibold`}
                >
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(transaction.date), 'MMM dd, yyyy')}
                </div>
              </div>
              {transaction.description && (
                <p className="text-sm text-gray-600 truncate font-medium">
                  {transaction.description}
                </p>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(transaction)}
                className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(transaction.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TransactionList;
