
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from './TransactionForm';
import { startOfMonth, endOfMonth } from 'date-fns';
import { TrendingUp, TrendingDown, Wallet, Calendar } from 'lucide-react';

interface FinancialSummaryProps {
  transactions: Transaction[];
}

const FinancialSummary = ({ transactions }: FinancialSummaryProps) => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  // Current month transactions
  const thisMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate >= monthStart && transactionDate <= monthEnd;
  });

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyIncome = thisMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = thisMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const monthlyBalance = monthlyIncome - monthlyExpenses;

  const summaryCards = [
    {
      title: "Total Balance",
      value: balance,
      subtitle: "All time",
      color: balance >= 0 ? "text-green-600" : "text-red-600",
      bgColor: balance >= 0 ? "from-green-50 to-emerald-100" : "from-red-50 to-rose-100",
      borderColor: balance >= 0 ? "border-green-200" : "border-red-200",
      icon: Wallet
    },
    {
      title: "This Month",
      value: monthlyBalance,
      subtitle: "Net income",
      color: monthlyBalance >= 0 ? "text-green-600" : "text-red-600",
      bgColor: monthlyBalance >= 0 ? "from-green-50 to-emerald-100" : "from-red-50 to-rose-100",
      borderColor: monthlyBalance >= 0 ? "border-green-200" : "border-red-200",
      icon: Calendar
    },
    {
      title: "Monthly Income",
      value: monthlyIncome,
      subtitle: "This month",
      color: "text-green-600",
      bgColor: "from-green-50 to-emerald-100",
      borderColor: "border-green-200",
      icon: TrendingUp
    },
    {
      title: "Monthly Expenses",
      value: monthlyExpenses,
      subtitle: "This month",
      color: "text-red-600",
      bgColor: "from-red-50 to-rose-100",
      borderColor: "border-red-200",
      icon: TrendingDown
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryCards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <Card 
            key={index} 
            className={`bg-gradient-to-br ${card.bgColor} ${card.borderColor} hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in border-2`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                {card.title}
                <IconComponent className="h-5 w-5 opacity-70" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className={`text-3xl font-bold ${card.color} mb-2`}>
                ${Math.abs(card.value).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                {card.subtitle}
              </p>
              {card.value < 0 && (
                <div className="mt-2 text-xs text-red-500 bg-red-100 px-2 py-1 rounded-full inline-block">
                  Deficit
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default FinancialSummary;
