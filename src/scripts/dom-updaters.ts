import { ChatListTemplate } from "../templates/chat-list.template";
import { ChatListTemplateProps } from "../templates/chat-list.template";
import { MessagesChatTemplate } from "../templates/message.template";
import { MessagesChatTemplateProps } from "../templates/message.template";

export interface UpdateChatListArgs {
	chatListContainer: Element,
	chatLists: ChatListTemplateProps[],
	chatListsActive: number
}

export interface UpdateMessagesChatArgs {
	messagesContainer: Element,
	messagesChat: MessagesChatTemplateProps[]
}

export const UpdateChatList = (args: UpdateChatListArgs, value: string) => {
	const { chatListContainer, chatLists, chatListsActive } = args

	chatListContainer.innerHTML = chatLists.map(chatList => ChatListTemplate({ ...chatList, active: chatList.id === chatListsActive }, value)).join('')
}

export const UpdateMessagesChat = (args: UpdateMessagesChatArgs) => {
	const { messagesContainer, messagesChat } = args

	messagesContainer.innerHTML = messagesChat ? messagesChat.map(message => MessagesChatTemplate(message)).join('') : null
}