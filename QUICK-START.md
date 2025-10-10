# ⚡ Quick Start Guide

## ✅ Setup Complete!

Your plop generator is **globally linked** and ready to use!

## 🚀 Using in Your React Projects

### Step 1: Link in Each React Project (One-time)

```bash
# For react-test
cd /Users/cybercat/work/react/react-test
pnpm link --global @cybercat/plop-generators

# For react-udemy
cd /Users/cybercat/work/react/react-udemy
pnpm link --global @cybercat/plop-generators

# For ultimate-react-course
cd /Users/cybercat/work/react/ultimate-react-course
pnpm link --global @cybercat/plop-generators
```

### Step 2: Generate Components!

```bash
# Interactive mode - see all generators
cybercat-plop

# Generate specific items
cybercat-plop component Button
cybercat-plop hook useCounter
cybercat-plop context Auth
cybercat-plop redux-async users
cybercat-plop react-query-basic useTodos
```

## 📝 Add to package.json (Recommended)

In your React project's `package.json`:

```json
{
  "scripts": {
    "g": "cybercat-plop",
    "generate": "cybercat-plop"
  }
}
```

Then use:
```bash
pnpm g component MyButton
pnpm generate hook useMyHook
```

## 🎯 Common Commands

```bash
# Create component with CSS modules & tests
cybercat-plop component Button

# Create custom hook
cybercat-plop hook useLocalStorage

# Create context (choose Basic or Advanced)
cybercat-plop context Theme

# Create Redux slice with async thunks
cybercat-plop redux-async posts

# Create React Query hook
cybercat-plop react-query-basic useUsers

# Create page
cybercat-plop page2 Dashboard

# Create layout
cybercat-plop layout MainLayout
```

## 🔥 Example Workflow

```bash
# Navigate to your React project
cd /Users/cybercat/work/react/react-test

# Generate a Button component
cybercat-plop component Button
# Choose: element = "button", flexible = yes

# Generated files:
# ✓ src/components/Button/Button.tsx
# ✓ src/components/Button/Button.types.ts
# ✓ src/components/Button/Button.test.tsx
# ✓ src/components/Button/Button.module.css
# ✓ src/components/Button/index.ts
# ✓ src/components/index.ts (auto-updated!)

# Start using it:
# import { Button } from '@/components';
```

## 🎨 Generated Component Example

**Button.tsx:**
```tsx
import React from "react";
import clsx from "clsx";
import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  as,
  ...rest
}) => {
  const Component = as || "button";
  return (
    <Component className={clsx(styles.root, className)} {...rest}>
      {children}
    </Component>
  );
};

export default Button;
```

**Button.types.ts:**
```tsx
export type ButtonProps<T extends React.ElementType = "button"> = {
  children?: React.ReactNode;
  className?: string;
  as?: T;
} & React.ComponentPropsWithoutRef<T>;
```

## 🔄 Making Changes

**The beauty of global link:** Any changes you make to the generator templates or config are **immediately available** in all linked projects! No reinstall needed! ✨

```bash
# Edit templates
vim /Users/cybercat/work/react/plop-react-generator/plop-templates/Component/Component.tsx.hbs

# Use updated generator immediately
cd /Users/cybercat/work/react/react-test
cybercat-plop component NewComponent  # Uses new template!
```

## 🆘 Help

```bash
# See all available generators
cybercat-plop help

# Interactive mode
cybercat-plop

# Check if linked
pnpm list | grep plop
```

## 📚 More Info

- **Full documentation:** [README.md](README.md)
- **Installation details:** [INSTALL.md](INSTALL.md)
- **For agents:** [AGENTS.md](AGENTS.md)

---

**Happy generating! 🎉**
