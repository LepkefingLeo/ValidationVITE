import { useState } from "react";
import "./App.css";

interface ErrorResponse {
  message: string[];
  error: string;
  statusCode: number;
}

function App() {
  const [form, setForm] = useState({
    adminEmail: "",
    ipAddress: "",
    installedAt: "",
    nickname: "",
    memory: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const validate = () => {
    const errs: string[] = [];

    if (!/^\d+\.\d+\.\d+\.\d+$/.test(form.ipAddress))
      errs.push("Invalid IP address!");

    if (Number(form.memory) <= 0)
      errs.push("The memory can not be lower than 1!");

    return errs;
  };

  async function newServer(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);

    const localErrors = validate();
    if (localErrors.length > 0) {
      setErrors(localErrors);
      return;
    }

    const response = await fetch("http://localhost:3000/servers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminEmail: form.adminEmail,
        ipAddress: form.ipAddress,
        installedAt: form.installedAt,
        nickname: form.nickname || null,
        memory: Number(form.memory),
      }),
    });

    if (response.status === 400) {
      const body = (await response.json()) as ErrorResponse;
      setErrors(body.message);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>New server</h1>

      {errors.length > 0 && (
        <p style={{ color: "red" }}>{errors.join(". ")}</p>
      )}

      <form onSubmit={newServer}>
        <input
          placeholder="Email address..."
          value={form.adminEmail}
          onChange={(e) => setForm({ ...form, adminEmail: e.target.value })}
        />
        <br />

        <input
          placeholder="IP address..."
          value={form.ipAddress}
          onChange={(e) => setForm({ ...form, ipAddress: e.target.value })}
        />
        <br />

        <input
          placeholder="Installed at..."
          type="date"
          value={form.installedAt}
          onChange={(e) => setForm({ ...form, installedAt: e.target.value })}
        />
        <br />

        <input
          placeholder="Memory (GB)..."
          type="number"
          value={form.memory}
          onChange={(e) => setForm({ ...form, memory: e.target.value })}
        />
        <br />

        <input
          placeholder="Nickname (optional)..."
          value={form.nickname}
          onChange={(e) => setForm({ ...form, nickname: e.target.value })}
        />
        <br />

        <button type="submit" className="button">Add Server</button>
      </form>
    </div>
  );
}

export default App;
