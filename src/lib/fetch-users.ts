export type UserType = {
  id: number;
  name: string;
  email: string;
};

export type CreateUserDTO = Omit<UserType, 'id'>;

const users: UserType[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'jhon.doe@gmail.com',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@gmail.com',
  },
  {
    id: 3,
    name: 'Alice',
    email: 'alice@gmail.com',
  },
  {
    id: 4,
    name: 'Bob',
    email: 'bob@gmail.com',
  },
];

export async function fetchUsers() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return users;
}

export async function fetchUser(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = users.find((u) => u.id === id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export async function createUser(user: CreateUserDTO) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (users.some((u) => u.email === user.email)) {
    throw new Error('User with this email already exists');
  }

  const id = users.length + 1;

  users.push({ ...user, id });

  return 'User created successfully';
}

export async function updateUser(id: number, name: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    throw new Error('User not found');
  }

  users[index].name = name;

  return 'User updated successfully';
}