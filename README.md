# **ignite-test**

**ignite-test** is a lightweight and extensible testing framework for modern web development. Built to test state-driven logic and web components, it supports **XState**, **Redux**, and **MobX** with a unified API. **ignite-test** focuses on making testing effortless, reliable, and performance-aware.

---

## **🚀 Why igniteTest?**

### 1. **Unified API Across State Management Libraries**
- Whether you’re using **Redux**, **XState**, or **MobX**, the test syntax remains exactly the same.
- Focus on **what to test**, not **how to adapt your tests** to a specific library.

### 2. **Simplified Test Syntax**
- Tests automatically execute when `igniteTest` is called—no extra boilerplate required.

### 3. **State Validation Made Easy**
- Use the **`state`** property to explicitly set the starting state in **isolated tests**.
- Built-in support for `assert`, `pending`, `resolve`, and `reject` ensures seamless workflow validation.

---

## **🌟 Core Features**

### **Unified Test Workflow**
- **`state`**: Explicitly define the initial state for isolated tests.
- **`assert`**: Validate the initial state.
- **`pending`**: Validate intermediate states.
- **`resolve`**: Validate success states.
- **`reject`**: Validate failure states.

### **Reusable Test Logic**
- Define reusable test commands for shared logic (e.g., `idle` and `pending` states).
- Compose commands into success and failure paths.

---

## **📚 Documentation**

- **[GitHub Discussions](https://github.com/0xjcf/ignite-test/discussions/1)**: Share your feedback, ask questions, or suggest features.
- **[Wiki](https://github.com/0xjcf/ignite-test/wiki)**: Explore detailed documentation, examples, and the roadmap.

---

## **Examples**

### **1. Isolated Tests with `state`**

#### Redux Isolated Tests

```typescript
igniteTest({
  component: MyLoginForm,
  stateHandlers: loginReducer,
  describe: 'Isolated LoginForm Tests (Redux)',
  e2e: false, // Ensure each test is independent (optional - default is false)
  tests: [
    {
      it: 'Should validate initial state',
      state: { isSubmitting: false, error: null }, // Explicitly set the starting state
      assert: ({ state, root }) => {
        expect(state.isSubmitting).toBe(false);
        expect(state.error).toBe(null);
        expect(root.querySelector('.form')).toBeVisible();
      },
    },
    {
      it: 'Should validate pending state after SUBMIT',
      state: { isSubmitting: false, error: null },
      actions: [submit()],
      pending: ({ state, root }) => {
        expect(state.isSubmitting).toBe(true);
        expect(root.querySelector('.spinner')).toBeVisible();
      },
    },
    {
      it: 'Should validate success state after SUCCESS',
      state: { isSubmitting: true, error: null },
      actions: [submitSuccess()],
      resolve: ({ state, root }) => {
        expect(state.isSubmitting).toBe(false);
        expect(state.error).toBe(null);
        expect(root.querySelector('.success-message')).toHaveTextContent('Login Successful!');
      },
    },
    {
      it: 'Should validate error state after FAILURE',
      state: { isSubmitting: true, error: null },
      actions: [submitFailure()],
      reject: ({ state, root }) => {
        expect(state.isSubmitting).toBe(false);
        expect(state.error).toBe('Login Failed');
        expect(root.querySelector('.error-message')).toHaveTextContent('Login Failed!');
      },
    },
  ],
});
```

---

### **2. E2E Tests**

#### Success Path (Resolve)

```typescript
igniteTest({
  component: MyLoginForm,
  stateHandlers: loginReducer,
  describe: 'E2E LoginForm Success Path (Redux)',
  e2e: true, // Shared state across tests
  tests: [
    {
      it: 'Should validate idle state',
      assert: ({ state, root }) => {
        expect(state.isSubmitting).toBe(false);
        expect(state.error).toBe(null);
        expect(root.querySelector('.form')).toBeVisible();
      },
    },
    {
      it: 'Should validate pending state after SUBMIT',
      actions: [submit()],
      pending: ({ state, root }) => {
        expect(state.isSubmitting).toBe(true);
        expect(root.querySelector('.spinner')).toBeVisible();
      },
    },
    {
      it: 'Should validate resolve state after SUCCESS',
      actions: [submitSuccess()],
      resolve: ({ state, root }) => {
        expect(state.isSubmitting).toBe(false);
        expect(state.error).toBe(null);
        expect(root.querySelector('.success-message')).toHaveTextContent('Login Successful!');
      },
    },
  ],
});
```

---

#### Failure Path (Reject)

```typescript
igniteTest({
  component: MyLoginForm,
  stateHandlers: loginReducer,
  describe: 'E2E LoginForm Failure Path (Redux)',
  e2e: true, // Shared state across tests
  tests: [
    {
      it: 'Should validate idle state',
      assert: ({ state, root }) => {
        expect(state.isSubmitting).toBe(false);
        expect(state.error).toBe(null);
        expect(root.querySelector('.form')).toBeVisible();
      },
    },
    {
      it: 'Should validate pending state after SUBMIT',
      actions: [submit()],
      pending: ({ state, root }) => {
        expect(state.isSubmitting).toBe(true);
        expect(root.querySelector('.spinner')).toBeVisible();
      },
    },
    {
      it: 'Should validate reject state after FAILURE',
      actions: [submitFailure()],
      reject: ({ state, root }) => {
        expect(state.isSubmitting).toBe(false);
        expect(state.error).toBe('Login Failed');
        expect(root.querySelector('.error-message')).toHaveTextContent('Login Failed!');
      },
    },
  ],
});
```

---

## **Key Advantages**

#### **Isolated Tests with `state`**
- Fully self-contained tests with explicitly defined starting states.

#### **E2E Tests**
- Automatically validate state progression across shared workflows without needing additional conditions.

#### **Logical Separation of Success and Failure Paths**
- Independent test suites for **resolve** and **reject** ensure clarity and maintainability.

#### **Consistency Across Libraries**
- The same API (`state`, `assert`, `pending`, `resolve`, `reject`) works seamlessly with **Redux**, **XState**, and **MobX**.
