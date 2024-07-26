import { ChatListTemplateProps } from "../templates/chat-list.template";

export interface getChatListArgs {
	word: string,
	chatLists: ChatListTemplateProps[]
}

export function getChatList(args: getChatListArgs) {
	const { word, chatLists } = args

	return chatLists.filter(item => {
		const regex = RegExp(word, 'gi')

		return item.name.match(regex)
	})
}