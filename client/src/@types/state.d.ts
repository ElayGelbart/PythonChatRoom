declare namespace State {
  interface ViewInterface {
    login: string;
    register: string;
  }
  interface MsgData {
    msgAuthor: string;
    msgText: string;
    msgTime: string;
    classOfCreator: string;
    seenIndicator?: boolean;
  }
  interface UserData {
    username: string;
  }

  interface SSE {
    msgs: MsgData[];
    users: UserData[];
  }
}
