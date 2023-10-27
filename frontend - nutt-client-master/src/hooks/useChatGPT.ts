import axios from "axios";
import { useState } from "react";
import Message from "../interfaces/Message";

const useChatGPT = () => {
  const [context, setContext] = useState<Message[]>([]);

  const initMsg: Message = {
    role: "system",
    content: `
    You are the AI chatbot of the healthcare application 'Nutt'. You are responsible for answering users' health-related questions.
  
    The following are the references.
  
    1. You have to answer the user's question within 10 seconds.
    2. Answers to users' questions must be within 100 characters.
    3. You have to use honorifics.
    4. You shouldn't ask questions. In other words, there should be no question marks.
    5. You have to answer in Korean.
    6. Use the emoji properly.
    7. Don't answer questions that aren't related to healthcare and diet, but nutritional assessments of food are okay.
  `,
  };

  const callChatGPT = async (question: string) => {
    const tempContext: Message[] = [
      ...context,
      { role: "user", content: question },
      { role: "assistant", content: "" },
    ];

    setContext(tempContext);

    const config = {
      method: "post",
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      data: {
        model: "gpt-3.5-turbo",
        messages: context
          ? [initMsg, ...context, { role: "user", content: question }]
          : [initMsg, { role: "user", content: question }],
      },
    };

    try {
      console.group("Call ChatGPT API");
      console.log("context", config.data.messages);
      console.groupEnd();
      const { data } = await axios(config);
      const responseMsg = data.choices[0].message.content;
      setContext([
        ...context,
        { role: "user", content: question },
        { role: "assistant", content: responseMsg },
      ]);
      return { answer: responseMsg, success: true };
    } catch (error) {
      console.error(error);

      return {
        answer: `챗봇에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.`,
        success: false,
      };
    }
  };

  return { callChatGPT, context };
};

export default useChatGPT;
