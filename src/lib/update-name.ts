export default function updateName(name: string) {
  return new Promise<string | null>((resolve) => {
    setTimeout(() => {
      if (name === "error") {
        resolve("Name cannot be 'error'");
      } else {
        resolve(null);
      }
    }, 1000);
  });
}