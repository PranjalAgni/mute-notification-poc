import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { updateStatusAfterExpiryTime } from '../utils/timer';
import ColoredCircle from './ColoredCircle';
import Timer from './Timer';

function Status() {
  const items = [
    { name: 'Active', internal: 'active' },
    { name: 'Out of office', internal: 'ooo' },
    { name: 'Break', internal: 'break' },
  ];

  const userId = 9;
  const BASE_API_URL = `http://localhost:5000/api/user`;

  const [status, setStatus] = useState('active');
  const [expiryTime, setExpiryTime] = useState(60);
  const statusIntervalRef = useRef<null | ReturnType<typeof setInterval>>(null);

  type statusMapType = {
    [key: string]: string;
  };

  const statusColorMap: statusMapType = {
    active: '#1F8E3D',
    break: '#D93025',
    ooo: '#D93025',
  };

  const fetchStatus = useCallback(async () => {
    const response = await fetch(`${BASE_API_URL}/status/${userId}`);
    const data = await response.json();
    console.log(data);
    setStatus(data.status);
  }, [BASE_API_URL, userId]);

  useEffect(() => {
    // Once immidiately update the status
    fetchStatus();
  }, []);

  useEffect(() => {
    // Fire API if status is not active
    console.log('Run when status changes: ', status);
    // Clear the last status interval timer
    if (statusIntervalRef.current) clearInterval(statusIntervalRef.current);

    if (status !== 'active') {
      statusIntervalRef.current = setInterval(async () => {
        fetchStatus();
      }, 1000);
    } else {
      if (statusIntervalRef.current) clearInterval(statusIntervalRef.current);
    }
  }, [status, fetchStatus]);

  const handleClick = async (item: string) => {
    if (status === item) return;
    const data = {
      expiryTime: '1min',
      status: item,
    };

    const response = await fetch(`${BASE_API_URL}/update/${userId}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log('Update success: ', data);
      setStatus(item);
      let expTime: null | number = 60 * 1000;
      if (item === 'active') {
        console.log('setting expiryTime as null for active');
        expTime = null;
      }
      updateStatusAfterExpiryTime(expTime);
      setExpiryTime(60);
    } else {
      console.error(response.status, response.statusText);
    }
  };

  return (
    <div>
      {status !== 'active' && (
        <Timer seconds={expiryTime} setSeconds={setExpiryTime} />
      )}
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
          <ColoredCircle
            color={statusColorMap[status]}
            name={status.toUpperCase()}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {items.map((item, idx) => (
            <Dropdown.Item key={idx} onClick={() => handleClick(item.internal)}>
              {item.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Status;
