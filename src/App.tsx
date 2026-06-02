import { useState, type FormEvent } from 'react';
import { ChevronsUpDown, Key, Mail, Plus, User } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Checkbox } from './components/ui/checkbox';
import './app.css';

type Theme = 'light' | 'dark';

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export function App() {
  const [theme, setThemeState] = useState<Theme>('light');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  const toggleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setThemeState(next);
    setTheme(next);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError(null);
    alert(`Submitted: ${email}`);
  };

  return (
    <main className="demo">
      <header className="demo__header">
        <h1>cohezly-base</h1>
        <Button variant="secondary" size="sm" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'dark' : 'light'}
        </Button>
      </header>

      <section className="demo__section">
        <h2>Button</h2>
        <div className="demo__row">
          <Button size="lg" variant="primary" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
          <Button size="md" variant="primary" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
          <Button size="sm" variant="primary" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
        </div>
        <div className="demo__row">
          <Button size="lg" variant="positive" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
          <Button size="md" variant="positive" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
          <Button size="sm" variant="positive" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
        </div>
        <div className="demo__row">
          <Button size="lg" variant="critical" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
          <Button size="md" variant="critical" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
          <Button size="sm" variant="critical" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
        </div>
        <div className="demo__row">
          <Button size="lg" variant="warning" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
          <Button size="md" variant="warning" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
          <Button size="sm" variant="warning" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
        </div>
        <div className="demo__row">
          <Button size="lg" variant="secondary" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
          <Button size="md" variant="secondary" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
          <Button size="sm" variant="secondary" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
        </div>
        <div className="demo__row">
          <Button size="lg" variant="ghost" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
          <Button size="md" variant="ghost" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
          <Button size="sm" variant="ghost" startIcon={<Plus />} endIcon={<ChevronsUpDown />}>Action</Button>
        </div>
      </section>

      <section className="demo__section">
        <h2>Button — disabled</h2>
        <div className="demo__row">
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="ghost" disabled>Ghost</Button>
          <Button variant="positive" disabled>Positive</Button>
          <Button variant="critical" disabled>Critical</Button>
          <Button variant="warning" disabled>Warning</Button>
        </div>
      </section>

      <section className="demo__section">
        <h2>Input</h2>
        <form className="demo__form" onSubmit={handleSubmit} noValidate>
          <Input
            label="Full name"
            labelIcon={<User />}
            name="full_name"
            type="text"
            placeholder="John Smith"
          />
          <Input
            label="Work email"
            labelIcon={<Mail />}
            name="email"
            type="email"
            placeholder="john@example.com"
          />
          <Input
            label="Password"
            labelIcon={<Key />}
            name="password"
            type="password"
          />
          <Button type="submit">Submit</Button>
        </form>
      </section>

      <section className="demo__section">
        <h2>Checkbox</h2>
        <div className="demo__stack">
          <Checkbox label="Subscribe to newsletter" defaultChecked />
          <Checkbox label="Accept terms and conditions" />
          <Checkbox label="Indeterminate state" indeterminate />
          <Checkbox label="Disabled, unchecked" disabled />
          <Checkbox label="Disabled, checked" disabled defaultChecked />
        </div>
      </section>
    </main>
  );
}
