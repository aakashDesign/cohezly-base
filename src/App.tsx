import { useState, type FormEvent } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
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
          <Button size="lg" variant="primary">Action</Button>
          <Button size="md" variant="primary">Action</Button>
          <Button size="sm" variant="primary">Action</Button>
        </div>
        <div className="demo__row">
          <Button size="lg" variant="positive">Action</Button>
          <Button size="md" variant="positive">Action</Button>
          <Button size="sm" variant="positive">Action</Button>
        </div>
        <div className="demo__row">
          <Button size="lg" variant="critical">Action</Button>
          <Button size="md" variant="critical">Action</Button>
          <Button size="sm" variant="critical">Action</Button>
        </div>
        <div className="demo__row">
          <Button size="lg" variant="warning">Action</Button>
          <Button size="md" variant="warning">Action</Button>
          <Button size="sm" variant="warning">Action</Button>
        </div>
        <div className="demo__row">
          <Button size="lg" variant="secondary">Action</Button>
          <Button size="md" variant="secondary">Action</Button>
          <Button size="sm" variant="secondary">Action</Button>
        </div>
        <div className="demo__row">
          <Button size="lg" variant="ghost">Action</Button>
          <Button size="md" variant="ghost">Action</Button>
          <Button size="sm" variant="ghost">Action</Button>
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
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            description="We'll never share your email."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
          <Button type="submit">Submit</Button>
        </form>
      </section>
    </main>
  );
}
