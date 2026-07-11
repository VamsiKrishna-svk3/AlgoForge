const TOKEN =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDVmMzY2MTdmNzQwMGNlZmZmZTVmNiIsImlhdCI6MTc4Mjk3MDY1NywiZXhwIjoxNzgzNTc1NDU3fQ.GhYNxS_-usIxtOSj_hcaXHmjpW3lzPMyYm2vemJwj60";

async function test() {
  const res = await fetch(
    "http://localhost:5000/api/problems",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        title: "Two Sum",
        difficulty: "Easy",
        status: "Solved",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        bestCaseTC: "O(1)",
        averageCaseTC: "O(n)",
        worstCaseTC: "O(n)",
        tags: ["Array", "Hash Table"],
        notes: "Used HashMap approach",
      }),
    }
  );

  const data = await res.json();
  console.log(data);
}

test().catch(console.error);