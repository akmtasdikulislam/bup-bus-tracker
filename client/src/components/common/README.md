# Glass-morphism Dropdown Components

This directory contains reusable dropdown components with glass-morphism styling for the BUP Bus Tracker project.

## Components

### 1. GlassDropdown
A standard single-select dropdown with glass-morphism styling.

```jsx
import { GlassDropdown } from '../components/common';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
];

<GlassDropdown
  name="gender"
  value={formData.gender}
  onChange={handleInputChange}
  options={genderOptions}
  placeholder="Select Gender"
  error={errors.gender}
/>
```

### 2. GlassMultiSelect
A multi-select dropdown with tags for selected items.

```jsx
import { GlassMultiSelect } from '../components/common';

const subjectOptions = [
  { value: 'math', label: 'Mathematics' },
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' }
];

<GlassMultiSelect
  name="subjects"
  value={formData.subjects}
  onChange={handleInputChange}
  options={subjectOptions}
  placeholder="Select subjects"
  error={errors.subjects}
  maxHeight="250px"
/>
```

### 3. GlassSearchDropdown
A searchable dropdown with filter functionality.

```jsx
import { GlassSearchDropdown } from '../components/common';

const departmentOptions = [
  { value: 'cse', label: 'Computer Science & Engineering' },
  { value: 'eee', label: 'Electrical & Electronic Engineering' },
  { value: 'civil', label: 'Civil Engineering' }
];

<GlassSearchDropdown
  name="department"
  value={formData.department}
  onChange={handleInputChange}
  options={departmentOptions}
  placeholder="Search and select department"
  searchPlaceholder="Search departments..."
  error={errors.department}
/>
```

### 4. GlassModal
A reusable modal component with glass-morphism styling.

```jsx
import { GlassModal } from '../components/common';

const [isModalOpen, setIsModalOpen] = useState(false);

<GlassModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Edit Profile"
  size="lg"
  footerActions={
    <>
      <button onClick={() => setIsModalOpen(false)}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </>
  }
>
  <div>Modal content goes here</div>
</GlassModal>
```

### 5. GlassNotificationDropdown
A notification dropdown with glass-morphism styling.

```jsx
import { GlassNotificationDropdown } from '../components/common';

const [notifications, setNotifications] = useState([
  {
    id: 1,
    type: 'info',
    title: 'Bus Approaching',
    message: 'BUP-003 will arrive in 5 minutes.',
    time: '2 min ago',
    read: false
  }
]);

<GlassNotificationDropdown
  isOpen={showNotifications}
  onClose={() => setShowNotifications(false)}
  notifications={notifications}
  onNotificationRead={handleMarkAsRead}
  onNotificationRemove={handleRemoveNotification}
  onMarkAllAsRead={handleMarkAllAsRead}
  onClearAll={handleClearAll}
/>
```

## Props

### Common Props (all components)
- `name` (string): Input name attribute
- `value` (string|array): Current value(s)
- `onChange` (function): Change handler function
- `options` (array): Array of `{ value, label }` objects
- `placeholder` (string): Placeholder text
- `className` (string): Additional CSS classes
- `error` (string): Error message to display
- `disabled` (boolean): Whether the dropdown is disabled

### GlassMultiSelect Additional Props
- `maxHeight` (string): Maximum height of dropdown menu (default: "200px")

### GlassSearchDropdown Additional Props
- `maxHeight` (string): Maximum height of dropdown menu (default: "200px")
- `searchPlaceholder` (string): Placeholder for search input (default: "Search...")

## Styling

All components use the glass-morphism utilities from `src/utils/glassomorphism.js`:
- `GLASS_PRESETS.FORM_SELECT`: Main dropdown styling
- `GLASS_PRESETS.DROPDOWN_MENU`: Dropdown menu container
- `GLASS_PRESETS.DROPDOWN_MENU_ITEM`: Individual dropdown items
- `GLASS_PRESETS.FORM_INPUT`: Search input styling

## Examples

### Basic Usage
```jsx
// Simple dropdown
<GlassDropdown
  name="status"
  value={status}
  onChange={handleChange}
  options={[
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]}
  placeholder="Select status"
/>

// Multi-select with error
<GlassMultiSelect
  name="tags"
  value={selectedTags}
  onChange={handleTagChange}
  options={tagOptions}
  placeholder="Select tags"
  error="Please select at least one tag"
/>

// Searchable dropdown
<GlassSearchDropdown
  name="university"
  value={selectedUniversity}
  onChange={handleUniversityChange}
  options={universityOptions}
  placeholder="Search universities"
  searchPlaceholder="Type to search..."
/>
```

### Form Integration
```jsx
const [formData, setFormData] = useState({
  department: '',
  subjects: [],
  university: ''
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

// In your form
<GlassDropdown
  name="department"
  value={formData.department}
  onChange={handleInputChange}
  options={departmentOptions}
  placeholder="Select Department"
/>
```

## Accessibility

- All components support keyboard navigation
- Proper ARIA attributes are included
- Focus management is handled automatically
- Screen reader friendly
