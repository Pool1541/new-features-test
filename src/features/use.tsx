import React, { Suspense, use } from 'react';
import { fetchUsers, UserType } from '../lib';
import ErrorBoundary from '../lib/error-boundary';

function UsersWrapper({ usersPromise }: { usersPromise: Promise<UserType[]> }) {
  const users = use(usersPromise);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

function Example() {
  const promise = fetchUsers();

  return (
    <section>
      <h2>use API example</h2>
      <ErrorBoundary fallback={<p>An error has occurred</p>}>
        <Suspense fallback={<div>Loading...</div>}>
          <UsersWrapper usersPromise={promise} />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}

const ExampleOfUse = React.memo(Example);

export default ExampleOfUse;
