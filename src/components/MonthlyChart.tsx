
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Transaction } from './TransactionForm';
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import { BarChart3 } from 'lucide-react';

interface MonthlyChartProps {
  transactions: Transaction[];
}

const MonthlyChart = ({ transactions }: MonthlyChartProps) => {
  // Get last 6 months of data
  const now = new Date();
  const sixMonthsAgo = subMonths(now, 5);
  const months = eachMonthOfInterval({
    start: sixMonthsAgo,
    end: now
  });

  const monthlyData = months.map(month => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    
    const monthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= monthStart && transactionDate <= monthEnd;
    });

    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      month: format(month, 'MMM yyyy'),
      income,
      expenses,
      net: income - expenses
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-xl animate-scale-in">
          <p className="font-bold text-gray-800 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-green-600 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              Income: ${payload.find((p: any) => p.dataKey === 'income')?.value?.toFixed(2) || '0.00'}
            </p>
            <p className="text-red-600 flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              Expenses: ${payload.find((p: any) => p.dataKey === 'expenses')?.value?.toFixed(2) || '0.00'}
            </p>
            <p className="font-bold text-gray-800 pt-2 border-t">
              Net: ${payload.find((p: any) => p.dataKey === 'net')?.value?.toFixed(2) || '0.00'}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const hasData = transactions.length > 0;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-800">
          <BarChart3 className="h-5 w-5 mr-3 text-blue-500" />
          Monthly Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop&crop=center"
              alt="No transactions"
              className="w-24 h-24 object-cover rounded-full mb-4 opacity-50"
            />
            <p>Add transactions to see your monthly overview</p>
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  fontSize={12}
                  tick={{ fill: '#666' }}
                />
                <YAxis 
                  fontSize={12}
                  tick={{ fill: '#666' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="income" 
                  fill="url(#incomeGradient)"
                  name="Income"
                  radius={[4, 4, 0, 0]}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
                <Bar 
                  dataKey="expenses" 
                  fill="url(#expenseGradient)"
                  name="Expenses"
                  radius={[4, 4, 0, 0]}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlyChart;
