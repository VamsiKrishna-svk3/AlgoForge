async function test() {
  const res = await fetch(
    "http://localhost:5000/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@gmail.com",
        password: "123456",
      }),
    }
  );

  const data = await res.json();
  console.log(data);
}

test().catch(console.error);