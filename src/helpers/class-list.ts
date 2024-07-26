export interface classListArgs {
	chatListContainer: Element,
	remove: string,
	add: string
}

export function classList(args: classListArgs) {
	const { chatListContainer, remove, add } = args

	chatListContainer.classList.remove(remove)

	chatListContainer.classList.add(add)
}
