import { useState, useTransition } from 'react';
import { createUser } from '../lib';
import type { CreateUserDTO } from '../lib';
import ExampleOfUse from './use';

export default function ExampleOfUseTransition() {
  const [user, setUser] = useState<CreateUserDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<string | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setResponse(null)
    setUser((prevUser) => {
      if (!prevUser) return {email: '', name: ''};
      return { ...prevUser, [name]: value }; 
    });
  }

  function handleSubmit() {
    setError(null);
    startTransition(async () => {
      try {
        if (!user) throw new Error('El formulario no está completo');
        const response = await createUser(user);
        setResponse(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    });
  }

  return (
    <section>
      <h2>useTransition example</h2>
      <div className='wrapper'>
        <input type='text' placeholder='Nombre' name='name' onChange={handleChange} />
        <input type='text' placeholder='Correo electrónico' name='email' onChange={handleChange} />
        <button onClick={handleSubmit} disabled={isPending}>Crear usuario</button>
        {error && <p className='error'>{error}</p>}
        {response && <><p className='success'>{response}</p>  <ExampleOfUse /></>}
      </div>
    </section>
  );
}
