'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type AppLocale = 'en' | 'ar';

type TranslationKey = string;

const translations: Record<AppLocale, Record<TranslationKey, string>> = {
  en: {
    'nav.transactions': 'Transactions',
    'nav.categories': 'Categories',
    'nav.budgets': 'Budgets',
    'nav.dashboard': 'Dashboard',
    'nav.newTransaction': 'New Transaction',
    'nav.language': 'AR',
    'page.transactionsTitle': 'Transactions',
    'page.transactionsSubtitle':
      'Simple workspace for transactions, filters, details, and budget visibility.',
    'page.dashboard': 'Dashboard',
    'page.workspace': 'Workspace',
    'page.addTransaction': 'Add transaction',
    'page.refreshing': 'Refreshing data...',
    'page.synced': 'Data synced with backend API',
    'page.createdSuccess': 'Transaction created successfully.',
    'workspace.company': 'Company',
    'workspace.transactions': 'Transactions',
    'workspace.search': 'Search...',
    'workspace.date': 'Date',
    'workspace.reference': 'Reference',
    'workspace.amount': 'Amount',
    'workspace.status': 'Status',
    'workspace.newTransaction': '+ New Transaction',
    'workspace.updating': 'Updating',
    'workspace.noTransactions': 'No transactions found',
    'workspace.noTransactionsHelp':
      'Try adjusting the search or filters to bring matching records back into the workspace.',
    'workspace.clearSearch': 'Clear quick search',
    'workspace.visibleRows': 'Visible rows',
    'workspace.activeStatus': 'Active status',
    'workspace.visibleAmount': 'Visible amount',
    'workspace.allStatuses': 'All statuses',
    'workspace.activeOnly': 'Active only',
    'workspace.inactiveOnly': 'Inactive only',
    'workspace.dateNewest': 'Date newest first',
    'workspace.dateOldest': 'Date oldest first',
    'workspace.referenceNewest': 'Reference newest created',
    'workspace.amountHighLow': 'Amount high to low',
    'workspace.amountLowHigh': 'Amount low to high',
    'workspace.currentlyActive': 'currently active',
    'workspace.showing': 'Showing',
    'filters.title': 'Filters',
    'filters.subtitle':
      'Server-driven sorting, pagination, and range filters with a lightweight quick filter on the visible page.',
    'filters.reset': 'Reset filters',
    'filters.quick': 'Quick filter',
    'filters.placeholder': 'Filter current rows by type, category, or amount',
    'filters.type': 'Type',
    'filters.category': 'Category',
    'filters.allTypes': 'All types',
    'filters.income': 'Income',
    'filters.expense': 'Expense',
    'filters.allCategories': 'All categories',
    'filters.from': 'From',
    'filters.to': 'To',
    'filters.minAmount': 'Min amount',
    'filters.maxAmount': 'Max amount',
    'table.title': 'Transactions',
    'table.subtitle':
      'Paginated at 10 rows by default, sortable by date and amount, and connected to the backend query contract.',
    'table.refreshing': 'Refreshing data...',
    'table.date': 'Date',
    'table.category': 'Category',
    'table.type': 'Type',
    'table.amount': 'Amount',
    'table.created': 'Created',
    'summary.income': 'Income',
    'summary.expense': 'Expense',
    'summary.net': 'Net',
    'summary.coverage': 'Coverage',
    'summary.incomeHelp': 'Revenue captured in the active reporting range',
    'summary.expenseHelp': 'Spend flowing through tracked categories',
    'summary.netHelp': 'Positive net indicates more income than expenses',
    'summary.coverageHelp': 'Operational footprint visible in the workspace',
    'budget.watchlist': 'Budget watchlist',
    'budget.subtitle':
      'Extended beyond the minimum scope with live budget usage visibility driven by the backend usage endpoint.',
    'budget.none':
      'No budgets available yet. Once budgets are created in the backend, usage will appear here.',
    'budget.over': 'Over budget',
    'budget.onTrack': 'On track',
    'budget.budgeted': 'Budgeted',
    'budget.spent': 'Spent',
    'budget.remaining': 'Remaining',
  },
  ar: {
    'nav.transactions': 'المعاملات',
    'nav.categories': 'الفئات',
    'nav.budgets': 'الميزانيات',
    'nav.dashboard': 'لوحة التحكم',
    'nav.newTransaction': 'معاملة جديدة',
    'nav.language': 'EN',
    'page.transactionsTitle': 'المعاملات',
    'page.transactionsSubtitle':
      'مساحة عمل بسيطة للمعاملات والفلاتر والتفاصيل ومتابعة الميزانيات.',
    'page.dashboard': 'لوحة التحكم',
    'page.workspace': 'مساحة العمل',
    'page.addTransaction': 'إضافة معاملة',
    'page.refreshing': 'جار تحديث البيانات...',
    'page.synced': 'البيانات متزامنة مع واجهة الخلفية',
    'page.createdSuccess': 'تم إنشاء المعاملة بنجاح.',
    'workspace.company': 'الشركة',
    'workspace.transactions': 'المعاملات',
    'workspace.search': 'بحث...',
    'workspace.date': 'التاريخ',
    'workspace.reference': 'المرجع',
    'workspace.amount': 'المبلغ',
    'workspace.status': 'الحالة',
    'workspace.newTransaction': '+ معاملة جديدة',
    'workspace.updating': 'جار التحديث',
    'workspace.noTransactions': 'لا توجد معاملات',
    'workspace.noTransactionsHelp':
      'قم بتعديل البحث أو الفلاتر لعرض معاملات مطابقة.',
    'workspace.clearSearch': 'مسح البحث السريع',
    'workspace.visibleRows': 'الصفوف الظاهرة',
    'workspace.activeStatus': 'الحالة النشطة',
    'workspace.visibleAmount': 'المبلغ الظاهر',
    'workspace.allStatuses': 'كل الحالات',
    'workspace.activeOnly': 'النشط فقط',
    'workspace.inactiveOnly': 'غير النشط فقط',
    'workspace.dateNewest': 'الأحدث تاريخا',
    'workspace.dateOldest': 'الأقدم تاريخا',
    'workspace.referenceNewest': 'أحدث مرجع إنشاء',
    'workspace.amountHighLow': 'المبلغ من الأعلى إلى الأقل',
    'workspace.amountLowHigh': 'المبلغ من الأقل إلى الأعلى',
    'workspace.currentlyActive': 'نشط حاليا',
    'workspace.showing': 'عرض',
    'filters.title': 'الفلاتر',
    'filters.subtitle':
      'فرز وترقيم صفحات ونطاقات مدفوعة من الخادم مع فلتر سريع خفيف على النتائج الظاهرة.',
    'filters.reset': 'إعادة ضبط الفلاتر',
    'filters.quick': 'فلتر سريع',
    'filters.placeholder': 'فلترة الصفوف حسب النوع أو الفئة أو المبلغ',
    'filters.type': 'النوع',
    'filters.category': 'الفئة',
    'filters.allTypes': 'كل الأنواع',
    'filters.income': 'دخل',
    'filters.expense': 'مصروف',
    'filters.allCategories': 'كل الفئات',
    'filters.from': 'من',
    'filters.to': 'إلى',
    'filters.minAmount': 'أقل مبلغ',
    'filters.maxAmount': 'أعلى مبلغ',
    'table.title': 'المعاملات',
    'table.subtitle':
      'ترقيم صفحات افتراضي 10 صفوف مع فرز حسب التاريخ والمبلغ ومتصلة بعقد استعلام الخلفية.',
    'table.refreshing': 'جار تحديث البيانات...',
    'table.date': 'التاريخ',
    'table.category': 'الفئة',
    'table.type': 'النوع',
    'table.amount': 'المبلغ',
    'table.created': 'تاريخ الإنشاء',
    'summary.income': 'الدخل',
    'summary.expense': 'المصروف',
    'summary.net': 'الصافي',
    'summary.coverage': 'التغطية',
    'summary.incomeHelp': 'الإيراد ضمن نطاق التقرير الحالي',
    'summary.expenseHelp': 'الإنفاق عبر الفئات المتتبعة',
    'summary.netHelp': 'الصافي الإيجابي يعني أن الدخل أعلى من المصروف',
    'summary.coverageHelp': 'نطاق العمليات الظاهر في مساحة العمل',
    'budget.watchlist': 'متابعة الميزانيات',
    'budget.subtitle':
      'إظهار حي لاستهلاك الميزانية بالاعتماد على نقطة الاستخدام في الخلفية.',
    'budget.none':
      'لا توجد ميزانيات حاليا. عند إنشاء ميزانيات في الخلفية سيظهر الاستهلاك هنا.',
    'budget.over': 'تجاوز الميزانية',
    'budget.onTrack': 'ضمن الخطة',
    'budget.budgeted': 'المعتمد',
    'budget.spent': 'المنفق',
    'budget.remaining': 'المتبقي',
  },
};

interface LocalizationContextValue {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  toggleLocale: () => void;
  isRTL: boolean;
  t: (key: TranslationKey) => string;
}

const LocalizationContext = createContext<LocalizationContextValue | null>(null);

export function AppLocalizationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<AppLocale>('en');

  useEffect(() => {
    const stored = window.localStorage.getItem('app-locale');
    if (stored === 'en' || stored === 'ar') {
      setLocale(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('app-locale', locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const value = useMemo<LocalizationContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale((current) => (current === 'en' ? 'ar' : 'en')),
      isRTL: locale === 'ar',
      t: (key) => translations[locale][key] || translations.en[key] || key,
    }),
    [locale],
  );

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used inside AppLocalizationProvider');
  }
  return context;
}
