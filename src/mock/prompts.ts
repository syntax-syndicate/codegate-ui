import { Prompt } from "../types";
import { faker } from "@faker-js/faker";

export const MOCKED_PROMPTS: Prompt[] = [
  {
    id: faker.string.uuid(),
    text: "Analyze the given log file for potential security breaches.",
    date: "2024-11-29T08:00:00Z",
    tags: ["security"],
    packages: ["date-fns", "log-parser"],
    conversations: [
      {
        q: "Are there any suspicious patterns in the log file?",
        a: "Analyzing the log, I found multiple failed login attempts from IP 192.168.1.1. This could indicate a brute-force attack.",
      },
      {
        q: "What tool can I use to parse logs for security breaches?",
        a: "'log-parser' is a reliable tool for identifying anomalies like unauthorized access or unusual traffic patterns.",
      },
    ],
  },
  {
    id: faker.string.uuid(),
    text: "Analyze the given log file for potential security breaches.",
    date: "2024-11-28T08:00:00Z",
    tags: ["secrets", "log-analysis"],
    packages: ["log-parser"],
    conversations: [
      {
        q: "Are there any exposed secrets in the logs?",
        a: "Yes, I found an exposed API key starting with 'sk_test_' in the logs. Ensure to rotate it immediately.",
      },
      {
        q: "How do I automate secret detection in logs?",
        a: "You can use tools like 'log-parser' combined with regex patterns to detect sensitive keys or tokens.",
      },
    ],
  },
  {
    id: faker.string.uuid(),
    text: "Analyze the given log file for potential security breaches.",
    date: "2024-11-22T08:00:00Z",
    tags: ["secrets", "log-analysis"],
    packages: ["log-parser"],
    conversations: [
      {
        q: "Does the log file reveal any security risks?",
        a: "An IP from 10.0.0.2 performed multiple unauthorized access attempts, indicating a potential intrusion.",
      },
      {
        q: "How can I secure sensitive information in logs?",
        a: "Implement log scrubbing to remove sensitive information before storing logs, and use tools like 'log-parser' for validation.",
      },
    ],
  },
  {
    id: faker.string.uuid(),
    text: "Identify sensitive information (e.g., passwords, API keys) in the provided configuration file.",
    date: "2024-11-17T11:45:00Z",
    tags: ["secrets", "sensitive-data"],
    packages: ["date-fns", "config-parser"],
    conversations: [
      {
        q: "Is there any hardcoded sensitive data in the config file?",
        a: "Yes, the configuration file contains a hardcoded database password. It should be stored securely in an environment variable.",
      },
      {
        q: "How do I validate the config file for sensitive data?",
        a: "Use 'config-parser' to scan for keys or values resembling passwords, tokens, or credentials.",
      },
    ],
  },
  {
    id: faker.string.uuid(),
    text: "Generate a report for the vulnerabilities detected in the provided dependency file.",
    date: "2024-11-04T14:30:00Z",
    tags: ["security", "vulnerability-scanning"],
    packages: ["date-fns"],
    conversations: [
      {
        q: "Are there any outdated dependencies in package.json?",
        a: "Yes, 'lodash' is outdated and has known vulnerabilities. Update to the latest version immediately.",
      },
      {
        q: "How do I generate a vulnerability report for dependencies?",
        a: "Use tools like 'npm audit' or 'yarn audit' to scan dependencies and generate a detailed vulnerability report.",
      },
    ],
  },
  {
    id: faker.string.uuid(),
    text: "Evaluate network traffic logs for signs of intrusion.",
    date: "2024-11-26T10:00:00Z",
    tags: ["network", "intrusion-detection"],
    packages: ["suricata", "wireshark"],
    conversations: [
      {
        q: "Are there any unusual patterns in network traffic?",
        a: "Yes, there is a high volume of traffic from IP 192.168.1.100, which could indicate data exfiltration.",
      },
      {
        q: "What tools can I use to analyze network traffic?",
        a: "'suricata' and 'wireshark' are excellent tools for inspecting and identifying malicious traffic.",
      },
    ],
  },
  {
    id: faker.string.uuid(),
    text: "Check firewall configuration for misconfigurations or vulnerabilities.",
    date: "2024-11-25T09:30:00Z",
    tags: ["firewall", "configuration"],
    packages: ["nmap", "firewalld"],
    conversations: [
      {
        q: "Are there any misconfigured rules in the firewall?",
        a: "Yes, port 8080 is open to all IPs. Restrict access to internal networks only.",
      },
      {
        q: "How can I validate firewall rules?",
        a: "Use 'nmap' to scan for open ports and 'firewalld' to review and enforce secure rules.",
      },
    ],
  },
  {
    id: faker.string.uuid(),
    text: "Perform a security audit of uploaded files for malware detection.",
    date: "2024-11-20T15:15:00Z",
    tags: ["malware-detection", "security-audit"],
    packages: ["clamav", "yara"],
    conversations: [
      {
        q: "Are there any malicious files detected?",
        a: "Yes, 'malware.exe' was flagged by 'clamav' as a known trojan.",
      },
      {
        q: "How can I automate malware detection for uploaded files?",
        a: "Integrate 'clamav' and 'yara' with your upload pipeline to scan files in real time.",
      },
    ],
  },
  {
    id: faker.string.uuid(),
    text: "Generate recommendations for improving endpoint security.",
    date: "2024-11-18T14:45:00Z",
    tags: ["endpoint-security", "recommendations"],
    packages: ["crowdstrike", "sentinelone"],
    conversations: [
      {
        q: "What are the key risks in endpoint security?",
        a: "Endpoints without updated antivirus or EDR solutions are at high risk of exploitation.",
      },
      {
        q: "How do 'crowdstrike' and 'sentinelone' improve endpoint security?",
        a: "They provide real-time threat detection and automated response to prevent breaches.",
      },
    ],
  },
  {
    id: faker.string.uuid(),
    text: "Scan database queries for SQL injection vulnerabilities.",
    date: "2024-10-10T12:30:00Z",
    tags: ["database", "sql-injection"],
    packages: ["sqlmap"],
    conversations: [
      {
        q: "Are there any SQL injection risks in the provided queries?",
        a: "Yes, parameterized queries are not being used, leaving the database vulnerable to SQL injection attacks.",
      },
      {
        q: "How can 'sqlmap' help in identifying vulnerabilities?",
        a: "'sqlmap' can detect and exploit SQL injection vulnerabilities in the provided database queries.",
      },
    ],
  },
];
