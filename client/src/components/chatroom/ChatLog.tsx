import { useEffect, useContext, useRef, useCallback } from "react";
// SVG Components
import OneV from "../svg/OneV";
import ClockSVG from "../svg/Clock";
// My Components
import Message from "./Message";
// Context
import { UsernameContext } from "./ChatPage";
// Utils
import extractHourNMinuteFromISO from "../../utils/extractHourNMinuteFromISO";
// Redux
import { useSelector } from "react-redux";

export default function ChatLog() {
  const { username } = useContext(UsernameContext);
  const endOfChat = useRef<HTMLDivElement>(null);
  const MsgState = useSelector<State.SSE, State.MsgData[]>(
    (state) => state.msgs
  );

  const MsgJSXelement = useCallback(() => {
    const MsgJSX: JSX.Element[] = [];
    const userColorArray: { username: string; colorNumber: number }[] = [];
    for (let message of MsgState) {
      let colorNum: number = 10;
      const { msgAuthor, msgText, msgTime } = message;
      const msgTimeHour = extractHourNMinuteFromISO(msgTime);
      let classMsg: string = "";
      if (username === msgAuthor) {
        classMsg = "myMsg";
      } else if (msgAuthor === "Server") {
        classMsg = "serverMsg";
      } else {
        const userObj = userColorArray.find(
          (userObj) => userObj.username === msgAuthor
        );
        if (userObj) {
          colorNum = userObj.colorNumber;
        } else {
          const randNum = Math.floor(Math.random() * 9) + 1;
          colorNum = randNum;
          userColorArray.push({ username: msgAuthor, colorNumber: colorNum });
        }
      }
      const seenIndicatorJSX = message.seenIndicator ? <ClockSVG /> : <OneV />;
      MsgJSX.push(
        <Message
          msgAuthor={msgAuthor}
          msgText={msgText}
          msgTime={msgTimeHour}
          classOfCreator={`${classMsg || "otherMsg"} Msg`}
          seenIndicatorJSX={seenIndicatorJSX}
          colorNum={colorNum}
        />
      );
    }
    return MsgJSX;
  }, [MsgState, username]);

  useEffect(() => {
    if (!endOfChat.current) {
      return;
    }
    endOfChat.current.scrollIntoView({ behavior: "smooth" });
  }, [MsgState]);

  return (
    <div id="ChatLog">
      {MsgJSXelement()}
      <div ref={endOfChat}></div>
    </div>
  );
}
