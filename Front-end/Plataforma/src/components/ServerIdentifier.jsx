import { useEffect, useState } from 'react';
const ServerIdentifier = () => {
  const [serverName, setServerName] = useState('Carregando...');
  const [serverId, setServerId] = useState('');

  useEffect(() => {
    const detectServer = async () => {
      try {
        const response = await fetch('/frontend-health');
        const text = await response.text();
        
        if (text.includes('sf-frontend-1')) {
          setServerId('1');
          setServerName('Servidor 1');
        } else if (text.includes('sf-frontend-2')) {
          setServerId('2');
          setServerName('Servidor 2');
        } else {
          
          const random = Math.random() > 0.5 ? '1' : '2';
          setServerId(random);
          setServerName(random === '1' ? 'Servidor 1' : 'Servidor 2');
        }
      } catch (error) {
        console.error('Erro ao detectar servidor:', error);
        
        const random = Math.random() > 0.5 ? '1' : '2';
        setServerId(random);
        setServerName(random === '1' ? 'Servidor 1' : 'Servidor 2');
      }
    };

    detectServer();
  }, []);

  
  const isServerA = serverId === '1';
  const bgColor = isServerA ? 'bg-green-600' : 'bg-blue-600';
  const textColor = isServerA ? 'text-green-100' : 'text-blue-100';
  const dotColor = isServerA ? 'bg-green-300' : 'bg-blue-300';
  const emoji = isServerA ? '🟢' : '🔵';

  if (!serverId) return null;

  return (
      <div
      className={`fixed bottom-4 left-4 ${bgColor} ${textColor} py-2 px-3 rounded-lg shadow-lg z-[9999] flex items-center gap-2 text-xs font-medium`}
    >
      <span>{emoji}</span>
      <span>{serverName}</span>
    </div>
  );
};

export default ServerIdentifier;
