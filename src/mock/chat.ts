import { Chat } from "@/types";

export const MOCKED_CHATS: Chat[] = [
    {
      id: "1",
      message_user: "How can I prevent SQL Injection in this code?",
      message_llm: "You can use parameterized queries or an ORM (Object-Relational Mapper) to avoid directly concatenating user input in SQL queries."
    },
    {
      id: "2",
      message_user: "I'm using `eval()` in JavaScript, is it safe?",
      message_llm: "`eval()` is not safe, especially with invalidated input. It can be exploited to execute arbitrary code. Use alternatives like `JSON.parse()` to parse JSON strings."
    },
    {
      id: "3",
      message_user: "Does this code have an XSS vulnerability?",
      message_llm: "If user input is not sanitized before being rendered in the DOM, it may be vulnerable to XSS. Use libraries like DOMPurify to clean the input."
    },
    {
      id: "4",
      message_user: "What is the best way to handle secrets in my code?",
      message_llm: "Avoid hardcoding secrets in your codebase. Use environment variables and a secret management tool like AWS Secrets Manager or HashiCorp Vault."
    },
    {
      id: "5",
      message_user: "How do I securely hash passwords?",
      message_llm: "Use a strong, adaptive hashing algorithm like bcrypt, Argon2, or PBKDF2. Avoid using plain MD5 or SHA1 as they are no longer considered secure."
    }
  ];