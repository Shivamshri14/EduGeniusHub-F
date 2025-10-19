# Implementation Guide - Remaining Admin Pages

This document outlines the remaining admin pages that need to be implemented. The core infrastructure is complete (database, auth, types, helpers).

## Completed

✅ Database schema with RLS policies
✅ Type definitions
✅ Supabase client and helper functions
✅ Breadcrumb component
✅ Auth pages (login, register)
✅ Homepage with routing logic
✅ Admin dashboard overview page
✅ Customer dashboard pages (main + credentials)
✅ Seed data for software tools

## To Implement

### 1. Admin Customers Page (`/admindashboard/customers/page.tsx`)

**Features:**
- Table view of all customers
- Search/filter by name, phone, email
- Add new customer button (opens modal)
- Edit customer (inline or modal)
- Delete customer (with confirmation)
- Link customer to auth profile
- View customer's subscriptions

**API Calls:**
- `getAllCustomers()` - Get all customers
- `createCustomer()` - Add new customer
- `updateCustomer()` - Update customer details
- `deleteCustomer()` - Remove customer

### 2. Customer Detail Page (`/admindashboard/customers/[id]/page.tsx`)

**Features:**
- Customer profile details
- List of subscriptions for this customer
- Add new subscription button
- Contact customer via WhatsApp
- Edit customer details
- Subscription history

**API Calls:**
- `getCustomerById(id)` - Get customer details
- `getSubscriptionsByCustomerId(id)` - Get customer subscriptions

### 3. Software Management Page (`/admindashboard/software/page.tsx`)

**Features:**
- Grid/card view of all software
- Add new software button
- Edit software details
- Toggle is_active status
- Delete software
- View plans for each software

**API Calls:**
- `getAllSoftware()` - Get all software
- `createSoftware()` - Add new software
- `updateSoftware()` - Update software
- `deleteSoftware()` - Remove software

### 4. Software Detail Page (`/admindashboard/software/[id]/page.tsx`)

**Features:**
- Software details
- List of plans (private/shared)
- Add new plan button
- Edit plan details (display_name, max_seats)
- Delete plan
- View subscriptions using this software
- Statistics (total subscribers, active plans)

**API Calls:**
- `getSoftwareById(id)` - Get software details
- `getPlansBySoftwareId(id)` - Get plans
- `createPlan()` - Add new plan
- `updatePlan()` - Update plan
- `deletePlan()` - Remove plan

### 5. Assignments Page (`/admindashboard/assignments/page.tsx`)

**Features:**
- Table view of all subscriptions
- Search/filter by customer, software, status, date range
- Add new assignment button
- Edit subscription (extend dates, change status)
- Delete subscription
- Bulk actions (export CSV, mark expired)
- Status badges (active, expired, expiring soon)
- Add/view credentials for each subscription

**API Calls:**
- `getAllSubscriptions()` - Get all subscriptions with joins
- `createSubscription()` - Create new assignment
- `updateSubscription()` - Update subscription
- `deleteSubscription()` - Remove subscription
- `createCredential()` - Add credentials
- `getCredentialsBySubscriptionId()` - View credentials

**Form Fields for Add Assignment:**
- Customer (dropdown)
- Software (dropdown)
- Plan (dropdown - filtered by selected software)
- Start Date (date picker)
- End Date (date picker) or Duration (7 days, 30 days, 90 days, 365 days, custom)
- Status (auto-set to 'active')

### 6. Settings Page (`/admindashboard/settings/page.tsx`)

**Features:**
- Form to edit site settings
- Admin email field
- Instagram profile URL field
- WhatsApp community URL field
- WhatsApp direct message URL field
- Save button
- Preview of how links appear on customer side

**API Calls:**
- `getSettings()` - Load current settings
- `updateSettings()` - Save settings

## Implementation Tips

### Using the Helper Functions

All database operations are in `lib/supabase.ts`:

```typescript
import {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  // ... etc
} from '@/lib/supabase';
```

### Type Safety

All types are in `lib/types.ts`:

```typescript
import type {
  Customer,
  Software,
  Plan,
  Subscription,
  Credential,
  Settings
} from '@/lib/types';
```

### Breadcrumb Usage

```typescript
import { Breadcrumb } from '@/components/Breadcrumb';

// In your component:
<Breadcrumb customItems={[
  { label: 'Home', href: '/' },
  { label: 'Admin', href: '/admindashboard' },
  { label: 'Customers' }
]} />
```

### Status Calculation

```typescript
const isExpired = new Date(subscription.end_date) < new Date();
const isExpiringSoon = !isExpired &&
  new Date(subscription.end_date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

const status = isExpired ? 'expired' : isExpiringSoon ? 'expiring' : 'active';
```

### Modal Pattern

Use state to control modals:

```typescript
const [showAddCustomer, setShowAddCustomer] = useState(false);
const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

// Modal JSX
{showAddCustomer && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md">
      {/* Form content */}
    </div>
  </div>
)}
```

### Form Submission

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    await createCustomer(formData);
    // Refresh data
    loadData();
    // Close modal
    setShowAddCustomer(false);
    // Show success
    alert('Customer added successfully!');
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to add customer');
  } finally {
    setLoading(false);
  }
};
```

### Table Pattern

```typescript
<div className="bg-white rounded-xl shadow-lg overflow-hidden">
  <table className="w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
          Name
        </th>
        {/* More headers */}
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {items.map(item => (
        <tr key={item.id} className="hover:bg-gray-50">
          <td className="px-6 py-4">{item.name}</td>
          {/* More cells */}
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck

# Run Supabase locally (optional)
supabase start
supabase db push
```

## Testing Checklist

### Admin Flow
1. Login as admin
2. Add software (e.g., "Notion Premium")
3. Create plan for software
4. Add customer
5. Assign subscription to customer
6. Add credentials for subscription
7. Update settings (WhatsApp, Instagram)
8. Verify expiry date logic

### Customer Flow
1. Register new account (customer role)
2. Admin creates customer record and links to profile
3. Admin assigns subscription
4. Customer logs in
5. Customer views credentials
6. Customer contacts admin via WhatsApp

## Common Patterns

### Loading State
```typescript
if (loading) {
  return <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>;
}
```

### Empty State
```typescript
{items.length === 0 && (
  <div className="text-center py-12">
    <p className="text-gray-600">No items found</p>
  </div>
)}
```

### Error Handling
```typescript
try {
  await someOperation();
} catch (error: any) {
  console.error('Error:', error);
  setError(error.message || 'Operation failed');
}
```

## Next Steps

1. Implement remaining admin pages in order:
   - Customers page (most important)
   - Software page
   - Assignments page
   - Settings page
   - Detail pages as needed

2. Test each page thoroughly:
   - Create operations
   - Read/list operations
   - Update operations
   - Delete operations
   - Search/filter
   - Edge cases

3. Add polish:
   - Loading states
   - Error messages
   - Success toasts
   - Confirmation dialogs
   - Form validation

4. Deploy to Vercel and test production build

## Resources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [Radix UI](https://www.radix-ui.com/)
