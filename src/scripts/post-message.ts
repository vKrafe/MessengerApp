import { MessagesChatTemplateProps } from "../templates/message.template";
import avatarLogoMain from "../assets/images/users-icon/logo.svg";
import { UpdateMessagesChat } from "./dom-updaters";

export interface listAvatarProps {
	src: string
}

export interface PostMessageArgs {
	userMain: boolean,
	message: MessagesChatTemplateProps[],
	value: string,
	messagesContainer: Element,
	listAvatar: listAvatarProps[],
	listAvatarActive: number,
}

export const PostMessage = (args: PostMessageArgs) => {
	const { userMain, message, value, messagesContainer, listAvatar, listAvatarActive } = args

	message.unshift({ isOwn: userMain, src: userMain ? listAvatar[listAvatarActive].src : avatarLogoMain, text: value })

	UpdateMessagesChat({ messagesContainer, messagesChat: message })
}
