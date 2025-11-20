import { useEffect, useState } from "react";

interface Server {
  id?: number;
  adminEmail: string;
  ipAddress: string;
  installedAt: string;
  nickname?: string;
  memory: number;
}

export default function ServerList() {
  const [servers, setServers] = useState<Server[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/servers")
      .then((res) => res.json())
      .then((data: Server[]) => {
        setServers(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="server-list-container">
      <table className="server-table">
        <thead>
          <tr>
            <th>Email address</th>
            <th>IP address</th>
            <th>Installed at</th>
            <th>Nickname</th>
            <th>Memory</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server) => (
            <tr key={server.id}>
              <td>{server.adminEmail}</td>
              <td>{server.ipAddress}</td>
              <td>{server.installedAt}</td>
              <td>{server.nickname}</td>
              <td>{server.memory} GB</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}