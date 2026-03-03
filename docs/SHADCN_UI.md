# shadcn/ui Component Guidelines

This document outlines the standards for using shadcn/ui components throughout the Link Shortener application.

## Core Rules

1. **Always Use shadcn/ui**: All UI elements must be built using shadcn/ui components. Do NOT create custom components.
2. **No Reinvention**: If a shadcn/ui component exists for a UI pattern, use it. Do not build alternatives.
3. **Composition Over Customization**: Combine shadcn/ui components to create complex UI patterns rather than forking/modifying the components themselves.

## Component Usage Patterns

### Common Components

Use these shadcn/ui components for standard UI patterns:

- **Buttons**: `Button` component with variants (default, destructive, ghost, outline, secondary)
- **Forms**: `Form`, `Input`, `Select`, `Textarea`, `Checkbox`, `Radio Group` for user input
- **Dialogs**: `Dialog` for modal interactions
- **Dropdowns**: `DropdownMenu` for contextual menus
- **Cards**: `Card` with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- **Tables**: `Table` for structured data
- **Alerts**: `Alert`, `AlertTitle`, `AlertDescription` for notifications
- **Badges**: `Badge` for labels and tags
- **Pagination**: `Pagination` for data sets
- **Toasts/Notifications**: Use `useToast()` hook for non-intrusive feedback

### Organization & Imports

```typescript
// Import only what you need from shadcn/ui
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
```

## Styling & Theming

- All styling uses Tailwind CSS through shadcn/ui's built-in classes
- Do not override component styles with custom CSS unless absolutely necessary
- Use Tailwind utility classes for additional spacing, colors, and responsive design
- Maintain consistency with existing color schemes and variants

## Accessibility

- shadcn/ui components follow WCAG standards by default
- Use semantic HTML attributes (aria-labels, roles) where shadcn/ui components require them
- Test keyboard navigation and screen reader compatibility
- Do not remove or bypass accessibility features

## Best Practices

1. **Props Over Customization**: Use component props to configure behavior rather than modifying HTML
2. **Keep Components Focused**: Each component should have a single responsibility
3. **Responsive Design**: Use Tailwind's responsive prefixes (sm:, md:, lg:) within shadcn/ui components
4. **Consistent Spacing**: Use Tailwind's spacing scale (p-4, m-2, etc.) for consistency
5. **Dark Mode Ready**: shadcn/ui components support dark mode; ensure components work in both themes

## Example: Building a Feature with shadcn/ui

```typescript
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function LinkForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Short Link</CardTitle>
      </CardHeader>
      <CardContent>
        <Input 
          placeholder="Enter your long URL"
          type="url"
        />
        <Button className="mt-4">Shorten</Button>
      </CardContent>
    </Card>
  )
}
```

## When to NOT Create Custom Components

- ✗ Don't create a custom button when `Button` exists
- ✗ Don't create a custom card layout when `Card` exists
- ✗ Don't wrap shadcn/ui components just to add styling
- ✓ Do create a custom component if it combines multiple shadcn/ui pieces with significant business logic

## References

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Radix UI Primitives](https://www.radix-ui.com/) (underlying library for shadcn/ui)
