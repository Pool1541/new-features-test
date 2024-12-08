import { useActionState } from 'react';
import { fetchUser, updateUser, UserType } from '../lib';

interface UpdateUserActionState {
  isError: boolean;
  isSuccess: boolean;
  error: string | null;
  data: UserType | null;
}

async function updateUserAction(
  _: UpdateUserActionState,
  payload: FormData
): Promise<UpdateUserActionState> {
  try {
    const uid = Number(payload.get('uid'));
    const name = String(payload.get('name'));
    const response = await updateUser(uid, name);
    const user = await fetchUser(uid);

    console.log(response);

    return {
      isError: false,
      isSuccess: true,
      error: null,
      data: user,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        isError: true,
        isSuccess: false,
        error: error.message,
        data: null,
      };
    }

    return {
      isError: true,
      isSuccess: false,
      error: 'An error occurred',
      data: null,
    };
  }
}

export default function ExampleOfUseActionState() {
  const [state, submitAction, isPending] = useActionState<UpdateUserActionState, FormData>(
    updateUserAction,
    {
      isError: false,
      isSuccess: false,
      error: null,
      data: null,
    }
  );

  return (
    <>
      <h2>useFormStatus example</h2>
      <form action={submitAction} className='wrapper'>
        <input type='text' name='name' placeholder='Your name' />
        <input type='number' name='uid' placeholder='User id' />
        <button type='submit' disabled={isPending}>
          Update
        </button>
        {state.error && <p>{state.error}</p>}
      </form>
    </>
  );
}
