import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import './LabInterface.css';

const LabInterface = ({ labId }) => {
  const [instructions, setInstructions] = useState('');
  const [credentials, setCredentials] = useState(null);
  const terminalRef = useRef(null);
  const term = useRef(null);

  // Mock API response (replace with real axios call to backend in production)
  const mockLabData = {
    instructions: `# Lab 1: Launch an EC2 Instance\n\n## Objective\nLearn to launch an EC2 instance using AWS CLI.\n\n## Step 1: Configure AWS CLI\nRun: \`aws configure\`\nEnter the provided credentials.\n\n## Step 2: Launch Instance\n\`aws ec2 run-instances --image-id ami-12345678 --instance-type t2.micro\`\n\n## Expected Output\nA JSON response with instance details.\n\n## Step 3: Verify\nCheck running instances:\n\`aws ec2 describe-instances\``,
    credentials: {
      accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
      secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
      sessionToken: 'AQoDYXdzEPT//////////wEXAMPLESESSIONTOKEN'
    }
  };

  // Initialize terminal
  useEffect(() => {
    term.current = new Terminal({
      cursorBlink: true,
      theme: { background: '#1e1e1e', foreground: '#ffffff' },
    });
    term.current.open(terminalRef.current);
    term.current.write('Welcome to the AWS Lab Terminal. Configure AWS CLI with provided credentials.\r\n');
    term.current.onData((data) => {
      term.current.write(data); // Echo input (simulated)
    });

    return () => term.current.dispose();
  }, []);

  // Load mock data
  useEffect(() => {
    // Simulate API fetch
    setInstructions(mockLabData.instructions);
    setCredentials(mockLabData.credentials);
    if (mockLabData.credentials) {
      term.current.write(
        `AWS Credentials:\nAccess Key ID: ${mockLabData.credentials.accessKeyId}\n` +
        `Secret Access Key: ${mockLabData.credentials.secretAccessKey}\n` +
        `Session Token: ${mockLabData.credentials.sessionToken}\n` +
        'Run `aws configure` to set up.\r\n'
      );
    }
  }, [labId]);

  return (
    <div className="lab-container">
      <div className="instructions-panel">
        <ReactMarkdown>{instructions}</ReactMarkdown>
      </div>
      <div className="terminal-panel">
        <div ref={terminalRef} className="terminal" />
      </div>
    </div>
  );
};

export default LabInterface;