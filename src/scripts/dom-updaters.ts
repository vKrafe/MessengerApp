import { ChatListTemplate } from "../templates/chat-list.template";
import { ChatListTemplateProps } from "../templates/chat-list.template";
import { MessagesChatTemplate } from "../templates/message.template";
import { MessagesChatTemplateProps } from "../templates/message.template";
import { ThemeListsTemplate, ThemeListsTemplateProps } from "../templates/theme.template";

export interface UpdateChatListArgs {
	chatListContainer: Element,
	chatLists: ChatListTemplateProps[],
	chatListsActive: number
}

export interface UpdateMessagesChatArgs {
	messagesContainer: Element,
	messagesChat: MessagesChatTemplateProps[],
}

export interface UpdateThemeListsArgs {
	themeContainer: Element,
	themeLists: ThemeListsTemplateProps[],
	themeListsActive: number
}


export const UpdateChatList = (args: UpdateChatListArgs, value: string) => {
	const { chatListContainer, chatLists, chatListsActive } = args

	chatListContainer.innerHTML = chatLists.map(chatList => ChatListTemplate({ ...chatList, active: chatList.id === chatListsActive }, value)).join('')
}

export const UpdateMessagesChat = (args: UpdateMessagesChatArgs) => {
	const { messagesContainer, messagesChat } = args

	messagesContainer.innerHTML = messagesChat ? messagesChat.map(message => MessagesChatTemplate(message)).join('') : null
}

export const UpdateThemeLists = (args: UpdateThemeListsArgs) => {
	const { themeContainer, themeLists, themeListsActive } = args

	themeContainer.innerHTML = themeLists.map(theme => ThemeListsTemplate({...theme, active: theme.id === themeListsActive})).join('')
}