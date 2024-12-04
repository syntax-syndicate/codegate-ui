import { Prompt } from "../types";
import { faker } from "@faker-js/faker";

export const MOCKED_PROMPTS: Prompt[] = [
  {
    question_answers: [
      {
        question: {
          message:
            '```/Users/aponcedeleonch/StacklokRepos/codegate/src/codegate/dashboard/dashboard.py\nimport asyncio\nfrom typing import List\n\nimport structlog\nfrom fastapi import APIRouter\n\nfrom codegate.dashboard.parsers import parse_get_prompt_with_output, match_conversations\nfrom codegate.db.connection import DbReader\nfrom codegate.dashboard.request_models import Conversation\n\nlogger = structlog.get_logger("codegate")\n\ndashboard_router = APIRouter(tags=["Dashboard"])\ndb_reader = DbReader()\n\n\n@dashboard_router.get("/dashboard/messages")\nasync def get_messages() -> List[Conversation]:\n    prompts_outputs = await db_reader.get_prompts_with_output()\n\n    async with asyncio.TaskGroup() as tg:\n        tasks = [tg.create_task(parse_get_prompt_with_output(row)) for row in prompts_outputs]\n\n    partial_conversations = [task.result() for task in tasks]\n\n    conversations = await match_conversations(partial_conversations)\n    return conversations\n\n```\ndashboard.py any missing security checks?',
          timestamp: "2024-12-03T17:26:18.804675Z",
          message_id: "b1f50559-bc1d-4d4d-8cfd-fc710bcce8ae",
        },
        answer: {
          message:
            "Reviewing your `dashboard.py` code, here are some security considerations and potential missing checks:\n\n1. **Input Validation**: Ensure that the inputs received in the `get_messages` route are properly validated. Although this route doesn't currently accept parameters, if you plan to extend it to accept query parameters or path variables in the future, proper validation and sanitization should be implemented to prevent issues like injection attacks.\n\n2. **Authentication and Authorization**: There is no indication of authentication or authorization checks in the endpoint. It's crucial to ensure that only authorized users can access the `/dashboard/messages` endpoint. Implementing a security layer, such as OAuth or API keys, is recommended.\n\n3. **Error Handling**: The code lacks robust error handling. If `db_reader.get_prompts_with_output()` or `parse_get_prompt_with_output` raises an exception, it could crash the application. You should add try-except blocks to handle potential exceptions gracefully and return appropriate HTTP status codes.\n\n4. **Rate Limiting**: Depending on your application's nature, consider implementing rate limiting to prevent abuse of the endpoint. This helps to mitigate denial-of-service (DoS) attacks.\n\n5. **Logging**: Although `structlog` is initialized, ensure sensitive information (like user data or request body content) is not logged anywhere to avoid exposing sensitive information.\n\n6. **Asynchronous Task Management**: When creating asynchronous tasks, ensure that you're handling potential unhandled exceptions in the tasks themselves. Each task should have its own error handling to avoid crashing the whole task group if one fails.\n\n7. **Database Security**: Ensure the `DbReader` is securely configured to prevent SQL injection, especially if any dynamic queries are being constructed based on user inputs.\n\nBy addressing these considerations, you can help ensure that your FastAPI application is more secure against common vulnerabilities.",
          timestamp: "2024-12-03T17:26:28.464844Z",
          message_id: "9162d8e3-ea14-41e4-9c25-f50dc4cd8e39",
        },
      },
    ],
    provider: "openai",
    type: "chat",
    text: "Analyze dashboard.py",
    chat_id: "chatcmpl-AaQxDNjXLnLw5bmlgpGXpKugdkj4P",
    conversation_timestamp: "2024-12-03T17:26:18.804675Z",
  },
  {
    chat_id: faker.string.uuid(),
    type: "chat",
    provider: "openai",
    text: "Analyze the given log file for potential security breaches.",
    conversation_timestamp: "2024-11-29T08:00:00Z",
    question_answers: [
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "Are there any suspicious patterns in the log file?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "Analyzing the log, I found multiple failed login attempts from IP 192.168.1.1. This could indicate a brute-force attack.",
        },
      },
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "What tool can I use to parse logs for security breaches?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "'log-parser' is a reliable tool for identifying anomalies like unauthorized access or unusual traffic patterns.",
        },
      },
    ],
  },
  {
    chat_id: faker.string.uuid(),
    type: "chat",
    provider: "openai",
    text: "Analyze the given log file for potential security breaches.",
    conversation_timestamp: "2024-11-28T08:00:00Z",
    question_answers: [
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "Are there any exposed secrets in the logs?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "Yes, I found an exposed API key starting with 'sk_test_' in the logs. Ensure to rotate it immediately.",
        },
      },
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "How do I automate secret detection in logs?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "You can use tools like 'log-parser' combined with regex patterns to detect sensitive keys or tokens.",
        },
      },
    ],
  },
  {
    chat_id: faker.string.uuid(),
    type: "chat",
    provider: "openai",
    text: "Analyze the given log file for potential security breaches.",
    conversation_timestamp: "2024-11-22T08:00:00Z",
    question_answers: [
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "Does the log file reveal any security risks?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "An IP from 10.0.0.2 performed multiple unauthorized access attempts, indicating a potential intrusion.",
        },
      },
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "How can I secure sensitive information in logs?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "Implement log scrubbing to remove sensitive information before storing logs, and use tools like 'log-parser' for validation.",
        },
      },
    ],
  },
  {
    chat_id: faker.string.uuid(),
    type: "chat",
    provider: "openai",
    text: "Identify sensitive information (e.g., passwords, API keys) in the provided configuration file.",
    conversation_timestamp: "2024-11-17T11:45:00Z",
    question_answers: [
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "Is there any hardcoded sensitive data in the config file?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "Yes, the configuration file contains a hardcoded database password. It should be stored securely in an environment variable.",
        },
      },
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "How do I validate the config file for sensitive data?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "Use 'config-parser' to scan for keys or values resembling passwords, tokens, or credentials.",
        },
      },
    ],
  },
  {
    chat_id: faker.string.uuid(),
    type: "chat",
    provider: "openai",
    text: "Generate a report for the vulnerabilities detected in the provided dependency file.",
    conversation_timestamp: "2024-11-04T14:30:00Z",
    question_answers: [
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "Are there any outdated dependencies in package.json?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "Yes, 'lodash' is outdated and has known vulnerabilities. Update to the latest version immediately.",
        },
      },
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "How do I generate a vulnerability report for dependencies?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "Use tools like 'npm audit' or 'yarn audit' to scan dependencies and generate a detailed vulnerability report.",
        },
      },
    ],
  },
  {
    chat_id: faker.string.uuid(),
    type: "chat",
    provider: "openai",
    text: "Evaluate network traffic logs for signs of intrusion.",
    conversation_timestamp: "2024-11-26T10:00:00Z",

    question_answers: [
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "Are there any unusual patterns in network traffic?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "Yes, there is a high volume of traffic from IP 192.168.1.100, which could indicate data exfiltration.",
        },
      },
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "What tools can I use to analyze network traffic?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "'suricata' and 'wireshark' are excellent tools for inspecting and identifying malicious traffic.",
        },
      },
    ],
  },
  {
    chat_id: faker.string.uuid(),
    type: "chat",
    provider: "openai",
    text: "Check firewall configuration for misconfigurations or vulnerabilities.",
    conversation_timestamp: "2024-11-25T09:30:00Z",

    question_answers: [
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "Are there any misconfigured rules in the firewall?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "Yes, port 8080 is open to all IPs. Restrict access to internal networks only.",
        },
      },
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "How can I validate firewall rules?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "Use 'nmap' to scan for open ports and 'firewalld' to review and enforce secure rules.",
        },
      },
    ],
  },
  {
    chat_id: faker.string.uuid(),
    type: "chat",
    provider: "openai",
    text: "Perform a security audit of uploaded files for malware detection.",
    conversation_timestamp: "2024-11-20T15:15:00Z",

    question_answers: [
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "Are there any malicious files detected?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "Yes, 'malware.exe' was flagged by 'clamav' as a known trojan.",
        },
      },
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "How can I automate malware detection for uploaded files?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "Integrate 'clamav' and 'yara' with your upload pipeline to scan files in real time.",
        },
      },
    ],
  },
  {
    chat_id: faker.string.uuid(),
    type: "chat",
    provider: "openai",
    text: "Generate recommendations for improving endpoint security.",
    conversation_timestamp: "2024-11-18T14:45:00Z",

    question_answers: [
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "What are the key risks in endpoint security?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "Endpoints without updated antivirus or EDR solutions are at high risk of exploitation.",
        },
      },
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "How do 'crowdstrike' and 'sentinelone' improve endpoint security?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "They provide real-time threat detection and automated response to prevent breaches.",
        },
      },
    ],
  },
  {
    chat_id: faker.string.uuid(),
    type: "chat",
    provider: "openai",
    text: "Scan database queries for SQL injection vulnerabilities.",
    conversation_timestamp: "2024-10-10T12:30:00Z",

    question_answers: [
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "Are there any SQL injection risks in the provided queries?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "Yes, parameterized queries are not being used, leaving the database vulnerable to SQL injection attacks.",
        },
      },
      {
        question: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message: "How can 'sqlmap' help in identifying vulnerabilities?",
        },
        answer: {
          message_id: faker.string.uuid(),
          timestamp: faker.date.anytime().toUTCString(),
          message:
            "'sqlmap' can detect and exploit SQL injection vulnerabilities in the provided database queries.",
        },
      },
    ],
  },
];
