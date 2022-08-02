import { useEffect,useRef } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";

import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../../Config/ChatLogics";
import { ChatState } from "../../../Context/ChatProvider";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/react";
import '../Homepage.css'

const ScrollableChat = ({ messages, typingHandler, newMessage, sendMessage }) => {
  const { user } = ChatState();
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  return (

    <div data-bs-spy="scroll" data-bs-offset="0" class="scroll" style={{ overflow: "auto", bottom:0 }} tabindex="0">
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
            <span
              style={{
                backgroundColor: `${m.sender._id === user._id ? "#E0E0E0" : "#BEE3F8"
                  }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
        <div >
        <FormControl
          onKeyDown={sendMessage}
          isRequired
          mt={3}
        >
          <Input
            ref={inputRef}
            variant="filled"
            bg="#E0E0E0"
            placeholder="Enter a message.."
            onChange={typingHandler}
            value={newMessage}
          />
        </FormControl>
        
        </div>
    </div>
    



  );
};

export default ScrollableChat;
