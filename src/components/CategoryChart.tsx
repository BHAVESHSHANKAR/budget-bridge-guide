
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Transaction } from './TransactionForm';

interface CategoryChartProps {
  transactions: Transaction[];
}

const CategoryChart = ({ transactions }: CategoryChartProps) => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  
  // Group by category (for now, we'll create mock categories based on description keywords)
  const categoryData = expenseTransactions.reduce((acc, transaction) => {
    let category = 'Other';
    const desc = transaction.description.toLowerCase();
    
    if (desc.includes('food') || desc.includes('restaurant') || desc.includes('grocery')) {
      category = 'Food & Dining';
    } else if (desc.includes('gas') || desc.includes('fuel') || desc.includes('transport') || desc.includes('uber')) {
      category = 'Transportation';
    } else if (desc.includes('entertainment') || desc.includes('movie') || desc.includes('game')) {
      category = 'Entertainment';
    } else if (desc.includes('shopping') || desc.includes('clothes') || desc.includes('amazon')) {
      category = 'Shopping';
    } else if (desc.includes('utility') || desc.includes('electric') || desc.includes('water') || desc.includes('internet')) {
      category = 'Utilities';
    } else if (desc.includes('health') || desc.includes('medical') || desc.includes('doctor')) {
      category = 'Healthcare';
    }
    
    acc[category] = (acc[category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
    percentage: ((value / expenseTransactions.reduce((sum, t) => sum + t.amount, 0)) * 100).toFixed(1)
  }));

  const colors = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0', '#ffb347', '#87ceeb'
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg animate-fade-in">
          <p className="font-medium">{data.name}</p>
          <p className="text-blue-600">${data.value.toFixed(2)}</p>
          <p className="text-gray-500">{data.percentage}% of expenses</p>
        </div>
      );
    }
    return null;
  };

  const hasData = expenseTransactions.length > 0;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-800">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
          Expense Categories
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&h=200&fit=crop&crop=center"
              alt="No data"
              className="w-24 h-24 object-cover rounded-full mb-4 opacity-50"
            />
            <p>Add some expenses to see category breakdown</p>
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  className="animate-fade-in"
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={colors[index % colors.length]}
                      className="hover:opacity-80 transition-opacity duration-200"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ fontSize: '12px' }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryChart;
