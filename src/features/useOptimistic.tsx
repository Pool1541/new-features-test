import { useOptimistic, useRef, useState } from "react";
import { createUser, CreateUserDTO, users, UserType } from '../lib';

export default function ExampleOfUseOptimistic() {
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  async function formAction(formData: FormData) {
    const name = String(formData.get('name'));
    const email = String(formData.get('email'));
    const newUser: CreateUserDTO = { name, email };

    addOptimisticUser(newUser);
    try {
      await createUser(newUser);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }

    formRef.current?.reset();
  }

  const [optimisticUsers, addOptimisticUser] = useOptimistic<UserType[], CreateUserDTO>(users, (prevState, newUser) => {

    const tempUser = {
      ...newUser,
      id: prevState.length + 1,
    }
    return [...prevState, tempUser];
  });


  return (
    <>
      <form ref={formRef} action={formAction} className="wrapper">
        <input type="text" name="name"  placeholder="Your name"/>
        <input type="text" name="email"  placeholder="your.email@gmail.com"/>
        <button>Create</button>
      </form>
      {
        error && <p style={{ color: 'red'}}>{error}</p>
      }
      {
        optimisticUsers.map((user) => (
          <div key={user.id} className="display">
            <p style={{ color: '#82ff72'}}>{user.name}</p>
            <p style={{ color: '#8e70f8'}}>{user.email}</p>
          </div>
        ))
      }
    </>
  );
}